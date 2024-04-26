"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateJobsSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddressStore } from "@/lib/store/address-store";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Category, District, Region } from "@/types";
import { cn } from "@/lib/utils";

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

  const { Regions, Districts, fetchGetByRegionId, fetchRegions } =
    useAddressStore();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {}, []);

  console.log(Regions);

  return (
    <>
      <FormField
        name="title"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <span className="text-sm font-semibold">
              {title != "age" ? title : ""}
            </span>
            <FormControl>
              {title === "District" ? (
                <>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {value
                          ? Regions.find(
                              (framework) => framework.name === value
                            )?.name
                          : "Select framework..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {Regions.map((framework) => (
                            <CommandItem
                              key={framework.name}
                              value={framework.name}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === framework.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </>
              ) : title === "age" ? (
                <>
                  <h1>Enter {title}:</h1>
                  <div className="flex gap-x-8">
                    <Input
                      type={typeInput}
                      placeholder={`Min ${title.toLowerCase()}...`}
                      {...field}
                      className="w-24"
                    />
                    <Input
                      type={typeInput}
                      placeholder={`Max ${title.toLowerCase()}...`}
                      {...field}
                      className="w-24"
                    />
                  </div>
                </>
              ) : (
                <Input
                  type={typeInput}
                  placeholder={`Enter ${title.toLowerCase()}...`}
                  {...field}
                  className="w-full"
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormInput;
