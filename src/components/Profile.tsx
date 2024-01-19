"use client"
import { UserProps } from "@/type";
import { ChangeCoverPicModalAtom, ChangeProfilePicModalAtom, userProfileAtom } from "@/store";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import Image from "next/image";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { usePathname } from "next/navigation";
import ChangeProfilePhoto from "./ChangeProfilePhoto";
import Link from "next/link";
import ChangeCoverPhoto from "./ChangeCoverPhoto";
import { useParams } from "next/navigation";

const Profile = ({ User, token }: { User: UserProps, token: string }) => {
    useHydrateAtoms([[userProfileAtom, User]], {
        dangerouslyForceHydrate: true
    });
    // const [user, setUser] = useAtom(userProfileAtom);
    const params = useParams();
    const pathName = usePathname();
    const [openChangeProfilePicModal, setOpenChangeProfilePicModal] = useAtom(ChangeProfilePicModalAtom);
    const [openCoverPicModal, setOpenCoverPicModal] = useAtom(ChangeCoverPicModalAtom);

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

    return (
        <div className="tw-w-full tw-h-full">
            <div className="tw-shadow-md tw-w-full tw-bg-white">
                <div className="tw-flex tw-justify-center tw-w-full">
                    <div className="tw-relative tw-flex tw-flex-col tw-h-full">
                        <Image src={User.coverPicture ? User.coverPicture : "/images/temp_cover.png"} width={1250} height={462.95} alt="cover photo" className="tw-h-[462.95px]  tw-rounded-t-[0px] tw-rounded-b-md" />
                        <div className="tw-absolute tw-flex tw-justify-end tw-top-[400px] tw-w-full tw-px-[20px] tw-pb-5">
                            <div className="tw-flex tw-rounded-md tw-h-full tw-items-center tw-text-white tw-bg-[rgba(0,0,0,0.5)] tw-px-[12px] tw-gap-1 tw-py-2 tw-cursor-pointer hover:tw-brightness-95" 
                            onClick={() => setOpenCoverPicModal(true)}>
                                <CameraAltIcon className="tw-w-[16px] tw-h-[16px] " />
                                <span className="tw-text-[15px] tw-font-bold">
                                    Edit cover photo
                                </span>
                            </div>
                        </div>
                        <div className="tw-absolute tw-top-[390px] tw-pl-5">
                            <div className="tw-relative">
                                <Image src={User.profilePicture ? User.profilePicture : "/images/placeholder.png"} width={168} height={168} className="tw-rounded-[1000px] tw-border-white tw-border-[5px] tw-w-[168px] tw-h-[168px] hover:tw-brightness-95" alt="Profile Pic" />
                                <div className="tw-flex tw-items-center tw-justify-center tw-absolute tw-right-[5px] tw-bottom-[15px] tw-rounded-[1000px] tw-bg-gray-200 tw-p-2 tw-cursor-pointer hover:tw-brightness-95"
                                    onClick={() => setOpenChangeProfilePicModal(true)}>
                                    <CameraAltIcon className="tw-text-black tw-w-[20px] tw-h-[20px]" />
                                </div>
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
            {/* Open this modal when user wants to change profile picture */}
            {
                openChangeProfilePicModal && <ChangeProfilePhoto token={token} />
            }
            {
                openCoverPicModal && <ChangeCoverPhoto token={token} />
            }
        </div>
    )
}

export default Profile;