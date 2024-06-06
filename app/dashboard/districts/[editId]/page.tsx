'use client'

import useDistrictStore from "@/lib/store/district-store";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CreateDistrictSchema, CreateFaqSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useRegionStore from "@/lib/store/region-store";

const EditDistrictPage = ({ params }: { params: { editId: string } }) => {
    const { updateDistrict, district, getDistrictById } = useDistrictStore();
    const { regions, getRegions } = useRegionStore()

    useEffect(() =>{
        getDistrictById(params.editId).then()
        getRegions().then()
        if(district){
            form.setValue("name", district.name);
            form.setValue("regionId", district.regionId);
        }
    }, []);

    const form = useForm<z.infer<typeof CreateDistrictSchema>>({
        resolver: zodResolver(CreateDistrictSchema),
        defaultValues: {
            name: "",
            regionId: "",
        },
    })

    function onSubmit(values: z.infer<typeof CreateDistrictSchema>) {
        const editedDistrict = {
            id: params.editId,
            name: values.name,
            regionId: values.regionId,
        }
        updateDistrict(editedDistrict).then(() => {
            toast.success("District successfully updated")
            form.reset();
        }).catch(() => {
            toast.error("Error occurred while updating district")
        })
    }

    return (
        <div className={"w-full h-full px-3 pb-10 pr-64"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <h1 className={"text-3xl font-bold mt-5"}>Create District</h1>
                    <div className={"mt-10 grid gap-y-5"}>
                        <FormField
                            control={form.control}
                            name="regionId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Regions</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Tanlang..."/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {regions.map((r) => (
                                                <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Baliqchi..." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex justify-end">
                            <Button type="submit" className="mt-5">
                                Edit
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditDistrictPage;