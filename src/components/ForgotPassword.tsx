"use client"
import Link from "next/link";
import { useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import { publicBaseURL } from "@/env";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, isLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const handleSendResetPasswordLink = async (e: any) => {
        e.preventDefault();
        isLoading(true);
        const res = await fetch(`${publicBaseURL}/forgot/link/${email}`);
        const data = await res.json();

        if (data.status) {
            setError("");
            setShowSuccessMsg(true);
        } else {
            setError("Something went wrong, please try again :(");
            isLoading(false);
        }
    }
    
    return (
        <div className="tw-flex tw-justify-center tw-flex-col tw-h-[100vh] tw-items-center tw-py-5 tw-px-5">
            <div className="tw-flex tw-flex-col tw-rounded-md tw-shadow-md tw-bg-white">
                {
                    !showSuccessMsg ?
                        (
                            <>
                                <span className="tw-text-[20px] tw-font-bold tw-p-[18px]">Find your account</span>
                                <hr className="tw-text-[#E5E5E5]" />
                                <form onSubmit={handleSendResetPasswordLink}>
                                    <div className="tw-flex tw-flex-col tw-m-[16px] tw-gap-3">
                                        <span className="tw-text-[17px] tw-max-w-[464px] tw-w-full">Please enter your email to search for your account.</span>
                                        <input type="email" className="tw-w-full tw-rounded-md tw-border-[1px] tw-border-[#CCD0D5] tw-py-[16px] tw-pl-[16px] tw-outline-none" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <hr className="tw-text-[#E5E5E5]" />
                                    {error && <small className="tw-p-1 tw-text-red-600 tw-font-bold">{error}</small>}
                                    <div className="tw-flex tw-justify-end tw-p-[16px] tw-gap-3">
                                        <Link href="/login" className="tw-rounded-md tw-px-[20px] tw-text-[#4B4F56] tw-bg-[#E4E6EB] tw-font-bold tw-py-2 hover:tw-brightness-95">
                                            Cancel
                                        </Link>
                                        {
                                            !email || loading ?
                                                (
                                                    <span className="tw-rounded-md tw-bg-[#E4E6EB] tw-px-[20px] tw-py-2 tw-font-bold tw-text-white hover:tw-brightness-95 tw-cursor-not-allowed">
                                                        Search
                                                        {loading && <span><LinearProgress /></span>}
                                                    </span>
                                                ) :
                                                (
                                                    <button className="tw-rounded-md tw-bg-[#1877F2] tw-px-[20px] tw-py-2 tw-font-bold tw-text-white hover:tw-brightness-95">
                                                        Search
                                                    </button>
                                                )
                                        }
                                    </div>
                                </form>
                            </>
                        ) :
                        (
                            <>
                                <span className="tw-text-[20px] tw-font-bold tw-p-[18px]">A password reset link has been sent to:<br /><small>{email}</small></span>
                                <hr className="tw-text-[#E5E5E5]" />
                                <div className="tw-flex tw-flex-col tw-gap-3 tw-px-[16px] tw-text-center tw-py-2">
                                    <span className="tw-text-[17px] tw-max-w-[464px] tw-w-full">If this email exists, you will receive an email shortly, please check your inbox or spam.</span>
                                    {/* <div className="tw-flex tw-justify-start">
                                        <small>
                                            Didn&apos;t receive email? <span className="tw-font-bold hover:tw-underline tw-text-blue-600 tw-cursor-pointer">resend</span>
                                        </small>
                                    </div> */}
                                    <hr />
                                    <div className="tw-flex tw-justify-between">
                                        <Link href="/login" className="tw-text-[15px] hover:tw-underline tw-text-blue-600">
                                            Login using password
                                        </Link>
                                        <span className="tw-text-[15px] hover:tw-underline tw-text-blue-600 tw-cursor-pointer" 
                                        onClick={() => {
                                            setEmail("");
                                            setError("");
                                            isLoading(false);
                                            setShowSuccessMsg(false);
                                        }}>
                                            try another email
                                        </span>
                                    </div>
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    )
}

export default ForgotPassword;