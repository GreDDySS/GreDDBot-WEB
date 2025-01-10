<script setup lang="ts">
import TwitchLoginButton from '~/components/common/TwitchLoginButton.vue';
const { isAuthenticated } = useAuth()
const router = useRouter()


onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/dashboard')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-card-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-zinc-300">Вход в личный кабинет</h2>
        <p class="mt-2 text-gray-600">Войдите через свой аккаунт Twitch</p>
      </div>
      <TwitchLoginButton />
    </div>
  </div>
</template>