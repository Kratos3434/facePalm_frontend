"use client"
import Modal from "./Modal"
import { useAtom } from "jotai";
import { userAtom, AddPostModalAtom, AddPostProfileAtom } from "@/store";
import Image from "next/image";
import PublicIcon from '@mui/icons-material/Public';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import CircularProgress from '@mui/material/CircularProgress';
import { useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { UserProps } from "@/type";
import { baseURL } from "@/env";

interface Props {
    type: string,
    user: UserProps,
    token: string
}
const AddPost = ({ type, user, token }: Props) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [openConfModal, setOpenConfModal] = useState(false);
    const [openAddPost, setOpenAddPost] = useAtom(AddPostModalAtom);
    const [openAddPostProfile, setAddPostProfile] = useAtom(AddPostProfileAtom);
    const [description, setDescription] = useState("");
    const textboxRef = useRef<HTMLSpanElement>(null);
    const [photo, setPhoto] = useState<File | null>();
    const [cookies] = useCookies();
    const [loading, isLoading] = useState(false);
    const [error, setError] = useState({ status: false, msg: "" });

    const checkFileType = (ext: string) => {
        switch (ext) {
            case ".gif":
            case ".jpg":
            case ".png":
            case "jpeg":
            case "jfif":
            case ".avi":
            case ".mp4":
            case ".mov":
            case ".heif":
            case ".heic":
                return true;
            default:
                return false;
        }
    }

    const handlePost = async (e: any) => {
        // console.log("Data:", data);
        isLoading(true);
        e.preventDefault();
        console.log("DESC:", description);
        console.log(photo?.name)
        if (photo) {
            const fileType = photo.name.substring(photo.name.lastIndexOf('.'));
            if (!checkFileType(fileType)) {
                setError({ status: true, msg: "Invalid image or video"});
                isLoading(false);
                return false;
            }
        }
        const formdata: any = new FormData();
        formdata.append("email", user.email);
        formdata.append("description", description);
        formdata.append("featureImage", photo);
        const res = await fetch(`${baseURL}/user/add/post`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formdata
        })
        const data = await res.json();

        if (!data.status) {
            setError({ status: true, msg: data.error });
            isLoading(false);
        } else {
            router.refresh();
            queryClient.invalidateQueries('posts');
            type == "HOME" ? setOpenAddPost(false) : setAddPostProfile(false);
        }

    }

    const handleDescription = () => {
        if (textboxRef.current)
            setDescription(textboxRef.current?.innerText);
    }
    return (
        <>
            <Modal className='tw-flex tw-flex-col tw-h-[100vh] tw-justify-center'>
                <div className='tw-flex tw-justify-center'>
                    <div className="tw-flex tw-flex-col tw-rounded-md tw-bg-white tw-max-w-[500px] tw-w-full">
                        <div className="tw-flex tw-justify-center tw-items-center tw-relative">
                            <span className="tw-text-[20px] tw-text-black tw-font-bold tw-p-3">
                                Create post
                            </span>
                            <div className="tw-absolute tw-right-0 tw-pr-[16px] tw-cursor-pointer" onClick={() => setOpenConfModal(true)}>
                                <CloseIcon className="tw-w-[24px] tw-h-[24px]" />
                            </div>
                        </div>
                        <hr />
                        <div className="tw-flex tw-flex-col tw-p-4 tw-gap-3">
                            <div className="tw-flex tw-justify-start tw-gap-2 tw-items-center">
                                <Image src={`${user.profilePicture ? user.profilePicture : "/images/placeholder.png"}`} width={40} height={40} className="tw-w-[40px] tw-h-[40px] tw-rounded-[1234px]" alt="profile" />
                                <div className="tw-flex tw-flex-col">
                                    <span className="tw-text-[15px] tw-text-black tw-font-[500]">
                                        {user.firstName} {user.lastName}
                                    </span>
                                    <div className="tw-flex tw-px-[8px] tw-py-[4px] tw-items-center tw-rounded-md tw-bg-gray-200">
                                        <PublicIcon className="tw-w-[12px] tw-h-[12px]" />
                                        <span className="tw-text-[13px]">Public</span>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handlePost}>
                                <div className="tw-flex tw-flex-col tw-gap-5">
                                    <span contentEditable={true} spellCheck={false} className="tw-w-full tw-outline-none tw-resize-none tw-relative statusBox tw-cursor-text" aria-label={`What's on your mind ${user.lastName}`} tabIndex={0} role="textbox" placeholder={`What's on your mind, ${user.lastName}?`}
                                        ref={textboxRef} onInput={handleDescription}>

                                    </span>
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
                                                            Add Photos/Video
                                                        </span>
                                                        <span className="tw-text-[12px] tw-text-gray-400">
                                                            or drag and drop
                                                        </span>
                                                    </div>
                                                </label>
                                            ) :
                                            (
                                                <div className="tw-w-full tw-rounded-md tw-border-[1px] tw-border-gray-400 tw-p-2 tw-relative tw-items-center">
                                                    <Image src={URL.createObjectURL(photo)} width={450} height={221} alt="chosen photo" className="tw-w-[450px] tw-h-[221px] tw-bg-gray-100 tw-rounded" />
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
                                        !photo || !description ?
                                            (
                                                <span className="tw-text-center tw-rounded-md tw-bg-gray-200 tw-text-[15px] tw-text-gray-400 tw-font-bold tw-py-2">
                                                    Post
                                                </span>
                                            ) :
                                            (
                                                <button className="tw-text-center tw-rounded-md tw-bg-[#0866FF] tw-text-[15px] tw-text-black tw-font-bold tw-py-2">
                                                    Post
                                                </button>
                                            )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
            {/** This modal opens when user decides to exit adding post */}
            {
                openConfModal &&
                (
                    <Modal className='tw-flex tw-flex-col tw-h-[100vh] tw-justify-center tw-items-center'>
                        <div className="tw-flex tw-flex-col tw-rounded-md tw-bg-white tw-max-w-[400px] tw-w-full">
                            <div className="tw-flex tw-w-full tw-justify-center">
                                <span className="tw-text-[20px] tw-font-bold tw-p-3">
                                    Discard changes?
                                </span>
                            </div>
                            <hr />
                            <div className="tw-flex tw-justify-center tw-gap-2 tw-p-3">
                                <span className="tw-p-1 tw-rounded-md tw-bg-green-500 tw-font-bold tw-px-3 tw-text-[18px] tw-cursor-pointer hover:tw-brightness-75" onClick={() => type == "HOME" ? setOpenAddPost(false) : setAddPostProfile(false)}>
                                    Yes
                                </span>
                                <span className="tw-p-1 tw-rounded-md tw-bg-red-600 tw-font-bold tw-px-3 tw-text-[18px] tw-cursor-pointer hover:tw-brightness-75" onClick={() => setOpenConfModal(false)}>
                                    No
                                </span>
                            </div>
                        </div>
                    </Modal>
                )
            }
            {/** Show loading screen when user adds a post to let them know it's being processed */}
            {
                loading &&
                (
                    <Modal className='tw-flex tw-flex-col tw-h-[100vh] tw-justify-center tw-items-center'>
                        <div className='tw-flex tw-flex-col tw-items-center tw-gap-1'>
                            <CircularProgress size={70} />
                            <span className="tw-text-white tw-font-bold tw-text-[20px]">
                                Please wait, this may take a while...
                            </span>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}

export default AddPost;