"use client";

import { RefreshCcw, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    useFormField,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import { toast } from "sonner";
import { z } from "zod";

import { updateWebsiteSettings } from "@/queries/websites/update-website-settings";

type Data = {
    waitFor: number;
    toastEvery: number;
    toastDuration: number;
};

const schema = z.object({
    waitFor: z.coerce.number(),
    toastEvery: z.coerce.number(),
    toastDuration: z.coerce.number(),
});

type Schema = z.infer<typeof schema>;

export const SettingsForm = ({
    settings,
    websiteId,
}: {
    settings: Data;
    websiteId: string;
}) => {
    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...settings,
        },
    });

    async function onSubmit(values: Schema) {
        await updateWebsiteSettings(values, websiteId);
    }

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Settings{" "}
                            <div>
                                <Button
                                    onClick={() => {
                                        form.reset();
                                    }}
                                    type="button"
                                    size={"icon"}
                                    variant={"ghost"}
                                >
                                    <RefreshCcw />
                                </Button>
                                <Button
                                    type="submit"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <SaveIcon />
                                </Button>
                            </div>
                        </CardTitle>
                        <Separator className="-mt-1 -mb-2" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <FormField
                            name={"waitFor"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wait For</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="100"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"toastEvery"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Toast Every</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="1200"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={"toastDuration"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Toast Duration</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="1600"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </form>
            </Form>
        </Card>
    );
};
