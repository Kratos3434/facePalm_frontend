"use client"
import Modal from "./Modal";
import { useAtom } from "jotai";
import { ChangeCoverPicModalAtom, userProfileAtom } from "@/store";
import { useQueryClient } from "react-query";
import { useState } from "react";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { useCookies } from "react-cookie";
import LoadingScreen from "./LoadingScreen";
import { useRouter } from "next/navigation";
import { userBaseURL } from "@/env";
import { checkImageType } from "@/helper";

interface Props {
    token: string
}

const ChangeCoverPhoto = ({ token }: Props) => {
    const router = useRouter();
    const [user, setUser] = useAtom(userProfileAtom);
    const queryClient = useQueryClient();
    const [photo, setPhoto] = useState<File | null>();
    const [cookies] = useCookies();
    const [openCoverPicModal, setOpenCoverPicModal] = useAtom(ChangeCoverPicModalAtom);
    const [loading, isLoading] = useState(false);
    const [error, setError] = useState({ status: false, msg: "" });

    const handleChangeCoverPic = async (e: any) => {
        e.preventDefault();
        isLoading(true);
        if (photo) {
            const fileType = photo.name.substring(photo.name.lastIndexOf('.'));
            if (!checkImageType(fileType)) {
                setError({ status: true, msg: "Invalid image" });
                isLoading(false);
                return false;
            }
        }
        const formdata: any = new FormData();
        formdata.append("email", user.email);
        formdata.append("coverpicture", photo);
        const res = await fetch(`${userBaseURL}/update/coverpicture`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formdata
        })

        const data = await res.json();

        if (data.status) {
            // setUser(data.data);
            router.refresh();
            queryClient.invalidateQueries('user');
            setOpenCoverPicModal(false);
        } else {
            console.log("Something went wrong :(");
        }
    }

    return (
        <Modal className="tw-flex tw-flex-col tw-items-center tw-h-[100vh] tw-justify-center">
            <div className="tw-flex tw-flex-col tw-max-w-[500px] tw-w-full tw-bg-white tw-rounded-md tw-shadow-md tw-p-3 tw-gap-2">
                <div className="tw-flex tw-justify-center tw-relative">
                    <span className="tw-text-[20px] tw-font-bold">
                        Choose Cover Photo
                    </span>
                    <div className="tw-absolute tw-right-0 tw-pr-[16px] tw-cursor-pointer" onClick={() => setOpenCoverPicModal(false)}>
                        <CloseIcon className="tw-w-[24px] tw-h-[24px]" />
                    </div>
                </div>
                <hr />
                <form onSubmit={handleChangeCoverPic}>
                    <div className="tw-flex tw-flex-col tw-gap-5">
                        {
                            !photo ?
                                (
                                    <label className="tw-w-full tw-rounded-md tw-border-[1px] tw-border-gray-400 tw-p-2 tw-relative tw-items-center">
                                        <div className="tw-w-full tw-bg-gray-100 tw-rounded-md tw-h-[221px] tw-flex tw-flex-col tw-justify-center tw-text-center tw-cursor-pointer hover:tw-bg-gray-200 tw-transition-all">
                                            <input type="file" className="tw-w-full tw-hidden" onChange={(e) => {
                                                e.target.files && setPhoto(e.target.files[0])
                                            }} />
                                            <div className="tw-flex tw-w-full tw-justify-center tw-items-center">
                                                <div className="tw-rounded-[1000px] tw-bg-gray-300 tw-p-2">
                                                    <AddToPhotosIcon className="tw-w-[20px] tw-h-[20px]" />
                                                </div>
                                            </div>
                                            <span className="tw-text-[17px] tw-text-black tw-font-bold">
                                                Choose Photo
                                            </span>
                                            <span className="tw-text-[12px] tw-text-gray-400">
                                                or drag and drop
                                            </span>
                                        </div>
                                    </label>
                                ) :
                                (
                                    <div className="tw-w-full tw-rounded-md tw-border-[1px] tw-border-gray-400 tw-p-2 tw-relative tw-items-center">
                                        <Image src={URL.createObjectURL(photo)} width={450} height={221} alt="chosen photo" className="tw-w-full tw-bg-gray-100 tw-rounded" />
                                        <div className="tw-absolute tw-top-0 tw-right-0  tw-flex tw-justify-center tw-items-center tw-p-3">
                                            <div className="tw-rounded-[1234px] tw-bg-gray-200 tw-p-1 tw-px-2 tw-cursor-pointer hover:tw-brightness-75" onClick={() => setPhoto(null)}>
                                                <CloseIcon className="tw-w-[16px] tw-h-[16px]" />
                                            </div>
                                        </div>
                                    </div>
                                )
                        }
                        {
                            error.status &&
                            (
                                <small className="tw-font-bold tw-text-red-600">
                                    *{error.msg}
                                </small>
                            )
                        }
                        {
                            photo ?
                                (
                                    <button className="tw-text-center tw-rounded-md tw-bg-[#0866FF] tw-text-[15px] tw-text-black tw-font-bold tw-py-2">
                                        Change Cover Photo
                                    </button>
                                ) :
                                (
                                    <span className="tw-text-center tw-rounded-md tw-bg-gray-200 tw-text-[15px] tw-text-gray-400 tw-font-bold tw-py-2">
                                        Change Cover Photo
                                    </span>
                                )
                        }
                    </div>
                </form>
            </div>
            {
                loading && <LoadingScreen />
            }
        </Modal>
    )

}

export default ChangeCoverPhoto;