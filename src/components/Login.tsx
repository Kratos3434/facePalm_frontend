"use client"
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useCookies from 'react-cookie/es6/useCookies';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Signup from './Signup';
import LoadingScreen from './LoadingScreen';

const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [visible, isVisible] = useState(false);
    const [error, setError] = useState({status: false, msg: ""});
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, isLoading] = useState(false);
    const router = useRouter();
    const [showPass, isShowPass] = useState(false);

    const signin = async (data: FieldValues) => {
        isLoading(true);
        try {
            const res = await fetch("/api/v1/public/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: data.email, password: data.password })
            });

            const d = await res.json();
            // const d = await (await res).data;
            console.log(d);
            if(!d.status) {
                setError({status: true, msg: d.error});
                isLoading(false);
            }
            if(d.status) {
                const current = new Date();
                const nextYear = new Date();
                nextYear.setFullYear(current.getFullYear() + 1);
                setCookie('user', d.data, {path: '/', secure: true, expires: nextYear})
                // router.replace("/");
                window.location.href = "/";
                //isLoading(false);
            }
            //isLoading(false);
        } catch (err) {
            console.log(err)
            isLoading(false);
        }
        //console.log("Form Data:", data);
    }

    return (
        <div className="wrapper">
            {
                visible &&
                (
                    <Signup isVisible={isVisible} />
                )
            }
            {
                loading &&
                (
                    <LoadingScreen />
                )
            }
            <div className="tw-flex tw-justify-center tw-flex-col tw-h-[100vh] tw-items-center tw-py-5">
                <div className="tw-flex tw-gap-10 login-xl:tw-gap-24 login-xl:tw-flex-nowrap tw-flex-wrap tw-justify-center">
                    <div className="tw-flex tw-flex-col tw-justify-center login-xl:tw-text-start tw-text-center">
                        <span className="tw-text-[#0866FF] sm:tw-text-[60px] tw-text-[50px] tw-font-bold">faceClam</span>
                        <span className="sm:tw-text-[28px] tw-text-[20px] tw-max-w-[500px] tw-w-full">Connect with friends and the world around you on faceClam</span>
                    </div>
                    <div className="tw-flex tw-flex-col tw-rounded-xl tw-shadow-md tw-max-w-[396px] tw-w-full tw-bg-white tw-p-5 tw-justify-center tw-gap-4">
                        <form onSubmit={handleSubmit(signin)}>
                            <div className="tw-flex tw-flex-col tw-gap-3">
                                <input type="email" placeholder="Email" className="tw-w-full tw-px-[16px] tw-py-[14px] tw-rounded tw-border-2 tw-border-[#DDDFE2] tw-outline-none focus:tw-border-[#0866FF]" 
                                 {...register('email', {required: true})} />
                                <div className="tw-flex tw-justify-between tw-w-full tw-px-[16px] tw-py-[14px] tw-rounded tw-border-2 tw-border-[#DDDFE2] tw-items-center focus:tw-border-[#0866FF]">
                                    <input type={showPass ? "text" : "password"} placeholder="Password" className="tw-w-full tw-outline-none" {...register('password', {required: true})}/>
                                    {!showPass ? 
                                        <span className='tw-cursor-pointer' onClick={() => isShowPass(true)}>
                                            <VisibilityIcon className='tw-w-[16px] tw-h-[16px]' />
                                        </span> : 
                                        <span className='tw-cursor-pointer' onClick={() => isShowPass(false)}>
                                            <VisibilityOffIcon className='tw-w-[16px] tw-h-[16px]' />
                                        </span>
                                    }
                                </div>
                                {error.status && <small className='tw-text-[#FF0000]'>*{error.msg}</small>}
                                {errors.email && <small  className='tw-text-[#FF0000]'>*Email is required</small>}
                                {errors.password && <small  className='tw-text-[#FF0000]'>*Password is required</small>}
                                <button className='tw-flex tw-justify-center tw-w-full tw-bg-[#1877F2] tw-rounded tw-text-white tw-cursor-pointer tw-h-[48px] tw-items-center'>
                                    <span className='tw-text-[22px]'>Log In</span>
                                </button>
                            </div>
                        </form>
                        <Link href="/login/identify" className='tw-text-center tw-text-[14px] tw-text-[#2989F4] hover:tw-underline'>Forgot password?</Link>
                        <hr className='tw-my-5' />
                        <div className='tw-flex tw-justify-center tw-text-center'>
                            <div className='tw-text-white tw-rounded tw-bg-[#42B72A] tw-text-center  tw-px-[16px] tw-py-3 tw-cursor-pointer' onClick={() => isVisible(true)}>
                                <span className='tw-text-[19px]'>Create new account</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
