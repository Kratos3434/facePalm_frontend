"use client"
import Modal from "./Modal";
import { useAtom } from "jotai";
import { ChangeProfilePicModalAtom, userProfileAtom } from "@/store";
import { useQueryClient } from "react-query";
import { useState } from "react";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { useCookies } from "react-cookie";
import LoadingScreen from "./LoadingScreen";
import { useRouter } from "next/navigation";
import { baseURL } from "@/env";

const ChangeProfilePhoto = () => {
    const router = useRouter();
    const [user, setUser] = useAtom(userProfileAtom);
    const queryClient = useQueryClient();
    const [photo, setPhoto] = useState<File | null>();
    const [cookies] = useCookies();
    const [openChangeProfilePicModal, setOpenChangeProfilePicModal] = useAtom(ChangeProfilePicModalAtom);
    const [loading, isLoading] = useState(false);

    const handleChangeProfilePic = async (e: any) => {
        e.preventDefault();
        isLoading(true);
        const formdata: any = new FormData();
        formdata.append("email", user.email);
        formdata.append("profilepicture", photo);
        const res = await fetch(`${baseURL}/user/update/profilepicture`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${cookies.token}`
            },
            body: formdata
        })

        const data = await res.json();

        if (data.status) {
            // setUser(data.data);
            router.refresh();
            queryClient.invalidateQueries('user');
            setOpenChangeProfilePicModal(false);
        } else {
            console.log("Something went wrong :(");
        }
    }

    return (
        <Modal className="tw-flex tw-flex-col tw-items-center tw-h-[100vh] tw-justify-center">
            <div className="tw-flex tw-flex-col tw-max-w-[500px] tw-w-full tw-bg-white tw-rounded-md tw-shadow-md tw-p-3 tw-gap-2">
                <div className="tw-flex tw-justify-center tw-relative">
                    <span className="tw-text-[20px] tw-font-bold">
                        Choose Profile Photo
                    </span>
                    <div className="tw-absolute tw-right-0 tw-pr-[16px] tw-cursor-pointer" onClick={() => setOpenChangeProfilePicModal(false)}>
                        <CloseIcon className="tw-w-[24px] tw-h-[24px]" />
                    </div>
                </div>
                <hr />
                <form onSubmit={handleChangeProfilePic}>
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
                            photo ?
                                (
                                    <button className="tw-text-center tw-rounded-md tw-bg-[#0866FF] tw-text-[15px] tw-text-black tw-font-bold tw-py-2">
                                        Change Profile
                                    </button>
                                ) :
                                (
                                    <span className="tw-text-center tw-rounded-md tw-bg-gray-200 tw-text-[15px] tw-text-gray-400 tw-font-bold tw-py-2">
                                        Change Profile
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

export default ChangeProfilePhoto;