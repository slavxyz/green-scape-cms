// src/globals/PageTransport.ts
// Define globally for libraries that expect it
(window as any).PageTransport = {
    send: (...args: any[]) => {
        console.log("PageTransport stub called with", args);
    },
};