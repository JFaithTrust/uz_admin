import SideNav from "@/components/layout/side-nav";
import React from "react";

export default  function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen md:overflow-hidden">
          <SideNav />
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}