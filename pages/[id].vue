<script lang="ts" setup>
import type { Database } from '~/database.types';

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
    useExternalRedirect(data.value?.long_url);
}
</script>

<template>
    <section class="pt-[200px]"></section>
</template>