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

const CreateWorker = () => {
  // regions
  const [openr, setOpenr] = useState(false)
  const [regions, setRegions] = useState<Region[]>([])
  const [valuer, setValuer] = useState("");
  // districts
  const [opend, setOpend] = useState(false)
  const [districts, setDistricts] = useState<District[]>([])
  const [valued, setValued] = useState("")
  // category
  const [allCategory, setAllCategory] = useState<Category[]>([])
  // const { getCategories, Categories } = useJobTypesStore()

  useEffect(() => {
    const getAllCategory = async () : Promise<Category[]> => {
      const { data } = await axios.get("/api/JobCategory/GetAll");
      return data;
    };
    const getAllRegions = async () : Promise<Region[]> => {
      const { data } = await axios.get("/api/Region/GetAll");
      return data;
    }
    getAllCategory().then((data) => setAllCategory(data));
    getAllRegions().then((data) => setRegions(data));
  }, []);

  const form = useForm<z.infer<typeof CreateWorkerSchema>>({
    resolver: zodResolver(CreateWorkerSchema),
    defaultValues: {
      deadline: new Date(),
      birthDate: new Date(),
      title: "",
      salary: "",
      gender: "1",
      workingTime: "",
      workingSchedule: "",
      telegramLink: "",
      instagramLink: "",
      tgUserName: "",
      phoneNumber: "998",
      categoryId: "",
      regionId: "",
      districtId: "",
    },
  });

  useEffect(() => {
    if (form.getValues().regionId) {
      axios.get(`/api/District/GetByRegionId/${form.getValues().regionId}`)
        .then(({ data }) => setDistricts(data));
    }
  }, [form.getValues().regionId]);

  function onSubmit(data: z.infer<typeof CreateWorkerSchema>) {
    console.log(data)
  }

  return (
    <div className="w-full h-full px-3 pb-10 pr-64">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold mt-5">Ishchi yaratish</h1>
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
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-12">
              {/* Category Combobox */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategoriyalar</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tanlang..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allCategory.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*  <Popover open={openc} onOpenChange={setOpenc}>*/}
              {/*    <PopoverTrigger asChild>*/}
              {/*      <Button*/}
              {/*        variant="outline"*/}
              {/*        role="combobox"*/}
              {/*        aria-expanded={openc}*/}
              {/*        className="w-full justify-between bg-white hover:bg-white text-darkindigo hover:text-darkindigo p-2 rounded-lg"*/}
              {/*      >*/}
              {/*      <span className="truncate">*/}
              {/*        {valuec*/}
              {/*          ? allCategory.find(*/}
              {/*            (category) =>*/}
              {/*              category.title.toLocaleLowerCase() === valuec*/}
              {/*          )?.title*/}
              {/*          : "Kategoriya tanlang..."}*/}
              {/*      </span>*/}
              {/*        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>*/}
              {/*      </Button>*/}
              {/*    </PopoverTrigger>*/}
              {/*    <PopoverContent className="w-[200px] p-0">*/}
              {/*      <Command>*/}
              {/*        <CommandInput placeholder="Qidiruv..."/>*/}
              {/*        <CommandEmpty>Kategoriyalar topilmadi</CommandEmpty>*/}
              {/*        <CommandGroup>*/}
              {/*          {allCategory.map((category) => (*/}
              {/*            <CommandItem*/}
              {/*              key={category.id}*/}
              {/*              value={category.title}*/}
              {/*              onSelect={(currentValue) => {*/}
              {/*                // putParams("jobCategoryId",*/}
              {/*                //   currentValue === valuec ? "" : allCategory.find((c) => c.title.toLocaleLowerCase() === currentValue)*/}
              {/*                //     ?.id || ""*/}
              {/*                // )*/}
              {/*                setValuec(*/}
              {/*                  currentValue === valuec ? "" : currentValue*/}
              {/*                );*/}
              {/*                setOpenc(false);*/}
              {/*              }}*/}
              {/*            >*/}
              {/*              <Check*/}
              {/*                className={cn(*/}
              {/*                  "mr-2 h-4 w-4",*/}
              {/*                  valuec === category.title.toLocaleLowerCase()*/}
              {/*                    ? "opacity-100"*/}
              {/*                    : "opacity-0"*/}
              {/*                )}*/}
              {/*              />*/}
              {/*              {category.title}*/}
              {/*            </CommandItem>*/}
              {/*          ))}*/}
              {/*        </CommandGroup>*/}
              {/*      </Command>*/}
              {/*    </PopoverContent>*/}
              {/*  </Popover>*/}
                <FormField
                  control={form.control}
                  name="salary"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input type={"number"} placeholder="1000000" className={"w-56"} {...field} />
                      </FormControl>
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({field}) => (
                  <FormItem className="flex flex-col gap-y-1">
                    <FormLabel>Muxlat</FormLabel>
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
              <FormField
                control={form.control}
                name="birthDate"
                render={({field}) => (
                  <FormItem className="flex flex-col gap-y-1">
                    <FormLabel>Tug&apos;ilgan kun</FormLabel>
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
            </div>
            <div className={"grid grid-cols-2 gap-x-12"}>
              {/* Regions Combobox */}
              <FormField
                control={form.control}
                name="regionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Viloyatlar</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tanlang..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {regions.map((r) => (
                          <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*<Popover open={openr} onOpenChange={setOpenr}>*/}
              {/*  <PopoverTrigger asChild>*/}
              {/*    <Button*/}
              {/*      variant="outline"*/}
              {/*      role="combobox"*/}
              {/*      aria-expanded={openr}*/}
              {/*      className="w-full justify-between bg-white hover:bg-white text-darkindigo hover:text-darkindigo p-2 rounded-lg"*/}
              {/*    >*/}
              {/*        <span className="truncate">*/}
              {/*          {valuer*/}
              {/*            ? regions.find(*/}
              {/*              (region) =>*/}
              {/*                region.name.toLocaleLowerCase() === valuer*/}
              {/*            )?.name*/}
              {/*            : "Viloyat tanlang..."}*/}
              {/*        </span>*/}
              {/*      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>*/}
              {/*    </Button>*/}
              {/*  </PopoverTrigger>*/}
              {/*  <PopoverContent className="w-[200px] p-0">*/}
              {/*    <Command>*/}
              {/*      <CommandInput placeholder="Qidiruv..."/>*/}
              {/*      <CommandEmpty>Viloyat topilmadi.</CommandEmpty>*/}
              {/*      <CommandGroup>*/}
              {/*        {regions.map((region) => (*/}
              {/*          <CommandItem*/}
              {/*            key={region.id}*/}
              {/*            value={region.name}*/}
              {/*            onSelect={(currentValue) => {*/}
              {/*              // putParams("regionId",*/}
              {/*              //   currentValue === valuer ? "" : regions.find((r) => r.name.toLocaleLowerCase() === currentValue)*/}
              {/*              //     ?.id || ""*/}
              {/*              // )*/}
              {/*              setValuer(*/}
              {/*                currentValue === valuer ? "" : currentValue*/}
              {/*              );*/}
              {/*              setOpenr(false);*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            <Check*/}
              {/*              className={cn(*/}
              {/*                "mr-2 h-4 w-4",*/}
              {/*                valuer === region.name.toLocaleLowerCase()*/}
              {/*                  ? "opacity-100"*/}
              {/*                  : "opacity-0"*/}
              {/*              )}*/}
              {/*            />*/}
              {/*            {region.name}*/}
              {/*          </CommandItem>*/}
              {/*        ))}*/}
              {/*      </CommandGroup>*/}
              {/*    </Command>*/}
              {/*  </PopoverContent>*/}
              {/*</Popover>*/}
              {/* Districts Combobox */}
              <FormField
                control={form.control}
                name="regionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tumanlar</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={
                      !field.value
                    }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tanlang..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((d) => (
                          <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*<Popover open={opend} onOpenChange={setOpend}>*/}
              {/*  <PopoverTrigger asChild>*/}
              {/*    <Button*/}
              {/*      variant="outline"*/}
              {/*      role="combobox"*/}
              {/*      aria-expanded={opend}*/}
              {/*      disabled={!valuer}*/}
              {/*      className="w-full justify-between bg-white hover:bg-white text-darkindigo hover:text-darkindigo p-2 rounded-lg"*/}
              {/*    >*/}
              {/*<span className="truncate">*/}
              {/*  {valued*/}
              {/*    ? districts.find(*/}
              {/*    (d) => d.name.toLocaleLowerCase() === valued*/}
              {/*  )?.name || "Tuman tanlang..."*/}
              {/*    : "Tuman tanlang..."}*/}
              {/*</span>*/}
              {/*      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>*/}
              {/*    </Button>*/}
              {/*  </PopoverTrigger>*/}
              {/*  <PopoverContent className="w-[200px] p-0">*/}
              {/*    <Command>*/}
              {/*      <CommandInput placeholder="Qidiruv..."/>*/}
              {/*      <CommandEmpty>Tuman topilmadi.</CommandEmpty>*/}
              {/*      <CommandGroup>*/}
              {/*        {districts.map((d) => (*/}
              {/*          <CommandItem*/}
              {/*            key={d.id}*/}
              {/*            value={d.name}*/}
              {/*            onSelect={(currentValue) => {*/}
              {/*              // putParams("districtId",*/}
              {/*              //   currentValue === valued ? "" : district.find((d) => d.name.toLocaleLowerCase() === currentValue)*/}
              {/*              //     ?.id || ""*/}
              {/*              // )*/}
              {/*              setValued(*/}
              {/*                currentValue === valued ? "" : currentValue*/}
              {/*              );*/}
              {/*              setOpend(false);*/}
              {/*            }}*/}
              {/*          >*/}
              {/*            <Check*/}
              {/*              className={cn(*/}
              {/*                "mr-2 h-4 w-4",*/}
              {/*                valued === d.name.toLocaleLowerCase()*/}
              {/*                  ? "opacity-100"*/}
              {/*                  : "opacity-0"*/}
              {/*              )}*/}
              {/*            />*/}
              {/*            {d.name}*/}
              {/*          </CommandItem>*/}
              {/*        ))}*/}
              {/*      </CommandGroup>*/}
              {/*    </Command>*/}
              {/*  </PopoverContent>*/}
              {/*</Popover>*/}
            </div>
            <div className="grid grid-cols-4 gap-x-12">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Telefon nomer</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
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