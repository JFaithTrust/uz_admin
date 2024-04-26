"use client";
import { Form } from "@/components/ui/form";

import { CreateJobsSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "./form-input";
import RadioInput from "./radio-input";
import { DeadlineInput } from "./deadline-input";

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
    <div className="w-full h-full px-3 pb-10">
      <Form {...form}>
        <form>
          <h1 className="text-3xl font-bold mt-5">E&apos;lon yaratish</h1>
          <div className="mt-10 grid gap-y-5">
            <FormInput title="Title" />
            <FormInput title="Salary" />
            <FormInput title="Working Time" />
            <FormInput title="Working Schedule" />
            <FormInput title="Benefit" />
            <FormInput title="Requirement" />
            <FormInput title="District" />
            <div className="grid grid-cols-3 gap-x-20">
              <FormInput title="Telegram profile" />
              <FormInput title="Instagram profile" />
              <FormInput title="Phone number" />
            </div>
            <div className="grid grid-cols-3 gap-x-20">
              <RadioInput />
              <FormInput title="age" />
              <DeadlineInput />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateUser;
