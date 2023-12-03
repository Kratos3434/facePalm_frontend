"use client"
import { UserProps } from "@/type";
import { userProfileAtom } from "@/store";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import Image from "next/image";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { usePathname } from "next/navigation";
import Link from "next/link";

const Profile = ({ User }: { User: UserProps }) => {
    useHydrateAtoms([[userProfileAtom, User]]);
    const [user] = useAtom(userProfileAtom);
    const pathName = usePathname();

    const links = [
        {
            path: `${pathName}/`,
            name: "Posts"
        },
        {
            path: `${pathName}/`,
            name: "About"
        },
        {
            path: `${pathName}/`,
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
    return (
        <div className="tw-w-full tw-h-[100vh]">

            {/* <div className="tw-shadow-md tw-flex tw-justify-center tw-h-[641px] tw-bg-white">
                <div className="tw-flex tw-flex-col tw-relative">
                    <Image src="/images/cat.jpg" width={1250} height={462.95} alt="cover photo" className="tw-h-[462.95px] tw-rounded-t-[0px] tw-rounded-b-md" />
                    <div className="tw-absolute tw-flex tw-justify-end tw-top-[400px] tw-w-full tw-px-[20px] tw-pb-5">
                        <div className="tw-flex tw-rounded-md tw-h-full tw-items-center tw-text-white tw-bg-[rgba(0,0,0,0.5)] tw-px-[12px] tw-gap-1 tw-py-2 tw-cursor-pointer">
                            <CameraAltIcon className="tw-w-[16px] tw-h-[16px] " />
                            <span className="tw-text-[15px] tw-font-bold">
                                Edit cover photo
                            </span>
                        </div>
                    </div>
                    <div className="tw-absolute tw-bottom-0 tw-px-5 tw-w-full">
                        <div className="tw-flex tw-justify-between tw-flex-wrap tw-pb-3">
                            <div className="tw-flex tw-items-center tw-gap-3 tw-flex-wrap">
                                <Image src="/images/cat2.jpg" width={168} height={168} className="tw-rounded-[1000px] tw-border-white tw-border-[5px] tw-w-[168px] tw-h-[168px]" alt="Profile Pic" />
                                <div className="tw-flex tw-flex-col tw-mt-[32px]">
                                    <span className="tw-text-[32px] tw-font-bold">
                                        {user.firstName} {user.lastName}
                                    </span>
                                    <span className="tw-text-[15px] tw-text-[#65676B] tw-font-bold">
                                        0 friends
                                    </span>
                                </div>
                            </div>

                            <div className="tw-flex tw-items-center tw-gap-3">
                                <div className="tw-rounded-md tw-flex tw-bg-[#0866FF] tw-items-center tw-px-[12px] tw-py-2 tw-gap-1">
                                    <AddIcon className="tw-w-[16px] tw-h-[16px] tw-text-white" />
                                    <span className="tw-text-white tw-text-[15px] tw-font-bold">
                                        Add to story
                                    </span>
                                </div>

                                <div className="tw-rounded-md tw-flex tw-bg-[#E4E6EB] tw-items-center tw-px-[12px] tw-py-2 tw-gap-1">
                                    <EditIcon className="tw-w-[16px] tw-h-[16px] " />
                                    <span className="tw-text-[15px] tw-font-bold">
                                        Edit profile
                                    </span>
                                </div>

                                <div className="tw-rounded-md tw-flex tw-bg-[#E4E6EB] tw-items-center tw-px-[16px] tw-py-[10px] tw-gap-1">
                                    <KeyboardArrowDownIcon className="tw-w-[16px] tw-h-[16px] " />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="tw-flex tw-h-[60px]">
                            {
                                links.map((e, idx) => {
                                    return(
                                        <Link href={e.path} className="tw-text-[15px] tw-px-[16px] tw-flex tw-items-center">
                                            {e.name}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div> */}

            {/* <div className="tw-shadow-md tw-bg-white tw-w-full">
                <div className="tw-h-[462.95px] tw-max-w-[1250px] tw-m-auto tw-w-full">
                    <Image src="/images/cat.jpg" width={1250} height={462.95} alt="cover photo" className="tw-max-h-[462.95px] tw-h-full tw-rounded-t-[0px] tw-rounded-b-md tw-absolute tw-left-0 tw-right-0 tw-ml-auto tw-mr-auto tw-z-0" />
                    <div className="tw-absolutee tw-flex tw-justify-end tw-top-[400px] tw-w-full tw-px-[20px] tw-pb-5 tw-relative">
                        <div className="tw-flex tw-rounded-md tw-h-full tw-items-center tw-text-white tw-bg-[rgba(0,0,0,0.5)] tw-px-[12px] tw-gap-1 tw-py-2 tw-cursor-pointer">
                            <CameraAltIcon className="tw-w-[16px] tw-h-[16px] " />
                            <span className="tw-text-[15px] tw-font-bold">
                                Edit cover photo
                            </span>
                        </div>
                    </div>
                    <div className="tw-px-5 tw-mr-5">
                        <Image src="/images/cat2.jpg" width={168} height={168} className="tw-rounded-[1000px] tw-border-white tw-border-[5px] tw-w-[168px] tw-h-[168px] tw-relative tw-top-[340px]" alt="Profile Pic" />
                    </div>
                </div>
                <div className="tw-flex tw-w-full tw-justify-center">
                    <div className="tw-flex tw-justify-between tw-max-w-[1250px] tw-w-full tw-px-5 tw-flex-wrap">
                        <div className="tw-flex tw-items-start tw-h-full">
                            <div className="tw-w-[168px] tw-mr-[16px] ">

                            </div>
                            <div className="tw-flex tw-flex-col tw-mt-[32px] tw-mb-[16px]">
                                <span className="tw-text-[32px] tw-font-bold">
                                    {user.firstName} {user.lastName}
                                </span>
                                <span className="tw-text-[15px] tw-text-[#65676B] tw-font-bold">
                                    0 friends
                                </span>
                            </div>
                        </div>

                        <div className="tw-flex tw-items-center tw-gap-3">
                            <div className="tw-rounded-md tw-flex tw-bg-[#0866FF] tw-items-center tw-px-[12px] tw-py-2 tw-gap-1">
                                <AddIcon className="tw-w-[16px] tw-h-[16px] tw-text-white" />
                                <span className="tw-text-white tw-text-[15px] tw-font-bold">
                                    Add to story
                                </span>
                            </div>

                            <div className="tw-rounded-md tw-flex tw-bg-[#E4E6EB] tw-items-center tw-px-[12px] tw-py-2 tw-gap-1">
                                <EditIcon className="tw-w-[16px] tw-h-[16px] " />
                                <span className="tw-text-[15px] tw-font-bold">
                                    Edit profile
                                </span>
                            </div>

                            <div className="tw-rounded-md tw-flex tw-bg-[#E4E6EB] tw-items-center tw-px-[16px] tw-py-[10px] tw-gap-1">
                                <KeyboardArrowDownIcon className="tw-w-[16px] tw-h-[16px] " />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="tw-shadow-md tw-w-full">
                <div className="tw-flex tw-justify-center tw-w-full">
                    <div className="tw-relative tw-flex tw-flex-col tw-h-full">
                        <Image src="/images/cat.jpg" width={1250} height={462.95} alt="cover photo" className="tw-h-[462.95px]  tw-rounded-t-[0px] tw-rounded-b-md" />
                        <div className="tw-absolute tw-flex tw-justify-end tw-top-[400px] tw-w-full tw-px-[20px] tw-pb-5">
                            <div className="tw-flex tw-rounded-md tw-h-full tw-items-center tw-text-white tw-bg-[rgba(0,0,0,0.5)] tw-px-[12px] tw-gap-1 tw-py-2 tw-cursor-pointer">
                                <CameraAltIcon className="tw-w-[16px] tw-h-[16px] " />
                                <span className="tw-text-[15px] tw-font-bold">
                                    Edit cover photo
                                </span>
                            </div>
                        </div>
                        <div className="tw-absolute tw-top-[390px] tw-pl-5">
                            <Image src="/images/cat2.jpg" width={168} height={168} className="tw-rounded-[1000px] tw-border-white tw-border-[5px] tw-w-[168px] tw-h-[168px]" alt="Profile Pic" />
                        </div>
                        <div className="tw-flex tw-justify-between tw-items-center tw-pb-[16px] tw-flex-wrap tw-px-5 tw-gap-5">
                            <div className="tw-flex tw-items-center tw-h-full tw-flex-wrap">
                                <div className="tw-w-[168px] tw-mr-[16px] tw-h-[84px]">

                                </div>
                                <div className="tw-flex tw-flex-col tw-mtt-[32px] tw-mb-[16px]">
                                    <span className="tw-text-[32px] tw-font-bold">
                                        {user.firstName} {user.lastName}
                                    </span>
                                    <span className="tw-text-[15px] tw-text-[#65676B] tw-font-bold">
                                        0 friends
                                    </span>
                                </div>
                            </div>

                            <div className="tw-flex tw-items-center tw-gap-3">
                                <div className="tw-rounded-md tw-flex tw-bg-[#0866FF] tw-items-center tw-px-[12px] tw-py-2 tw-gap-1">
                                    <AddIcon className="tw-w-[16px] tw-h-[16px] tw-text-white" />
                                    <span className="tw-text-white tw-text-[15px] tw-font-bold">
                                        Add to story
                                    </span>
                                </div>

                                <div className="tw-rounded-md tw-flex tw-bg-[#E4E6EB] tw-items-center tw-px-[12px] tw-py-2 tw-gap-1">
                                    <EditIcon className="tw-w-[16px] tw-h-[16px] " />
                                    <span className="tw-text-[15px] tw-font-bold">
                                        Edit profile
                                    </span>
                                </div>

                                <div className="tw-rounded-md tw-flex tw-bg-[#E4E6EB] tw-items-center tw-px-[16px] tw-py-[10px] tw-gap-1">
                                    <KeyboardArrowDownIcon className="tw-w-[16px] tw-h-[16px] " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;