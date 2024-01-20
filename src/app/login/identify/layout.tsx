import { Metadata } from "next";
import { cookies } from "next/headers";
import { baseURL } from "@/env";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Forgot Password",
    description: "Verify your identity"
}

interface Props {
    children: React.ReactNode
}

const verifyIfLoggedIn = async () => {
    const cookie = cookies();
    const token = cookie.get('token')?.value;

    if (token) {
        const res = await fetch(`${baseURL}/admin/user/authenticate`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (data.status) {
            redirect("/");
        }
    }
}

const LoginLayout = async ( { children }: Props ) => {
    await verifyIfLoggedIn();
    
    return(
        <div className="tw-bg-[#F0F2F5]">
            {children}
        </div>
    )
}

export default LoginLayout;