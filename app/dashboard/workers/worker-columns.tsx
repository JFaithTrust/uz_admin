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
import { Worker } from "@/types";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import useWorkerStore from "@/lib/store/worker-store";
import {toast} from "sonner";


export const workerColumns: ColumnDef<Worker>[] = [
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
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="flex justify-center w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize flex justify-center w-full">
        {row.getValue("status") ? (
          <Badge variant={"success"}>Active</Badge>
        ) : (
          <Badge variant={"warning"}>Inactive</Badge>
        )}
      </div>
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
          <Badge variant={"success"}>Top</Badge>
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
      const worker = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {deleteWorker, updateWorkerStatus} = useWorkerStore();

      const handleDelete = (id: string) => {
        deleteWorker(id).then(
          () => {
            toast.success("Worker successfully deleted");
          }
        ).catch(
          (error) => {
            toast.error("System error occurred. Please try again later.");
          }
        );
      }

      const handleChangeStatus = (id: string, status: boolean) => {
        updateWorkerStatus(id, !status).then(
          () => {
            toast.success("Worker status successfully updated");
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
            <Link href={`/dashboard/workers/${worker.id}`}>
              <DropdownMenuItem>
                View
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/workers/edit-worker/${worker.id}`}>
              <DropdownMenuItem>
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => handleChangeStatus(worker.id, worker.status)}
              className={"!text-orange-500"}
            >
              {worker.status === true ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(worker.id)}
              className={"!text-red-500"}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];