"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useCookies from 'react-cookie/es6/useCookies';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import Modal from './Modal';

const VerifyEmail = ({ data }: { data: any }) => {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState({ status: false, msg: "" });
    const [submitting, isSubmitting] = useState(false);
    const [loading, isLoading] = useState(false);
    const [openModal, modalOpen] = useState(false);
    const [resendError, setResendError] = useState({ status: false, msg: "" });

    console.log("Verify data:", data);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        isSubmitting(true);
        try {
            const res = await fetch("http://localhost:8080/public/signup", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ email: data.email, otp })
            });

            const resData = await res.json();

            if (!resData.status) {
                setError({ status: true, msg: resData.error });
                isSubmitting(false)
            } else {
                removeCookie("retrieveToken");
                isSubmitting(false)
                router.replace("/login");
            }
        } catch (err) {
            console.log(err)
            setError({ status: true, msg: "Error" });
            isSubmitting(false)
        }
    }

    const handleResend = async () => {
        modalOpen(true);
        try {
            isLoading(true);
            const res = await fetch(`http://localhost:8080/public/resend/otp/${data.email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.retrieveToken}`
                }
            });

            const resData = await res.json();

            if (!resData.status) {
                console.log("error", resData.status)
                setResendError({ status: true, msg: resData.error });
                isLoading(false)
            } else {
                setResendError({ status: false, msg: "" });
                isLoading(false);
            }
        } catch (err) {
            setResendError({ status: true, msg: "Error" });
            isLoading(false);
        }
    }
    return (
        data &&
        (
            <>
                {
                    openModal &&
                    (
                        <Modal className='tw-flex tw-flex-col tw-h-[100vh] tw-justify-center tw-text-black'>
                            <div className='tw-flex tw-justify-center'>
                                <div className='tw-rounded-md tw-shadow-md tw-bg-white tw-py-[18px] tw-px-[16px] tw-flex tw-flex-col tw-gap-[18px] tw-max-w-[565px] tw-w-full tw-items-centerr tw-transition-all'>
                                    {
                                        loading ?
                                            (
                                                <div className='tw-flex tw-justify-center'>
                                                    <CircularProgress />
                                                </div>
                                            ) :
                                            (
                                                <>
                                                    <div className='tw-flex tw-justify-between'>
                                                        <span className='tw-font-bold tw-text-[20px]'>
                                                            {
                                                                !resendError.status ?
                                                                    (
                                                                        <>
                                                                            Email sent
                                                                        </>
                                                                    ) :
                                                                    (
                                                                        <>
                                                                            Error while sending email
                                                                        </>
                                                                    )
                                                            }
                                                        </span>
                                                        <span onClick={() => modalOpen(false)} className='tw-cursor-pointer'>
                                                            <CloseIcon className='tw-w-[36px] tw-h-[36px]' />
                                                        </span>
                                                    </div>
                                                    <div className='tw-max-w-[533px] tw-w-full tw-text-[17px] tw-text-[#606770]'>
                                                        {
                                                            !resendError.status ?
                                                                (
                                                                    <>
                                                                        To confirm your email, enter the 6-digit code in the email we just sent
                                                                        to <span className='tw-text-[17px] tw-font-bold'> {data.email}</span>. Be sure to check your spam folder.
                                                                    </>
                                                                ) :
                                                                (
                                                                    resendError.msg
                                                                )
                                                        }
                                                    </div>
                                                    <div className='tw-flex tw-justify-end'>
                                                        <span className='tw-text-white tw-rounded-md tw-text-[20px] tw-bg-[#1877F2] tw-px-8 tw-font-bold tw-py-1 tw-cursor-pointer'
                                                            onClick={() => modalOpen(false)}>
                                                            OK
                                                        </span>
                                                    </div>
                                                </>
                                            )
                                    }
                                </div>
                            </div>
                        </Modal>
                    )
                }
                <div className="tw-flex tw-justify-center tw-flex-col tw-h-[100vh] tw-items-center tw-py-5 tw-bg-white tw-px-5">
                    <div className="tw-flex tw-justify-center">
                        <div className="tw-flex tw-flex-col tw-rounded-md tw-shadow-md tw-max-w-[500px] tw-w-full">
                            <div className="tw-px-[16px] tw-py-[18px]">
                                <h2 className="tw-text-[20px] tw-font-bold">Enter the code from your email</h2>
                            </div>
                            <hr />
                            <div className='tw-flex tw-flex-col tw-gap-3'>
                                <span className='tw-px-[16px] tw-pt-[16px]'>
                                    Let us know this email belongs to you. Enter the code in the email sent to
                                    <span className="tw-font-bold"> {data.email}</span>
                                </span>
                                <form onSubmit={handleSubmit}>
                                    <div className='tw-flex tw-flex-col tw-px-[16px] tw-gap-3'>
                                        <input type="text"
                                            className='tw-rounded-md tw-border-[1px] tw-border-[#DEE1E4] tw-px-[40px] tw-py-[18px] tw-outline-[#0866FF] tw-max-w-[137px] tw-w-full'
                                            onChange={(e) => setOtp(e.target.value)} 
                                            maxLength={6}/>
                                        {error.status && <small className='tw-text-red-900'>*{error.msg}</small>}
                                        <span className='tw-text-[15px] tw-text-[#1877F2] tw-mb-5 tw-cursor-pointer' onClick={handleResend}>Send email again</span>
                                    </div>
                                    <hr />
                                    <div className='tw-flex tw-justify-end tw-px-[16px] tw-py-[12px] tw-gap-5 tw-items-center tw-flex-wrap'>
                                        <span className='tw-bg-[#EBEDF0] tw-rounded-md tw-px-3 tw-py-2 tw-font-bold tw-cursor-pointer hover:tw-bg-gray-300'>
                                            Update contact info
                                        </span>
                                        {
                                            otp.length > 0 ?
                                                (
                                                    !submitting ?
                                                        (
                                                            <button className='tw-bg-[#1877F2] tw-text-white tw-px-10 tw-rounded-md tw-font-bold tw-py-2'>
                                                                Continue
                                                            </button>
                                                        ) :
                                                        (
                                                            <div className='tw-flex tw-gap-[8px] tw-items-center'>
                                                                <span className='tw-bg-[#EBEDF0] tw-text-[#BEC3CB] tw-px-10 tw-rounded-md tw-font-bold tw-py-2'>
                                                                    Continue
                                                                </span>
                                                                <LinearProgress className="tw-w-[15px] tw-h-[10px]" />
                                                            </div>
                                                        )
                                                ) :
                                                (
                                                    <span className='tw-bg-[#EBEDF0] tw-text-[#BEC3CB] tw-px-10 tw-rounded-md tw-font-bold tw-py-2'>
                                                        Continue
                                                    </span>
                                                )
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default VerifyEmail;