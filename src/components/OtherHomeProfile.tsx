"use client"
import PostCard from "./PostCard";
import { UserProps } from "@/type";
import WatchLaterIcon from '@mui/icons-material/WatchLater';

interface Props {
    user: UserProps
}

const OtherHomeProfile = ({ user }: Props) => {

    const monthToString = (month: number) => {
        switch (month) {
            case 0:
                return "January"
            case 1:
                return "February"
            case 2:
                return "March"
            case 3:
                return "April"
            case 4:
                return "May"
            case 5:
                return "June"
            case 6:
                return "July"
            case 7:
                return "August"
            case 8:
                return "September"
            case 9:
                return "October"
            case 10:
                return "November"
            case 11:
                return "December"
        }
    }

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
                                        {/* <div className="tw-flex tw-justify-end">
                                        <div className="tw-rounded-md tw-bg-gray-200 tw-px-[12px] tw-py-2 tw-text-[12px] tw-font-bold tw-cursor-pointer hover:tw-brightness-95 tw-flex tw-items-center tw-gap-1" onClick={() => setEditBio(true)}>
                                            <EditIcon className="tw-w-[12px] tw-h-[12px]" />
                                            <span>
                                                Edit Bio
                                            </span>
                                        </div>
                                    </div> */}
                                    </div>
                                    <hr />
                                </div>
                            )
                    }
                    {/* <div className="tw-w-full tw-rounded-md tw-text-center tw-bg-gray-200 hover:tw-brightness-95 tw-px-[12px] tw-py-2 tw-cursor-pointer">
                        <span className="tw-text-[15px] tw-text-[#050505] tw-font-[600]">
                            Add current city
                        </span>
                    </div>

                    <div className="tw-w-full tw-rounded-md tw-text-center tw-bg-gray-200 hover:tw-brightness-95 tw-px-[12px] tw-py-2 tw-cursor-pointer">
                        <span className="tw-text-[15px] tw-text-[#050505] tw-font-[600]">
                            Add where you from
                        </span>
                    </div> */}

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
                                    <PostCard featureImage={e.featureImage} description={e.description} likes={e.likes} shares={e.shares} author={user} />
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
        </div>
    )
}

export default OtherHomeProfile;