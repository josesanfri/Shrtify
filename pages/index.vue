<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<template>
    <section class="min-h-[70vh] md:min-h-[90vh] grid place-content-center px-8">
        <article class="max-w-3xl mx-auto text-center">
            <h1 class="text-5xl font-bold">
                Improve your link management with Shrtify
            </h1>
            <p class="mt-4 text-lg mx-auto">
                Shrtify transforms your links for better management and easy sharing.
            </p>
            <p class="mb-5 text-lg mx-auto">
                Create your links quickly, easily and securely.
            </p>
            <div class="flex sm:flex-row items-center justify-center gap-4">
                <NuxtLink class="btn-primary rounded-full font-bold py-2 px-4" :to="user ? '/dashboard' : '/auth'">
                    Create a link
                </NuxtLink>
                <a class="btn-primary font-bold" href="'https://github.com/josesanfri/Shrtify'">
                    Star on GitHub
                </a>
            </div>
        </article>
    </section>
</template>