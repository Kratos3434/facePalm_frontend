"use client"
import Image from "next/image";
import { useAtom } from "jotai";
import { AddPostModalAtom, ViewPostAtom, userAtom } from "@/store";
import { useHydrateAtoms } from 'jotai/utils';
import WhatsOnYourMind from "./WhatsOnYourMind";
import { PostProps, UserProps } from "@/type";
import AddPost from "./AddPost";
import PostCard from "./PostCard";
import { useQuery } from "react-query";
import LoadingScreen from "./LoadingScreen";
import Link from "next/link";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import RestoreIcon from '@mui/icons-material/Restore';
import Groups2Icon from '@mui/icons-material/Groups2';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { baseURL } from "@/env";
import ViewPost from "./ViewPost";

interface Props {
    user: UserProps,
    posts: PostProps,
    token: string
};

const Home = ({ user, posts, token }: Props) => {
    const [openAddPost, setOpenAddPost] = useAtom(AddPostModalAtom);
    const [viewPost, setViewPost] = useAtom(ViewPostAtom);
    const getPosts = async () => {
        const res = await fetch(`${baseURL}/admin/post/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer dfsdfsdsdfsfssfvgthgbh"
            }
        });
        const data = await res.json();
        return data.data;
    }

    const { data, status } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        initialData: posts
    });

    const sideBar = [
        {
            image: {
                source: user.profilePicture ? user.profilePicture : "/images/placeholder.png",
                width: 36,
                height: 36
            },
            path: `${user.firstName}.${user.lastName}.${user.id}`,
            name: `${user.firstName} ${user.lastName}`
        },
        {
            icon: <PeopleAltIcon className="tw-w-[36px] tw-h-[36px] tw-text-[#1C89F6]" />,
            path: "/friends",
            name: `Friends`
        },
        {
            icon: <TurnedInIcon className="tw-w-[36px] tw-h-[36px] tw-text-[#BE45C5]" />,
            path: "/saved",
            name: `Saved`
        },
        {
            icon: <RestoreIcon className="tw-w-[36px] tw-h-[36px] tw-text-[#31B5FD]" />,
            path: "/memories",
            name: `Memories`
        },
        {
            icon: <Groups2Icon className="tw-w-[36px] tw-h-[36px] tw-text-[#24B2FE]" />,
            path: "/groups",
            name: `Groups`
        },
        {
            icon: <OndemandVideoIcon className="tw-w-[36px] tw-h-[36px] tw-text-[#24B2FE]" />,
            path: "/watch",
            name: `Video`
        },
    ]
    return (
        <main className="flex flex-col">
            <div className="tw-flex tw-justify-center tw-gap-[32px]">
                {/** Side Bar Navigation */}
                <div className="tw-sticky tw-top-[70px] tw-h-full tw-z-0 tw-overflow-x-hidden tw-overflow-y-hidden tw-hidden home-lg:tw-block tw-w-[344px]">
                    <div className="tw-flex">
                        <div className="tw-flex tw-flex-col tw-max-w-[360px] tw-w-full tw-text-[15px] tw-font-bold tw-gapp-3">
                            {
                                sideBar.map((e, idx) => {
                                    return (
                                        <Link className="tw-flex tw-items-center tw-gap-2 tw-rounded-md hover:tw-bg-gray-200 tw-px-[8px] tw-py-3" key={idx} href={e.path}>
                                            {
                                                e.image ?
                                                (
                                                    <Image src={e.image.source} width={e.image.width} height={e.image.height} alt="Feature Image" className="tw-rounded-[50%] tw-w-[36px] tw-h-[36px]" />
                                                ):
                                                (
                                                    e.icon
                                                )
                                            }
                                            <span>
                                                {e.name}
                                            </span>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/** Main Content Driver Area */}
                <div className="tw-flex tw-flex-col tw-w-[680px] tw-gap-4 home-lg:tw-pl-0 tw-pl-5 home-xxl:tw-pl-0">
                    {
                        openAddPost && <AddPost type="HOME" user={user} token={token} />
                    }
                    <WhatsOnYourMind user={user} type="HOME"/>
                    {
                        status === "loading" ?
                        (
                            <LoadingScreen />
                        ):
                        (
                            data.map((e: any, idx: number) => {
                                return (
                                    <span key={idx}>
                                        <PostCard post={e} currentUser={user} token={token} type="Home" />
                                    </span>
                                )
                            })
                        )
                    }
                    <hr />
                    <small className="tw-text-center tw-mb-3">
                        You are updated ; {")"}
                    </small>
                </div>
                {/** Friend requests/Ads in the future */}
                <div className="home-xl:tw-flex tw-flex-col tw-hidden tw-w-[260px]">
                    <span className="tw-text-[17px] tw-text-[#65676B]">Friends</span>
                </div>
            </div>
            {viewPost.status && viewPost.type === "Home" && <ViewPost currentUser={user} token={token} type="Home" />}
        </main>
    )
}

export default Home;