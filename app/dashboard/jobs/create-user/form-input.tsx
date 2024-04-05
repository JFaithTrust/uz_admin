import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateJobsSchema } from "@/lib/validation";
import { Job } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormInput = ({
  title,
  typeInput,
}: {
  title: string;
  typeInput?: string;
}) => {
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
    <FormField
      name="title"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type={typeInput}
              placeholder={`${title}`}
              {...field}
              className="w-[250px]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
