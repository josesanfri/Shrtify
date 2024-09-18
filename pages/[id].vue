<script lang="ts" setup>
import type { Database } from '~/database.types';
import axios from 'axios';

const params = useRoute().params;
const supabase = useSupabaseClient<Database>();

if (!params.id) {
    throw createError({
        statusCode: 400,
        message: "Not found"
    });
}

const { data } = await useAsyncData("link", async () => {
    const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("key", params.id)
        .single();

    if (error) {
        throw createError({
            statusCode: 400,
            message: "Not found"
        });
    }

    return data;
});

if (data.value?.long_url) {
    const ua = useUserAgent();
    if (ua && ua.ip) {
        try {
            // Hacer la solicitud a la API de ipinfo para obtener la ubicación geográfica
            const response = await axios.get(`https://ipinfo.io/${ua.ip}?token=${process.env.IPINFO_TOKEN}`);

            const geoLocation = response.data; // Datos de geolocalización devueltos por ipinfo

            const { data: res, error } = await supabase.from('clicks').insert({
                link_id: data.value.id,
                ip: ua.ip,
                country: geoLocation.country || 'Unknown',
                city: geoLocation.city || 'Unknown',
                user_agent: ua.userAgent,
            });

            if (error) {
                console.error('Error inserting click data:', error);
            }
        } catch (error) {
            console.error('Error fetching geolocation from ipinfo:', error);
        }
    }

    useExternalRedirect(data.value?.long_url);
}
</script>

<template>
    <section class="pt-[200px]"></section>
</template>