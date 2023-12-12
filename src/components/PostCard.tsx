"use client"
import { PostProps } from "@/type";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useRouter } from "next/navigation";
import Link from "next/link";

const PostCard = ({ photo, description, likes, author }: PostProps) => {
    const router = useRouter();

    const handleImageClick = () => {
        router.push(`${author.firstName}.${author.lastName}.${author.id}`);
    }
    return (
        <div className="tw-rounded-md tw-shadow-md tw-max-w-[680px] tw-w-full tw-bg-white tw-flex tw-flex-col">
            <div className="tw-flex tw-flex-col tw-px-[16px] tw-pt-[12px] tw-pb-[16px]">
                <div className="tw-flex tw-gap-2">
                    <Link href={`${author.firstName}.${author.lastName}.${author.id}`} className="tw-max-w-[40px] tw-max-h-[40px] tw-w-full tw-h-full tw-rounded-[1000px]">
                        <Image src="/images/cat2.jpg" width={40} height={40} alt="profile pic" className="tw-max-w-[40px] tw-max-h-[40px] tw-w-full tw-h-full tw-rounded-[1000px]" />
                    </Link>
                    <div className="tw-flex tw-justify-between tw-flex-1">
                        <span className="tw-text-[15px] tw-font-bold tw-whitespace-nowrapp">{`${author.firstName} ${author.lastName}`}</span>
                        <div className="tw-flex tw-gap-4">
                            <MoreHorizIcon className="tw-w-[20px] tw-h-[20px] tw-cursor-pointer" />
                            <CloseIcon className="tw-w-[20px] tw-h-[20px] tw-cursor-pointer" />
                        </div>
                    </div>
                </div>
                <span className="tw-text-[15px]">
                    {description}
                </span>
            </div>
            <Image src={photo} width={680} height={680} alt="photo" className="tw-max-w-[680px] tw-max-h-[680px] tw-w-full tw-h-full" priority />
        </div>
    )
}

export default PostCard;