<script lang="ts" setup>
import type { Database } from '~/database.types';
import geoip from 'geoip-lite';

const params = useRoute().params;
const supabase = useSupabaseClient<Database>();

if(!params.id){
    throw createError({
        statusCode: 400,
        message: "Not found"
    });
};

const { data } = await useAsyncData("link", async () => {
    const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("key", params.id)
        .single();

    if(error){
        throw createError({
            statusCode: 400,
            message: "Not found"
        });
    }

    return data;
});

if(data.value?.long_url){
    const ua = useUserAgent();
    if(ua && ua.ip){
        const geoLocation = geoip.lookup(ua.ip);

        const { data: res, error } = await supabase.from('clicks').insert({
            link_id: data.value.id,
            ip: ua.ip,
            country: geoLocation?.country,
            city: geoLocation?.city,
            user_agent: ua.userAgent,
        })

        if(error){
            console.log({error});
        }
        console.log({res});
    }

    useExternalRedirect(data.value?.long_url);
}
</script>

<template>
    <section class="pt-[200px]"></section>
</template>