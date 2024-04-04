import {Skeleton} from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className={"flex items-center justify-center gap-2 border rounded-lg p-2"}>
      <div
        className={"rounded-full min-h-12 min-w-12 bg-emerald-500 text-white font-bold flex items-center justify-center"}>
        <Skeleton className={"rounded-full w-10 h-10"}/>
      </div>
      <div className={"grow gap-y-2 flex flex-col"}>
        <Skeleton className={"h-4 w-44"} />
        <Skeleton className={"h-3 w-36"} />
      </div>
    </div>
  )
}

export default ProfileSkeleton;