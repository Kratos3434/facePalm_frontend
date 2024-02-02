"use client"
import { AddStatusAtom } from "@/store";
import { UserProps } from "@/type";
import { useAtom } from "jotai";

interface Props {
  user: UserProps,
  token: string
}
                                                           
const AddStatus = ({ user, token }: Props) => {
  const [openAddStatus, setOpenAddStatus] = useAtom(AddStatusAtom);

  return (
    <div className="tw-fixed tw-top-0 tw-left-0 tw-h-[100vh] tw-z-[1000] tw-bg-[rgb(0,0,0)] tw-bg-[rgba(0,0,0,0.4)] tw-px-[16px] tw-py-2 tw-w-full"
     onClick={() => setOpenAddStatus({ status: false, type: "" })}>
      <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-w-full">
        <div className="tw-rounded-md tw-bg-white tw-shadow-lg" onClick={(e) => e.stopPropagation()}>
          <div className="tw-relative tw-p-2 tw-text-[20px] tw-font-bold tw-text-center">
            Create post
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStatus;