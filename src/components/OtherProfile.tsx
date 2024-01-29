"use client"
import { UserProps } from "@/type";
import { userProfileAtom } from "@/store";
import { useHydrateAtoms } from "jotai/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { baseURL } from "@/env";

const OtherProfile = ({ User, token }: { User: UserProps, token: string }) => {
    useHydrateAtoms([[userProfileAtom, User]], {
        dangerouslyForceHydrate: true
    });

    // const [user, setUser] = useAtom(userProfileAtom);
    const params = useParams();
    const pathName = usePathname();

    const links = [
        {
            path: `/${params.name}`,
            name: "Posts"
        },
        {
            path: `/${params.name}/about`,
            name: "About"
        },
        {
            path: `/${params.name}/friends`,
            name: "Friends"
        },
        // {
        //     path: `${pathName}/`,
        //     name: "Photos"
        // },
        // {
        //     path: `${pathName}/`,
        //     name: "Videos"
        // },
        // {
        //     path: `${pathName}/`,
        //     name: "Reels"
        // }
    ]

    const [loading, isLoading] = useState(false);

    const sendFriendRequest = async () => {
        isLoading(true);
        const res = await fetch(`${baseURL}/user/send/request/${User.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (data.status) {

        }
    }

    return (
        <div className="tw-w-full tw-h-full">
            <div className="tw-shadow-md tw-w-full tw-bg-white">
                <div className="tw-flex tw-justify-center tw-w-full">
                    <div className="tw-relative tw-flex tw-flex-col tw-h-full">
                        <Image src={User.coverPicture ? User.coverPicture : "/images/temp_cover.png"} width={1250} height={462.95} alt="cover photo" className="tw-h-[462.95px]  tw-rounded-t-[0px] tw-rounded-b-md" />
                        <div className="tw-absolute tw-top-[390px] tw-pl-5">
                            <div className="tw-relative">
                                <Image src={User.profilePicture ? User.profilePicture : "/images/placeholder.png"} width={168} height={168} className="tw-rounded-[1000px] tw-border-white tw-border-[5px] tw-w-[168px] tw-h-[168px] hover:tw-brightness-95" alt="Profile Pic" />
                            </div>
                        </div>
                        <div className="tw-flex tw-justify-between tw-items-center tw-pb-[16px] tw-flex-wrap tw-px-5 tw-gap-5">
                            <div className="tw-flex tw-items-center tw-h-full tw-flex-wrap">
                                <div className="tw-w-[168px] tw-mr-[16px] tw-h-[84px]">

                                </div>
                                <div className="tw-flex tw-flex-col tw-mtt-[32px] tw-mb-[16px]">
                                    <span className="tw-text-[32px] tw-font-bold">
                                        {User.firstName} {User.lastName}
                                    </span>
                                    <span className="tw-text-[15px] tw-text-[#65676B] tw-font-bold">
                                        0 friends
                                    </span>
                                </div>
                            </div>
                            <div className="tw-flex tw-gap-2">
                                {
                                    loading ?
                                        (
                                            <div className="tw-rounded-md tw-text-white tw-flex tw-items-center tw-font-bold tw-bg-[#0866FF] tw-px-[12px] tw-py-[10px] tw-gap-2 hover:tw-brightness-95 tw-cursor-pointer">
                                                {/* <PersonAddIcon className="tw-w-[16px] tw-h-[16px]" /> */}
                                                <CircularProgress className="tw-w-[16px] tw-h-[16px]" size={16} color="inherit" />
                                                <span className="tw-text-[15px]">Cancel request</span>
                                            </div>
                                        ) :
                                        (
                                            <div className="tw-rounded-md tw-text-white tw-flex tw-items-center tw-font-bold tw-bg-[#0866FF] tw-px-[12px] tw-py-[10px] tw-gap-2 hover:tw-brightness-95 tw-cursor-pointer">
                                                <PersonAddIcon className="tw-w-[16px] tw-h-[16px]" />
                                                {/* <CircularProgress className="tw-w-[16px] tw-h-[16px]" size={16} color="inherit" /> */}
                                                <span className="tw-text-[15px]">Add friend</span>
                                            </div>
                                        )
                                }

                                <div className="tw-rounded-md tw-text-white tw-flex tw-items-center tw-font-bold tw-bg-[#0866FF] tw-px-[12px] tw-py-[10px] tw-gap-2 hover:tw-brightness-95 tw-cursor-pointer">
                                    <LibraryAddIcon className="tw-w-[16px] tw-h-[16px]" />
                                    <span className="tw-text-[15px]">Follow</span>
                                </div>
                            </div>
                        </div>
                        <div className="tw-max-w-[1210px] tw-w-full tw-px-[20px] tw-gap-1 tw-flex tw-flex-col">
                            <hr />
                            <div className="tw-flex tw-gap-1">
                                {
                                    links.map((e, idx) => {
                                        return (
                                            <Link className={`tw-flex tw-justify-center tw-items-center tw-h-full tw-px-[16px] tw-py-5 hover:tw-bg-gray-200 tw-border-bb-[4px] tw-border-white hover:tw-rounded-md tw-border-b-[4px] ${pathName === e.path ? "tw-border-b-[#0866FF]" : "tw-border-b-white"}`} key={idx} href={e.path} >
                                                <span className="tw-text-[15px] tw-font-bold">
                                                    {e.name}
                                                </span>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtherProfile;