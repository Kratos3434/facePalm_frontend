import NavBar from "@/components/NavBar";
import Profile from "@/components/Profile";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode,
    params: any
}

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

const ProfileLayout = async ({ children, params }: Props) => {
    const user = await getUserProfile(params.name);
    return (
        <>
            <NavBar />
            <div className="tw-bg-[#F0F2F5] tw-pt-[52px]">
                <Profile User={user} />
                {children}
            </div>
        </>
    )
}

export default ProfileLayout;