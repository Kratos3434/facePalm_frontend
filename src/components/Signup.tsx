import Modal from "./Modal";
import { useForm, SubmitHandler } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/navigation";
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from "react";

type FormValues = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string,
    gender: string
}

const Signup = ({ isVisible }: { isVisible: any }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [submitting, isSubmitting] = useState(false);
    const [error, setError] = useState({ status: false, msg: "" });

    const signup: SubmitHandler<FormValues> = async (data) => {
        isSubmitting(true);
        try {
            const res = await fetch("http://localhost:8080/public/send/otp", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            console.log(res.status)
            const d = await res.json();
            if (!d.status) {
                setError({ status: true, msg: d.error });
                isSubmitting(false);
            } else {
                router.replace("/verifyemail");
                isSubmitting(false);
            }
        } catch (err) {
            console.log(err);
            isSubmitting(false);
        }
    }

    return (
        <Modal className='tw-rounded-xl tw-shadow-md tw-bg-white tw-m-auto tw-max-w-[432px] tw-mt-[400px] tw-w-full tw-mb-10'>
            <div className='tw-flex tw-flex-col'>
                <div className='tw-flex tw-flex-col tw-px-[16px]'>
                    <div className='tw-flex tw-justify-between tw-items-center'>
                        <span className='tw-text-[32px] tw-font-bold'>Sign Up</span>
                        <span className='tw-cursor-pointer' onClick={() => isVisible(false)}>
                            <CloseIcon className='tw-w-[24px] tw-h-[24px]' />
                        </span>
                    </div>
                    <span className='tw-text-[#606770] tw-text-[15px]'>It&apos;s quick and easy.</span>
                </div>
                <hr />
                <form className='tw-p-[16px] tw-max-w-[432px] tw-w-full' onSubmit={handleSubmit(signup)}>
                    <div className='tw-flex tw-flex-col tw-gap-4'>
                        <div className='tw-flex signup-md:tw-justify-between tw-flex-wrap tw-justify-center signup-md:tw-gap-1 tw-gap-3'>
                            <input type="text" placeholder='First name' className='tw-w-full tw-rounded tw-border-[1px] tw-border-[#D0D3D8] tw-outline-none tw-bg-[#F5F6F7] signup-md:tw-max-w-[194px] tw-p-[11px] tw-h-[40px]'
                                {...register("firstName")} />
                            <input type="text" placeholder='Last name' className='tw-w-full tw-rounded tw-border-[1px] tw-border-[#D0D3D8] tw-outline-none tw-bg-[#F5F6F7] signup-md:tw-max-w-[194px] tw-p-[11px] tw-h-[40px]'
                                {...register("lastName")} />
                        </div>
                        <input type='email' placeholder='Email' className='tw-w-full tw-rounded tw-border-[1px] tw-border-[#D0D3D8] tw-outline-none tw-bg-[#F5F6F7] tw-max-w-[399px] tw-p-[11px] tw-h-[40px]'
                            {...register("email")} />
                        <input type='password' placeholder='New Password' className='tw-w-full tw-rounded tw-border-[1px] tw-border-[#D0D3D8] tw-outline-none tw-bg-[#F5F6F7] tw-max-w-[399px] tw-p-[11px] tw-h-[40px]'
                            {...register("password")} />
                        <input type='password' placeholder='Confirm Password' className='tw-w-full tw-rounded tw-border-[1px] tw-border-[#D0D3D8] tw-outline-none tw-bg-[#F5F6F7] tw-max-w-[399px] tw-p-[11px] tw-h-[40px]'
                            {...register("password2")} />
                        <div className='tw-flex tw-flex-col'>
                            <span className='tw-text-[12px] tw-text-[#606770]'>Gender</span>
                            <div className='tw-flex signup-sm:tw-justify-between tw-flex-wrap tw-gap-1 tw-justify-center'>
                                <div className='tw-flex tw-justify-between tw-max-w-[128.28px] tw-w-full tw-border-[1px] tw-rounded tw-px-3 tw-py-2'>
                                    <span className='tw-text-[15px]'>Female</span>
                                    <input type="radio" id='female' value="F" {...register("gender")} />
                                </div>
                                <div className='tw-flex tw-justify-between tw-max-w-[128.28px] tw-w-full tw-border-[1px] tw-rounded tw-px-3 tw-py-2'>
                                    <span className='tw-text-[15px]'>Male</span>
                                    <input type="radio" id='male' value="M" {...register("gender")} />
                                </div>
                                <div className='tw-flex tw-justify-between tw-max-w-[128.28px] tw-w-full tw-border-[1px] tw-rounded tw-px-3 tw-py-2'>
                                    <span className='tw-text-[15px]'>Custom</span>
                                    <input type="radio" id='custom' value="C" {...register("gender")} />
                                </div>
                            </div>
                        </div>
                        {
                            error.status &&
                            (
                                <div className="tw-flex tw-justify-center">
                                    <span className="tw-text-red-600">*{error.msg}</span>
                                </div>
                            )
                        }
                        <div className='tw-flex tw-justify-center tw-gap-2 tw-items-center'>
                            {
                                !submitting ?
                                    (
                                        <button className='tw-text-white tw-bg-[#00A400] tw-rounded tw-py-1 tw-px-10 tw-cursor-pointer'>
                                            <span className='tw-text-[20px] tw-font-bold'>Sign Up</span>
                                        </button>
                                    ) : (
                                        <div className='tw-text-white tw-bg-gray-400 tw-rounded tw-py-1 tw-px-10 tw-cursor-pointer'>
                                            <span className='tw-text-[20px] tw-font-bold'>Sign Up</span>
                                        </div>
                                    )
                            }
                            {submitting && <LinearProgress className="tw-w-[15px] tw-h-[10px]" />}
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default Signup;