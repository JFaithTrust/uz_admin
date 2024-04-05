"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateJobsSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "./form-input";

const CreateUser = () => {
  const form = useForm<z.infer<typeof CreateJobsSchema>>({
    resolver: zodResolver(CreateJobsSchema),
    defaultValues: {
      title: "",
      salary: "",
      gender: "",
      workingTime: "",
      workingSchedule: "",
      deadline: new Date(),
      telegramLink: "",
      instagramLink: "",
      tgUserName: "",
      phoneNumber: "+998",
      benefit: "",
    },
  });

  return (
    <div className="w-full h-screen">
      <Form {...form}>
        <form>
          <h1 className="text-3xl font-bold ml-5 mt-5">Create Job</h1>
          <div className="grid grid-cols-3 gap-10 mt-10">
            <FormInput title="Job title..." />
            <FormInput title="Salary..." />
            <FormInput title="Gender..." />
            <FormInput title="Working Time..." />
            <FormInput title="Working Schedule..." />
            <FormInput title="..." />
            <FormInput title="Job title..." typeInput="date" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateUser;
