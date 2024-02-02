"use client"
import { useAtom } from "jotai";
import { AddPostAtom, AddPostProfileAtom, AddStatusAtom } from "@/store";
import Image from "next/image";
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { UserProps } from "@/type";
import Link from "next/link";

interface Props {
    user: UserProps,
    type: string
}

const WhatsOnYourMind = ({ user, type }: Props) => {
    const [openAddPost, setOpenAddPost] = useAtom(AddPostAtom);
    const [openAddStatus, setOpenAddStatus] = useAtom(AddStatusAtom);

    const postType = [
        {
            icon: <VideoCameraBackIcon className="tw-w-[24px] tw-h-[24px] tw-text-red-600" />,
            type: "Live video"
        },
        {
            icon: <PhotoLibraryIcon className="tw-w-[24px] tw-h-[24px] tw-text-green-600" />,
            type: "Photo/video"
        },
        {
            icon: <InsertEmoticonIcon className="tw-w-[24px] tw-h-[24px] tw-text-yellow-300" />,
            type: "Feeling/activity"
        },
    ]
    return (
        <div className="tw-rounded-md tw-bg-white tw-shadow-md tw-flex tw-flex-col tw-px-[16px] tw-pt-[12px] tw-pb-[10px] tw-gap-3">
            <div className="tw-flex tw-gap-2 tw-items-center">
                <Link href={`/${user.firstName}.${user.lastName}.${user.id}`}>
                <Image src={user.profilePicture ? user.profilePicture : "/images/placeholder.png"} width={40} height={40} alt="profile pic" className="tw-rounded-[1000px] tw-w-[40px] tw-h-[40px]" />
                </Link>
                <div className="tw-rounded-[20px] tw-py-[8px] tw-px-[12px] tw-w-full tw-cursor-pointer tw-bg-[#F0F2F5] hover:tw-bg-gray-300"
                onClick={() => setOpenAddStatus({ status: true, type })}>
                    <span className="tw-text-[17px] tw-text-[#65676B]">What{"'"}s on your mind, {user.firstName} {user.lastName}?</span>
                </div>
            </div>
            <hr />
            <div className="tw-flex tw-justify-center">
                {
                    postType.map((e, idx) => {
                        return(
                            <div key={idx} className="tw-w-full tw-flex tw-justify-center tw-items-center tw-gap-1 hover:tw-rounded-md hover:tw-bg-gray-200 tw-p-[8px] tw-transition-all tw-cursor-pointer" onClick={() => {
                                idx == 1 && setOpenAddPost({ status: true, type }) 
                            }}>
                                {e.icon}
                                <span className="tw-text-[15px] tw-text-[#65676B]">
                                    {e.type}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WhatsOnYourMind;