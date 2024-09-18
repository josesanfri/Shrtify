<script lang="ts" setup>
import type { Database } from '~/database.types';

definePageMeta({
    middleware: "auth",
});

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();


const { data, refresh } = await useAsyncData('links', async () => {
    if (!user.value?.id) {
        console.error('User ID is missing');
        return [];
    }

    const userId = user.value.id as string; // Asume que es una cadena UUID

    const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', userId); // Forzar el tipo aquí

    if (error) {
        console.error('Error fetching data:', error);
        return []; // Maneja el error de manera apropiada
    }

    return data;
});

console.log({ data });
</script>

<template>
    <section class="pt-24">
        <!--Titulo-->
        <article class="container">
            <h1 class="text-2xl font-bold text-white">Dashboard</h1>
        </article>

        <!--Acortador-->
        <article class="container mt-10">
            <div class="card">
                <LinkForm @created="refresh"/>
            </div>
        </article>

        <!--Lista Urls acortadas-->
        <article class="container mt-10">
            <LinkItem
                v-for="link in data"
                :key="link.id"
                :link="{
                    shortkey: link.key,
                    longUrl: link.long_url || '',
                    id: link.id
                }"
            />
        </article>
    </section>
</template>