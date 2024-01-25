"use client"
import { useAtom } from "jotai";
import PostCard from "./PostCard";
import WhatsOnYourMind from "./WhatsOnYourMind";
import { UserProps } from "@/type";
import { AddPostProfileAtom } from "@/store";
import AddPost from "./AddPost";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { useState } from "react";
import { useForm, FieldValues } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import EditIcon from '@mui/icons-material/Edit';
import { baseURL } from "@/env";
import { ViewPostAtom } from "@/store";
import ViewPost from "./ViewPost";

interface Props {
    user: UserProps,
    token: string
}

const HomeProfile = ({ user, token }: Props) => {
    const router = useRouter();
    const [viewPost, setViewPost] = useAtom(ViewPostAtom);
    const [openAddPostProfile, setOpenAddPostProfile] = useAtom(AddPostProfileAtom);
    const [editBio, setEditBio] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [bioCharacters, setBioCharacters] = useState(101);
    const [bio, setBio] = useState("");

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

    const handleEditBio = async (e: any) => {
        e.preventDefault();
        const res = await fetch(`${baseURL}/user/update/bio`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ bio, email: user.email })
        });

        const data = await res.json();

        if (data.status) {
            setEditBio(false);
            setBioCharacters(101);
            setBio("");
            router.refresh();
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
                        editBio ?
                            (
                                <form onSubmit={handleEditBio}>
                                    <div className="tw-flex tw-flex-col tw-w-full tw-gap-1">
                                        <textarea rows={3} className="tw-w-full tw-rounded-md tw-bg-gray-200 tw-resize-none tw-border-[1px] tw-border-black focus:tw-border-[#0866FF] focus:tw-bg-white tw-items-center tw-text-center tw-px-[12px] tw-py-[8px] tw-outline-none tw-font-bold"
                                            maxLength={101} placeholder="Describe who you are" tabIndex={0} onChange={(e) => setBio(e.target.value)} onKeyDown={(e) => {
                                                switch (e.key) {
                                                    case "Backspace":
                                                        bioCharacters < 101 && setBioCharacters(bioCharacters + 1);
                                                        break;
                                                    default:
                                                        bioCharacters > 0 && setBioCharacters(bioCharacters - 1);
                                                }
                                            }}>
                                        </textarea>
                                        <div className="tw-flex tw-justify-end">
                                            <span className="tw-text-[13px] tw-text-gray-500">
                                                {bioCharacters} characters remaining
                                            </span>
                                        </div>
                                        <div className="tw-flex tw-justify-end tw-gap-1">
                                            <span className="tw-rounded-md tw-bg-gray-200 tw-px-[12px] tw-py-2 tw-text-[15px] tw-font-bold tw-cursor-pointer hover:tw-brightness-95" onClick={() => {
                                                    setEditBio(false);
                                                    setBioCharacters(101);
                                                    setBio("");
                                                }}>
                                                Cancel
                                            </span>
                                            {
                                                bio.length == 0 ?
                                                    (
                                                        <span className="tw-rounded-md tw-bg-gray-200 tw-px-[12px] tw-py-2 tw-text-[15px] tw-font-bold tw-text-gray-400 tw-cursor-not-allowed">
                                                            Save
                                                        </span>
                                                    ) :
                                                    (
                                                        <button className="tw-rounded-md tw-bg-gray-200 tw-px-[12px] tw-py-2 tw-text-[15px] tw-font-bold tw-cursor-pointer hover:tw-brightness-95 tw-text-black">
                                                            Save
                                                        </button>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </form>
                            ) :
                            (
                                !user.bio ?
                                    (
                                        <div className="tw-w-full tw-rounded-md tw-text-center tw-bg-gray-200 hover:tw-brightness-95 tw-px-[12px] tw-py-2 tw-cursor-pointer" onClick={() => setEditBio(true)}>
                                            <span className="tw-text-[15px] tw-text-[#050505] tw-font-[600]">
                                                Add bio
                                            </span>
                                        </div>
                                    ) :
                                    (
                                        <div className="tw-text-center tw-text-[15px]">
                                            <div className="tw-flex tw-flex-col tw-gap-1 tw-py-2">
                                                <div className="tw-py-2 tw-break-words">
                                                    {user.bio}
                                                </div>
                                                <div className="tw-flex tw-justify-end">
                                                    <div className="tw-rounded-md tw-bg-gray-200 tw-px-[12px] tw-py-2 tw-text-[12px] tw-font-bold tw-cursor-pointer hover:tw-brightness-95 tw-flex tw-items-center tw-gap-1" onClick={() => setEditBio(true)}>
                                                        <EditIcon className="tw-w-[12px] tw-h-[12px]" />
                                                        <span>
                                                            Edit Bio
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                            )
                    }
                    <div className="tw-w-full tw-rounded-md tw-text-center tw-bg-gray-200 hover:tw-brightness-95 tw-px-[12px] tw-py-2 tw-cursor-pointer">
                        <span className="tw-text-[15px] tw-text-[#050505] tw-font-[600]">
                            Add current city
                        </span>
                    </div>

                    <div className="tw-w-full tw-rounded-md tw-text-center tw-bg-gray-200 hover:tw-brightness-95 tw-px-[12px] tw-py-2 tw-cursor-pointer">
                        <span className="tw-text-[15px] tw-text-[#050505] tw-font-[600]">
                            Add where you from
                        </span>
                    </div>

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
                    <WhatsOnYourMind user={user} type="PROFILE" />
                    {
                        user.posts.map((e, idx) => {
                            return (
                                <span key={idx}>
                                    <PostCard post={e} userId={user.id} token={token} type="HomeProfile" />
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
                <AddPost type="PROFILE" user={user} token={token} />
            }
            {viewPost.status && viewPost.type === "HomeProfile" && <ViewPost currentUser={user} token={token} />}
        </div>
    )
}

export default HomeProfile;
