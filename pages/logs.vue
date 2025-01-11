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
  <div class="container mx-auto pt-16 pb-2 px-4">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-6">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Логи чата
          </h1>
          <p class="text-lg text-white/80 max-w-2xl mx-auto">
            Просмотр и анализ сообщений чата выбранного канала
          </p>
        </div>
      <!-- Controls -->
      <div class="bg-black/50 backdrop-blur border border-white/10 rounded-lg p-6 mb-3">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="relative flex-1">
          <Select v-model="selectedChannelId" @update:model-value="handleChannelSelect" class="w-full bg-black/20 border-white/10 text-white rounded-md p-2">
            <SelectTrigger>
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
        <div class="flex-2 flex gap-4">
          <div class="relative flex-1">
            <Input
              class="w-full pl-10 bg-black/20 border border-white/10 text-white placeholder:text-white/50 rounded-md p-2"
              placeholder="Поиск по тексту..."
              v-model="searchQuery"
            />
          </div>
          <div class="relative flex-1">
            <Input
              class="w-full pl-10 bg-black/20 border border-white/10 text-white placeholder:text-white/50 rounded-md p-2"
              placeholder="Имя пользователя..."
              v-model="selectedUsername"
            />
          </div>
          <div class="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" class="w-full pl-10 bg-black/20 border border-white/10 text-white/50 rounded-md p-2">
                  {{ selectedDate ? format(selectedDate, "dd.MM.yyyy") : "Выберите дату" }}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" class="w-auto p-0">
                <Calendar v-model="selectedDate" />
              </PopoverContent>
            </Popover>
          </div>
          <div class="relative flex-1">
            <Button 
                variant="secondary"
                @click="resetFilters"
                :disabled="!searchQuery && !selectedUsername && !selectedDate">
              Сбросить фильтры
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Logs contents-->
        <div v-if="isLoading" class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
          {{ error }}
        </div>
        
        <template v-else>
          <div v-if="!hasResults && selectedChannelId" class="border rounded text-center px-4 py-3 text-gray-500">
            Логи не найдены
          </div>


           <div v-else-if="hasResults">
            <ScrollArea class="h-[450px] bg-black/50 backdrop-blur border border-white/10 rounded-lg p-6 font-mono">
              <div v-for="log in logs" :key="log.id" class="flex gap-2 p-0.5">
                  <span class="text-white/50">{{ format(new Date(log.timestamp), "dd.MM.yyyy HH:mm") }}</span>
                  <span class="font-bold" :style="{ color: log.color }"> {{ log.username}}:</span>
                  <span class="text-white">{{ log.message }}</span>
              </div>
            </ScrollArea>
           </div>
           <div class="mt-4 flex justify-center">
            <Pagination
              :total-pages="totalPages"
              :current-page="currentPage"
              :sibling-count="1"
              @page-changed="handlePageChange"
            />
          </div>
        </template>
     </div>
  </div>
</template>
