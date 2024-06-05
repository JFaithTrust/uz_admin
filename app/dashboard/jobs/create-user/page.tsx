// "use client";
//
// import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
// import {CreateJobsSchema} from "@/lib/validation";
// import {zodResolver} from "@hookform/resolvers/zod";
// import React, {useEffect, useState} from "react";
// import {useForm} from "react-hook-form";
// import {z} from "zod";
// import {Input} from "@/components/ui/input";
// import {Category, District, Region} from "@/types";
// import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
// import {Button} from "@/components/ui/button";
// import {CalendarIcon, Check, ChevronsUpDown} from "lucide-react";
// import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
// import {cn} from "@/lib/utils";
// import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
// import {Textarea} from "@/components/ui/textarea";
// import {Calendar} from "@/components/ui/calendar";
// import {format} from "date-fns";
// import { Label } from "@/components/ui/label";
// import {useJobTypesStore} from "@/lib/store/job-types-store";
//
// const CreateUser = () => {
//   // regions
//   const [openr, setOpenr] = useState(false)
//   const [regions, setRegions] = useState<Region[]>([])
//   const [valuer, setValuer] = useState("");
//   // districts
//   const [opend, setOpend] = useState(false)
//   const [districts, setDistricts] = useState<District[]>([])
//   const [valued, setValued] = useState("")
//   // category
//   const [openc, setOpenc] = useState(false)
//   const [categories, setCategories] = useState<Category[]>([])
//   const [valuec, setValuec] = useState("")
//   const { fetchJobs, jobData } = useJobTypesStore()
//
//   useEffect(() => {
//     fetchJobs().then((data) => {
//       setCategories(data)
//     })
//   }, []);
//
//   const form = useForm<z.infer<typeof CreateJobsSchema>>({
//     resolver: zodResolver(CreateJobsSchema),
//     defaultValues: {
//       title: "",
//       salary: "",
//       gender: "1",
//       workingTime: "",
//       workingSchedule: "",
//       deadline: new Date(),
//       telegramLink: "",
//       instagramLink: "",
//       tgUserName: "",
//       phoneNumber: "998",
//       benefit: "",
//       lat: 0,
//       lang: 0
//     },
//   });
//
//   return (
//     <div className="w-full h-full px-3 pb-10 pr-64">
//       <Form {...form}>
//         <form>
//           <h1 className="text-3xl font-bold mt-5">E&apos;lon yaratish</h1>
//           <div className="mt-10 grid gap-y-5">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({field}) => (
//                 <FormItem>
//                   <FormLabel>Sarlavha</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Bahor oshxonasi uchun ishchi kerak..." {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <div className="grid grid-cols-2 gap-x-12">
//               <FormField
//                 control={form.control}
//                 name="workingTime"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Ishlash vaqti</FormLabel>
//                     <FormControl>
//                       <Input placeholder="8:00 dan 20:00 gacha..." {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="workingSchedule"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Ish jadvali</FormLabel>
//                     <FormControl>
//                       <Input placeholder="haftada 6 kun ish 1 kun dam..." {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-x-12">
//               {/* Category Combobox */}
//               <div>
//                 <Label>Kategoriyalar</Label>
//                 <Popover open={openc} onOpenChange={setOpenc}>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="outline"
//                       role="combobox"
//                       aria-expanded={openc}
//                       className="w-full justify-between bg-white hover:bg-white text-darkindigo hover:text-darkindigo p-2 rounded-lg"
//                     >
//               <span className="truncate">
//                 {valuec
//                   ? categories.find(
//                     (category) =>
//                       category.title.toLocaleLowerCase() === valuec
//                   )?.title
//                   : "Kategoriya tanlang..."}
//               </span>
//                       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-[200px] p-0">
//                     <Command>
//                       <CommandInput placeholder="Qidirish..."/>
//                       <CommandEmpty>Kategoriyalar topilmadi!</CommandEmpty>
//                       <CommandGroup>
//                         {categories.map((category) => (
//                           <CommandItem
//                             key={category.id}
//                             value={category.title}
//                             onSelect={(currentValue) => {
//                               // putParams("jobCategoryId",
//                               //   currentValue === valuec ? "" : allCategory.find((c) => c.title.toLocaleLowerCase() === currentValue)
//                               //     ?.id || ""
//                               // )
//                               setValuec(
//                                 currentValue === valuec ? "" : currentValue
//                               );
//                               setOpenc(false);
//                             }}
//                           >
//                             <Check
//                               className={cn(
//                                 "mr-2 h-4 w-4",
//                                 valuec === category.title.toLocaleLowerCase()
//                                   ? "opacity-100"
//                                   : "opacity-0"
//                               )}
//                             />
//                             {category.title}
//                           </CommandItem>
//                         ))}
//                       </CommandGroup>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//               </div>
//               <FormField
//                 control={form.control}
//                 name="salary"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Salary</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Please write a salary by sum" className={"w-56"} {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-end gap-x-12">
//               <FormField
//                 control={form.control}
//                 name="gender"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Jins</FormLabel>
//                     <FormControl>
//                       <RadioGroup
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                         className="flex space-x-2"
//                       >
//                         <FormItem className="flex items-center space-x-2 border rounded-lg border-gray-300 px-3 py-2.5">
//                           <FormControl>
//                             <RadioGroupItem value="1"/>
//                           </FormControl>
//                           <FormLabel className="font-normal">
//                             Erkak
//                           </FormLabel>
//                         </FormItem>
//                         <FormItem className="flex items-center space-x-2 border rounded-lg border-gray-300 px-2 py-2">
//                           <FormControl>
//                             <RadioGroupItem value="0"/>
//                           </FormControl>
//                           <FormLabel className="font-normal">
//                             Ayol
//                           </FormLabel>
//                         </FormItem>
//                       </RadioGroup>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <div className={"flex gap-x-2"}>
//                 <FormField
//                   control={form.control}
//                   name="minAge"
//                   render={({field}) => (
//                     <FormItem>
//                       <FormLabel>Min. yosh</FormLabel>
//                       <FormControl>
//                         <Input placeholder="12" className={"w-24"} {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="maxAge"
//                   render={({field}) => (
//                     <FormItem>
//                       <FormLabel>Max. yosh</FormLabel>
//                       <FormControl>
//                         <Input placeholder="30" className={"w-24"} {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <FormField
//                 control={form.control}
//                 name="deadline"
//                 render={({field}) => (
//                   <FormItem className="flex flex-col gap-y-1">
//                     <FormLabel>Muxlat</FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-[240px] pl-3 text-left font-normal rounded-lg p-3 bg-mainwhite hover:bg-mainwhite text-black",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             {field.value ? (
//                               format(field.value, "MM-dd-yyyy")
//                             ) : (
//                               <span>Tanlang...</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={field.value}
//                           onSelect={field.onChange}
//                           // disabled={(date) =>
//                           //   date > new Date() || date < new Date("1900-01-01")
//                           // }
//                           initialFocus
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <FormMessage/>
//                   </FormItem>
//                 )}
//               />
//               <div className={"flex gap-x-2"}>
//                 <FormField
//                   control={form.control}
//                   name="lang"
//                   render={({field}) => (
//                     <FormItem>
//                       <FormLabel>Longitude</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Longitude" className={"w-24"} {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lat"
//                   render={({field}) => (
//                     <FormItem>
//                       <FormLabel>Latitude</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Latitude" className={"w-24"} {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//             <div className={"grid grid-cols-2 gap-x-12"}>
//               {/* Regions Combobox */}
//               <Popover open={openr} onOpenChange={setOpenr}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     role="combobox"
//                     aria-expanded={openr}
//                     className="w-full justify-between bg-white hover:bg-white text-darkindigo hover:text-darkindigo p-2 rounded-lg"
//                   >
//                       <span className="truncate">
//                         {valuer
//                           ? regions.find(
//                             (region) =>
//                               region.name.toLocaleLowerCase() === valuer
//                           )?.name
//                           : "Viloyat tanlang..."}
//                       </span>
//                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-[200px] p-0">
//                   <Command>
//                     <CommandInput placeholder="Qidiruv..."/>
//                     <CommandEmpty>Viloyat topilmadi.</CommandEmpty>
//                     <CommandGroup>
//                       {regions.map((region) => (
//                         <CommandItem
//                           key={region.id}
//                           value={region.name}
//                           onSelect={(currentValue) => {
//                             // putParams("regionId",
//                             //   currentValue === valuer ? "" : regions.find((r) => r.name.toLocaleLowerCase() === currentValue)
//                             //     ?.id || ""
//                             // )
//                             setValuer(
//                               currentValue === valuer ? "" : currentValue
//                             );
//                             setOpenr(false);
//                           }}
//                         >
//                           <Check
//                             className={cn(
//                               "mr-2 h-4 w-4",
//                               valuer === region.name.toLocaleLowerCase()
//                                 ? "opacity-100"
//                                 : "opacity-0"
//                             )}
//                           />
//                           {region.name}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//               {/* Districts Combobox */}
//               <Popover open={opend} onOpenChange={setOpend}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     role="combobox"
//                     aria-expanded={opend}
//                     disabled={!valuer}
//                     className="w-full justify-between bg-white hover:bg-white text-darkindigo hover:text-darkindigo p-2 rounded-lg"
//                   >
//               <span className="truncate">
//                 {valued
//                   ? districts.find(
//                   (d) => d.name.toLocaleLowerCase() === valued
//                 )?.name || "Tuman tanlang..."
//                   : "Tuman tanlang..."}
//               </span>
//                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-[200px] p-0">
//                   <Command>
//                     <CommandInput placeholder="Qidiruv..."/>
//                     <CommandEmpty>Tuman topilmadi.</CommandEmpty>
//                     <CommandGroup>
//                       {districts.map((d) => (
//                         <CommandItem
//                           key={d.id}
//                           value={d.name}
//                           onSelect={(currentValue) => {
//                             // putParams("districtId",
//                             //   currentValue === valued ? "" : district.find((d) => d.name.toLocaleLowerCase() === currentValue)
//                             //     ?.id || ""
//                             // )
//                             setValued(
//                               currentValue === valued ? "" : currentValue
//                             );
//                             setOpend(false);
//                           }}
//                         >
//                           <Check
//                             className={cn(
//                               "mr-2 h-4 w-4",
//                               valued === d.name.toLocaleLowerCase()
//                                 ? "opacity-100"
//                                 : "opacity-0"
//                             )}
//                           />
//                           {d.name}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//             </div>
//             <div className="grid grid-cols-4 gap-x-12">
//               <FormField
//                 control={form.control}
//                 name="phoneNumber"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Telefon nomer</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter phone number" {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="tgUserName"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Tg. profile username</FormLabel>
//                     <FormControl>
//                       <Input placeholder="jfaithtrust" {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="telegramLink"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Telegram group link</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter link" {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="instagramLink"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Instagram group link</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter link" {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-x-12">
//               <FormField
//                 control={form.control}
//                 name="benefit"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Afzalliklar</FormLabel>
//                     <FormControl>
//                       <Textarea placeholder="Shinam ofis va ovqat bilan taminlanadi" {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="requirement"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Talablar</FormLabel>
//                     <FormControl>
//                       <Textarea placeholder="Ingliz tilida erkin suhbatlasha olish" {...field} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>
//           <div className="w-full flex justify-end">
//             <Button type="submit" className="mt-5">
//               Create
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };
//
// export default CreateUser;

const CreateUser = () => {
    return (
        <div>
        Create user
        </div>
    );
}

export default CreateUser;