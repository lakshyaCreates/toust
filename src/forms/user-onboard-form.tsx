"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createUser } from "@/actions/create-user";
import { fetchOrder } from "@/actions/fetch-order";
import { initiateOrder } from "@/actions/initiate-order";
import { signin } from "@/actions/signin";
import { verifyPayment } from "@/actions/verify-payment";
import { rzp } from "@/helpers/rzp";
import { usePurchase } from "@/hooks/purchase";
import { getUserByOrderId } from "@/prisma/queries/get/user";
import { updateUserById } from "@/prisma/queries/update/user";
import { PaymentResponse } from "@/types/rzp";
import { UserOnboardValidator } from "@/validators";

export const UserOnboardForm = () => {
    const router = useRouter();

    const { plan } = usePurchase();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof UserOnboardValidator>>({
        resolver: zodResolver(UserOnboardValidator),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof UserOnboardValidator>) {
        startTransition(async () => {
            const data = {
                ...values,
                plan,
            };

            const res = await initiateOrder(data);
            const order = res?.order;

            if (!order) {
                toast.error("Order creation failed!");
                return;
            }

            if (!process.env.NEXT_PUBLIC_RAZORPAY_API_KEY) {
                toast.error("Razorpay API Key not found!");
                return;
            }

            // create a user

            const createUserRes = await createUser({
                name: data.name,
                email: data.email,
                plan: data.plan,
                orderId: order.id,
                orderStatus: "CREATED",
            });

            const paymentOptions = {
                key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
                amount: order.amount,
                order_id: order.id,
                currency: "INR",
                name: data.plan,
                description: `Payment for purchasing ${data.plan} plan`,
                callback_url: `/payment-success?order_id=${order.id}`,

                handler: async (response: PaymentResponse) => {
                    console.log(response);
                    // TODO: Verify Payment
                    const verifyPaymentRes = await verifyPayment(response);

                    if (verifyPaymentRes.success) {
                        toast.success(verifyPaymentRes.message);
                    } else {
                        toast.error(verifyPaymentRes.message);
                        return;
                    }

                    // TODO: Check if the order is paid
                    const order = await fetchOrder(response.razorpay_order_id);

                    if (!order) {
                        toast.error("Order not found at RZP");
                        return;
                    }

                    if (!order.status) {
                        toast.error("Order status not found at RZP");
                        return;
                    }

                    if (order.status === "paid") {
                        toast.success("Payment successful!");

                        const user = await getUserByOrderId(order.id);
                        if (!user || !user.id) {
                            toast.error(
                                "User not found in the databse while updating the order",
                            );
                            return;
                        }
                        const updateUser = await updateUserById(user.id, {
                            orderStatus: "PAID",
                            orderId: order.id,
                            paymentId: response.razorpay_payment_id,
                        });

                        if (updateUser && updateUser.id) {
                            toast.success("User updated...");

                            const signinRes = await signin({
                                email: data.email,
                            });

                            if (signinRes.status === 200) {
                                router.push(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/signin/email-sent`,
                                );
                            }
                        }
                    }
                    // TODO: Update the user

                    // TODO: Redirect to success page
                },
            };

            const rzpWindow = new (window as any).Razorpay(paymentOptions);
            rzpWindow.open();
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    required
                                    placeholder="John Doe"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    required
                                    placeholder="johndoe@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                        <div className="flex items-center gap-x-1">
                            <LoadingSpinner inline />
                        </div>
                    ) : (
                        <span>Purchase</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};
