"use client"
import PostCard from "./PostCard";
import { UserProps } from "@/type";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { useAtom } from "jotai";
import { ViewPostAtom } from "@/store";
import ViewPost from "./ViewPost";
import { monthToString } from "@/helper";

interface Props {
    user: UserProps,
    token: string,
    currentUser: UserProps
}

const OtherHomeProfile = ({ user, token, currentUser }: Props) => {
    const [viewPost, setViewPost] = useAtom(ViewPostAtom);

    return (
        <div className="tw-flex tw-flex-col tw-items-center tw-mt-5 tw-w-full">
            <div className="tw-flex tw-gap-7 homeprof-md:tw-items-start tw-w-full tw-px-[16px] homeprof-md:tw-flex-row tw-flex-col tw-items-center tw-justify-center">
                {/* Left side */}
                <div className="tw-flex tw-flex-col tw-px-[16px] tw-py-[20px] tw-rounded-md tw-bg-white tw-shadow-md tw-gap-5 homeprof-md:tw-max-w-[490px] tw-max-w-[680px] tw-w-full">
                    <span className="tw-text-[20px] tw-font-bold">
                        Intro
                    </span>
                    {
                        !user.bio ?
                            (
                                <div className="tw-text-center tw-text-[15px]">
                                    <div className="tw-flex tw-flex-col tw-gap-1 tw-py-2">
                                        <div className="tw-py-2 tw-break-words">
                                            No Bio
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ) :
                            (
                                <div className="tw-text-center tw-text-[15px]">
                                    <div className="tw-flex tw-flex-col tw-gap-1 tw-py-2">
                                        <div className="tw-py-2 tw-break-words">
                                            {user.bio}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                    }

                    <div className="tw-flex tw-gap-2 tw-items-center">
                        <WatchLaterIcon className="tw-text-gray-400" />
                        <span className="tw-text-[15px] tw-text-[#050505]">
                            Joined {monthToString(new Date(user.createdAt).getMonth())} {new Date(user.createdAt).getFullYear()}
                        </span>
                    </div>
                </div>
                {/* Left side end */}

                {/* Right side */}
                <div className="tw-flex tw-flex-col tw-gap-4 tw-max-w-[680px] tw-w-full">
                    <div className="tw-rounded-md tw-bg-white tw-shadow-md tw-w-full tw-flex tw-justify-center tw-px-[16px] tw-py-[20px]">
                        <span className="tw-font-bold tw-text-[20px]">
                            Posts
                        </span>
                    </div>
                    {
                        user.posts.map((e, idx) => {
                            return (
                                <span key={idx}>
                                    <PostCard post={e} currentUser={currentUser} token={token} type="OtherHomeProfile" />
                                </span>
                            )
                        })
                    }
                    <hr />
                    <small className="tw-text-center tw-mb-3">
                        You are updated ; {")"}
                    </small>
                </div>
                {/* Right side end */}
            </div>
            {viewPost.status && viewPost.type === "OtherHomeProfile" && <ViewPost currentUser={currentUser} token={token} type="OtherHomeProfile" />}
        </div>
    )
}

export default OtherHomeProfile;