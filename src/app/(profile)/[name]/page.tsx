import HomeProfile from "@/components/HomeProfile";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OtherHomeProfile from "@/components/OtherHomeProfile";

const getUserProfile = async (name: string) => {
    const cookie = cookies();
    const token = cookie.get('token')?.value;

    if(!token) {
        redirect("/login");
    }
    
    const res = await fetch(`http:localhost:8080/public/user/${name}`, {
        cache: 'no-store'
    });

    const data = await res.json();

    if(data.status) {
        const verify = await fetch(`http:localhost:8080/user/validate/current/${name}`, {
            cache: 'no-store',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });

        const verifyData = await verify.json();

        return [data.data, verifyData.status];
    } else {
        notFound();
    }
}

const ProfilePage = async ({ params }: any) => {
    const [user, verified] = await getUserProfile(params.name);

    return verified ? <HomeProfile user={user} /> : <OtherHomeProfile user={user} />;
}

export default ProfilePage;