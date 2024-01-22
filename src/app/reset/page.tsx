import Reset from "@/components/Reset";
import { baseURL } from "@/env";
import { redirect } from "next/navigation";

const validateResetToken = async (token: any) => {
  if (!token) redirect("/login");
  else {
    const res = await fetch(`${baseURL}/public/token/verify/${token}`, {
      cache: 'no-store'
    });

    if (res.status === 401) {
      return {status: false, code: 401};
    }
    else if (res.status === 400){
      redirect("/")
    } else {
      return {status: true, code: 200 };
    }
  }
}
interface Props {
  searchParams?: any
}

const ResetPage = async ({ searchParams }: Props) => {
  const token = searchParams?.token;
  const { status, code } = await validateResetToken(token);

  return <Reset token={token} valid={status} code={code} />
}

export default ResetPage;