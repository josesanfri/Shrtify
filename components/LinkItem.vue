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
    <section>
        <article>
            <p>/{{ link.shortkey }}</p>
            <p>{{ link.longUrl.slice(0, 20) + "..." }}</p>
        </article>
        <button @click="handleCopy">copy</button>
    </section>
</template>