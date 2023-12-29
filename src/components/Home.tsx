"use client"
import Image from "next/image";
import { useAtom } from "jotai";
import { AddPostModalAtom, userAtom } from "@/store";
import { useHydrateAtoms } from 'jotai/utils';
import WhatsOnYourMind from "./WhatsOnYourMind";
import { PostProps, UserProps } from "@/type";
import AddPost from "./AddPost";
import PostCard from "./PostCard";
import { useQuery } from "react-query";
import LoadingScreen from "./LoadingScreen";

interface Props {
    user: UserProps,
    posts: PostProps
};

const Home = ({ user, posts }: Props) => {
    useHydrateAtoms([[userAtom, user]]);

    const [User] = useAtom(userAtom);
    const [openAddPost, setOpenAddPost] = useAtom(AddPostModalAtom);
    
    const getPosts = async () => {
        const res = await fetch("http://localhost:8080/admin/post/list", {
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
                source: "/images/placeholder.png",
                width: 36,
                height: 36
            },
            path: "/",
            name: `${User.firstName} ${User.lastName}`
        },
        {
            image: {
                source: "/images/placeholder.png",
                width: 36,
                height: 36
            },
            path: "/",
            name: `Friends`
        },
        {
            image: {
                source: "/images/placeholder.png",
                width: 36,
                height: 36
            },
            path: "/",
            name: `Saved`
        },
        {
            image: {
                source: "/images/placeholder.png",
                width: 36,
                height: 36
            },
            path: "/",
            name: `Memories`
        },
        {
            image: {
                source: "/images/placeholder.png",
                width: 36,
                height: 36
            },
            path: "/",
            name: `Groups`
        },
        {
            image: {
                source: "/images/placeholder.png",
                width: 36,
                height: 36
            },
            path: "/",
            name: `Video`
        },
    ]
    return (
        <main className="flex flex-col">
            <div className="tw-flex tw-justify-center tw-gap-[32px]">
                {/** Side Bar Navigation */}
                <div className="tw-sticky tw-top-[70px] tw-h-full tw-z-0 tw-overflow-x-hidden tw-overflow-y-hidden tw-hidden home-xl:tw-block">
                    <div className="tw-flex">
                        <div className="tw-flex tw-flex-col tw-max-w-[360px] tw-w-full tw-text-[15px] tw-font-bold tw-gap-3">
                            {
                                sideBar.map((e, idx) => {
                                    return (
                                        <div className="tw-flex tw-items-center tw-gap-2" key={idx}>
                                            <Image src={e.image.source} width={e.image.width} height={e.image.height} alt="Feature Image" className="tw-rounded-[50%]" />
                                            <span>
                                                {e.name}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/** Main Content Driver Area */}
                <div className="tw-flex tw-flex-col tw-w-[680px] tw-gap-4">
                    {
                        openAddPost && <AddPost type="HOME" user={User}/>
                    }
                    <WhatsOnYourMind user={User} type="HOME"/>
                    {
                        status === "loading" ?
                        (
                            <LoadingScreen />
                        ):
                        (
                            data.map((e: any, idx: any) => {
                                return <PostCard description={e.description} featureImage={e.featureImage} likes={e.likes} author={e.author} shares={e.shares} key={idx}/>
                            })
                        )
                    }
                    <hr />
                    <small className="tw-text-center tw-mb-3">
                        You are updated ; {")"}
                    </small>
                </div>
                {/** Friend requests/Ads in the future */}
                <div className="home-xl:tw-flex tw-flex-col tw-hidden">
                    <span className="tw-text-[17px] tw-text-[#65676B]">Friends</span>
                </div>
            </div>
        </main>
    )
}

export default Home;