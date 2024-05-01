"use client"

import { useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export const Provider = ({ children }: { children: ReactNode }) => {
    const [client] = useState(new QueryClient(
        {
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    retry: false,
                },
            },

        }
    ))

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
} 