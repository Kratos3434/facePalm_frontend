import VerifyEmail from "@/components/VerifyEmail";
import { publicBaseURL } from "@/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getUser = async () => {
    const store = cookies();
    const retrieveToken = store.get('retrieveToken')?.value;
    if(!retrieveToken) {
        redirect("/login");
    }
    const res = await fetch(`${publicBaseURL}/validating/${retrieveToken}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer dfsdfsdsdfsfssfvgthgbh`
        }
    });
    if(res.status == 401) {
        redirect("/login");
    }
    const data = await res.json();
    if(!data.status) {
        redirect("/login");
    }

    return { email: data.data.email, retrieveToken };
}

const verifyEmail = async () => {
    const data = await getUser();

    return(
        <VerifyEmail data={data} />
    )
}

export default verifyEmail;