import {Users2} from "lucide-react";
import {MdWork} from "react-icons/md";
import {VscFeedback} from "react-icons/vsc";
import {TbBasketSearch} from "react-icons/tb";

const DashboardPage = () => {
  return (
    <div className={"rounded-xl border-[1px]"}>
      <div className={"flex flex-col p-4"}>
        <h1 className={`mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className={"grid grid-cols-4 gap-x-8"}>
          <div className="w-full rounded-[25px] bg-white p-8 aspect drop-shadow">
            <Users2 className="h-8 w-8"/>
            <div className="my-2">
              <h2 className="text-4xl font-bold"><span>2680</span> +</h2>
            </div>
            <div>
              <p className="mt-2 font-sans text-base font-medium text-gray-500">Foydalanuvchilar</p>
            </div>
          </div>
          <div className="w-full rounded-[25px] bg-white p-8 aspect drop-shadow">
            <MdWork className="h-8 w-8"/>
            <div className="my-2">
              <h2 className="text-4xl font-bold"><span>2680</span> +</h2>
            </div>
            <div>
              <p className="mt-2 font-sans text-base font-medium text-gray-500">Ishlar</p>
            </div>
          </div>
          <div className="w-full rounded-[25px] bg-white p-8 aspect drop-shadow">
            <TbBasketSearch className="h-8 w-8"/>
            <div className="my-2">
              <h2 className="text-4xl font-bold"><span>2680</span> +</h2>
            </div>
            <div>
              <p className="mt-2 font-sans text-base font-medium text-gray-500">Ish turlari</p>
            </div>
          </div>
          <div className="w-full rounded-[25px] bg-white p-8 aspect drop-shadow">
            <VscFeedback className="h-8 w-8"/>
            <div className="my-2">
              <h2 className="text-4xl font-bold"><span>2680</span> +</h2>
            </div>
            <div>
              <p className="mt-2 font-sans text-base font-medium text-gray-500">Fikr Mulohazalar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;