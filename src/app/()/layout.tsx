import NavBar from "@/components/NavBar";
import { userBaseURL } from "@/env";
import { authenticate } from "@/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getUser = async () => {
    const store = cookies();
    const token = store.get('token')?.value;
    try {
        const res = await fetch(`${userBaseURL}/current`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await res.json();
        return [data.data, token];
    } catch (err) {
        redirect("/login");
    }
}

interface Props {
    children: React.ReactNode
}
const HomeLayout = async ({ children }: Props) => {
    const cookie = cookies();
    const res = await authenticate(cookie.get('token')?.value);
    if (!res) {
        redirect("/login");
    }
    const [user, token] = await getUser();
    return (
        <>
            <NavBar User={user} token={token} />
            <main className="tw-bg-[#F0F2F5] tw-pt-[70px]">
                {children}
            </main>
        </>
    )
}

export default HomeLayout;