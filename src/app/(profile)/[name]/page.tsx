import HomeProfile from "@/components/HomeProfile";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
        console.log("User:", data.data)
        return data.data;
    } else {
        notFound();
    }
}

const ProfilePage = async ({ params }: any) => {
    const user = await getUserProfile(params.name);

    return <HomeProfile user={user} />
}

export default ProfilePage;