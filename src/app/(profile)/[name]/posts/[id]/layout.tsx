import NavBar from "@/components/NavBar";
import { cookies } from "next/headers";

const Layout = ({ children}: { children: React.ReactNode }) => {
  const cookie = cookies();
  return (
    <>
      <NavBar token={cookie.get('token')?.value} />
      <main className="tw-pt-[52px]">
        {children}
      </main>
    </>
  )
}

export default Layout;