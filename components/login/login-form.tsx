'use client';

import {lusitana} from "@/app/(ui)/fonts";
import {MdDriveFileRenameOutline} from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";
import {ArrowRightIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {LoginFormSchema} from "@/lib/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import axios from "@/app/api/axios";
import useUserStore from "@/lib/store/user-store"
import {useRouter} from "next/navigation";
export default function LoginForm() {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { setUser } = useUserStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    }
  })

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    try {
      const { data } = await axios.post('/Auth/login',values)
      if(data) {
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          birthDate: data.birthDate,
          token: data.token,
          email: data.email,
          phoneNumber: values.phoneNumber
        })
        toast.success("Logged in successfully.")
        router.push('/dashboard')
      }else{
        toast.error("An error occurred. Please try again.")
      }
    } catch (error: any) {
      toast.error("An error occurred. Please try again.")
    }
  }

  const {isSubmitting} = form.formState
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>Please log in to continue.</h1>
          <div className={"flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8"}>
            <FormField name={"phoneNumber"} control={form.control} render={
              ({field}) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className={"relative"}>
                      <Input
                        type={"tel"}
                        placeholder={"Enter your phone number"}
                        className={"peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"}
                        {...field}
                      />
                      <MdDriveFileRenameOutline
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }/>
            <FormField name={"password"} control={form.control} render={
              ({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className={"relative"}>
                      <Input
                        type={"password"}
                        placeholder={"********"}
                        className={"peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"}
                        {...field}
                      />
                      <RiLockPasswordFill
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }/>
            <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-500/85" disabled={isSubmitting}>
              Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}