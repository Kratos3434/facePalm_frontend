import NavBar from "@/components/NavBar";
import NotFound from "@/components/NotFound"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { authenticate } from "@/helper";

const NotFoundPage = async () => {
    const cookie = cookies();
    const res = await authenticate(cookie.get('token')?.value);
    if (!res) {
        redirect("/login");
    }

    return(
        <>
            <NavBar token={cookie.get('token')?.value} />
            <NotFound />
        </>
    )
}

export default NotFoundPage;