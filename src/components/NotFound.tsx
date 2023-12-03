"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter();
    return (
        <div className="tw-flex tw-justify-center tw-h-[94.5vh]">
            <div className="tw-flex tw-flex-col tw-justify-center">
                <div className="tw-flex tw-flex-col tw-text-center tw-max-w-[500px] tw-w-full tw-gap-5">
                    <span className="tw-text-[20px] tw-text-[#65676B] tw-font-bold">
                        This content isn{"'"}t available right now
                    </span>
                    <span className="tw-text-[17px] tw-text-[#65676B]">
                        When this happens, it{"'"}s usually because the owner only shared in with a small group of people, changed who can see it or it{"'"}s been deleted.
                    </span>
                    <div className="tw-flex tw-justify-center">
                        <Link href="/" className="tw-rounded-md tw-text-white tw-bg-[#0866FF] tw-px-10 tw-py-2 hover:tw-brightness-90">
                            <span className="tw-text-[17px] tw-font-bold">
                                Go to News Feed
                            </span>
                        </Link>
                    </div>
                    <span className="tw-text-[#3E6AD1] tw-text-[17px] tw-font-bold tw-cursor-pointer hover:tw-underline" onClick={() => router.back()}>
                        Go Back
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NotFound;