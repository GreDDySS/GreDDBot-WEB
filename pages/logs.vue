<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { format } from "date-fns";
import { useDebounce } from "@vueuse/core";  
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Pagination } from "../components/ui/pagination";
import { ScrollArea } from "../components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Calendar } from "../components/ui/calendar"; 
import type { Channel, Log } from "../server/types/types";


const channels = ref<Channel[]>([]);
const selectedChannelId = ref<string>("");
const logs = ref<Log[]>([]);
const logsPerPage = ref(100);
const currentPage = ref(1);
const totalLogs = ref(0);
const searchQuery = ref("");
const selectedUsername = ref("");
const selectedDate = ref<Date | any>();
const isLoading = ref(false);
const error = ref<string | null>(null);
const debouncedSearch = useDebounce(searchQuery, 300);
const totalPages = computed(() => Math.ceil(totalLogs.value / logsPerPage.value));
const hasResults = computed(() => logs.value.length > 0);

const fetchChannels = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetch("/api/channels");
    const data = await response.json();
    channels.value = data.channels;
  } catch (e) {
    error.value = 'Ошибка при загрузке каналов: ' + (e instanceof Error ? e.message : 'Неизвестная ошибка');
  } finally {
    isLoading.value = false;
  }
};

const fetchLogs = async () => {
  if (!selectedChannelId.value) return;

  isLoading.value = true;
  error.value = null;

  try {
    const queryParams = new URLSearchParams({
      channelId: selectedChannelId.value,
      page: currentPage.value.toString(),
      limit: logsPerPage.value.toString(),
      ...(debouncedSearch.value ? { query: debouncedSearch.value } : {}),
      ...(selectedUsername.value ? { username: selectedUsername.value } : {}),
      ...(selectedDate.value ? { date: format(selectedDate.value, "yyyy-MM-dd") } : {}),
    });
    
    const response = await fetch(`/api/logs?${queryParams.toString()}`);
    const data = await response.json();
    logs.value = data.logs;
    totalLogs.value = data.total;
  } catch (e) {
    error.value = 'Ошибка при загрузке логов: ' + (e instanceof Error ? e.message : 'Неизвестная ошибка');
    logs.value = [];
    totalLogs.value = 0;
  } finally {
    isLoading.value = false;
  }
};


const handleChannelSelect = (value: string) => {
  selectedChannelId.value = value;
  currentPage.value = 1;
  fetchLogs();
};


const resetFilters = () => {
  searchQuery.value = "";
  selectedUsername.value = "";
  selectedDate.value = undefined;
  currentPage.value = 1;
  fetchLogs();
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchLogs();
}

watch(debouncedSearch, () => {
  currentPage.value = 1;
  fetchLogs();
});

watch(selectedUsername, () => {
  currentPage.value = 1;
  fetchLogs();
});

watch(selectedDate, () => {
  currentPage.value = 1;
  fetchLogs();
});

onMounted(() => {
  fetchChannels();
  const params = new URLSearchParams(window.location.search);
  selectedChannelId.value = params.get('channelId') || "";
  if (selectedChannelId.value) {
    fetchLogs();
  }
});
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Логи сообщений</h1>

    <!-- Список каналов -->
    <div class="flex justify-center mb-8">
      <Select v-model="selectedChannelId" @update:modelValue="handleChannelSelect">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Выбери канал" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Каналы</SelectLabel>
            <SelectItem
              v-for="channel in channels"
              :key="channel.channelId"
              :value="String(channel.channelId)"
            >
              {{ channel.channelName }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <!-- Фильтры -->
    <div class="flex justify-center space-x-4 mb-8">
      <!-- Поиск по тексту -->
      <Input
        class="w-[200px]"
        placeholder="Поиск по тексту..."
        v-model="searchQuery"
      />

      <!-- Поиск по пользователю -->
      <Input
        class="w-[200px]"
        placeholder="Имя пользователя..."
        v-model="selectedUsername"
      />

      <!-- Фильтр по дате -->
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" class="w-[200px] justify-start text-left">
            {{ selectedDate ? format(selectedDate, "dd.MM.yyyy") : "Выберите дату" }}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" class="w-auto p-0">
          <Calendar v-model="selectedDate" />
        </PopoverContent>
      </Popover>

      <!-- Сброс фильтров -->
       <Button 
          variant="secondary"
          @click="resetFilters"
          :disabled="!searchQuery && !selectedUsername && !selectedDate"
       >
        Сбросить фильтры
       </Button>
    </div>

    <!-- Состояние загрузки-->
    <div v-if="isLoading" class="text-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
      {{ error }}
    </div>

    <!-- Основной контент -->
    <template v-else>
      <!-- Пустое состояние -->
      <div v-if="!hasResults && selectedChannelId" class="text-center py-4 text-gray-500">
        Логи не найдены
      </div>

      <!-- Логи -->
      <div v-else-if="hasResults" class="bg-card p-4 rounded-lg">
        <ScrollArea class="h-[450px] w-full rounded-md border">
          <div v-for="log in logs" :key="log.id" class="p-0.5">
            <p class="px-4">
              <span class="text-neutral-600">{{ format(new Date(log.timestamp), "yyy.MM.dd HH:mm") }}</span>
              <span 
                class="font-semibold mx-2" 
                :style="{ color: log.color }"
                :title="log.badges"
              >
                {{ log.username }}:
              </span>
              <span>{{ log.message }}</span>
            </p>
          </div>
        </ScrollArea>

        <!-- Пагинация -->
        <div class="mt-4 flex justify-center">
          <Pagination
            :total-pages="totalPages"
            :current-page="currentPage"
            :sibling-count="1"
            @page-changed="handlePageChange"
          />
        </div>
      </div>
    </template>
  </div>
</template>
