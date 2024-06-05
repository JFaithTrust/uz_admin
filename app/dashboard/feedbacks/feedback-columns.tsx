'use client'

import {ColumnDef} from "@tanstack/react-table";
import {Feedback} from "@/types";
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
import {toast} from "sonner";
import useFeedbackStore from "@/lib/store/feedback-store";
import {formatNumber} from "@/lib/utils";
import {format} from "date-fns";



export const feedbackColumns: ColumnDef<Feedback>[] = [
    {
        accessorKey: "fullName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Full Name
                    <ChevronDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="capitalize">{row.getValue("fullName")}</div>
    },
    {
        accessorKey: "message",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Message
                    <ChevronDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("message")}</div>
    },
    {
      accessorKey: "dueDate",
        header: ({column}) => {
            return (
            <Button
                variant="ghost"
            >
                Due Date
            </Button>
            )
        },
        cell: ({row}) => (
            <div className="uppercase">
                {format(row.getValue("dueDate"), "dd/MM/yyyy")}
            </div>
        )
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const feedback = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const {deleteFeedback} = useFeedbackStore();

            const handleDelete = (id: string) => {
                deleteFeedback(id).then(
                    () => {
                        toast.success("Fikrlar muvaffaqiyatli o'chirildi");
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
                        <Link href={`/dashboard/feedbacks/${feedback.id}`}>
                            <DropdownMenuItem >
                                Fikrlarni tahqirlash
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            onClick={() => handleDelete(feedback.id)}
                            className={"!text-red-500"}
                        >
                            Fikrni o&apos;chirish
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }
]