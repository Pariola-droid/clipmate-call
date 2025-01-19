"use client";

import { darkTheme, globalStyles } from '@/styles';

import React from 'react';
import { ThemeProvider } from "next-themes";

interface AbstractAppProps extends React.PropsWithChildren {
    initialSession?: any;
}

const AbstractApp = (pageProps: AbstractAppProps) => {
    globalStyles();
    const [showChild, setShowChild] = React.useState(false);

    React.useEffect(() => {
        setShowChild(true);
    }, []);

    return <ThemeProvider attribute="class" defaultTheme="light" value={{ light: "light", dark: darkTheme.className }}>
        <main style={{ minHeight: '100vh' }}>
            {showChild && pageProps.children}
        </main>
    </ThemeProvider >
}

export default AbstractApp