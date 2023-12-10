"use client"
import Image from "next/image";
import { useAtom } from "jotai";
import { AddPostModalAtom, userAtom } from "@/store";
import { useHydrateAtoms } from 'jotai/utils';
import WhatsOnYourMind from "./WhatsOnYourMind";
import { UserProps } from "@/type";
import AddPost from "./AddPost";

const Home = ({ user }: {user: UserProps}) => {
    useHydrateAtoms([[userAtom, user]]);

    const [User] = useAtom(userAtom);
    const [openAddPost, setOpenAddPost] = useAtom(AddPostModalAtom);
    
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
                <div className="tw-sticky tw-top-[70px] tw-h-full tw-z-0 tw-overflow-x-hidden tw-overflow-y-hidden">
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

                <div className="tw-flex tw-flex-col tw-h-[200vh] tw-w-[680px]">
                    {
                        openAddPost && <AddPost />
                    }
                    <WhatsOnYourMind />
                </div>

                <div className="tw-flex tw-flex-col">
                    <span className="tw-text-[17px] tw-text-[#65676B]">Friends</span>
                </div>
            </div>
        </main>
    )
}

export default Home;