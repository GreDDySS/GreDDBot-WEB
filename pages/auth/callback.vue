<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const code = route.query.code as string
  const state = route.query.state as string

  if (!code) {
    error.value = 'Код авторизации не получен'
    loading.value = false
    return
  }

  try {
    const response = await $fetch("/api/auth/twitch", {
      method: 'POST',
      body: { code, state }
    })
    if (response.success) {
      router.push('/dashboard')
    }
    
  } catch (e) {
    error.value = 'Ошибка при авторизации'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full p-8 bg-card rounded-lg shadow text-center">
      <template v-if="loading">
        <div class="flex flex-col items-center space-y-4">
          <div class="animate-spin h-10 w-10 border-4 border-purple-600 border-t-transparent rounded-full"></div>
          <p class="text-gray-600">Выполняется авторизация...</p>
        </div>
      </template>

      <template v-else-if="error">
        <div class="text-red-600">
          <p>{{ error }}</p>
          <NuxtLink 
            to="/login"
            class="mt-4 inline-block text-purple-600 hover:text-purple-700"
          >
            Вернуться на страницу входа
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>