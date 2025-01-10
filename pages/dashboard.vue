<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

interface Stats {
  broadcasterType: string;
}

const { user, isAuthenticated, getUser } = useAuth()
const router = useRouter()

const loading = ref(true)
const error = ref<string | null>(null)
const stats = ref<Stats>({
  broadcasterType: ''
})

const loadUserData = async () => {
  try {
    const userData = await getUser()
    
    if (!userData) {
      error.value = 'Не удалось загрузить данные пользователя'
      return
    }

    console.log('User data loaded:', userData)

    stats.value = {
      broadcasterType: userData.broadcaster_type || 'none'
    }
  } catch (err) {
    console.error('Error loading data:', err)
    error.value = 'Ошибка при загрузке данных'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }
  await getUser();

  await loadUserData();
})

const getBroadcasterTypeClass = computed(() => {
  switch (stats.value.broadcasterType) {
    case 'partner':
      return 'bg-purple-100 text-purple-800'
    case 'affiliate':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-neutral-400 text-gray-800'
  }
})

const getBroadcasterTypeText = computed(() => {
  switch (stats.value.broadcasterType) {
    case 'partner':
      return 'Партнер'
    case 'affiliate':
      return 'Аффилиат'
    default:
      return 'Обычный пользователь'
  }
})
</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-zinc-500">Личный кабинет</h1>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div class="animate-pulse">
          <div class="h-32 bg-card rounded-lg shadow">
            <div class="p-4">
              <div class="h-4 bg-neutral-700 rounded w-1/4"></div>
              <div class="space-y-3 mt-4">
                <div class="h-4 bg-neutral-700 rounded"></div>
                <div class="h-4 bg-neutral-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div 
        v-else-if="error" 
        class="bg-red-50 border border-red-200 rounded-lg p-4"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg 
              class="h-5 w-5 text-red-400" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fill-rule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              {{ error }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-else class="space-y-6">
        <!-- User Profile -->
        <div class="bg-card shadow rounded-lg p-6">
          <div class="flex items-center space-x-4">
            <img 
              v-if="user?.profile_image_url"
              :src="user.profile_image_url"
              :alt="user?.display_name"
              class="h-16 w-16 rounded-full"
            />
            <div>
              <h2 class="text-2xl font-bold text-neutral-300">
                {{ user?.display_name }}
              </h2>
              <span 
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  getBroadcasterTypeClass
                ]"
              >
                {{ getBroadcasterTypeText }}
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>