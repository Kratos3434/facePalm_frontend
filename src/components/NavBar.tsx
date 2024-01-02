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
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRef, useState } from 'react';
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { UserProps } from "@/type";
import { useQuery } from "react-query";
import CloseIcon from '@mui/icons-material/Close';

const NavBar = ({ User }: { User?: UserProps }) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const getUser = async () => {
        const token = cookies.token;
        const res = await fetch('http://localhost:8080/user/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await res.json();
        return data.data;
    }

    const { data, status } = useQuery({
        queryKey: ['user'],
        initialData: User,
        queryFn: getUser
    });

    const pathName = usePathname();

    const router = useRouter();

    const links = [
        {
            path: '/',
            icon: <HomeIcon className="tw-w-[22px] tw-h-[22px] " style={{ color: `${pathName == "/" ? "#0866FF" : "#65676B"}` }} />,
            name: "Home"
        },
        {
            path: '/watch',
            icon: <LiveTvIcon className="tw-w-[22px] tw-h-[22px] tw-text-[#65676B]" style={{ color: `${pathName == "/watch" ? "#0866FF" : "#65676B"}` }} />,
            name: "Watch"
        },
        {
            path: '/marketplace',
            icon: <StorefrontIcon className="tw-w-[22px] tw-h-[22px] tw-text-[#65676B]" style={{ color: `${pathName == "/marketplace" ? "#0866FF" : "#65676B"}` }} />,
            name: "Marketplace"
        },
        {
            path: '/groups',
            icon: <GroupsIcon className="tw-w-[22px] tw-h-[22px] tw-text-[#65676B]" style={{ color: `${pathName == "/groups" ? "#0866FF" : "#65676B"}` }} />,
            name: "Groups"
        },
        {
            path: '/gaming',
            icon: <SportsEsportsIcon className="tw-w-[22px] tw-h-[22px] tw-text-[#65676B]" style={{ color: `${pathName == "/gaming" ? "#0866FF" : "#65676B"}` }} />,
            name: "Gaming"
        }
    ];

    const [showModal, setShowModal] = useState(false);

    const [openMenu, isOpenMenu] = useState(false);

    const [sideNavWidth, setSideNavWidth] = useState(0);

    const handleNavClick = () => {
        setShowModal(!showModal);
    }

    const handleLogOut = () => {
        removeCookie("token");
        removeCookie("user");
        router.replace("/login");
    }

    return (
        <nav className="tw-fixed tw-top-0 tw-w-full tw-px-[16px] tw-bg-white tw-pt-[6px] tw-shadow-md tw-z-[1000]">
            <div className="tw-flex tw-justify-between tw-relative tw-h-[52px]">
                <div className="tw-flex tw-gap-[8px] tw-items-centerr tw-absolute tw-left-0">
                    <Image src="/images/fb_logo.png"
                        width={40} height={40} alt="facePalm logo" className=" tw-object-cover" unoptimized />
                    <form>
                        <div className="tw-flex tw-items-center tw-rounded-[1000px] tw-bg-[#F0F2F5] tw-pl-2">
                            <SearchIcon className="tw-w-[16px] tw-h-[16px]" />
                            <input type="text" className="tw-max-w-[212px] tw-w-full tw-px-[8px] tw-pt-[7px] tw-pb-[9px] tw-bg-[#F0F2F5] tw-rounded-[1000px] tw-outline-none"
                                placeholder="Search facePalm" />
                        </div>
                    </form>
                    <div className="tw-flex tw-flex-col tw-justify-center nav-xl:tw-hidden tw-cursor-pointer" onClick={() => {
                        isOpenMenu(true);
                        setSideNavWidth(300);
                    }}>
                        <MenuIcon className="tw-w-[24px] tw-h-[24px]" />
                    </div>
                </div>

                <div className="tw-flex tw-justify-center tw-w-full tw-hh-[52px]">
                    <div className="nav-xl:tw-flex tw-items-center tw-hidden tw-h-full tw-gap-2">
                        {
                            links.map((e, idx) => {
                                return (
                                    <Link passHref href={e.path} className="tw-flex tw-justify-center tw-w-[111.59px] tw-h-full tw-items-center hover:tw-rounded-md hover:tw-bg-gray-200 tw-transition-all tw-border-b-[4px]" key={idx}
                                        style={{ borderColor: `${pathName == e.path ? "#0866FF" : "#fff"}` }} title={e.name}>
                                        {e.icon}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="tw-flex tw-items-center tw-gap-2 tw-absolute tw-right-0">
                    <div className="tw-rounded-[1000px] tw-bg-[#F0F2F5] tw-p-2 tw-cursor-pointer hover:tw-bg-gray-200 active:tw-scale-[.9] tw-overflow-hidden tw-transition-all">
                        <AppsIcon className="tw-w-[20px] tw-h-[20px]" />
                    </div>

                    <div className="tw-rounded-[50%] tw-bg-[#F0F2F5] tw-p-2 tw-cursor-pointer hover:tw-bg-gray-200 active:tw-scale-[.9] tw-overflow-hidden tw-transition-all">
                        <ChatIcon className="tw-w-[20px] tw-h-[20px]" />
                    </div>

                    <div className="tw-rounded-[50%] tw-bg-[#F0F2F5] tw-p-2 tw-cursor-pointer hover:tw-bg-gray-200 active:tw-scale-[.9] tw-overflow-hidden tw-transition-all">
                        <NotificationsIcon className="tw-w-[20px] tw-h-[20px]" />
                    </div>

                    <div className="tw-relative" onClick={handleNavClick}>
                        <Image src={status == "success" && data.profilePicture ? data.profilePicture : "/images/placeholder.png"} width={36} height={40} alt="profile pic" className="tw-rounded-[50%] tw-bg-[#F0F2F5] tw-cursor-pointer hover:tw-bg-gray-200 active:tw-scale-[.9] tw-overflow-hidden tw-transition-all tw-h-[40px]" />
                        <KeyboardArrowDownIcon className="tw-w-[14px] tw-h-[14px] tw-absolute tw-bottom-0 tw-right-0 tw-rounded-[1000px] tw-bg-gray-300 tw-cursor-pointer" />
                    </div>
                </div>
                {/* <div className="tw-absolute tw-right-0 tw-top-[52px] tw-pr-5">
                    <div className="tw-rounded-md tw-bg-white tw-w-[360px] tw-shadow-md tw-flex tw-flex-col tw-text-[15px] tw-text-black tw-font-bold">
                        <div className="tw-px-[8px] tw-flex tw-py-[12px] tw-items-center tw-gap-2 hover:tw-rounded-md hover:tw-bg-gray-200 tw-cursor-pointer" onClick={handleLogOut}>
                            <div className="tw-rounded-[1000px] tw-bg-[#F0F2F5] tw-p-1">
                                <LogoutIcon className="tw-w-[20px] tw-h-[20px]" />
                            </div>
                            <span>
                                Log Out
                            </span>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className={`tw-fixed  tw-left-0 tw-top-0 tw-w-full tw-h-full tw-overflow-auto tw-bg-[rgb(0,0,0)] tw-bg-[rgba(0,0,0,0.4)] ${openMenu ? 'tw-hidden nav-xxl:tw-block' : 'tw-hidden'}`}>
                <div className="tw-bg-white tw-shadow-2xl tw-h-full tw-p-5 tw-pr-0 tw-flex tw-flex-col tw-ease-out tw-duration-[0.5s] tw-gap-10" style={{ width: sideNavWidth }}>
                    <div className="tw-flex tw-justify-end tw-p-5">
                        <span onClick={() => {
                            isOpenMenu(false);
                            setSideNavWidth(0);
                        }}>
                            <CloseIcon className="tw-w-[30px] tw-h-[30px] tw-cursor-pointer" />
                        </span>
                    </div>
                    {
                        links.map((e, idx) => {
                            return (
                                <Link href={e.path} className="tw-text-[20px] tw-font-bold tw-border-r-[4px] tw-border-white" style={{ borderColor: `${pathName == e.path ? "#0866FF" : "#fff"}` }} key={idx}>
                                    {e.name}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            {
                showModal &&
                (
                    <div className="tw-fixed  tw-left-0 tw-top-[58px] tw-w-full tw-h-full tw-overflow-auto tw-px-3" onClick={() => setShowModal(false)}>
                        <div className="tw-absolute tw-right-0 tw-top-[5px] tw-pr-2">
                            <div className="tw-rounded-md tw-bg-white tw-w-[360px] tw-shadow-md tw-flex tw-flex-col tw-text-[15px] tw-text-black tw-font-bold">
                                <div className="tw-px-[8px] tw-flex tw-py-[12px] tw-items-center tw-gap-2 hover:tw-rounded-md hover:tw-bg-gray-200 tw-cursor-pointer" onClick={handleLogOut}>
                                    <div className="tw-rounded-[1000px] tw-bg-[#F0F2F5] tw-p-1">
                                        <LogoutIcon className="tw-w-[20px] tw-h-[20px]" />
                                    </div>
                                    <span>
                                        Log Out
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </nav>
    )
}

export default NavBar;