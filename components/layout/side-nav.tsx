import { PowerIcon } from "lucide-react";
import NavLinks from "@/components/layout/nav-links";
import { Button } from "@/components/ui/button";
import useUserStore from "@/lib/store/user-store";
import { getInitials } from "@/lib/utils";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { useEffect, useState } from "react";

const Profile = (props: {
  fullName: string;
  user: { firstName: string; lastName: string; email: string };
}) => {
  return (
    <div
      className={"flex items-center justify-center gap-2 border rounded-lg p-2"}
    >
      <div
        className={
          "rounded-full min-h-12 min-w-12 bg-emerald-500 text-white font-bold flex items-center justify-center"
        }
      >
        <p>{getInitials(props.fullName)}</p>
      </div>
      <div className={"grow"}>
        <p className={"font-bold"}>{props.fullName}</p>
        <p className={"text-xs text-neutral-500"}>{props.user?.email}</p>
      </div>
    </div>
  );
};

export default function SideNav() {
  const { user, logout } = useUserStore();
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col h-full p-4 w-[300px] gap-y-2">
      {user && isClient ? (
        <Profile fullName={fullName} user={user} />
      ) : (
        <ProfileSkeleton />
      )}
      <div className={"grow"}>
        <NavLinks />
      </div>
      <Button
        variant={"destructive"}
        className={"flex w-full items-center"}
        size={"sm"}
        onClick={logout}
      >
        <PowerIcon className="w-5" />
        <div className="hidden md:block">Sign Out</div>
      </Button>
    </div>
  );
}
