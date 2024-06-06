import {ColumnDef} from "@tanstack/react-table";
import {Category} from "@/types";
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
import useJobCategoryStore from "@/lib/store/job-category-store";

export const jobCategoryColumns: ColumnDef<Category>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({row}) => <div className="lowercase">{row.getValue("title")}</div>
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) => <div className="lowercase">{row.getValue("description")}</div>
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {deleteJobCategory} = useJobCategoryStore();

        const handleDelete = (id: string) => {
          deleteJobCategory(id).then(
            () => {
              toast.success("Job category successfully deleted");
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
              <Link href={`/dashboard/job-categories/${category.id}`}>
                <DropdownMenuItem >
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => handleDelete(category.id)}
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