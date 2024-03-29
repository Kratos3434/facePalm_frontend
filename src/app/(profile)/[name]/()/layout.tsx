import NavBar from "@/components/NavBar";
import Profile from "@/components/Profile";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OtherProfile from "@/components/OtherProfile";
import { baseURL, publicBaseURL, userBaseURL } from "@/env";

interface Props {
    children: React.ReactNode,
    params: any
}

const getUserProfile = async (name: string) => {
    const cookie = cookies();
    const token = cookie.get('token')?.value;
    let result: any = [];
    if (!token) {
        redirect("/login");
    }

    try {
        const res = await fetch(`${publicBaseURL}/user/${name}`, {
            cache: 'no-store',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (data.status) {
            const verify = await fetch(`${userBaseURL}/validate/current/${name}`, {
                cache: 'no-store',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            });

            const verifyData = await verify.json();

            result = [data.data, verifyData.status, token];
        } else {
            notFound();
        }
    } catch (err) {
        console.log(err)
        redirect("/login")
    }

    return result;
}

const ProfileLayout = async ({ children, params }: Props) => {
    const [user, verify, token] = await getUserProfile(params.name);
    return (
        <>
            <NavBar token={token} />
            <main className="tw-bg-[#F0F2F5] tw-pt-[52px]">
                {
                    verify ? <Profile User={user} token={token} /> : <OtherProfile User={user} token={token} />
                }
                {children}
            </main>
        </>
    )
}

export default ProfileLayout;