"use client"
import { AddStatusAtom } from "@/store";
import { UserProps } from "@/type";
import { useAtom } from "jotai";
import Link from "next/link";
import Image from "next/image";
import PublicIcon from '@mui/icons-material/Public';
import { useRef, useState } from "react";
import { userBaseURL } from "@/env";
import LoadingScreen from "./LoadingScreen";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  user: UserProps,
  token: string
}

const AddStatus = ({ user, token }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [openAddStatus, setOpenAddStatus] = useAtom(AddStatusAtom);
  const [description, setDescription] = useState("");
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState("");

  const textboxRef = useRef<HTMLDivElement>(null);

  const handleDescription = () => {
    if (textboxRef.current)
      setDescription(textboxRef.current?.innerText);
  }

  const handlePost = async (e: any) => {
    e.preventDefault();
    isLoading(true);
    if (!description) {
      setError("Description is required");
      isLoading(false);
      return false;
    }
    const formdata: any = new FormData();
    formdata.append("description", description);

    const res = await fetch(`${userBaseURL}/add/post`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formdata
    });

    const data = await res.json();

    if (!data.status) {
      setError(data.error);
      isLoading(false);
    } else {
      router.refresh();
      queryClient.invalidateQueries('posts');
      setOpenAddStatus({ status: false, type: "" });
    }
  }

  return (
    <div className="tw-fixed tw-top-0 tw-left-0 tw-h-[100vh] tw-z-[1000] tw-bg-[rgb(0,0,0)] tw-bg-[rgba(0,0,0,0.4)] tw-px-[16px] tw-py-2 tw-w-full"
      onClick={() => setOpenAddStatus({ status: false, type: "" })}>
      <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-w-full">
        <div className="tw-rounded-md tw-bg-white tw-shadow-lg tw-max-w-[500px] tw-w-full tw-pb-2" onClick={(e) => e.stopPropagation()}>
          <div className="tw-relative tw-p-2 tw-text-[20px] tw-font-bold tw-text-center">
            <span>Create post</span>
            <div className="tw-absolute tw-top-0 tw-right-0 tw-px-[16px] tw-pt-2 tw-cursor-pointer" onClick={() => setOpenAddStatus({ status: false, type: "" })}>
              <CloseIcon className="tw-w-[24px] tw-h-[24px]" />
            </div>
          </div>
          <hr />
          <div className="tw-flex tw-flex-col tw-px-[16px]">
            <div className="tw-flex tw-justify-start tw-gap-2 tw-items-center tw-py-[16px]">
              <Link href={`${user.firstName}.${user.lastName}.${user.id}`}>
                <Image src={`${user.profilePicture ? user.profilePicture : "/images/placeholder.png"}`} width={40} height={40} className="tw-w-[40px] tw-h-[40px] tw-rounded-[1234px]" alt="profile" />
              </Link>
              <div className="tw-flex tw-flex-col">
                <Link className="tw-text-[15px] tw-text-black tw-font-[500] hover:tw-underline" href={`${user.firstName}.${user.lastName}.${user.id}`}>
                  {user.firstName} {user.lastName}
                </Link>
                <div className="tw-flex tw-px-[8px] tw-py-[4px] tw-items-center tw-rounded-md tw-bg-gray-200">
                  <PublicIcon className="tw-w-[12px] tw-h-[12px]" />
                  <span className="tw-text-[13px]">Public</span>
                </div>
              </div>
            </div>
            <form className="tw-flex tw-flex-col tw-gap-5" onSubmit={handlePost}>
              <div contentEditable={true} spellCheck={false} className="tw-w-full tw-outline-none tw-resize-none tw-relative statusBox tw-cursor-text" aria-label={`What's on your mind ${user.lastName}`} tabIndex={0} role="textbox" placeholder={`What's on your mind, ${user.firstName}?`}
                ref={textboxRef} onInput={handleDescription}></div>

              {
                description && !loading ?
                  (
                    <button className="tw-text-center tw-rounded-md tw-bg-[#0866FF] tw-text-[15px] tw-text-black tw-font-bold tw-py-2">
                      Post
                    </button>
                  ) :
                  (
                    <span className="tw-text-center tw-rounded-md tw-bg-gray-200 tw-text-[15px] tw-text-gray-400 tw-font-bold tw-py-2 tw-cursor-not-allowed">
                      Post
                    </span>
                  )
              }
              {loading && <LoadingScreen />}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStatus;