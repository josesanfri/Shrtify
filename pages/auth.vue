<script lang="ts" setup>
const supabase = useSupabaseClient();

const handleGithubLogin = async () => {
<<<<<<< HEAD
  await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
=======
	await supabase.auth.signInWithOAuth({
		provider: 'github'
	})
>>>>>>> e36d2c91c5e354aa0e9f0538b782229da2f9ddcb
}
</script>

<template>
<<<<<<< HEAD
  <section class="min-h-[70vh] md:min-h-[90vh] grid place-content-center px-8">
    <article class="container">
      <section class="card">
        <article class="flex flex-col items-center justify-center gap-4">
          <div
            class="flex justify-center w-20 h-20 items-center rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-600 shadow-xl">
            <LucideLock class="w-6 h-6" />
          </div>
          <h2 class="text-2xl font-semibold">Log in to Shrtify</h2>
        </article>
        <button
          class="btn-primary rounded-full py-3 px-4 w-full my-5 flex flex-row justify-center items-center gap-4 transition"
          @click="handleGithubLogin">
          <LucideGithub class="w-6 h-6" />
          Continue with GitHub
        </button>
      </section>
    </article>
  </section>
</template>
=======
	<section class="min-h-[70vh] md:min-h-[90vh] grid place-content-center px-8">
	  <article class="container">
		<section class="card">
		  <article class="flex flex-col items-center justify-center gap-4">
			<div class="flex justify-center w-20 h-20 items-center rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-600 shadow-xl">
			  <LucideLock class="w-6 h-6" />
			</div>
			<h2 class="text-2xl font-semibold">Log in to Shrtify</h2>
		  </article>
		  <button
			class="btn-primary rounded-full py-3 px-4 w-full my-5 flex flex-row justify-center items-center gap-4 transition"
			@click="handleGithubLogin"
		  >
			<LucideGithub class="w-6 h-6" />
			Continue with GitHub
		  </button>
		</section>
	  </article>
	</section>
  </template>
  
>>>>>>> e36d2c91c5e354aa0e9f0538b782229da2f9ddcb
