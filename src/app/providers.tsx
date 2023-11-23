'use client'
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

interface Props {
    children: React.ReactNode
}
const Providers = ({ children }: Props) => {
    const [queryClient] = useState(() => new QueryClient());

    return(
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default Providers;