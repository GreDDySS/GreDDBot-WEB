<script setup lang="ts">
const { user, logout } = useAuth()
const isLoading = ref(false)

const handleLogout = async () => {
  isLoading.value = true
  try {
    await logout()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div v-if="user" class="p-4 bg-card rounded-lg shadow">
    <div class="flex items-center gap-4">
      <img 
        :src="user.profile_image_url" 
        :alt="user.display_name"
        class="w-16 h-16 rounded-full"
      />
      <div>
        <h2 class="text-xl font-bold">{{ user.display_name }}</h2>
      </div>
    </div>
    <button 
      @click="handleLogout"
      class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      :disabled="isLoading"
    >
      {{ isLoading ? 'Выход...' : 'Выйти' }}
    </button>
  </div>
</template>