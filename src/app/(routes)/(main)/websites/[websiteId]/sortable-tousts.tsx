"use client";

import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Toust } from "@prisma/client";
import { toast } from "sonner";
import { z } from "zod";

import {
    Sortable,
    SortableDragHandle,
    SortableItem,
} from "@/components/sortable";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateTousts } from "@/actions/update-tousts";
import { ToustValidator } from "@/validators";

export const SortableTousts = ({ toust }: { toust: Toust[] }) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ToustValidator>>({
        resolver: zodResolver(ToustValidator),
        defaultValues: {
            tousts: toust,
        },
    });

    const { fields, append, move, remove } = useFieldArray({
        control: form.control,
        name: "tousts",
    });

    async function onSubmit(data: z.infer<typeof ToustValidator>) {
        startTransition(async () => {
            const res = await updateTousts(data);

            if (res.success) {
                toast.success(res.message);
            }
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-4"
            >
                <Sortable
                    value={fields}
                    onMove={({ activeIndex, overIndex }) =>
                        move(activeIndex, overIndex)
                    }
                    overlay={
                        <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                            <div className="h-8 w-full rounded-sm bg-primary/10" />
                            <div className="h-8 w-full rounded-sm bg-primary/10" />
                            <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                            <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                        </div>
                    }
                >
                    <div className="flex w-full flex-col gap-2">
                        {fields.map((field, index) => (
                            <SortableItem
                                key={field.id}
                                value={field.id}
                                asChild
                            >
                                <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`tousts.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Title"
                                                        className="h-8"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`tousts.${index}.id`}
                                        render={({ field }) => (
                                            <FormItem className="hidden">
                                                <FormControl>
                                                    <Input
                                                        hidden
                                                        type=""
                                                        className="h-8"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`tousts.${index}.description`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        className="h-8"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <SortableDragHandle
                                        variant="outline"
                                        size="icon"
                                        className="size-8 shrink-0"
                                    >
                                        <DragHandleDots2Icon
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    </SortableDragHandle>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="size-8 shrink-0"
                                        onClick={() => remove(index)}
                                    >
                                        <TrashIcon
                                            className="size-4 text-destructive"
                                            aria-hidden="true"
                                        />
                                        <span className="sr-only">Remove</span>
                                    </Button>
                                </div>
                            </SortableItem>
                        ))}
                    </div>
                </Sortable>
                <Button size="sm" type="submit" className="w-fit">
                    Submit
                </Button>
            </form>
        </Form>
    );
};
