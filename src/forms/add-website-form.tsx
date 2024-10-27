"use client";

import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

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

import { addWebsite } from "@/actions/add-website";
import { AddWebsiteValidator } from "@/validators";

export const AddWebsiteForm = () => {
    const { data: session } = useSession();
    const userId = session?.user.id;

    if (!userId) {
        throw new Error("User not found");
    }
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof AddWebsiteValidator>>({
        resolver: zodResolver(AddWebsiteValidator),
        defaultValues: {
            url: "",
            toastEvery: 100,
            toastDuration: 2000,
            waitFor: 150,
        },
    });

    function onSubmit(values: z.infer<typeof AddWebsiteValidator>) {
        startTransition(async () => {
            const response = await addWebsite(values, userId!);

            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.error);
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website URL</FormLabel>
                            <FormControl>
                                <Input
                                    type="url"
                                    disabled={isPending}
                                    required
                                    placeholder="something.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="toastEvery"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Toast Every (ms)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    disabled={isPending}
                                    required
                                    placeholder="100"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="toastDuration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Toast Duration (ms)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    disabled={isPending}
                                    required
                                    placeholder="100"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="waitFor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Wait For (ms)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    disabled={isPending}
                                    required
                                    placeholder="100"
                                    {...field}
                                />
                            </FormControl>
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
                        <span>Submit</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};
