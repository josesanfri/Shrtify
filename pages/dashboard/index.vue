<script lang="ts" setup>
import type { Database } from '~/database.types';

definePageMeta({
    middleware: "auth",
});

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

const { data: links, refresh } = await useAsyncData('links', async () => {
    if (!user.value?.id) {
        console.error('El ID del usuario no está disponible');
        return [];
    }

    const userId = user.value.id;

    const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Error al obtener los datos:', error);
        return [];
    }

    return data || [];
});
</script>

<template>
    <section class="min-h-[70vh] md:min-h-[90vh] grid place-content-left px-4 pt-8">
        <!-- Título -->
        <article class="container">
            <h1 class="text-2xl font-bold text-white">Dashboard</h1>
        </article>

        <!-- Acortador -->
        <article class="container">
            <div class="card">
                <LinkForm @created="refresh" />
            </div>
        </article>

        <!-- Lista de URLs acortadas -->
        <article class="container mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <LinkItem
                v-for="link in links"
                :key="link.id"
                :link="{
                    shortkey: link.key,
                    longUrl: link.long_url || '',
                    id: link.id
                }"
                @deleted="refresh"
            />
        </article>
    </section>
</template>
