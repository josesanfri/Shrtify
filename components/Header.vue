<script lang="ts" setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const logout = async () => {
	let { error } = await supabase.auth.signOut();
	error ? alert('error logout') : useRouter().push({name: "index"})
}

</script>

<template>
    <header>
        <nav>
            <li>
				<NuxtLink to="/">Home</NuxtLink>
			</li>
			<li v-if="user">
				<NuxtLink to="/protected">Protected</NuxtLink>
			</li>
			<li v-else>
				<NuxtLink to="/auth">Auth</NuxtLink>
			</li>
			<li v-if="user">
				<button @click="logout">Logout</button>
			</li>
            <li v-else>
                <NuxtLink to="/auth">Sign In</NuxtLink>
            </li>
        </nav>
    </header>
</template>
