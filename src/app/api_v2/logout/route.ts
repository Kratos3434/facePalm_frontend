import { NextResponse, NextRequest } from "next/server";
import { cookies } from 'next/headers';

export const GET = async () => {
  cookies().delete('token');
  return NextResponse.json({status: true, msg: "Logout successful"}, {status: 200});
}