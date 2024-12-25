"use client";

import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useConfirmation } from "@/features/confirmation-dialog";

import {
    addWebsite,
    addWebsiteFormSchema,
    AddWebsiteFormSchema,
    useAddWebsite,
} from "./";

export const AddWebsiteForm = () => {
    const { data: session } = useSession();
    const userId = session!.user!.id!;

    const [isPending, startTransition] = useTransition();
    const { setOpen } = useAddWebsite();
    const { openConfirmation } = useConfirmation();

    const form = useForm<AddWebsiteFormSchema>({
        resolver: zodResolver(addWebsiteFormSchema),
        defaultValues: {
            domain: "",
            note: "",
        },
    });

    async function onSubmit(values: AddWebsiteFormSchema) {
        openConfirmation({
            title: "Are you sure?",
            description: "Do you want to add this website?",
            cancelLabel: "Cancel",
            actionLabel: "Add",
            onAction: () => {
                startTransition(async () => {
                    await addWebsite({ values, userId }).then((res) => {
                        if (res.id) {
                            setOpen(false);
                            toast.success("Website added");
                            return;
                        } else {
                            toast.error("Failed to add website");
                        }
                    });
                });
            },
            onCancel: () => {},
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="domain">Domain</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    id="domain"
                                    placeholder="lakshyasharma.dev"
                                    type="text"
                                    autoComplete="domain"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="note">Note</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={isPending}
                                    id="note"
                                    placeholder="my personal portfolio website"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending} type="submit" size={"sm"}>
                    Submit
                </Button>
            </form>
        </Form>
    );
};
