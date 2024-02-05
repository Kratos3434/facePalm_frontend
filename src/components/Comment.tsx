import Link from "next/link";
import Image from "next/image";
import { CommentProps } from "@/type";
import { linkifyDescrip } from "@/helper";

interface Props {
  comment: CommentProps
}

const Comment = ({ comment }: Props) => {
  return (
    <div className="tw-flex tw-gap-1">
      <Link href={`/${comment.author.firstName}.${comment.author.lastName}.${comment.author.id}`} className="tw-shrink-0">
        <Image src={comment.author.profilePicture ? comment.author.profilePicture : "/images/placeholder.png"} width={32} height={32} alt={`${comment.author.firstName} ${comment.author.lastName}`} className="tw-rounded-[1000px] tw-w-[32px] tw-h-[32px]" />
      </Link>
      <div className="tw-px-[12px] tw-py-[8px] tw-rounded-xl tw-bg-gray-100">
        <Link className="tw-text-[13px] tw-font-bold hover:tw-underline" href={`/${comment.author.firstName}.${comment.author.lastName}.${comment.author.id}`}>
          {comment.author.firstName} {comment.author.lastName}
        </Link>
        <div className="tw-text-[15px] tw-break-all tw-whitespace-normal tw-w-full" dangerouslySetInnerHTML={linkifyDescrip(comment.comment)} id="descrip">
          {/* {comment.comment} */}
        </div>
      </div>
    </div>
  )
}

export default Comment;