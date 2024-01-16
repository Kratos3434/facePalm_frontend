import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

const protectedRoutes = ["/", "/:name"];

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    const res = await fetch("https://2w2s4hgj97.execute-api.ca-central-1.amazonaws.com/dev/v1/user/authenticate", {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        //console.log(req.nextUrl.pathname)
        if (!data.status && protectedRoutes.includes(req.nextUrl.pathname)) {
            console.log("Truw")
            const absoluteURL = new URL("/login", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }
}
