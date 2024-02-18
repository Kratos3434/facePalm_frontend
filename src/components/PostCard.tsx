"use client"
import { PostProps, UserProps } from "@/type";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from "next/link";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { ViewLikesAtom, ViewPostAtom, userAtom } from "@/store";
import { useQueryClient } from "react-query";
import { userBaseURL } from "@/env";
import { generateDate } from "@/helper";
import { linkifyDescrip } from "@/helper";

import { socket } from "@/socket";

interface Props {
    post: PostProps,
    currentUser: UserProps
    token: string,
    type: string
}
const PostCard = ({ post, currentUser, token, type }: Props) => {
    const queryClient = useQueryClient();
    const [user] = useAtom(userAtom);
    const [viewPost, setViewPost] = useAtom(ViewPostAtom);
    const [viewLikes, setViewLikes] = useAtom(ViewLikesAtom);
    const router = useRouter();

    const likePost = async () => {
        const res = await fetch(`${userBaseURL}/like/post/${post.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            } 
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
            queryClient.invalidateQueries('posts');
        }
    }

    return (
        <div className="tw-rounded-md tw-shadow-md tw-max-w-[680px] tw-w-full tw-bg-white tw-flex tw-flex-col">
            <div className={`tw-flex tw-flex-col tw-px-[16px] tw-pt-[12px] ${post.featureImage && "tw-pb-[16px]"}`}>
                <div className="tw-flex tw-gap-2">
                    <Link href={`${post.author.firstName}.${post.author.lastName}.${post.author.id}`} className="tw-max-w-[40px] tw-max-h-[40px] tw-w-full tw-h-full tw-rounded-[1000px]">
                        <Image src={`${post.author.profilePicture ? post.author.profilePicture : "/images/placeholder.png"}`} width={40} height={40} alt="profile pic" className="tw-max-w-[40px] tw-h-[40px] tw-w-full tw-rounded-[1000px]" />
                    </Link>
                    <div className="tw-flex tw-justify-between tw-flex-1">
                        {/* <span className="tw-text-[15px] tw-font-bold tw-whitespace-nowrapp">{`${author.firstName} ${author.lastName}`}</span> */}
                        <div className="tw-flex tw-flex-col">
                            <Link href={`${post.author.firstName}.${post.author.lastName}.${post.author.id}`} className="tw-text-[15px] tw-font-bold tw-whitespace-nowrapp hover:tw-underline">
                                {`${post.author.firstName} ${post.author.lastName}`}
                            </Link>
                            <span className="tw-text-[13px] tw-text-[#65676B]">
                                {generateDate(post.createdAt)}
                            </span>
                        </div>
                        <div className="tw-flex tw-gap-4">
                            <MoreHorizIcon className="tw-w-[20px] tw-h-[20px] tw-cursor-pointer" />
                            <CloseIcon className="tw-w-[20px] tw-h-[20px] tw-cursor-pointer" />
                        </div>
                    </div>
                </div>
                <span className={`tw-text-[15px] ${!post.featureImage && "tw-font-bold"} tw-pt-2`} dangerouslySetInnerHTML={linkifyDescrip(post.description)} id="descrip">
                    {/* {description} */}
                </span>
            </div>
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
                <span className="tw-cursor-pointer hover:tw-underline" onClick={() => setViewLikes({ status: true, likes: post.likes, userId: currentUser.id, type })}>
                    {post.likes.length} likes
                </span>
                <div className="tw-flex tw-gap-3">
                    <span className="tw-cursor-pointer hover:tw-underline" onClick={() => setViewPost({ status: true, post: post, userId: currentUser.id, type })}>
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

                <div className="tw-flex tw-gap-2 tw-items-center hover:tw-bg-gray-200 tw-cursor-pointer hover:tw-rounded-md tw-w-full tw-justify-center tw-py-3"
                    onClick={() => setViewPost({ status: true, post: post, userId: currentUser.id, type })}>
                    <ChatBubbleOutlineIcon className="tw-w-[20px] tw-h-[20px]" />
                    Comment
                </div>

                <div className="tw-flex tw-gap-2 tw-items-center hover:tw-bg-gray-200 tw-cursor-pointer hover:tw-rounded-md tw-w-full tw-justify-center tw-py-3">
                    <ReplyIcon className="tw-w-[20px] tw-h-[20px]" />
                    Share
                </div>
            </div>
        </div>
    )
}

export default PostCard;