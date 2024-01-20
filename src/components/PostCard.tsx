"use client"
import { PostProps } from "@/type";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from "next/link";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import linkifyHtml from 'linkify-html';
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { ViewPostAtom, userAtom } from "@/store";
import { useQueryClient } from "react-query";
import { baseURL } from "@/env";

interface Props {
    post: PostProps,
    userId: number,
    token: string
}
const PostCard = ({ post, userId, token }: Props) => {
    const queryClient = useQueryClient();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [user] = useAtom(userAtom);
    const [viewPost, setViewPost] = useAtom(ViewPostAtom);
    const router = useRouter();

    const linkifyDescrip = () => {
        return { __html: linkifyHtml(post.description, {defaultProtocol: 'https', target: '_blank'})}
    }

    const likePost = async () => {
        const res = await fetch(`${baseURL}/user/like/post`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email: user.email,
                postId: post.id
            })
        });

        const data = await res.json();

        if (data.status) {
            router.refresh();
            queryClient.invalidateQueries('posts');
        }
    }

    return (
        <div className="tw-rounded-md tw-shadow-md tw-max-w-[680px] tw-w-full tw-bg-white tw-flex tw-flex-col">
            <div className="tw-flex tw-flex-col tw-px-[16px] tw-pt-[12px] tw-pb-[16px]">
                <div className="tw-flex tw-gap-2">
                    <Link href={`${post.author.firstName}.${post.author.lastName}.${post.author.id}`} className="tw-max-w-[40px] tw-max-h-[40px] tw-w-full tw-h-full tw-rounded-[1000px]">
                        <Image src={`${post.author.profilePicture ? post.author.profilePicture : "/images/placeholder.png"}`} width={40} height={40} alt="profile pic" className="tw-max-w-[40px] tw-h-[40px] tw-w-full tw-rounded-[1000px]" />
                    </Link>
                    <div className="tw-flex tw-justify-between tw-flex-1">
                        {/* <span className="tw-text-[15px] tw-font-bold tw-whitespace-nowrapp">{`${author.firstName} ${author.lastName}`}</span> */}
                        <Link href={`${post.author.firstName}.${post.author.lastName}.${post.author.id}`} className="tw-text-[15px] tw-font-bold tw-whitespace-nowrapp hover:tw-underline">
                            {`${post.author.firstName} ${post.author.lastName}`}
                        </Link>
                        <div className="tw-flex tw-gap-4">
                            <MoreHorizIcon className="tw-w-[20px] tw-h-[20px] tw-cursor-pointer" />
                            <CloseIcon className="tw-w-[20px] tw-h-[20px] tw-cursor-pointer" />
                        </div>
                    </div>
                </div>
                <span className="tw-text-[15px] tw-pt-2" dangerouslySetInnerHTML={linkifyDescrip()} id="descrip">
                    {/* {description} */}
                </span>
            </div>
            {
                post.featureImage.substring(post.featureImage.lastIndexOf('.')) === '.mp4' ?
                (
                    <video width={680} height={680} controls loop>
                        <source src={`https${post.featureImage.substring(post.featureImage.indexOf(':'))}`} type="video/mp4" />
                    </video>
                ):
                (
                    <Image src={post.featureImage} width={680} height={680} alt="photo" className="tw-max-w-[680px] tw-max-h-[680px] tw-w-full tw-h-full" priority />
                )
            }
            <div className="tw-flex tw-justify-between tw-px-5 tw-text-[#65676B] tw-text-[15px] tw-py-2">
                <span>
                    {post.likes.length} likes
                </span>
                <div className="tw-flex tw-gap-3">
                    <span>
                        0 comments
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
                <div className={`tw-flex tw-gap-2 tw-items-center hover:tw-bg-gray-200 tw-cursor-pointer hover:tw-rounded-md tw-w-full tw-justify-center tw-py-3 ${post.likes.some(e => e.userId === userId) && " tw-text-blue-600"}`} onClick={likePost}>
                    <ThumbUpOffAltIcon className="tw-w-[20px] tw-h-[20px]" />
                    Like
                </div>

                <div className="tw-flex tw-gap-2 tw-items-center hover:tw-bg-gray-200 tw-cursor-pointer hover:tw-rounded-md tw-w-full tw-justify-center tw-py-3"
                onClick={() => setViewPost({ status: true, post: post, userId })}>
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