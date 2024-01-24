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
import { UserProps } from "@/type";
import SendIcon from '@mui/icons-material/Send';
import Link from "next/link";
import ForumIcon from '@mui/icons-material/Forum';
import Comment from "./Comment";
import React, { useState } from "react";
import { useRef } from "react";
import { baseURL } from "@/env";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";

interface Props {
    currentUser: UserProps,
    token: string
}

const ViewPost = ({ currentUser, token }: Props) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [view, setView] = useAtom(ViewPostAtom);
    const [loading, isLoading] = useState(false);
    const textboxRef = useRef<HTMLDivElement>(null);
    const [comment, setComment] = useState("");
    const commentRef = useRef<HTMLDivElement>(null);

    const closeViewPost = () => {
        setView({ status: false, post: null });
    }

    const handleComment = () => {
        if (textboxRef.current)
            setComment(textboxRef.current?.innerText);
    }

    const handlePostComment = async (e: any) => {
        e.preventDefault();
        isLoading(true);
        const res = await fetch(`${baseURL}/user/add/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                comment,
                postId: view.post?.id
            })
        });

        const data = await res.json();

        if (data.status) {
            isLoading(false);
            setComment("");
            if (textboxRef.current) {
                textboxRef.current.innerText = "";
            }
            setView({ status: true, post: data.data.post });
            commentRef.current?.scrollIntoView({behavior: "smooth"});
            router.refresh();
            queryClient.invalidateQueries('posts');
        }
    }
    return (
        view.post &&
        (
            <div className="tw-fixed tw-top-0 tw-w-full tw-left-0 tw-bg-[rgb(0,0,0)] tw-bg-[rgba(0,0,0,0.4)] tw-py-5 tw-px-[16px] tw-z-[1000] tw-h-full tw-overflow-hidden" onClick={closeViewPost}>
                <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-max-h-[100vh] tw-h-full">
                    <div className="tw-fixed tw-w-full tw-top-[20px] tw-flex tw-justify-center tw-px-[16px]" onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <div className="tw-text-center tw-p-2 tw-bg-white tw-max-w-[700px] tw-w-full tw-rounded-t-md tw-border-b-[1px] tw-relative">
                            <span className="tw-font-bold tw-text-[20px] tw-rounded-md">
                                {view.post.author.firstName} {view.post.author.lastName}{"'"}s Post
                            </span>
                            <div className="tw-absolute tw-right-0 tw-top-0 tw-px-[16px] tw-py-2 tw-font-bold">
                                <span onClick={closeViewPost} className="tw-cursor-pointer">
                                    <CloseIcon className="tw-w-[25px] tw-h-[25px]" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="tw-rounded-md tw-shadow-2xl tw-bg-white tw-max-w-[700px] tw-w-full tw-h-full tw-overflow-auto viewpost" onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        {/* <hr /> */}
                        <div className="tw-rounded-md tw-mb-[82px] tw-mt-[48px]">
                            <div className="tw-px-[16px] tw-flex tw-flex-col tw-py-2 tw-gap-2">
                                <div className="tw-flex tw-justify-between tw-items-center">
                                    <div className="tw-flex tw-gap-2">
                                        <Link href={`/${view.post.author.firstName}.${view.post.author.lastName}.${view.post.author.id}`}>
                                            <Image src={`${view.post.author.profilePicture ? view.post.author.profilePicture : "/images/placeholder.png"}`} width={40} height={40} alt="photo" className="tw-rounded-[1000px] tw-w-[40px] tw-h-[40px]" />
                                        </Link>
                                        <Link className="tw-text-[15px] tw-font-bold hover:tw-underline" href={`/${view.post.author.firstName}.${view.post.author.lastName}.${view.post.author.id}`}>
                                            {view.post.author.firstName} {view.post.author.lastName}
                                        </Link>
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
                                        <Image src={view.post.featureImage} width={700} height={700} alt="photo" className="tw-max-w-[700px] tw-w-full" priority />
                                    )
                            }
                            <div className="tw-px-[16px] tw-flex tw-justify-between tw-text-[#65676B] tw-text-[15px] tw-items-center">
                                <span>
                                    {view.post.likes.length} Likes
                                </span>
                                <div className="tw-flex">
                                    <span className="tw-p-[6px]">
                                        {view.post.comments.length} comments
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
                            <div className="tw-flex tw-justify-end tw-text-[#65676B] tw-text-[15px] tw-px-[16px] tw-items-end tw-font-bold">
                                <span>Most relevant</span>
                                <ArrowDropDownIcon className="tw-w-[20px] tw-h-[20px] tw-font-bold" />
                            </div>
                            {/* Array of comments */}
                            <div className="tw-px-[16px] tw-flex tw-flex-col tw-py-[16px] tw-gap-3">
                                {
                                    view.post.comments.length === 0 ?
                                        (
                                            <div className="tw-text-center tw-p-[16px] tw-flex tw-flex-col tw-gap-1 tw-items-center tw-font-bold tw-text-[#65676B]">
                                                <ForumIcon className="tw-w-[50px] tw-h-[50px]" />
                                                <p>No comments yet, be the first person to comment :{")"}</p>
                                            </div>
                                        ) :
                                        (
                                            view.post.comments.map((e, idx) => {
                                                return (
                                                    <React.Fragment key={idx}>
                                                        <Comment comment={e} />
                                                    </React.Fragment>
                                                )
                                            })
                                        )
                                }
                            </div>
                            {/* --- Array of comments end ---*/}
                        </div>
                        <div ref={commentRef}></div>
                    </div>
                    <div className="tw-fixed tw-w-full tw-bottom-[20px] tw-flex tw-justify-center tw-px-[16px]" onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <div className="tw-flex tw-px-[16px] tw-py-[9px] tw-max-w-[700px] tw-w-full tw-bg-white tw-rounded-b-md tw-gap-[4px] tw-shadow-2xl tw-border-t-[1px]">
                            <Image src={currentUser.profilePicture ? currentUser.profilePicture : "/images/placeholder.png"} width={32} height={32} alt={`${currentUser.firstName} ${currentUser.lastName}`} className="tw-rounded-[1000px] tw-w-[32px] tw-h-[32px]" />
                            <form onSubmit={handlePostComment} className="tw-w-full tw-rounded-md tw-bg-gray-200 tw-break-words tw-flex tw-flex-col tw-px-[12px] tw-py-[8px]">
                                <div contentEditable={true} className="tw-outline-none tw-whitespace-pre-wrap commentBox tw-cursor-text" role="textbox" tabIndex={0} placeholder="Write a comment..." onInput={handleComment} ref={textboxRef}>

                                </div>
                                <div className="tw-flex tw-justify-end">
                                    {
                                        comment && !loading ?
                                            (
                                                <button>
                                                    <SendIcon className="tw-w-[16px] tw-h-[16px] tw-text-[#0866FF]" />
                                                </button>
                                            ) :
                                            (
                                                <span>
                                                    <SendIcon className="tw-w-[16px] tw-h-[16px] tw-text-gray-400" />
                                                </span>
                                            )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default ViewPost;