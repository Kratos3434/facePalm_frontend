import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { baseURL } from "./env";

const protectedRoutes = ["/", "/:name", "/watch"];

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    const res = await fetch(`${baseURL}/admin/user/authenticate`, {
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
