import Image from "next/image";

interface Props {
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phone?: string,
        gender: string,
        birthday?: string,
        createdAt: string,
        updatedAt?: string,
        disabledAt?: string
    }
}

const Home = ({ user }: Props) => {
    console.log("User:", user);
    const sideBar = [
        {
            image: {
                source: "/images/placeholder.png",
                width: 36,
                height: 36
            },
            path: "/",
            name: `${user.firstName} ${user.lastName}`
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
        <main className="flex flex-col tw-pt-[70px]">
            <div className="tw-flex tw-justify-center tw-gap-[32px]">
                <div className="tw-sticky tw-top-[70px] tw-h-[1185px] tw-z-0 tw-overflow-x-hidden tw-overflow-y-hidden">
                    <div className="tw-flex">
                        <div className="tw-flex tw-flex-col tw-w-[360px] tw-text-[15px] tw-font-bold tw-gap-3">
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
                    <h1>Hello</h1>
                </div>

                <div className="tw-flex tw-flex-col">

                </div>
            </div>
        </main>
    )
}

export default Home;