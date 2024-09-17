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
    <form @submit.prevent="handleLinkForm">
        <section>
            <label for="url">Long URL</label>
            <input type="text" id="url" v-model="formURL.long_url">
        </section>
        <section>
            <label for="shortUrl">ShortKey</label>
            <input type="text" id="shortUrl" v-model="formURL.key"/>
        </section>
        <button>Short</button>
    </form>
</template>