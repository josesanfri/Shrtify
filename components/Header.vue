<script lang="ts" setup>
import type { User } from '@supabase/supabase-js';
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const logout = async () => {
	let { error } = await supabase.auth.signOut();
	error ? alert('error logout') : useRouter().push({name: "index"})
}
</script>

<template>
	<header class="fixed top-0 left-0 right-0 border-b border-white/20">
        <nav class="container py-4 flex justify-between">
			<NuxtLink
				:to="{
					name: 'index',
				}"
				class="text-2xl font-bold text-white"
			>
				Shrtify
			</NuxtLink>
			
			<ul class="flex items-center gap-4">
				<li v-if="user">
					<NuxtLink
						:to="{
							name: 'dashboard',
						}"
					>
						Dashboard
					</NuxtLink>
				</li>
				<li v-if="user">
					<button class="btn-primary rounded-full font-bold py-2 px-4" @click="logout">Salir</button>
				</li>
				<li v-else>
					<NuxtLink class="btn-primary rounded-full font-bold py-2 px-4" to="/auth">Entrar</NuxtLink>
				</li>
			</ul>
        </nav>
    </header>
</template>

<style lang="sass" scoped>
.grid-custom
    grid-template-columns: 20% 80%
</style>