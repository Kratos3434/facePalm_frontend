"use client"
import Modal from "./Modal"
import { useAtom } from "jotai";
import { userAtom } from "@/store";
import Image from "next/image";
import PublicIcon from '@mui/icons-material/Public';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const AddPost = () => {
    const [user, setUser] = useAtom(userAtom);
    console.log(user)
    return (
        <Modal className='tw-flex tw-flex-col tw-h-[100vh] tw-justify-center'>
            <div className='tw-flex tw-justify-center'>
                <div className="tw-flex tw-flex-col tw-rounded-md tw-bg-white tw-max-w-[500px] tw-w-full">
                    <div className="tw-flex tw-justify-center">
                        <span className="tw-text-[20px] tw-text-black tw-font-bold tw-p-3">
                            Create post
                        </span>
                    </div>
                    <hr />
                    <div className="tw-flex tw-flex-col tw-p-4 tw-gap-3">
                        <div className="tw-flex tw-justify-start tw-gap-2 tw-items-center">
                            <Image src="/images/cat2.jpg" width={40} height={40} className="tw-w-[40px] tw-h-[40px] tw-rounded-[1234px]" alt="profile" />
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
                        <form>
                            <div className="tw-flex tw-flex-col tw-gap-5">
                                <span contentEditable={true} spellCheck={false} className="tw-w-full tw-outline-none tw-resize-none tw-relative statusBox tw-cursor-text" aria-label={`What's on your mind ${user.lastName}`} tabIndex={0}  role="textbox" placeholder={`What's on your mind, ${user.lastName}?`}>
                                    
                                </span>
                                <label className="tw-w-full tw-rounded-md tw-border-[1px] tw-border-gray-400 tw-p-2 tw-relative tw-items-center">
                                    <div className="tw-w-full tw-bg-gray-100 tw-rounded-md tw-h-[221px] tw-flex tw-flex-col tw-justify-center tw-text-center tw-cursor-pointer hover:tw-bg-gray-200 tw-transition-all">
                                        <input type="file" className="tw-w-full tw-hidden" />
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
                                <button className="tw-text-center tw-rounded-md tw-bg-gray-200 tw-text-[15px] tw-text-gray-400 tw-font-bold tw-py-2">
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AddPost;