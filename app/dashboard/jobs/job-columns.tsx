import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { Job } from "@/types";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function handleView(id: string) {
  console.log("Viewing job with ID:", id);
}

function handleEdit(id: string) {}

function handleDelete(id: string) {}

export const jobColumns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "salary",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Salary
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="uppercase">
        {formatNumber(row.getValue("salary"))} UZS
      </div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="text-center">Phone number</div>,
    cell: ({ row }) => {
      const phoneNumber = parseFloat(row.getValue("phoneNumber"));

      // Format the amount as a dollar amount

      return <div className="text-center font-medium">+{phoneNumber}</div>;
    },
  },
  {
    accessorKey: "gender",
    header: () => <div className="text-end">Gender</div>,
    cell: ({ row }) => (
      <div className="capitalize text-end">{row.getValue("gender")}</div>
    ),
  },
  {
    accessorKey: "isTop",
    header: ({ column }) => {
      return (
        <Button
          className="flex justify-center w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Top
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize flex justify-center w-full">
        {row.getValue("isTop") ? (
          <Badge variant={"default"}>Top</Badge>
        ) : (
          <Badge variant={"destructive"}>Not Top</Badge>
        )}
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const job = row.original;

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
            <Link href={`/dashboard/jobs/${job.id}`}>
              <DropdownMenuItem onClick={() => handleView(job.id)}>
                View Job
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => handleEdit(job.id)}>
              Edit Job
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(job.id)}
              className={"!text-red-500"}
            >
              Delete Job
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
