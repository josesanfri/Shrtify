import { sendRedirect } from "h3";

export default function useExernalRedirect(url:string, code:number = 302): Promise<void>{
    // Check url is valid
    if(/^(https?:\/\/)/.test(url)){
        //Check if is SSR
        if(process.server){
            const nuxtApp = useNuxtApp();

            if(nuxtApp.ssrContext && nuxtApp.ssrContext.event){
                return nuxtApp.callHook("app:redirected").then(() =>{
                    if(nuxtApp.ssrContext && nuxtApp.ssrContext.event){
                        return sendRedirect(nuxtApp.ssrContext.event, url, code);
                    }
                })
            }
        } else {
            window.location.href = url;
        }
    }

    throw new Error('invalid url');
}