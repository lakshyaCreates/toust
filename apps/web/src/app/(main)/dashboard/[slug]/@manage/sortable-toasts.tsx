"use client";

import {
    GripIcon,
    PencilIcon,
    PencilOffIcon,
    PlusIcon,
    RefreshCcw,
    SaveIcon,
    TrashIcon,
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "@prisma/client";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import {
    Sortable,
    SortableDragHandle,
    SortableItem,
} from "@workspace/ui/components/sortable";
import { cn } from "@workspace/ui/lib/utils";
import cuid from "cuid";
import { z } from "zod";

import { deleteToastsByWebsite, saveToasts } from "@/queries";

const formSchema = z.object({
    toasts: z.array(z.custom<Toast>()),
});

type FormSchema = z.infer<typeof formSchema>;

export const SortableToasts = ({
    toasts,
    websiteId,
}: {
    toasts: Toast[];
    websiteId: string;
}) => {
    const [openItemId, setOpenItemId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const isDisabled = isPending;

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: { toasts },
    });

    const { fields, move, append, update, remove, replace } = useFieldArray({
        name: "toasts",
        control: form.control,
    });

    async function onSubmit(data: FormSchema) {
        const d = data.toasts.map((d, i) => ({ ...d, order: i }));

        console.log(data.toasts);

        startTransition(async () => {
            console.log(data);

            await deleteToastsByWebsite(websiteId);
            await saveToasts(d);
        });
    }

    function updateFieldOrder() {
        fields.map((item, idx) => {
            update(idx, { ...item, order: idx });
        });

        return;
    }

    useEffect(() => {
        replace(toasts);
    }, [toasts]);

    return (
        <Card>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                >
                    <CardHeader className="-mt-1">
                        <CardTitle className="flex items-center justify-between">
                            <h3>Manage</h3>
                            <div>
                                <Button
                                    onClick={() => {
                                        append({
                                            id: cuid(),
                                            text: `New Toast ${fields.length + 1}`,
                                            order: fields.length,
                                            author: "",
                                            timeAgo: "",
                                            src: "./toust-icon.png",
                                            websiteId,
                                        });

                                        // updateFieldOrder();
                                    }}
                                    disabled={isDisabled}
                                    type="button"
                                    size={"icon"}
                                    variant={"ghost"}
                                >
                                    <PlusIcon />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        replace(toasts);
                                    }}
                                    disabled={isDisabled}
                                    size={"icon"}
                                    variant={"ghost"}
                                >
                                    <RefreshCcw />
                                </Button>
                                <Button
                                    disabled={isDisabled}
                                    type="submit"
                                    size={"icon"}
                                    variant={"ghost"}
                                >
                                    <SaveIcon />
                                </Button>
                            </div>
                        </CardTitle>
                        <Separator className="!-mb-2 !mt-2" />
                    </CardHeader>
                    <CardContent className="">
                        <Sortable
                            value={fields}
                            onMove={({ activeIndex, overIndex }) => {
                                move(activeIndex, overIndex);
                            }}
                        >
                            <div className="flex w-full flex-col gap-2">
                                {fields.map((item, idx) => {
                                    const isExpanded = openItemId === item.id;

                                    return (
                                        <SortableItem
                                            key={`toast-${item.id}`}
                                            value={item.id}
                                        >
                                            <div className="relative z-10 flex h-full w-full transform-gpu flex-col gap-6 rounded-lg bg-primary-foreground px-4 py-3 transition-all duration-100 ease-in">
                                                <div
                                                    className={cn(
                                                        "absolute left-0 top-0 h-full w-full rounded-lg border",
                                                        "transition-opacity duration-100 ease-in",
                                                        isExpanded
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                                <div className="z-10 flex w-full items-center justify-between *:flex *:items-center *:gap-x-2">
                                                    <div>
                                                        <SortableDragHandle
                                                            className="text-muted-foreground"
                                                            type="button"
                                                            size={"icon"}
                                                            variant={"ghost"}
                                                            disabled={
                                                                isDisabled
                                                            }
                                                        >
                                                            <GripIcon />
                                                        </SortableDragHandle>
                                                        <p className="mr-2 text-sm text-muted-foreground">
                                                            {item.order}
                                                        </p>
                                                        <Avatar>
                                                            <AvatarFallback></AvatarFallback>
                                                        </Avatar>
                                                        <p
                                                            className={cn(
                                                                "ml-2",
                                                                isExpanded
                                                                    ? "text-primary"
                                                                    : "text-muted-foreground",
                                                            )}
                                                        >
                                                            {
                                                                form.getValues(
                                                                    "toasts",
                                                                )[idx]?.text
                                                            }
                                                        </p>
                                                    </div>

                                                    <div>
                                                        {isExpanded ? (
                                                            <Button
                                                                onClick={() => {
                                                                    setOpenItemId(
                                                                        null,
                                                                    );
                                                                }}
                                                                type="button"
                                                                size={"icon"}
                                                                variant={
                                                                    "ghost"
                                                                }
                                                                className="text-muted-foreground"
                                                            >
                                                                <PencilOffIcon />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                onClick={() => {
                                                                    setOpenItemId(
                                                                        item.id,
                                                                    );
                                                                }}
                                                                type="button"
                                                                size={"icon"}
                                                                variant={
                                                                    "ghost"
                                                                }
                                                                className="text-muted-foreground"
                                                            >
                                                                <PencilIcon />
                                                            </Button>
                                                        )}
                                                        <Button
                                                            onClick={() => {
                                                                remove(idx);
                                                            }}
                                                            type="button"
                                                            size={"icon"}
                                                            variant={"ghost"}
                                                            className="text-muted-foreground"
                                                        >
                                                            <TrashIcon />
                                                        </Button>
                                                    </div>
                                                </div>
                                                {isExpanded ? (
                                                    <div
                                                        className={cn(
                                                            "flex flex-col gap-6",
                                                            isExpanded &&
                                                                "z-50",
                                                        )}
                                                    >
                                                        <FormField
                                                            name={`toasts.${idx}.text`}
                                                            control={
                                                                form.control
                                                            }
                                                            render={({
                                                                field: f,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormLabel>
                                                                        Time
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="text"
                                                                            placeholder="now"
                                                                            className="w-full"
                                                                            {...f}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <div className="flex w-full items-center gap-2">
                                                            <FormField
                                                                name={`toasts.${idx}.author`}
                                                                control={
                                                                    form.control
                                                                }
                                                                render={({
                                                                    field: f,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Author
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="text"
                                                                                placeholder="Netflix"
                                                                                className="w-full"
                                                                                {...f}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                name={`toasts.${idx}.timeAgo`}
                                                                control={
                                                                    form.control
                                                                }
                                                                render={({
                                                                    field: f,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Time
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="text"
                                                                                placeholder="now"
                                                                                className="w-full"
                                                                                {...f}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </SortableItem>
                                    );
                                })}
                            </div>
                        </Sortable>
                    </CardContent>
                </form>
            </Form>
        </Card>
    );
};
