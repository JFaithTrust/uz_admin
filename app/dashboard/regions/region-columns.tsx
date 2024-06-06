import {ColumnDef} from "@tanstack/react-table";
import {Region} from "@/types";
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
import useRegionStore from "@/lib/store/region-store";

export const regionColumns: ColumnDef<Region>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({row}) => <div className="lowercase">{row.getValue("name")}</div>
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const region = row.original;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {deleteRegion} = useRegionStore();

        const handleDelete = (id: string) => {
          deleteRegion(id).then(
            () => {
              toast.success("Region successfully deleted");
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
              <Link href={`/dashboard/regions/${region.id}`}>
                <DropdownMenuItem >
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => handleDelete(region.id)}
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