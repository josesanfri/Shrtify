import { sendRedirect } from 'h3';

export default async function useExternalRedirect(url: string, code: number = 302): Promise<void> {
    // Check if URL is valid
    if (!/^(https?:\/\/)/.test(url)) {
        throw new Error('Invalid URL');
    }

    // Check if on server side (SSR)
    if (process.server) {
        const nuxtApp = useNuxtApp();

        if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
            // Ensure that the hook call and redirect are correctly handled
            await nuxtApp.callHook('app:redirected');
            await sendRedirect(nuxtApp.ssrContext.event, url, code);
        }
    } else {
        // Client-side redirection
        window.location.href = url;
    }
}