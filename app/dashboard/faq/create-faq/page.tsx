'use client'

import useFaqStore from "@/lib/store/faq-store";
import {useForm} from "react-hook-form";
import {CreateFaqSchema} from "@/lib/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

const CreateFaqPage = () => {
  const { createFaq } = useFaqStore();

  const form = useForm<z.infer<typeof CreateFaqSchema>>({
    resolver: zodResolver(CreateFaqSchema),
    defaultValues: {
        question: "",
        answer: "",
        },
  })

  function onSubmit(values: z.infer<typeof CreateFaqSchema>) {
    console.log(values)
    createFaq(values).then(() => {
        toast.success("F.A.Q. muvaffaqiyatli yaratildi")
        form.reset();
    }).catch(() => {
        toast.error("F.A.Q. yaratishda xatolik yuz berdi")
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
                    name="question"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Savol</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Siz bilan qanday bo'glansak bo'ladi..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="answer"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Javob</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Web saytimizning aloqa bo'limiga o'tgan xolatda..." {...field} />
                            </FormControl>
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

export default CreateFaqPage;