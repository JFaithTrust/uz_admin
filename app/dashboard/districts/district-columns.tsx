import {ColumnDef} from "@tanstack/react-table";
import {District} from "@/types";
import {toast} from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import useDistrictStore from "@/lib/store/district-store";

export const districtColumns: ColumnDef<District>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({row}) => <div className="lowercase">{row.getValue("name")}</div>
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const district = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const {deleteDistrict} = useDistrictStore();

            const handleDelete = (id: string) => {
                deleteDistrict(id).then(
                    () => {
                        toast.success("District successfully deleted");
                    }
                ).catch(
                    (error) => {
                        toast.error("System error occurred. Please try again later.");
                    }
                );
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 float-end">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/*<DropdownMenuItem*/}
                        {/*  onClick={() => navigator.clipboard.writeText(JSON.stringify(payment))}*/}
                        {/*>*/}
                        {/*  Copy payment ID*/}
                        {/*</DropdownMenuItem>*/}
                        <DropdownMenuSeparator />
                        <Link href={`/dashboard/districts/${district.id}`}>
                            <DropdownMenuItem >
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            onClick={() => handleDelete(district.id)}
                            className={"!text-red-500"}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }
]