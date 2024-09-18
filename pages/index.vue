<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<template>
    <section class="h-screen grid place-content-center">
        <article class="max-w-3xl mx-auto text-center">
            <h1 class="text-5xl font-bold">
                Haz tus links más cortos y fáciles de compartir con Shrtify
            </h1>
            <p class="my-10 text-lg w-10/12 md:w-2/3 mx-auto">
                Transforma tus largas y molestas URLs en unas más cortas y cómodas con la ayuda de Shrtify
            </p>
            <NuxtLink class="btn-primary rounded-full font-bold py-2 px-4" :to="user ? '/dashboard' : '/auth'">¡Acorta ahora!</NuxtLink>
        </article>
    </section>
</template>