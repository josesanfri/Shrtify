<script lang="ts" setup>
import type { Database } from '~/database.types';

const {id} = useRoute().params;
const supabase = useSupabaseClient<Database>();


const { data } = useAsyncData(id.toString(), async () => {
    const { data: res, error } = await supabase
        .from('links')
        .select('*, clicks(*)')
        .eq('key', id)
        .single();

    if(error){
        throw createError({
            statusCode: 400,
            message: "Not found"
        });
    }
    
    const totalClicks = res.clicks.length;

    return {
        ...res,
        total_clicks: totalClicks
    };
})
</script>

<template>
    <section v-if="data" class="min-h-[70vh] md:min-h-[90vh] grid place-content-left px-4 pt-8">
        <article class="container">
            <h1 class="text-5xl text-white font-bold">
                {{ data.key }}
            </h1>
            <p class="mt-5">{{ data.created_at }}</p>
            <section class="mt-5 flex flex-col md:flex-row gap-5">
                <div class="card">
                    <article class="text-2xl text-white/40 overflow-x-auto" texteditable>
                        {{ data.long_url }}
                    </article>
                </div>
                <div class="card">
                    <h2 class="text-6xl font-bold">
                        {{ data.total_clicks }}
                    </h2>
                    <p>Total clicks</p>
                </div>
            </section>
        </article>

        <article class="container my-6">
            <h2 class="text-2xl">Clicks history</h2>
            <section v-for="click in data.clicks" :key="click.id" class="card mt-5">
                <div v-if="click && typeof click === 'object'">
                    <section class="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <p v-if="click.ip" class="text-white text-lg font-bold">{{ click.ip }}</p>
                            <p>{{ click.created_at }}</p>
                        </div>
                        <div>
                            <p>{{ click.country }}</p>
                            <p>{{ click.city }}</p>
                        </div>
                    </section>
                </div>
            </section>
        </article>
    </section>
</template>