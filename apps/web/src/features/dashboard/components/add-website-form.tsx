"use client";

import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useAddWebsite } from "../hooks/use-add-website";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { toast } from "sonner";
import { z } from "zod";

import { addWebsite } from "@/queries";

const addWebsiteFormSchema = z.object({
    domain: z
        .string()
        .min(4) // Minimum possible valid domain (e.g., "a.io")
        .max(253) // Maximum length per RFC 1035
        .refine(
            (domain) => {
                // Basic format check
                const basicFormat =
                    /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9](\.[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])*\.[a-zA-Z]{2,}$/;
                if (!basicFormat.test(domain)) return false;

                // Check individual label lengths (parts between dots)
                const labels = domain.split(".");
                if (labels.some((label) => label.length > 63)) return false;

                // Ensure TLD is valid (all letters, minimum 2 chars)
                const tld = labels[labels.length - 1];
                if (!/^[a-zA-Z]{2,}$/.test(tld!)) return false;

                return true;
            },
            {
                message: "Invalid domain format. Please enter a valid domain",
            },
        ),
    note: z.string().optional(),
});

type AddWebsiteFormSchema = z.infer<typeof addWebsiteFormSchema>;

export const AddWebsiteForm = () => {
    const { data: session } = useSession();
    const userId = session!.user!.id!;

    const [isPending, startTransition] = useTransition();
    const { setOpen } = useAddWebsite();

    const form = useForm<AddWebsiteFormSchema>({
        resolver: zodResolver(addWebsiteFormSchema),
        defaultValues: {
            domain: "",
            note: "",
        },
    });

    async function onSubmit(values: AddWebsiteFormSchema) {
        startTransition(async () => {
            await addWebsite({
                domain: values.domain,
                note: values.note,
                userId,
            })
                .then(() => {
                    toast.success("Website added");
                    setOpen(false);
                    return;
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to add website");
                    return;
                });
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
