"use client"
import Image from "next/image";
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AppsIcon from '@mui/icons-material/Apps';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { usePathname } from "next/navigation";

const NavBar = () => {
    const pathName = usePathname();

    const links = [
        {
            path: '/',
            icon: <HomeIcon className="tw-w-[22px] tw-h-[22px] " style={{color: `${pathName == "/" ? "#0866FF" : "#65676B"}`}} />
        },
        {
            path: '/watch',
            icon: <LiveTvIcon className="tw-w-[22px] tw-h-[22px] tw-text-[#65676B]" style={{color: `${pathName == "/watch" ? "#0866FF" : "#65676B"}`}} />
        },
        {
            path: '/marketplace',
            icon: <StorefrontIcon className="tw-w-[22px] tw-h-[22px] tw-text-[#65676B]" style={{color: `${pathName == "/marketplace" ? "#0866FF" : "#65676B"}`}} />
        },
        {
            path: '/groups',
            icon: <GroupsIcon className="tw-w-[22px] tw-h-[22px] tw-text-[#65676B]" style={{color: `${pathName == "/groups" ? "#0866FF" : "#65676B"}`}}/>
        },
        {
            path: '/gaming',
            icon: <SportsEsportsIcon className="tw-w-[22px] tw-h-[22px] tw-text-[#65676B]" style={{color: `${pathName == "/gaming" ? "#0866FF" : "#65676B"}`}} />
        }
    ];

    return (
        <nav className="tw-fixed tw-top-0 tw-w-full tw-px-[16px] tw-bg-white tw-py-[6px] tw-shadow-md tw-z-[1000]">
            <div className="tw-flex tw-justify-between">
                <div className="tw-flex tw-gap-[8px] tw-items-centerr">
                    <Image src="/images/fb_logo.png"
                        width={40} height={40} alt="facePalm logo" className=" tw-object-cover" unoptimized/>
                    <form>
                        <div className="tw-flex tw-items-center tw-rounded-[1000px] tw-bg-[#F0F2F5] tw-pl-2">
                            <SearchIcon className="tw-w-[16px] tw-h-[16px]" />
                            <input type="text" className="tw-max-w-[212px] tw-w-full tw-px-[8px] tw-pt-[7px] tw-pb-[9px] tw-bg-[#F0F2F5] tw-rounded-[1000px] tw-outline-none"
                                placeholder="Search facePalm" />
                        </div>
                    </form>
                </div>

                <div className="tw-flex tw-items-center">
                    {
                        links.map((e, idx) => {
                            return (
                                <Link passHref href={e.path} className="tw-flex tw-justify-center tw-w-[111.59px] tw-h-full tw-items-center hover:tw-rounded-md hover:tw-bg-gray-200 tw-transition-all" key={idx}>
                                    {e.icon}
                                </Link>
                            )
                        })
                    }
                </div>

                <div className="tw-flex tw-items-center tw-gap-2">
                    <div className="tw-rounded-[1000px] tw-bg-[#F0F2F5] tw-p-2 tw-cursor-pointer hover:tw-bg-gray-200 active:tw-scale-[.9] tw-overflow-hidden tw-transition-all">
                        <AppsIcon className="tw-w-[20px] tw-h-[20px]" />
                    </div>

                    <div className="tw-rounded-[50%] tw-bg-[#F0F2F5] tw-p-2 tw-cursor-pointer hover:tw-bg-gray-200 active:tw-scale-[.9] tw-overflow-hidden tw-transition-all">
                        <ChatIcon className="tw-w-[20px] tw-h-[20px]" />
                    </div>

                    <div className="tw-rounded-[50%] tw-bg-[#F0F2F5] tw-p-2 tw-cursor-pointer hover:tw-bg-gray-200 active:tw-scale-[.9] tw-overflow-hidden tw-transition-all">
                        <NotificationsIcon className="tw-w-[20px] tw-h-[20px]" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;