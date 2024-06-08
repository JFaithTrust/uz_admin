import {Skeleton} from "@/components/ui/skeleton"

export function  SkeletonDetail(){
  return (
    <div className="flex flex-col gap-y-6 bg-white p-12 lg:col-span-2 col-span-1 justify-start rounded-xl">
      <div className="flex flex-row gap-x-6 items-center">
        <Skeleton className="h-[48px] w-[48px]"/>
        <Skeleton className="h-4 w-[200px]"/>
      </div>
      <div className="flex flex-row gap-x-5 items-center">
        <div className="flex flex-col items-center gap-y-0.5">
          <Skeleton className="h-4 w-[50px]"/>
          <Skeleton className="h-4 w-[100px]"/>
        </div>
        <div className="bg-lightblue h-fit w-[3px]"/>
        <div className="flex flex-col items-center gap-y-0.5">
          <Skeleton className="h-4 w-[50px]"/>
          <Skeleton className="h-4 w-[100px]"/>
        </div>
      </div>
      <div className="flex flex-col pt-3 gap-y-3">
        <Skeleton className="h-4 w-[300px]"/>
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-[100px]"/>
          <Skeleton className="h-4 w-[150px]"/>
        </div>
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-[100px]"/>
          <Skeleton className="h-4 w-[150px]"/>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-y-1">
            <Skeleton className="h-4 w-[100px]"/>
            <Skeleton className="h-4 w-[100px]"/>
          </div>
          <div className="flex flex-col gap-y-1">
            <Skeleton className="h-4 w-[100px]"/>
            <Skeleton className="h-4 w-[100px]"/>
          </div>
        </div>
        <Skeleton className="h-4 w-[300px]"/>
        <Skeleton className="h-4 w-[200px]"/>
        <Skeleton className="h-4 w-[300px]"/>
        <Skeleton className="h-4 w-[250px]"/>
        <Skeleton className="h-4 w-[200px]"/>
        <Skeleton className="h-4 w-[300px]"/>
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-[100px]"/>
          <Skeleton className="h-4 w-[200px]"/>
        </div>
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-[100px]"/>
          <Skeleton className="h-4 w-[150px]"/>
        </div>
      </div>
    </div>
  )
}