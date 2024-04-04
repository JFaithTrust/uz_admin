import {PowerIcon} from "lucide-react";
import NavLinks from "@/components/layout/nav-links";
import {Button} from "@/components/ui/button";

export default function SideNav() {
  return (
    <div className="flex flex-col h-full p-4 w-[300px] gap-y-2">
      <div className={"flex items-center justify-center gap-2 border rounded-lg p-2"}>
        <div className={"rounded-full min-h-12 min-w-12 bg-emerald-500 text-white font-bold flex items-center justify-center"}>
          <p>SJ</p>
        </div>
        <div className={"grow"}>
          <p className={"font-bold"}>Solijoniy Jahongir</p>
          <p className={"text-xs text-neutral-500"}>jahongirsolijoniy@gmail.com</p>
        </div>
      </div>
      <div className={"grow"}>
        <NavLinks/>
      </div>
      <Button variant={"destructive"} className={"flex w-full items-center"} size={"sm"}><PowerIcon className="w-5"/>
        <div className="hidden md:block">Sign Out</div>
      </Button>
    </div>
  );
}