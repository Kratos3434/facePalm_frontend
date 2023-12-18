import NavBar from "@/components/NavBar";
import { cookies } from "next/headers";

const getUser = async () => {
    const store = cookies();
    const token = store.get('token')?.value;
    const res = await fetch('http://localhost:8080/user/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  
    const data = await res.json();
    return data.data;
}

interface Props {
    children: React.ReactNode
}
const HomeLayout = async ({ children }: Props) => {
    const user = await getUser();
    return (
        <>
            <NavBar User={user}/>
            <div className="tw-bg-[#F0F2F5] tw-pt-[70px]">
                {children}
            </div>
        </>
    )
}

export default HomeLayout;