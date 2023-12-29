"use client"
import { useAtom } from "jotai";
import PostCard from "./PostCard";
import WhatsOnYourMind from "./WhatsOnYourMind";
import { UserProps } from "@/type";
import { AddPostProfileAtom } from "@/store";
import AddPost from "./AddPost";

interface Props {
    user: UserProps
}

const HomeProfile = ({ user }: Props) => {
    const [openAddPostProfile, setOpenAddPostProfile] = useAtom(AddPostProfileAtom);

    return (
        <div className="tw-flex tw-flex-col tw-items-center tw-mt-5">
            <div className="tw-flex tw-gap-10">
                {/* Left side */}
                <div className="tw-flex tw-flex-col">
                    <h1>Intro</h1>
                </div>
                {/* Left side end */}

                {/* Right side */}
                <div className="tw-flex tw-flex-col tw-gap-4 tw-w-[680px]">
                    <WhatsOnYourMind user={user} type="PROFILE" />
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
            {
                openAddPostProfile &&
                <AddPost type="PROFILE" user={user} />
            }
        </div>
    )
}

export default HomeProfile;