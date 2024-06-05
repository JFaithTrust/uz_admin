'use client'

import SideNav from "@/components/layout/side-nav";
import React from "react";
import {redirect, useRouter} from "next/navigation";
import useUserStore from "@/lib/store/user-store";
import {useLayoutEffect} from "react";
import {Toaster} from "sonner";

export default function Layout({children}: { children: React.ReactNode }) {
    const router = useRouter();
    const {isLoggedIn} = useUserStore();

    useLayoutEffect(() => {
        if (!isLoggedIn) {
            redirect('/login')
        }
    }, [isLoggedIn, router]);

    return (
        <div className="flex h-screen md:overflow-hidden">
            <Toaster richColors/>
            <SideNav/>
            <div className="flex-grow p-4 md:overflow-y-auto">{children}</div>
        </div>
    );
}