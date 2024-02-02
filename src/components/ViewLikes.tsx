"use client"

import { ViewLikesAtom } from "@/store"
import { useAtom } from "jotai"
import Image from "next/image";
import Link from "next/link";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ViewLikes = () => {
  const [view, setView] = useAtom(ViewLikesAtom);

  return (
    // view.likes &&
    // (
    //   <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-max-h-[100vh] tw-h-full tw-px-[16px] tw-py-5 tw-bg-[rgb(0,0,0)] tw-bg-[rgba(0,0,0,0.4)] tw-z-[1000]">

    //   </div>
    // )
    view.likes &&
    (
      <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-max-h-[100vh] tw-h-full tw-px-[16px] tw-py-5 tw-bg-[rgb(0,0,0)] tw-bg-[rgba(0,0,0,0.4)] tw-z-[1000] tw-overflow-hidden"
        onClick={() => setView({ status: false, likes: null, userId: 0, type: "" })}>
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-overflow-hidden">
          <div className="tw-rounded-md tw-bg-white tw-shadow-md tw-flex tw-flex-col tw-gap-2 tw-max-w-[550px] tw-w-full tw-relative tw-h-[370px] tw-overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="tw-flex tw-w-full tw-sticky tw-top-0 tw-h-[60px] tw-text-[#65676B] tw-font-bold tw-z-[100] tw-py-1 tw-bg-white">
              <div className="tw-px-[16px] tw-flex tw-w-full tw-items-center">
                <span className="tw-px-[16px] hover:tw-rounded-md hover:tw-bg-gray-200 tw-cursor-pointer tw-h-full tw-flex tw-items-center">All</span>
              </div>
            </div>
            <div className="tw-h-[370px] tw-overflow-y-auto tw-flex tw-flex-col tw-gap-2 tw-absolute tw-w-full tw-pb-2 tw-pt-[60px]">
              {
                view.likes.length > 0 ?
                  (
                    view.likes.map((e, idx) => {
                      return (
                        // <span key={idx} className="tw-text-[15px] tw-font-bold">
                        //   {e.user.firstName} {e.user.lastName}
                        // </span>
                        <div key={idx} className="tw-flex tw-text-[15px] tw-font-bold tw-px-[8px] tw-items-center tw-gap-3">
                          <Link href={`${e.user.firstName}.${e.user.lastName}.${e.user.id}`}>
                            <Image src={e.user.profilePicture ? e.user.profilePicture : "/images/placeholder.png"} width={40} height={40} alt={`${e.user.firstName} ${e.user.lastName}`} className="tw-rounded-[1000px] tw-h-[40px] tw-w-[40px]" />
                          </Link>
                          <div className="tw-flex tw-flex-1 tw-justify-between tw-h-full">
                            <div className="tw-flex tw-items-center">
                              <Link href={`${e.user.firstName}.${e.user.lastName}.${e.user.id}`} className="hover:tw-underline">
                                {e.user.id === view.userId ? "You" : `${e.user.firstName} ${e.user.lastName}`}
                              </Link>
                            </div>
                            {
                              e.user.id !== view.userId &&
                              (
                                <div className="tw-rounded-md tw-bg-gray-200 tw-flex tw-px-[12px] tw-items-center tw-cursor-pointer hover:tw-brightness-95 tw-gap-1">
                                  <PersonAddIcon className="tw-w-[16px] tw-h-[16px]" />
                                  <span>
                                    Add friend
                                  </span>
                                </div>
                              )
                            }
                          </div>
                        </div>
                      )
                    })
                  ) :
                  (
                    <span className="tw-text-[15px] tw-font-bold tw-text-center">No Likes Yet...</span>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default ViewLikes;