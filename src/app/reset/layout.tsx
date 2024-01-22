import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Reset Your password"
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      {children}
    </main>
  )
}

export default Layout;