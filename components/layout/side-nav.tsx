import Link from 'next/link';
import {PowerIcon} from "lucide-react";
import NavLinks from "@/components/layout/nav-links";
// import NavLinks from '@/app/ui/dashboard/nav-links';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-fit text-white md:w-40 md:text-5xl text-sm">
          Logo
        </div>
      </Link>
      <div className="flex grow flex-col justify-between space-x-2 md:space-x-0 md:space-y-2">
        <div className={"flex flex-col gap-y-2"}>
          <NavLinks />
        </div>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
        //   action={async () => {
        //   'use server';
        //   await signOut();
        // }}
        >
          <button
            className="flex md:h-[48px] h-fit md:w-full w-fit grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6"/>
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
