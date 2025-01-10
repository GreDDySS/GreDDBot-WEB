<script setup lang="ts">
import UserProfile from '~/components/common/UserProfile.vue';
const { getUser } = useAuth();
definePageMeta({
  middleware: ['auth']
})

const { isAuthenticated } = useAuth()

onMounted(async()=> {
  if (!isAuthenticated.value) return;
  await getUser()
})

</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1>Личный кабинет</h1>
      </div>

      <!-- User Profile -->
      <div class="mb-8">
        <UserProfile />
      </div>
      </div>
    </div>
</template>
