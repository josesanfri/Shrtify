<script lang="ts" setup>
const props = defineProps<{
    link: {
        shortkey: string;
        longUrl: string;
        id: number;
    }
}>();

const config = useRuntimeConfig();

const handleCopy = () => {
    navigator.clipboard.writeText(`${config.public.appUrl}/${props.link.shortkey}`)
}
</script>

<template>
    <section class="card flex justify-between mt-5">
        <article class="link-info">
            <NuxtLink :to="`/dashboard/${link.shortkey}`" class="text-cyan-500 font-bold text-2xl">/{{ link.shortkey }}</NuxtLink>
            <p class="text-sm text-white/40">{{ link.longUrl.slice(0, 20) + "..." }}</p>
        </article>
        <button class="btn-primary w-12 h-12 grid place-content-center rounded-full" @click="handleCopy">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
        </button>
    </section>
</template>