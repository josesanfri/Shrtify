<script lang="ts" setup>
import { ref } from 'vue';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
	isDropdownOpen.value = !isDropdownOpen.value;
}

const logout = async () => {
	let { error } = await supabase.auth.signOut();
	error ? alert('error logout') : useRouter().push({ name: "index" });
}
</script>

<template>
	<header>
		<nav class="bg-neutral-900 border-b border-gray-200">
			<section class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
				<NuxtLink to="/" class="flex items-center space-x-3">
					<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Shrtify</span>
				</NuxtLink>
				<article class="flex items-center md:order-2 gap-4 relative">
					<LucideGithub class="h-6 w-6 rounded-full"/>
					<NuxtLink v-if="!user" to="/auth.vue" class="btn-primary flex flex-row items-center gap-2">
						<LucideArrowRight class="w-4 h-4" />
						Get Started
					</NuxtLink>

					<template v-else>
						<button @click="toggleDropdown" type="button" class="flex text-sm rounded-full md:me-0" aria-expanded="false" aria-haspopup="true">
							<span class="sr-only">Open user menu</span>
							<img :src="user?.user_metadata?.avatar_url" class="h-6 w-6 rounded-full" alt="User Avatar">
						</button>

						<!-- Dropdown menu -->
						<div v-if="isDropdownOpen" class="absolute right-0 mt-60 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-neutral-800 dark:divide-neutral-700 z-50"
						>
							<div class="px-4 py-3">
								<span class="block text-sm text-gray-900 dark:text-white">{{ user.user_metadata.full_name }}</span>
								<span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{ user.email }}</span>
							</div>
							<ul class="py-2">
								<li>
									<NuxtLink to="/" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">
										Home
									</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/dashboard" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">
										Dashboard
									</NuxtLink>
								</li>
								<li>
									<button @click="logout" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">
										Sign out
									</button>
								</li>
							</ul>
						</div>
					</template>
				</article>
			</section>
		</nav>
	</header>
</template>
