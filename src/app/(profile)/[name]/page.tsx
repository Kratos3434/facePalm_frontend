import HomeProfile from "@/components/HomeProfile";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OtherHomeProfile from "@/components/OtherHomeProfile";
import { baseURL } from "@/env";

const getUserProfile = async (name: string) => {
    const cookie = cookies();
    const token = cookie.get('token')?.value;

    if(!token) {
        redirect("/login");
    }
    
    const res = await fetch(`${baseURL}/public/user/${name}`, {
        cache: 'no-store'
    });

    const data = await res.json();

    if(data.status) {
        const verify = await fetch(`${baseURL}/user/validate/current/${name}`, {
            cache: 'no-store',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });

        const verifyData = await verify.json();

        return [data.data, verifyData.status, token, verifyData?.error?.currentUser];
    } else {
        notFound();
    }
}

const ProfilePage = async ({ params }: any) => {
    const [user, verified, token, currentUser] = await getUserProfile(params.name);

    return verified ? <HomeProfile user={user} token={token} /> : <OtherHomeProfile user={user} token={token} currentUser={currentUser} />;
}

export default ProfilePage;