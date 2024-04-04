"use client"

import {usePathname} from "next/navigation";
import {AiFillDashboard} from "react-icons/ai";
import {MdWork} from "react-icons/md";
import {GrUserWorker} from "react-icons/gr";
import {FaMapMarkedAlt} from "react-icons/fa";
import {SiOpenstreetmap} from "react-icons/si";
import {VscFeedback} from "react-icons/vsc";
import {MdQuestionAnswer} from "react-icons/md";
import {Command, CommandGroup, CommandItem, CommandList, CommandSeparator} from "@/components/ui/command";
import {clsx} from "clsx";
import {useRouter} from "next/navigation";
import Link from "next/link";
import { TbBasketSearch } from "react-icons/tb";

const linkList = [
  {
    group: 'Main',
    items: [
      {name: 'Dashboard', href: '/dashboard', icon: AiFillDashboard},
      {
        name: 'Ishlar',
        href: '/dashboard/jobs',
        icon: MdWork,
      },
      {
        name: 'Ishchilar',
        href: '/dashboard/workers',
        icon: GrUserWorker,
      },
      {
        name: 'Ish turlari',
        href: '/dashboard/job-types',
        icon: TbBasketSearch,
      },
    ]
  },
  {
    group: 'Hududlar',
    items: [
      {
        name: 'Viloyatlar',
        href: '/dashboard/regions',
        icon: FaMapMarkedAlt,
      },
      {
        name: 'Tumanlar',
        href: '/dashboard/districts',
        icon: SiOpenstreetmap,
      },
    ]
  }, {
    group: 'Foydalanuchi fikrlari',
    items: [
      {
        name: 'Fikrlar',
        href: '/dashboard/feedbacks',
        icon: VscFeedback,
      },
      {
        name: 'FAQ',
        href: '/dashboard/faq',
        icon: MdQuestionAnswer,
      }
    ]
  }
]

export default function NavLinks() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      <Command className="rounded-lg border">
        <CommandList>
          {linkList.map((link, key) => (
            <CommandGroup heading={link.group} key={key}>
              {link.items.map((item, index) => (
                <Link href={item.href} key={index}>
                  <CommandItem className={clsx('bg-white cursor-pointer', {
                    'bg-sky-100 text-blue-600': pathname === item.href
                  })}>
                    <item.icon className="mr-2 h-4 w-4"/>
                    <span>{item.name}</span>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </>
  );
}
