"use client"
import { ViewPostAtom } from "@/store";
import { useAtom } from "jotai";
import Image from "next/image";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';

const ViewPost = () => {
    const [view, setView] = useAtom(ViewPostAtom);

    return (
        view.post &&
        (
            <div className="tw-fixed tw-top-0 tw-w-full tw-h-full tw-overflow-auto tw-left-0 tw-bg-[rgb(0,0,0)] tw-bg-[rgba(0,0,0,0.4)] tw-py-5 tw-px-[16px] tw-z-[1000] tw-overflow-y-hidden" onClick={() => setView({ status: false, post: null })}>
                <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[100vh]">
                    <div className="tw-rounded-md tw-shadow-xl tw-bg-white tw-max-w-[700px] tw-w-full tw-h-[1239px]">
                        <div className="tw-relative tw-text-center tw-p-2">
                            <span className="tw-font-bold tw-text-[20px]">
                                {view.post.author.firstName} {view.post.author.lastName}{"'"}s Post
                            </span>
                            <div className="tw-absolute tw-right-0 tw-top-0 tw-px-[16px] tw-py-2 tw-font-bold">
                                <span onClick={() => setView({ status: false, post: null })} className="tw-cursor-pointer">
                                    <CloseIcon className="tw-w-[25px] tw-h-[25px]" />
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="tw-overflow-y-auto">
                            <div className="tw-px-[16px] tw-flex tw-flex-col tw-py-2 tw-gap-2">
                                <div className="tw-flex tw-justify-between tw-items-center">
                                    <div className="tw-flex tw-gap-2">
                                        <Image src={`${view.post.author.profilePicture ? view.post.author.profilePicture : "/images/placeholder.png"}`} width={40} height={40} alt="photo" className="tw-rounded-[1000px]" />
                                        <span className="tw-text-[15px] tw-font-bold">
                                            {view.post.author.firstName} {view.post.author.lastName}
                                        </span>
                                    </div>
                                    <MoreHorizIcon className="tw-w-[36px] tw-h-[36px]" />
                                </div>
                                <span>
                                    {view.post.description}
                                </span>
                            </div>
                            {
                                view.post.featureImage.substring(view.post.featureImage.lastIndexOf('.')) === '.mp4' ?
                                    (
                                        <video width={700} height={700} controls loop>
                                            <source src={`https${view.post.featureImage.substring(view.post.featureImage.indexOf(':'))}`} type="video/mp4" />
                                        </video>
                                    ) :
                                    (
                                        <Image src={view.post.featureImage} width={700} height={700} alt="photo" className="tw-max-w-[700px] tw-max-h-[700px] tw-w-full tw-h-full" priority />
                                    )
                            }
                            <div className="tw-px-[16px] tw-flex tw-justify-between tw-text-[#65676B] tw-text-[15px] tw-items-center">
                                <span>
                                    {view.post.likes.length} Likes
                                </span>
                                <div className="tw-flex">
                                    <span className="tw-p-[6px]">
                                        {0} comments
                                    </span>
                                    <span className="tw-p-[6px]">
                                        {0} shares
                                    </span>
                                </div>
                            </div>
                            <div className="tw-px-[16px] tw-flex tw-flex-col tw-gap-2">
                                <hr />
                                <div className="tw-flex tw-justify-evenly tw-text-[#65676B] tw-text-[15px] tw-items-center">
                                    <div className={`tw-flex tw-gap-2 tw-py-[6px] hover:tw-rounded-md tw-w-full tw-justify-center tw-items-center hover:tw-bg-gray-200 tw-cursor-pointer ${view.post.likes.some(e => e.userId === view.userId) && " tw-text-blue-600"}`}>
                                        <ThumbUpOffAltIcon className="tw-w-[20px] tw-h-[20px]" />
                                        <span>Like</span>
                                    </div>
                                    <div className="tw-flex tw-gap-2 tw-py-[6px] hover:tw-rounded-md tw-w-full tw-justify-center tw-items-center hover:tw-bg-gray-200 tw-cursor-pointer">
                                        <ChatBubbleOutlineIcon className="tw-w-[20px] tw-h-[20px]" />
                                        <span>Comment</span>
                                    </div>
                                    <div className="tw-flex tw-gap-2 tw-py-[6px] hover:tw-rounded-md tw-w-full tw-justify-center tw-items-center hover:tw-bg-gray-200 tw-cursor-pointer">
                                        <ReplyIcon className="tw-w-[20px] tw-h-[20px]" />
                                        <span>Share</span>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="tw-flex tw-justify-end tw-text-[#65676B] tw-text-[15px] tw-px-[16px] tw-items-end">
                                <span>Most relevant</span>
                                <ArrowDropDownIcon className="tw-w-[20px] tw-h-[20px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default ViewPost;