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

import { signin } from "@/actions/signin";
import { SigninFormValidator } from "@/validators";

export const SigninForm = () => {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SigninFormValidator>>({
        resolver: zodResolver(SigninFormValidator),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof SigninFormValidator>) {
        startTransition(async () => {
            const response = await signin(values);

            if (response.status === 500 || response.status === 400) {
                toast.error(response.message);
            }

            if (response.status === 200) {
                toast.success(response.message);
                form.reset();
                router.push("/signin/email-sent");
            }

            if (!response.status || !response.message) {
                toast.error("An error occurred");
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                            <span>Sending</span>
                            <LoadingSpinner inline />
                        </div>
                    ) : (
                        <span>Send Link</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};
