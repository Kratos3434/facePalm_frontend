"use client"
import { PostProps } from "@/type";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from "next/link";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';

const PostCard = ({ photo, description, likes, author, shares }: PostProps) => {
    return (
        <div className="tw-rounded-md tw-shadow-md tw-max-w-[680px] tw-w-full tw-bg-white tw-flex tw-flex-col">
            <div className="tw-flex tw-flex-col tw-px-[16px] tw-pt-[12px] tw-pb-[16px]">
                <div className="tw-flex tw-gap-2">
                    <Link href={`${author.firstName}.${author.lastName}.${author.id}`} className="tw-max-w-[40px] tw-max-h-[40px] tw-w-full tw-h-full tw-rounded-[1000px]">
                        <Image src={`${author.profilePicture ? author.profilePicture : "/images/placeholder.png"}`} width={40} height={40} alt="profile pic" className="tw-max-w-[40px] tw-h-[40px] tw-w-full tw-rounded-[1000px]" />
                    </Link>
                    <div className="tw-flex tw-justify-between tw-flex-1">
                        {/* <span className="tw-text-[15px] tw-font-bold tw-whitespace-nowrapp">{`${author.firstName} ${author.lastName}`}</span> */}
                        <Link href={`${author.firstName}.${author.lastName}.${author.id}`} className="tw-text-[15px] tw-font-bold tw-whitespace-nowrapp hover:tw-underline">
                            {`${author.firstName} ${author.lastName}`}
                        </Link>
                        <div className="tw-flex tw-gap-4">
                            <MoreHorizIcon className="tw-w-[20px] tw-h-[20px] tw-cursor-pointer" />
                            <CloseIcon className="tw-w-[20px] tw-h-[20px] tw-cursor-pointer" />
                        </div>
                    </div>
                </div>
                <span className="tw-text-[15px]">
                    {description}
                </span>
            </div>
            <Image src={photo} width={680} height={680} alt="photo" className="tw-max-w-[680px] tw-max-h-[680px] tw-w-full tw-h-full" priority />
            <div className="tw-flex tw-justify-between tw-px-5 tw-text-[#65676B] tw-text-[15px] tw-py-2">
                <span>
                    {likes} likes
                </span>
                <div className="tw-flex tw-gap-3">
                    <span>
                        0 comments
                    </span>
                    <span>
                        {shares} shares
                    </span>
                </div>
            </div>
            <div className="tw-px-5">
                <hr />
            </div>
            <div className="tw-flex tw-justify-evenly tw-text-[#65676B] tw-text-[15px] tw-py-3 tw-font-bold">
                <div className="tw-flex tw-gap-2 tw-items-center">
                    <ThumbUpOffAltIcon className="tw-w-[20px] tw-h-[20px]" />
                    Like
                </div>

                <div className="tw-flex tw-gap-2 tw-items-center">
                    <ChatBubbleOutlineIcon className="tw-w-[20px] tw-h-[20px]" />
                    Comment
                </div>

                <div className="tw-flex tw-gap-2 tw-items-center">
                    <ReplyIcon className="tw-w-[20px] tw-h-[20px]" />
                    Share
                </div>
            </div>
        </div>
    )
}

export default PostCard;