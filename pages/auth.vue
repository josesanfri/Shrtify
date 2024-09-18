<script lang="ts" setup>
const supabase = useSupabaseClient();
const errors = ref<string>("");
const isLoginUser = ref<boolean>(true)

const formUser = reactive({
	email: '',
	password: ''
})

const login = async () => {
	if(!formUser.email || !formUser.password){
		errors.value = "Por favor completa todos los campos";
		return;
	}

	if(!isLoginUser.value){
		return signUp();
	}

	try{
		const { data, error } = await supabase.auth.signInWithPassword({
			email: formUser.email,
			password: formUser.password
		});

		if(error){
			errors.value = error.message;
			return;
		}
		errors.value = "";

		if(data){
			useRouter().push("/dashboard");
		}

	} catch (error) {
		errors.value = "Algo va mal...";
	}
}

const signUp = async () => {
	try{
		const { data, error } = await supabase.auth.signUp({
			email: formUser.email,
			password: formUser.password
		});
		if(error){
			errors.value = error.message;
			return;
		}
		console.log({data})
		errors.value = "";

		return navigateTo('/confirm');
	} catch(error){
		errors.value = "Algo va mal...";
	}
}

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
				<article class="flex justify-center">
					<div class="flex justify-center w-20 h-20 items-center rounded-full border border-white/20 bg-cyan-500 shadow-xl">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
						</svg>
					</div>
				</article>
				<button class="btn-primary py-3 px-4 w-full my-5" @click="handleGithubLogin()">
					Continuar con Github
				</button>
				<hr class="border-white/10">
				<form class="mt-5" @submit.prevent="login()">
					<div class="form-group">
						<label class="form-label" for="email">Email</label>
						<input class="input-primary" type="email" name="email" placeholder="juanca@gmail.com" v-model="formUser.email">

					</div>
					<div class="form-group">
						<label class="form-label" for="password">Contraseña</label>
						<input class="input-primary" type="password" name="password" placeholder="contra..." v-model="formUser.password">
					</div>
					<button type="submit" class="btn-primary rounded-full py-3 w-full">
						<template v-if="isLoginUser">
							Login
						</template>
						<template v-else>
							Registrar
						</template>
					</button>
					<button type="button" @click="isLoginUser = !isLoginUser">
						<template v-if="isLoginUser">
							Todavia no tienes cuenta? Registrate
						</template>
						<template v-else>
							Ya tienes cuenta? Entra
						</template>
					</button>
				</form>
			</section>
		</article>
	</section>
</template>