import NavBar from "@/components/NavBar";
import NotFound from "@/components/NotFound"
import { cookies } from "next/headers";

const NotFoundPage = () => {
    const cookie = cookies();
    return(
        <>
            <NavBar token={cookie.get('token')?.value} />
            <NotFound />
        </>
    )
}

export default NotFoundPage;