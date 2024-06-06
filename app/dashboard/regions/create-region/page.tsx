import useRegionStore from "@/lib/store/region-store";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CreateRegionSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const CreateRegionPage = () => {
  const { createRegion } = useRegionStore();

  const form = useForm<z.infer<typeof CreateRegionSchema>>({
    resolver: zodResolver(CreateRegionSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof CreateRegionSchema>) {
    console.log(values)
    createRegion(values).then(() => {
      toast.success("Region successfully created")
      form.reset();
    }).catch(() => {
      toast.error("Error creating region")
    })
  }

  return (
    <div className={"w-full h-full px-3 pb-10 pr-64"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className={"text-3xl font-bold mt-5"}>Create Region</h1>
          <div className={"mt-10 grid gap-y-5"}>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Andijon viloyati..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end">
              <Button type="submit" className="mt-5">
                Create
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateRegionPage;