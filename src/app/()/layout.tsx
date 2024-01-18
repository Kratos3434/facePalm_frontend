import NavBar from "@/components/NavBar";
import { baseURL } from "@/env";
import { cookies } from "next/headers";

const getUser = async () => {
    const store = cookies();
    const token = store.get('token')?.value;
    const res = await fetch(`${baseURL}/user/current`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  
    const data = await res.json();
    return [data.data, token];
}

interface Props {
    children: React.ReactNode
}
const HomeLayout = async ({ children }: Props) => {
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