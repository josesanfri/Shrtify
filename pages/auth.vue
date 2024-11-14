<script lang="ts" setup>
const supabase = useSupabaseClient();

const handleGithubLogin = async () => {
	await supabase.auth.signInWithOAuth({
		provider: 'github'
	})
}
</script>

<template>
	<section class="h-screen grid place-content-center">
		<article class="container">
			<section class="card">
				<article class="flex flex-col items-center justify-center gap-4">
					<div class="flex justify-center w-20 h-20 items-center rounded-full border border-white/20 bg-cyan-500 shadow-xl">
						<LucideLock size="1.5rem"/>
					</div>
					<h2>Log in to Shrtify</h2>
				</article>
				<button class="btn-primary rounded-full py-3 px-4 w-full my-5 flex flex-row justify-center gap-4" @click="handleGithubLogin()">
					<LucideGithub size="1.5rem"/> Continue with GitHub
				</button>
			</section>
		</article>
	</section>
</template>
