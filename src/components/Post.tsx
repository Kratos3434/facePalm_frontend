"use client"
import { generateDate, linkifyDescrip } from "@/helper";
import { PostProps, UserProps } from "@/type"
import Image from "next/image";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from "next/link";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import { socket } from "@/socket";
import { baseURL, userBaseURL } from "@/env";
import { useRouter } from "next/navigation";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SendIcon from '@mui/icons-material/Send';
import React, { useRef, useState } from "react";
import ForumIcon from '@mui/icons-material/Forum';
import Comment from "./Comment";
import { useAtom } from "jotai";
import { ViewLikesAtom } from "@/store";
import ViewLikes from "./ViewLikes";

const Post = ({ post, token, currentUser }: { post: PostProps, token?: string, currentUser: UserProps }) => {
  const router = useRouter();

  const textboxRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState("");
  const [loading, isLoading] = useState(false);

  const likePost = async () => {
    const res = await fetch(`${userBaseURL}/like/post`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        email: currentUser.email,
        postId: post.id
      })
    });

    const data = await res.json();

    if (data.status) {
      socket.emit("like", {
        sender: currentUser.email,
        recipient: post.author.email,
        senderId: currentUser.id,
        recipientId: post.author.id,
        type: `like_${post.id}`,
        postId: post.id
      });
      router.refresh();
    }
  }

  const handleComment = () => {
    if (textboxRef.current)
      setComment(textboxRef.current?.innerText);
  }

  const handlePostComment = async (e: any) => {
    e.preventDefault();
    isLoading(true);
    const res = await fetch(`${userBaseURL}/add/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        comment,
        postId: post.id
      })
    });

    const data = await res.json();

    if (data.status) {
      isLoading(false);
      setComment("");
      if (textboxRef.current) {
        textboxRef.current.innerText = "";
      }
      router.refresh();
    }
  }

  const [viewLikes, setViewLikes] = useAtom(ViewLikesAtom);

  return (
    <div className="tw-flex tw-w-full tw-justify-center tw-px-[16px] tw-py-2 tw-pt-5 tw-pb-5">
      <div className="tw-rounded-md tw-bg-white tw-shadow-lg tw-max-w-[500px] tw-w-full tw-h-full">
        <div className="tw-flex tw-items-center tw-px-[16px] tw-pt-[12px] tw-mb-[12px] tw-gap-2">
          <Link href={`/${post.author.firstName}.${post.author.lastName}.${post.author.id}`}>
            <Image src={post.author.profilePicture ? post.author.profilePicture : "/images/placeholder.png"} width={40} height={40} alt={`${post.author.firstName} ${post.author.lastName}`} className="tw-w-[40px] tw-h-[40px] tw-rounded-[1000px]" />
          </Link>
          <div className="tw-flex tw-justify-between tw-items-center tw-flex-1">
            <div className="tw-flex tw-flex-col">
              <Link className="tw-text-[15px] tw-font-bold hover:tw-underline" href={`/${post.author.firstName}.${post.author.lastName}.${post.author.id}`}>
                {post.author.firstName} {post.author.lastName}
              </Link>
              <span className="tw-text-[13px] tw-text-[#65676B]">
                {generateDate(post.createdAt)}
              </span>
            </div>
            <MoreHorizIcon className="tw-w-[20px] tw-h-[20px]" />
          </div>
        </div>
        <div className="tw-px-[16px] tw-pb-[16px]" dangerouslySetInnerHTML={linkifyDescrip(post.description)} id="descrip"></div>
        {
          post.featureImage &&
          (
            post.featureImage.substring(post.featureImage.lastIndexOf('.')) === '.mp4' ?
              (
                <video width={680} height={680} controls loop>
                  <source src={`https${post.featureImage.substring(post.featureImage.indexOf(':'))}`} type="video/mp4" />
                </video>
              ) :
              (
                <Image src={post.featureImage} width={680} height={680} alt="photo" className="tw-max-w-[680px] tw-max-h-[680px] tw-w-full tw-h-full" priority />
              )
          )
        }
        <div className="tw-flex tw-justify-between tw-px-5 tw-text-[#65676B] tw-text-[15px] tw-py-2">
          <span className="tw-cursor-pointer hover:tw-underline" onClick={() => setViewLikes({ status: true, likes: post.likes })}>
            {post.likes.length} likes
          </span>
          <div className="tw-flex tw-gap-3">
            <span className="tw-cursor-pointer hover:tw-underline">
              {post.comments.length} comments
            </span>
            <span>
              {post.shares} shares
            </span>
          </div>
        </div>
        <div className="tw-px-5">
          <hr />
        </div>
        <div className="tw-flex tw-justify-evenly tw-text-[#65676B] tw-text-[15px] tw-font-bold tw-items-center tw-px-[20px] tw-py-1">
          <div className={`tw-flex tw-gap-2 tw-items-center hover:tw-bg-gray-200 tw-cursor-pointer hover:tw-rounded-md tw-w-full tw-justify-center tw-py-3 ${post.likes.some(e => e.userId === currentUser.id) && " tw-text-blue-600"}`} onClick={likePost}>
            <ThumbUpOffAltIcon className="tw-w-[20px] tw-h-[20px]" />
            Like
          </div>

          <div className="tw-flex tw-gap-2 tw-items-center hover:tw-bg-gray-200 tw-cursor-pointer hover:tw-rounded-md tw-w-full tw-justify-center tw-py-3">
            <ChatBubbleOutlineIcon className="tw-w-[20px] tw-h-[20px]" />
            Comment
          </div>

          <div className="tw-flex tw-gap-2 tw-items-center hover:tw-bg-gray-200 tw-cursor-pointer hover:tw-rounded-md tw-w-full tw-justify-center tw-py-3">
            <ReplyIcon className="tw-w-[20px] tw-h-[20px]" />
            Share
          </div>
        </div>
        <div className="tw-px-5">
          <hr />
        </div>
        <div className="tw-px-5">
          <div className="tw-flex tw-justify-end tw-text-[#65676B] tw-text-[15px] tw-font-bold">
            <div className="tw-flex tw-items-center">
              <span>Most relevant</span>
              <ArrowDropDownIcon className="tw-w-[16px] tw-h-[16px]" />
            </div>
          </div>
          <div className="tw-flex tw-gap-1 tw-py-[8px]">
            <Link href={`/${currentUser.firstName}.${currentUser.lastName}.${currentUser.id}`}>
              <Image src={currentUser.profilePicture ? currentUser.profilePicture : "/images/placeholder.png"} width={32} height={32} alt={`${currentUser.firstName} ${currentUser.lastName}`} className="tw-w-[32px] tw-h-[32px] tw-rounded-[1000px]" />
            </Link>
            <form onSubmit={handlePostComment} className="tw-rounded-xl tw-bg-gray-200 tw-w-full tw-px-[12px] tw-py-[8px] tw-flex tw-flex-col">
              <div contentEditable={true} className="tw-outline-none tw-whitespace-pre-wrap commentBox tw-cursor-text tw-break-all" role="textbox" tabIndex={0} placeholder="Write a comment..." onInput={handleComment} ref={textboxRef}>

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
          <div className="tw-flex tw-flex-col tw-gap-3 tw-pb-[16px]">
            {
              post.comments.length === 0 ?
                (
                  <div className="tw-text-center tw-p-[16px] tw-flex tw-flex-col tw-gap-1 tw-items-center tw-font-bold tw-text-[#65676B]">
                    <ForumIcon className="tw-w-[50px] tw-h-[50px]" />
                    <p>No comments yet, be the first person to comment :{")"}</p>
                  </div>
                ) :
                (
                  post.comments.map((e, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        <Comment comment={e} />
                      </React.Fragment>
                    )
                  })
                )
            }
          </div>
        </div>
      </div>
      { viewLikes.status && <ViewLikes /> }
    </div>
  )
}

export default Post;