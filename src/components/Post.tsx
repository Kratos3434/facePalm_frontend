import { generateDate, linkifyDescrip } from "@/helper";
import { PostProps } from "@/type"
import Image from "next/image";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from "next/link";

const Post = ({ post, token }: { post: PostProps, token?: string }) => {
  return (
    <div className="tw-flex tw-w-full tw-justify-center tw-px-[16px] tw-py-2 tw-pt-5">
      <div className="tw-rounded-md tw-bg-white tw-shadow-lg tw-max-w-[500px] tw-w-full">
        <div className="tw-flex tw-items-center tw-px-[16px] tw-pt-[12px] tw-mb-[12px] tw-gap-2">
          <Link href={`${post.author.firstName}.${post.author.lastName}.${post.author.id}`}>
            <Image src={post.author.profilePicture ? post.author.profilePicture : "/images/placeholder.png"} width={40} height={40} alt={`${post.author.firstName} ${post.author.lastName}`} className="tw-w-[40px] tw-h-[40px] tw-rounded-[1000px]" />
          </Link>
          <div className="tw-flex tw-justify-between tw-items-center tw-flex-1">
            <div className="tw-flex tw-flex-col">
              <Link className="tw-text-[15px] tw-font-bold hover:tw-underline" href={`${post.author.firstName}.${post.author.lastName}.${post.author.id}`}>
                {post.author.firstName} {post.author.lastName}
              </Link>
              <span className="tw-text-[13px] tw-text-[#65676B]">
                {generateDate(post.createdAt)}
              </span>
            </div>
            <MoreHorizIcon className="tw-w-[20px] tw-h-[20px]" />
          </div>
        </div>
        <span className="tw-px-[16px] tw-pb-[16px]" dangerouslySetInnerHTML={linkifyDescrip(post.description)} id="descrip"></span>
        {
          post.featureImage &&
          (
            post.featureImage.substring(post.featureImage.lastIndexOf('.')) === '.mp4' ?
              (
                <video width={680} height={680} controls loop>
                  <source src={`https${post.featureImage.substring(post.featureImage.indexOf(':'))}`} type="video/mp4" />
                </video>
              ) :
              (
                <Image src={post.featureImage} width={680} height={680} alt="photo" className="tw-max-w-[680px] tw-max-h-[680px] tw-w-full tw-h-full" priority />
              )
          )
        }
      </div>
    </div>
  )
}

export default Post;