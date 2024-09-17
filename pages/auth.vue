<script lang="ts" setup>
const supabase = useSupabaseClient();
const errors = ref("");
const isLoginUser = ref(true)

const formUser = reactive({
	email: '',
	password: ''
})

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

const login = async () => {
	if(!formUser.email || !formUser.password){
		errors.value = "Por favor completa todos los campos";
		return;
	}

	if(!isLoginUser){
		return signUp;
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

const handleGithubLogin = async () => {
	await supabase.auth.signInWithOAuth({
		provider: 'github'
	})
}
</script>

<template>
    <h1>
        Login
    </h1>

	<section>
		<form @submit.prevent="login">
			<input type="email" placeholder="your email" v-model="formUser.email">
			<input type="password" placeholder="pass..." v-model="formUser.password">
			<button type="submit">
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

	<section>
		<button @click="handleGithubLogin()">
			Continua con Github
		</button>
	</section>
</template>