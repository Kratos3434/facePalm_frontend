"use client"
import Link from "next/link";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from "next/navigation";
import { baseURL, publicBaseURL } from "@/env";

const Reset = ({ token, valid, code }: { token: any, valid: boolean, code: number }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasExpired, setHasExpired] = useState(false);

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    isLoading(true);
    //Validate again if token is valid or has expired
    const validateRes = await fetch(`${publicBaseURL}/token/verify/${token}`);

    if (validateRes.status === 401) {
      isLoading(false);
      setHasExpired(true);
      return false;
    } else if (validateRes.status === 400) {
      router.replace("/login");
      return false;
    }
    //If not, then proceed to change password
    const res = await fetch(`${publicBaseURL}/forgot/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        password2,
        token
      })
    })

    const data = await res.json();

    if (data.status) {
      router.replace("/login");
    } else {
      setError(data.error);
      isLoading(false);
    }
  }

  return (
    <div className="tw-flex tw-flex-col tw-h-[100vh] tw-justify-center tw-items-center">
      {valid || !hasExpired ? (
        <div className="tw-rounded-md tw-bg-white tw-flex tw-flex-col tw-shadow-md tw-max-w-[500px] tw-w-full tw-py-2">
          <h1 className="tw-text-[28px] tw-font-bold tw-px-[16px] tw-text-center">New Password</h1>
          <hr className="tw-my-3" />
          <form className="tw-flex tw-flex-col tw-px-[16px] tw-gap-3" onSubmit={handleChangePassword}>
            <input type="password" placeholder="Password" className="tw-px-[16px] tw-py-[14px] tw-rounded-md tw-border-[1px] tw-border-gray-400 tw-w-full"
              onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" className="tw-px-[16px] tw-py-[14px] tw-rounded-md tw-border-[1px] tw-border-gray-400 tw-w-full"
              onChange={(e) => setPassword2(e.target.value)} />
            <hr />
            {error && <small className="tw-text-center tw-text-red-600">*{error}</small>}
            {
              (password && password2) && !loading ?
                (
                  <button className="tw-bg-[#1877F2] tw-px-[16px] tw-py-[14px] tw-rounded-md tw-text-white tw-font-bold hover:tw-brightness-95">
                    Change Password
                  </button>
                ) :
                (
                  <span className="tw-bg-gray-500 tw-px-[16px] tw-py-[14px] tw-rounded-md tw-text-white tw-font-bold tw-text-center tw-cursor-not-allowed">
                    Change Password
                    {loading && <LinearProgress className="tw-my-2" />}
                  </span>
                )
            }
          </form>
        </div>
      ) :
        (
          code === 401 || hasExpired ?
            (
              <div className="tw-text-center tw-flex tw-flex-col tw-gap-3">
                <span className="tw-text-[#0866FF] sm:tw-text-[60px] tw-text-[50px] tw-font-bold">faceClam</span>
                <span className="tw-text-[30px] tw-font-bold">This link have expired <SentimentVeryDissatisfiedIcon /></span>
                <span className="tw-text-[30px] tw-font-bold">This happens when you wait for too long to reset your password</span>
                <Link href="/login/identify" className="tw-text-[16px] tw-text-blue-600 hover:tw-underline">
                  Send another email
                </Link>
              </div>
            )
            :
            <div>Invalid token</div>
        )}
    </div>
  )
}

export default Reset;