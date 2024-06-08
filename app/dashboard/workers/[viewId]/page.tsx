"use client";

import {Badge} from "@/components/ui/badge";
import React, {useEffect} from "react";
import useWorkerStore from "@/lib/store/worker-store";
import {format} from "date-fns";
import {SkeletonDetail} from "@/components/skeletons/SkeletonDetail";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {formatNumber} from "@/lib/utils";

interface SocialButtonProps {
  link: string
  title: string
}

function SocialButtonTg({link, title}: SocialButtonProps) {
  return <Button
    className="sm:w-fit w-full text-blue-400 bg-white px-5 py-1 border-blue-400 hover:bg-blue-400 border-2 border-solid rounded-md hover:text-white"
  >
    <Link href={link} className={"flex flex-row gap-x-2.5"}>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1533_19346)">
          <path
            d="M24.5 12C24.5 14.3734 23.7962 16.6935 22.4776 18.6668C21.1591 20.6402 19.2849 22.1783 17.0922 23.0866C14.8995 23.9948 12.4867 24.2324 10.1589 23.7694C7.83115 23.3064 5.69295 22.1635 4.01472 20.4853C2.33649 18.8071 1.1936 16.6689 0.730582 14.3411C0.267559 12.0133 0.505199 9.60051 1.41345 7.4078C2.3217 5.21509 3.85977 3.34094 5.83316 2.02237C7.80655 0.703788 10.1266 4.74592e-07 12.5 4.74592e-07C14.076 -0.000442805 15.6366 0.309644 17.0927 0.912543C18.5488 1.51544 19.8719 2.39934 20.9863 3.51373C22.1007 4.62812 22.9846 5.95117 23.5875 7.40728C24.1904 8.86338 24.5004 10.424 24.5 12Z"
            fill="url(#paint0_linear_1533_19346)"
          />
          <path
            d="M10.2991 17.5004C9.90922 17.5004 9.97911 17.3506 9.83909 16.9804L8.69922 13.2207L15.7792 8.80078L16.6092 9.0208L15.9192 10.9005L10.2991 17.5004Z"
            fill="#C8DAEA"
          />
          <path
            d="M10.3008 17.4992C10.4168 17.4969 10.5309 17.4687 10.6347 17.4168C10.7385 17.3649 10.8294 17.2906 10.9008 17.1991C11.1609 16.9492 14.5007 13.6993 14.5007 13.6993L12.4509 13.1992L10.5509 14.3991L10.3008 17.3992V17.4992Z"
            fill="#A9C9DD"
          />
          <path
            d="M10.4999 14.4419L15.339 18.0119C15.8889 18.3119 16.2889 18.1618 16.429 17.5019L18.3995 8.22198C18.5995 7.41202 18.0896 7.05198 17.5594 7.29201L5.99996 11.752C5.21 12.072 5.21988 12.512 5.85994 12.7019L8.82988 13.6319L15.7004 9.30185C16.0205 9.10182 16.3205 9.21196 16.0805 9.43174L10.4999 14.4419Z"
            fill="url(#paint1_linear_1533_19346)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_1533_19346"
            x1="-67.828"
            y1="53.496"
            x2="-68.836"
            y2="51.144"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#37AEE2"/>
            <stop offset="1" stopColor="#1E96C8"/>
          </linearGradient>
          <linearGradient
            id="paint1_linear_1533_19346"
            x1="13.3931"
            y1="11.8249"
            x2="15.2753"
            y2="7.55645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EFF7FC"/>
            <stop offset="1" stopColor="white"/>
          </linearGradient>
          <clipPath id="clip0_1533_19346">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </svg>
      <span>{title}</span>
    </Link>
  </Button>;
}

function SocialButtonIn({link, title}: SocialButtonProps) {
  return <Button
    className="sm:w-fit w-full text-red-400 bg-white flex flex-row gap-x-2.5 px-5 py-1 border-red-400 hover:bg-red-400 border-2 border-solid rounded-md hover:text-white"
  >
    <Link href={link} className={"flex flex-row gap-x-2.5"}>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1533_19353)">
          <path
            d="M6.58588 23.9151C5.65758 23.9047 4.73801 23.7344 3.86753 23.4118C3.23187 23.1768 2.65676 22.8027 2.18424 22.3169C1.69712 21.8454 1.32251 21.2701 1.08824 20.6339C0.765824 19.7634 0.595808 18.8439 0.585647 17.9158C0.514353 16.3727 0.5 15.9099 0.5 12C0.5 8.09012 0.515765 7.62894 0.584941 6.08471C0.596335 5.15689 0.76656 4.23788 1.08824 3.36753C1.32365 2.73176 1.69773 2.15642 2.18329 1.68329C2.65523 1.19662 3.23061 0.822358 3.86682 0.588235C4.7373 0.265557 5.65687 0.0953008 6.58518 0.0849412C8.12871 0.0143529 8.59224 0 12.5 0C16.4078 0 16.8711 0.0157647 18.4153 0.0849412C19.3433 0.0962542 20.2626 0.266481 21.1332 0.588235C21.7691 0.822667 22.3443 1.1968 22.8165 1.68306C23.3029 2.15535 23.6772 2.73073 23.9118 3.36682C24.2345 4.23729 24.4049 5.15686 24.4153 6.08518C24.4859 7.62941 24.5002 8.09176 24.5002 12.0005C24.5002 15.9092 24.4859 16.3715 24.4153 17.9158C24.4041 18.8439 24.2338 19.7633 23.9118 20.6339C23.6682 21.2652 23.2951 21.8386 22.8166 22.317C22.338 22.7954 21.7646 23.1683 21.1332 23.4118C20.2627 23.7345 19.3431 23.9049 18.4148 23.9153C16.872 23.9859 16.4082 24.0002 12.4995 24.0002C8.59082 24.0002 8.12847 23.9866 6.58565 23.9153"
            fill="url(#paint0_radial_1533_19353)"
          />
          <path
            d="M6.58588 23.9151C5.65758 23.9047 4.73801 23.7344 3.86753 23.4118C3.23187 23.1768 2.65676 22.8027 2.18424 22.3169C1.69712 21.8454 1.32251 21.2701 1.08824 20.6339C0.765824 19.7634 0.595808 18.8439 0.585647 17.9158C0.514353 16.3727 0.5 15.9099 0.5 12C0.5 8.09012 0.515765 7.62894 0.584941 6.08471C0.596335 5.15689 0.76656 4.23788 1.08824 3.36753C1.32365 2.73176 1.69773 2.15642 2.18329 1.68329C2.65523 1.19662 3.23061 0.822358 3.86682 0.588235C4.7373 0.265557 5.65687 0.0953008 6.58518 0.0849412C8.12871 0.0143529 8.59224 0 12.5 0C16.4078 0 16.8711 0.0157647 18.4153 0.0849412C19.3433 0.0962542 20.2626 0.266481 21.1332 0.588235C21.7691 0.822667 22.3443 1.1968 22.8165 1.68306C23.3029 2.15535 23.6772 2.73073 23.9118 3.36682C24.2345 4.23729 24.4049 5.15686 24.4153 6.08518C24.4859 7.62941 24.5002 8.09176 24.5002 12.0005C24.5002 15.9092 24.4859 16.3715 24.4153 17.9158C24.4041 18.8439 24.2338 19.7633 23.9118 20.6339C23.6682 21.2652 23.2951 21.8386 22.8166 22.317C22.338 22.7954 21.7646 23.1683 21.1332 23.4118C20.2627 23.7345 19.3431 23.9049 18.4148 23.9153C16.872 23.9859 16.4082 24.0002 12.4995 24.0002C8.59082 24.0002 8.12847 23.9866 6.58565 23.9153"
            fill="url(#paint1_radial_1533_19353)"
          />
          <path
            d="M9.55385 12.0522C9.55389 11.4644 9.72825 10.8898 10.0549 10.4011C10.3815 9.91239 10.8457 9.53149 11.3888 9.3066C11.9319 9.0817 12.5295 9.02291 13.106 9.13765C13.6825 9.25239 14.212 9.53551 14.6276 9.95121C15.0432 10.3669 15.3262 10.8965 15.4408 11.4731C15.5554 12.0496 15.4965 12.6472 15.2715 13.1902C15.0464 13.7332 14.6654 14.1974 14.1766 14.5239C13.6878 14.8504 13.1132 15.0246 12.5254 15.0245C11.7372 15.0244 10.9813 14.7111 10.4241 14.1538C9.86681 13.5964 9.55379 12.8404 9.55385 12.0522ZM7.94702 12.0522C7.94702 12.9578 8.21554 13.8429 8.71861 14.5958C9.22169 15.3488 9.93673 15.9356 10.7733 16.2821C11.6099 16.6286 12.5305 16.7193 13.4186 16.5426C14.3067 16.366 15.1225 15.9299 15.7628 15.2896C16.4031 14.6493 16.8391 13.8336 17.0158 12.9454C17.1924 12.0573 17.1017 11.1368 16.7552 10.3002C16.4087 9.4636 15.8219 8.74856 15.069 8.24548C14.3161 7.74241 13.4309 7.47389 12.5254 7.47389C11.9241 7.47386 11.3288 7.59226 10.7733 7.82234C10.2178 8.05241 9.71307 8.38965 9.28792 8.81479C8.86278 9.23994 8.52554 9.74466 8.29547 10.3001C8.06539 10.8556 7.94699 11.451 7.94702 12.0522ZM16.215 7.29248C16.2149 7.50408 16.2776 7.71096 16.3951 7.88696C16.5126 8.06295 16.6796 8.20015 16.875 8.28121C17.0705 8.36228 17.2856 8.38356 17.4932 8.34237C17.7007 8.30118 17.8914 8.19936 18.0411 8.0498C18.1908 7.90024 18.2928 7.70966 18.3341 7.50214C18.3755 7.29462 18.3544 7.07949 18.2735 6.88396C18.1926 6.68843 18.0556 6.52128 17.8797 6.40364C17.7038 6.28601 17.497 6.22317 17.2854 6.22307C17.0017 6.2232 16.7298 6.33589 16.5292 6.53641C16.3286 6.73692 16.2157 7.00885 16.2155 7.29248M8.92373 19.3099C8.35835 19.3037 7.79824 19.2002 7.26796 19.004C6.88339 18.8558 6.53412 18.6287 6.24263 18.3373C5.95113 18.0459 5.72388 17.6968 5.57549 17.3122C5.3792 16.782 5.27573 16.2219 5.26961 15.6565C5.22632 14.7167 5.21785 14.4344 5.21785 12.0534C5.21785 9.67248 5.22726 9.39084 5.26961 8.45013C5.27647 7.88481 5.37992 7.32482 5.57549 6.79436C5.72371 6.40967 5.95089 6.06031 6.2424 5.76881C6.53391 5.4773 6.88327 5.25011 7.26796 5.10189C7.79822 4.90561 8.35834 4.80214 8.92373 4.79601C9.86349 4.75272 10.1458 4.74425 12.5258 4.74425C14.9058 4.74425 15.1884 4.75343 16.1291 4.79625C16.6945 4.80311 17.2544 4.90656 17.7849 5.10213C18.1696 5.25036 18.5189 5.47755 18.8104 5.76906C19.102 6.06056 19.3291 6.40992 19.4774 6.7946C19.6737 7.32486 19.7771 7.88498 19.7833 8.45037C19.8265 9.39154 19.835 9.67248 19.835 12.0537C19.835 14.4348 19.8263 14.7162 19.7833 15.657C19.7767 16.2223 19.6732 16.7823 19.4774 17.3127C19.329 17.6972 19.1017 18.0464 18.8102 18.3378C18.5187 18.6291 18.1695 18.8563 17.7849 19.0045C17.2546 19.2008 16.6945 19.3042 16.1291 19.3104C15.1894 19.3537 14.907 19.3621 12.5258 19.3621C10.1447 19.3621 9.86326 19.3534 8.92373 19.3104M8.84985 3.1906C8.11004 3.20515 7.37807 3.34517 6.68514 3.60471C6.09279 3.83374 5.55483 4.18403 5.10576 4.6331C4.65668 5.08217 4.3064 5.62013 4.07737 6.21248C3.81786 6.90543 3.67784 7.63739 3.66326 8.37719C3.61926 9.32778 3.60938 9.63177 3.60938 12.0532C3.60938 14.4746 3.61949 14.7784 3.66326 15.7292C3.67784 16.469 3.81786 17.2009 4.07737 17.8939C4.30641 18.4862 4.6567 19.0242 5.10577 19.4733C5.55484 19.9223 6.09279 20.2726 6.68514 20.5017C7.37811 20.7611 8.11006 20.9011 8.84985 20.9158C9.80091 20.9591 10.1044 20.9697 12.5258 20.9697C14.9473 20.9697 15.251 20.9595 16.2018 20.9158C16.9416 20.9012 17.6736 20.7611 18.3665 20.5017C18.9589 20.2726 19.4968 19.9223 19.9459 19.4733C20.395 19.0242 20.7453 18.4862 20.9743 17.8939C21.2342 17.201 21.3742 16.469 21.3884 15.7292C21.4317 14.7779 21.4416 14.4746 21.4416 12.0532C21.4416 9.63177 21.4315 9.32801 21.3884 8.37719C21.3739 7.63739 21.2339 6.90542 20.9743 6.21248C20.7453 5.62024 20.3951 5.08237 19.9462 4.63331C19.4972 4.18425 18.9594 3.8339 18.3673 3.60471C17.6744 3.345 16.9424 3.20497 16.2026 3.1906C15.2517 3.14707 14.948 3.13672 12.527 3.13672C10.1061 3.13672 9.80161 3.14684 8.85031 3.1906"
            fill="white"
          />
        </g>
        <defs>
          <radialGradient
            id="paint0_radial_1533_19353"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(2.05318 23.4744) scale(30.4711)"
          >
            <stop offset="0.09" stopColor="#FA8F21"/>
            <stop offset="0.78" stopColor="#D82D7E"/>
          </radialGradient>
          <radialGradient
            id="paint1_radial_1533_19353"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(17.124 22.7035) scale(26.8148)"
          >
            <stop
              offset="0.64"
              stopColor="#8C3AAA"
              stopOpacity="0"
            />
            <stop offset="1" stopColor="#8C3AAA"/>
          </radialGradient>
          <clipPath id="clip0_1533_19353">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </svg>
      <span>{title}</span>
    </Link>
  </Button>;
}

const ViewId = ({params}: { params: { viewId: string } }) => {
  const {worker, getWorkerById, loading} = useWorkerStore();

  useEffect(() => {
    getWorkerById(params.viewId).then();
  }, [getWorkerById, params.viewId]);

  if (!worker) {
    return (
      <div className="flex flex-col gap-y-8">
          <div
            className="grid lg:grid-cols-2 grid-cols-1 justify-center lg:gap-x-4 gap-x-0 lg:gap-y-0 gap-y-4 container">
            <SkeletonDetail/>
          </div>
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-y-8">
        <div
          className="grid lg:grid-cols-2 grid-cols-1 justify-center lg:gap-x-4 gap-x-0 lg:gap-y-0 gap-y-4 container">
          <div
            className="flex flex-col gap-y-6 bg-white p-12 lg:col-span-2 col-span-1 justify-start rounded-xl">
            <div className="flex flex-row gap-x-6 items-center">
              <Avatar>
                <AvatarImage
                  src="/src/assets/worker.svg"
                  alt={worker?.fullName}
                />
                <AvatarFallback>{worker?.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="font-bold text-xl">
                {worker?.fullName}
              </h1>
            </div>
            <div className="flex flex-row gap-x-5 items-center">
              <div className="flex flex-col items-center gap-y-0.5">
                <span className="text-sm">Ish turi</span>
                <Badge variant={"secondary"} className="font-semibold">
                  {worker?.categoryName}
                </Badge>
              </div>
              <div className="h-fit w-[3px]"/>
              <div className="flex flex-col items-center gap-y-0.5">
                <span className="text-sm">Jins</span>
                <Badge variant={"secondary"} className="font-semibold">
                  {
                    worker.gender === "Male" ? "Erkak" : worker.gender === "Female" ? "Ayol" : "Unknown"
                  }
                </Badge>
              </div>
            </div>
            <div className="flex flex-col pt-3 gap-y-3">
              <h2 className="font-bold text-2xl">
                Ish haqida to&apos;liq malumotlar
              </h2>
              <div className="flex flex-col gap-y-1">
                <span className="font-normal text-base text-gray-400">
                  F.I.SH
                </span>
                <span className="font-semibold text-lg">
                  {worker?.fullName}
                </span>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="font-normal text-base text-gray-400">
                  Tug&apos;ilgan sana
                </span>
                <span className="text-darkindigo font-semibold text-lg">
                  {format(worker?.birthDate || new Date(), "dd.MM.yyyy")}-yil
                </span>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="font-normal text-base text-gray-400">
                  Maosh
                </span>
                <span className="text-darkindigo font-semibold text-lg">
                  {formatNumber(worker?.salary)} so&apos;m/oy
                </span>
              </div>
              <div className="flex flex-col gap-y-1">
                  <span className="font-normal text-base text-gray-400">
                    Ish vaqti
                  </span>
                <span className="text-darkindigo font-semibold text-lg">
                    {worker?.workingTime}
                  </span>
              </div>
              <div className="flex flex-col gap-y-1">
                  <span className="font-normal text-base text-gray-400">
                    Ish grafigi
                  </span>
                <span className="text-darkindigo font-semibold text-lg">
                    {worker?.workingSchedule}
                  </span>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="font-normal text-base text-gray-400">
                  E&apos;lon berilgan sana
                </span>
                <span className="text-darkindigo font-semibold text-lg">
                  {format(worker?.createDate || new Date(), "dd.MM.yyyy")}-yil
                </span>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="font-normal text-base text-gray-400">
                  Manzil
                </span>
                <span className="text-darkindigo font-semibold text-lg">
                  {worker?.regionName}, {worker?.districtName}
                </span>
              </div>
              {
                (worker?.telegramLink || worker?.instagramLink) && (
                  <div className="flex flex-col gap-y-1">
                    <span className="font-normal text-base text-gray-400">
                      Ijtimoiy tarmoqlardan ko&apos;rish
                    </span>
                    <div className="flex sm:flex-row flex-col sm:gap-x-16 gap-x-0 sm:gap-y-0 gap-y-2">
                      {worker?.telegramLink && (<SocialButtonTg link={worker.telegramLink} title={'Telegram'}/>)}
                      {worker?.instagramLink && (<SocialButtonIn link={worker.instagramLink} title={'Instagram'}/>)}
                    </div>
                  </div>
                )
              }
              <div className="flex flex-col gap-y-1">
                <span className="font-normal text-base text-gray-400">
                  Aloqaga chiqish
                </span>
                <div className="flex sm:flex-row flex-col sm:gap-x-16 gap-x-0 sm:gap-y-0 gap-y-4">
                  <Button
                    className="sm:w-fit w-full text-blue-400 bg-white px-5 py-1 border-blue-400 hover:bg-blue-400 border-2 border-solid rounded-md hover:text-white"
                  >
                    <Link href={`https://t.me/${worker?.tgUserName}`} className={"flex flex-row gap-x-2.5"}>
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1533_19346)">
                          <path
                            d="M24.5 12C24.5 14.3734 23.7962 16.6935 22.4776 18.6668C21.1591 20.6402 19.2849 22.1783 17.0922 23.0866C14.8995 23.9948 12.4867 24.2324 10.1589 23.7694C7.83115 23.3064 5.69295 22.1635 4.01472 20.4853C2.33649 18.8071 1.1936 16.6689 0.730582 14.3411C0.267559 12.0133 0.505199 9.60051 1.41345 7.4078C2.3217 5.21509 3.85977 3.34094 5.83316 2.02237C7.80655 0.703788 10.1266 4.74592e-07 12.5 4.74592e-07C14.076 -0.000442805 15.6366 0.309644 17.0927 0.912543C18.5488 1.51544 19.8719 2.39934 20.9863 3.51373C22.1007 4.62812 22.9846 5.95117 23.5875 7.40728C24.1904 8.86338 24.5004 10.424 24.5 12Z"
                            fill="url(#paint0_linear_1533_19346)"
                          />
                          <path
                            d="M10.2991 17.5004C9.90922 17.5004 9.97911 17.3506 9.83909 16.9804L8.69922 13.2207L15.7792 8.80078L16.6092 9.0208L15.9192 10.9005L10.2991 17.5004Z"
                            fill="#C8DAEA"
                          />
                          <path
                            d="M10.3008 17.4992C10.4168 17.4969 10.5309 17.4687 10.6347 17.4168C10.7385 17.3649 10.8294 17.2906 10.9008 17.1991C11.1609 16.9492 14.5007 13.6993 14.5007 13.6993L12.4509 13.1992L10.5509 14.3991L10.3008 17.3992V17.4992Z"
                            fill="#A9C9DD"
                          />
                          <path
                            d="M10.4999 14.4419L15.339 18.0119C15.8889 18.3119 16.2889 18.1618 16.429 17.5019L18.3995 8.22198C18.5995 7.41202 18.0896 7.05198 17.5594 7.29201L5.99996 11.752C5.21 12.072 5.21988 12.512 5.85994 12.7019L8.82988 13.6319L15.7004 9.30185C16.0205 9.10182 16.3205 9.21196 16.0805 9.43174L10.4999 14.4419Z"
                            fill="url(#paint1_linear_1533_19346)"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_1533_19346"
                            x1="-67.828"
                            y1="53.496"
                            x2="-68.836"
                            y2="51.144"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#37AEE2"/>
                            <stop offset="1" stopColor="#1E96C8"/>
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_1533_19346"
                            x1="13.3931"
                            y1="11.8249"
                            x2="15.2753"
                            y2="7.55645"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#EFF7FC"/>
                            <stop offset="1" stopColor="white"/>
                          </linearGradient>
                          <clipPath id="clip0_1533_19346">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      By Telegram
                    </Link>
                  </Button>
                  <Button
                    className="sm:w-fit w-full text-green-400 bg-white px-5 py-1 border-green-400 hover:bg-green-400 border-2 border-solid rounded-md hover:text-white"
                  >
                    <Link href={`tel:${worker?.phoneNumber}`} className={'flex flex-row gap-x-2.5'}>
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.55452 7.17005C2.32798 3.42512 4.70786 1.33933 8.42005 0.709226C11.1642 0.243534 13.9094 0.237636 16.649 0.722303C20.4712 1.39846 22.769 3.60589 23.501 7.40743C24.0665 10.3454 24.0754 13.3147 23.4921 16.2498C22.7096 19.9688 20.2683 22.2645 16.5698 22.8923C13.8257 23.3579 11.0805 23.3638 8.3409 22.8792C4.51867 22.203 2.21069 19.8853 1.47874 16.0838C0.884356 13.1265 0.941548 10.1385 1.55452 7.17V7.17005Z"
                          fill="#0BCD74"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.35275 9.89352L9.31964 9.53644C9.31964 9.53644 10.0649 11.0282 11.5363 12.5059C13.0077 13.9836 14.6365 14.7853 14.6365 14.7853L14.2192 15.7661C14.2192 15.7661 12.3848 14.6998 10.8684 13.1768C9.35181 11.6538 8.35275 9.89352 8.35275 9.89352ZM19.1654 14.5127C19.8203 14.8397 19.9627 15.7155 19.4455 16.2349L17.2289 18.461C17.0677 18.623 16.8706 18.7444 16.6538 18.8153C16.437 18.8862 16.2065 18.9046 15.9812 18.869C15.83 18.8449 15.6793 18.8176 15.5292 18.7871C14.1759 18.6025 11.5137 17.9104 8.95469 15.3404C6.25341 12.6276 5.48316 9.5885 5.26568 8.20429C5.23017 7.97807 5.24845 7.74663 5.31903 7.52887C5.38961 7.3111 5.51049 7.11319 5.67179 6.95132L7.88858 4.72511C8.4057 4.20573 9.27777 4.3488 9.6034 5.0065L11.3142 8.46188L10.4592 8.88593L8.8735 5.6605C8.78138 5.47316 8.53331 5.43209 8.38619 5.57983L6.57108 7.40265C6.47736 7.49678 6.40406 7.60936 6.35579 7.73333C6.30751 7.8573 6.28531 7.98995 6.29059 8.12296C6.32153 8.91157 6.55392 10.4271 7.68733 12.2543C8.15293 12.9518 8.75763 13.7041 9.54345 14.4933C12.2618 17.2233 14.7241 17.7515 15.907 17.8311C16.0682 17.8278 16.1949 17.8162 16.2834 17.8049C16.4004 17.79 16.5142 17.7534 16.614 17.6904C16.6738 17.6526 16.7293 17.6082 16.7794 17.558L18.5945 15.7351C18.7417 15.5874 18.7007 15.3382 18.5142 15.2457L15.3024 13.6532L15.7246 12.7944L19.1654 14.5127Z"
                          fill="white"
                        />
                      </svg>
                      By Phone
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
};

export default ViewId;