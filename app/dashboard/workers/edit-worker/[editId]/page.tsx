"use client";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {CreateJobsSchema, CreateWorkerSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Category, District, Region} from "@/types";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CalendarIcon, Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Calendar} from "@/components/ui/calendar";
import {format} from "date-fns";
import axios from "@/app/api/axios";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import useDistrictStore from "@/lib/store/district-store";
import useRegionStore from "@/lib/store/region-store";
import useJobCategoryStore from "@/lib/store/job-category-store";
import {DateTimePicker} from "@/components/ui/datetime-picker";
import {PhoneInput} from "@/components/ui/phone-input";
import useWorkerStore from "@/lib/store/worker-store";
import {toast} from "sonner";

const CreateWorker = ({ params }: { params: { editId: string } }) => {

  const {jobCategories, getJobCategories} = useJobCategoryStore()
  const {regions, getRegions} = useRegionStore()
  const {getDistrictByRegionId, districts} = useDistrictStore()
  const { updateWorker, getWorkerById, worker} = useWorkerStore()
  const [valuer, setValuer] = useState("");

  useEffect(() => {
    getJobCategories().then()
    getRegions().then()
    getWorkerById(params.editId).then()
  }, []);

  useEffect(() => {
    if(worker){
      form.setValue("deadline", worker.deadline);
      form.setValue("birthDate", worker.birthDate);
      form.setValue("title", worker.title);
      form.setValue("salary", worker.salary.toString());
      form.setValue("gender", worker.gender === "Male" ? "1" : worker.gender === "Female" ? "0" : "2");
      form.setValue("workingTime", worker.workingTime);
      form.setValue("workingSchedule", worker.workingSchedule);
      form.setValue("telegramLink", worker.telegramLink);
      form.setValue("instagramLink", worker.instagramLink);
      form.setValue("tgUserName", worker.tgUserName);
      form.setValue("phoneNumber", worker.phoneNumber);
      jobCategories.map((c: Category) => {
        if(c.title === worker.categoryName){
          console.log(c.id, worker.categoryName)
          form.setValue("categoryId", c.id);
        }
      })
      regions.map((r: Region) => {
        if(r.name === worker.regionName){
          setValuer(r.id)
        }
      })
      districts.map((d: District) => {
        if(d.name === worker.districtName){
          form.setValue("districtId", d.id);
        }
      })
    }
  }, [worker]);

  const form = useForm<z.infer<typeof CreateWorkerSchema>>({
    resolver: zodResolver(CreateWorkerSchema),
  });

  function onSubmit(data: z.infer<typeof CreateWorkerSchema>) {
    const updatedWorker = {
      id: params.editId,
      deadline: data.deadline,
      birthDate: data.birthDate,
      title: data.title,
      salary: +data.salary,
      gender: +data.gender,
      workingTime: data.workingTime,
      workingSchedule: data.workingSchedule,
      telegramLink: data.telegramLink,
      instagramLink: data.instagramLink,
      tgUserName: data.tgUserName,
      phoneNumber: data.phoneNumber.slice(1, data.phoneNumber.length),
      categoryId: data.categoryId,
      districtId: data.districtId,
    }
    updateWorker(updatedWorker).then(
      () => {
        toast.success("Worker created")
        window.location.reload()
      }
    ).catch(
      (e) => {
        toast.error("Error creating worker", e)
      }
    )
  }

  return (
    <div className="w-full h-full px-3 pb-10 pr-64">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold mt-5">Tahrirlash</h1>
          <div className="mt-10 grid gap-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Sarlavha</FormLabel>
                  <FormControl>
                    <Input placeholder="Bahor oshxonasi uchun ishchi kerak..." {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-12">
              <FormField
                control={form.control}
                name="workingTime"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Ishlash vaqti</FormLabel>
                    <FormControl>
                      <Input placeholder="8:00 dan 20:00 gacha..." {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workingSchedule"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Ish jadvali</FormLabel>
                    <FormControl>
                      <Input placeholder="haftada 6 kun ish 1 kun dam..." {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-12">
              {/* Category Combobox */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Kategoriyalar</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tanlang..."/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobCategories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input type={"number"} placeholder="1000000" className={"w-56"} {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-end gap-x-12">
              <FormField
                control={form.control}
                name="gender"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Jins</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-2"
                      >
                        <FormItem className="flex items-center space-x-2 border rounded-lg border-gray-300 px-3 py-2.5">
                          <FormControl>
                            <RadioGroupItem value="1"/>
                          </FormControl>
                          <FormLabel className="font-normal">
                            Erkak
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 border rounded-lg border-gray-300 px-2 py-2">
                          <FormControl>
                            <RadioGroupItem value="0"/>
                          </FormControl>
                          <FormLabel className="font-normal">
                            Ayol
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Muxlat</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        granularity="second"
                        jsDate={field.value}
                        onJsDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Tug&apos;ulgan kun</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        // granularity="second"
                        jsDate={field.value}
                        onJsDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className={"grid grid-cols-2 gap-x-12"}>
              {/* Regions Combobox */}
              <div>
                <Label>Viloyatlar</Label>
                <Select onValueChange={(value) => {
                  setValuer(value)
                  getDistrictByRegionId(value).then()
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang..."/>
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((r) => (
                      <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Districts Combobox */}
              <FormField
                control={form.control}
                name="districtId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Tumanlar</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={
                      !valuer
                    }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tanlang..."/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((d) => (
                          <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 gap-x-12">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Telefon nomer</FormLabel>
                    <FormControl>
                      <PhoneInput placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tgUserName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Tg. profile username</FormLabel>
                    <FormControl>
                      <Input placeholder="jfaithtrust" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegramLink"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Telegram group link</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter link" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagramLink"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Instagram group link</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter link" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button type="submit" className="mt-5">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateWorker;