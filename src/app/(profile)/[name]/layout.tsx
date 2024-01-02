import NavBar from "@/components/NavBar";
import Profile from "@/components/Profile";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OtherProfile from "@/components/OtherProfile";

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

const ProfileLayout = async ({ children, params }: Props) => {
    const [user, verify] = await getUserProfile(params.name);
    return (
        <>
            <NavBar />
            <main className="tw-bg-[#F0F2F5] tw-pt-[52px]">
                {
                    verify ? <Profile User={user} /> : <OtherProfile User={user} />
                }
                {children}
            </main>
        </>
    )
}

export default ProfileLayout;