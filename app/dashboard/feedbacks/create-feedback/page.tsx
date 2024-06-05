'use client'

import useFaqStore from "@/lib/store/faq-store";
import {useForm} from "react-hook-form";
import {CreateFaqSchema, CreateFeedbackSchema} from "@/lib/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import useFeedbackStore from "@/lib/store/feedback-store";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";

const CreateFeedbackPage = () => {
    const { createFeedback } = useFeedbackStore();

    const form = useForm<z.infer<typeof CreateFeedbackSchema>>({
        resolver: zodResolver(CreateFeedbackSchema),
        defaultValues: {
            message: "",
            fullName: "",
            dueDate: new Date(),
        },
    })

    function onSubmit(values: z.infer<typeof CreateFeedbackSchema>) {
        createFeedback(values).then(() => {
            toast.success("Fikrlar muvaffaqiyatli yaratildi")
            form.reset();
        }).catch(() => {
            toast.error("Fikrlar yaratishda xatolik yuz berdi")
        })
    }

    return (
        <div className={"w-full h-full px-3 pb-10 pr-64"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <h1 className={"text-3xl font-bold mt-5"}>F.A.Q. yaratish</h1>
                    <div className={"mt-10 grid gap-y-5"}>
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>F.I.SH.</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Solijoniy Jahongir..." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Xabar</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Web sayt juda yaxshi ishlab chiqilgan ishlaringa omad..." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({field}) => (
                                <FormItem className="flex flex-col gap-y-1">
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal rounded-lg p-3 bg-mainwhite hover:bg-mainwhite text-black",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "MM-dd-yyyy")
                                                    ) : (
                                                        <span>Tanlang...</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                // disabled={(date) =>
                                                //   date > new Date() || date < new Date("1900-01-01")
                                                // }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex justify-end">
                            <Button type="submit" className="mt-5">
                                Yaratish
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CreateFeedbackPage;