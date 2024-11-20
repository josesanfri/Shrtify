<script lang="ts" setup>
import type { Database } from '~/database.types';

const emit = defineEmits(["deleted"]);

const props = defineProps<{
    link: {
        shortkey: string;
        longUrl: string;
        id: number;
    }
}>();

const config = useRuntimeConfig();
const supabase = useSupabaseClient<Database>();

const handleCopy = () => {
    navigator.clipboard.writeText(`${config.public.appUrl}/${props.link.shortkey}`);
};

const handleDelete = async () => {
    try {
        const { error } = await supabase
            .from('links')
            .delete()
            .eq('id', props.link.id);

        if (error) {
            console.error(error);
            return;
        }

        emit("deleted", props.link.id);
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <section class="card flex justify-between mt-2.5 mb-2.5">
        <article class="link-info">
            <NuxtLink :to="`/dashboard/${link.shortkey}`" class="text-white font-bold text-2xl">/{{ link.shortkey }}</NuxtLink>
            <p class="text-sm text-white/40">{{ link.longUrl.slice(0, 20) + "..." }}</p>
        </article>
        <article class="flex justify-end gap-4">
            <button 
                class="btn-primary w-12 h-12 grid place-content-center rounded-full" 
                @click="handleCopy">
                <LucideCopy class="w-6 h-6" />
            </button>
            <button 
                class="btn-primary w-12 h-12 grid place-content-center rounded-full" 
                @click="handleDelete">
                <LucideTrash class="w-6 h-6" />
            </button>
        </article>
    </section>
</template>
