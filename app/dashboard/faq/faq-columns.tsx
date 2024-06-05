'use client'

import {ColumnDef} from "@tanstack/react-table";
import {FAQ} from "@/types";
import {Button} from "@/components/ui/button";
import {ChevronDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import Link from "next/link";
import useFaqStore from "@/lib/store/faq-store";
import {toast} from "sonner";



export const faqColumns: ColumnDef<FAQ>[] = [
    {
        accessorKey: "question",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Question
                    <ChevronDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("question")}</div>
    },
    {
        accessorKey: "answer",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Answer
                    <ChevronDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="uppercase">{row.getValue("answer")}</div>
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const faq = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const {deleteFaq} = useFaqStore();

            const handleDelete = (id: string) => {
                deleteFaq(id).then(
                    () => {
                        toast.success("FAQ muvaffaqiyatli o'chirildi");
                    }
                ).catch(
                    (error) => {
                        toast.error("Xatolik yuz berdi");
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
                        <Link href={`/dashboard/faq/${faq.id}`}>
                            <DropdownMenuItem >
                                F.A.Q tahrirlash
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            onClick={() => handleDelete(faq.id)}
                            className={"!text-red-500"}
                        >
                            F.A.Q o&apos;chirish
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }
]