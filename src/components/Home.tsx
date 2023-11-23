"use client"
import useCookies from 'react-cookie/es6/useCookies';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [loading, isLoading] = useState(false);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Hello, Dad</h1>
        </main>
    )
}

export default Home;