"use client"

import Link from 'next/link'
import {usePathname} from "next/navigation";
import clsx from 'clsx';
import { AiFillDashboard } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { FaMapMarkedAlt } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";
import { MdQuestionAnswer } from "react-icons/md";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: AiFillDashboard },
  {
    name: 'Jobs',
    href: '/dashboard/jobs',
    icon: MdWork,
  },
  {
    name: 'Workers',
    href: '/dashboard/workers',
    icon: GrUserWorker,
  },
  {
    name: 'Regions',
    href: '/dashboard/regions',
    icon: FaMapMarkedAlt,
  },
  {
    name: 'Districts',
    href: '/dashboard/districts',
    icon: SiOpenstreetmap,
  },
  {
    name: 'Feedbacks',
    href: '/dashboard/feedbacks',
    icon: VscFeedback,
  },
  {
    name: 'FAQ',
    href: '/dashboard/faq',
    icon: MdQuestionAnswer,
  }
];

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex md:h-[48px] h-fit items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-5 h-5" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
