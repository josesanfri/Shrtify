<script lang="ts" setup>
import { nanoid } from 'nanoid';
import type { Database } from '~/database.types';

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

const formURL = reactive({
    long_url: "",
    key: ""
})

const emit = defineEmits(["created"]);

const handleLinkForm = async () => {
    try {
        const { data, error } = await supabase.from('links').insert({
            long_url: formURL.long_url,
            key: formURL.key,
            user_id: user.value?.id
        })

        createShortKey();
        formURL.long_url = "";
        alert("link creado con exito")

        emit("created", 1)
    } catch (error) {
        console.log(error)
    }
}

const createShortKey = (len:number = 6):void => {
    formURL.key = nanoid(len);
}

onMounted(() => {
    createShortKey();
})
</script>

<template>
    <form class="flex flex-col md:flex-row gap-4 items-center" @submit.prevent="handleLinkForm">
        <section class="w-full md:w-5/12">
            <label class="form-label" for="url">Long URL</label>
            <input class="input-primary" type="text" id="url" v-model="formURL.long_url">
        </section>
        <section class="w-full md:w-5/12">
            <label class="form-label" for="shortUrl">ShortKey</label>
            <input class="input-primary" type="text" id="shortUrl" v-model="formURL.key"/>
        </section>
        <section class="w-full md:w-2/12">
            <button type="submit" class="btn-primary py-3 mt-3 rounded-full font-bold w-full">Acortar</button>
        </section>
    </form>
</template>