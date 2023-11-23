import Link from "next/link";

const ForgotPassword = () => {
    return (
        <div className="tw-flex tw-justify-center tw-flex-col tw-h-[100vh] tw-items-center tw-py-5 tw-px-5">
            <div className="tw-flex tw-flex-col tw-rounded-md tw-shadow-md tw-bg-white">
                <span className="tw-text-[20px] tw-font-bold tw-p-[18px]">Find your account</span>
                <hr className="tw-text-[#E5E5E5]" />
                <form>
                    <div className="tw-flex tw-flex-col tw-m-[16px] tw-gap-3">
                        <span className="tw-text-[17px] tw-max-w-[464px] tw-w-full">Please enter your email to search for your account.</span>
                        <input type="email" className="tw-w-full tw-rounded-md tw-border-[1px] tw-border-[#CCD0D5] tw-py-[16px] tw-pl-[16px] tw-outline-none" placeholder="Email" />
                    </div>
                    <hr className="tw-text-[#E5E5E5]" />
                    <div className="tw-flex tw-justify-end tw-p-[16px] tw-gap-3">
                        <Link href="/login" className="tw-rounded-md tw-px-[20px] tw-text-[#4B4F56] tw-bg-[#E4E6EB] tw-font-bold tw-py-2">
                            Cancel
                        </Link>
                        <span className="tw-rounded-md tw-bg-[#1877F2] tw-px-[20px] tw-py-2 tw-font-bold tw-text-white">
                            Search
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;