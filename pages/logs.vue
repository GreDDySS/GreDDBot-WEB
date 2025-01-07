<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Pagination } from "../components/ui/pagination";
import { ScrollArea } from "../components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "../components/ui/select";

const channels = ref<{ channelId: number; channelName: string; }[]>([]);
const selectedChannelId = ref<string>("");
const logs = ref<{ id: number; username: string; message: string; badges: string; color: string; timestamp: string; }[]>([]);
const logsPerPage = ref(100);
const currentPage = ref(1);
const totalLogs = ref(0);

const fetchChannels = async () => {
  const response = await fetch("/api/channels");
  const data = await response.json();
  channels.value = data.channels;
};

const fetchLogs = async () => {
  if (!selectedChannelId.value) return;

  const response = await fetch(
    `/api/logs?channelId=${selectedChannelId.value}&page=${currentPage.value}&limit=${logsPerPage.value}`
  );
  const data = await response.json();
  logs.value = data.logs;
  totalLogs.value = data.logs.length;
}

const totalPages = computed(() => Math.ceil(totalLogs.value / logsPerPage.value));

const handleChannelSelect = (value: string) => {
  selectedChannelId.value = value;
  currentPage.value = 1;
  fetchLogs();
};

onMounted(() => {
  fetchChannels();
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

    <!-- Логи -->
    <div class="bg-card p-4 rounded-lg">
      <ScrollArea class="h-[450px] w-full rounded-md border">
        <div v-for="log in logs" :key="log.id">
          <p>
            <span class="text-neutral-600">{{ log.timestamp }}</span> <span class="font-semibold" :style="{ color: log.color }">{{ log.username }}:</span>
            {{ log.message }}
          </p>
        </div>
      </ScrollArea>
    </div>

    <!-- Пагинация -->
    <div class="mt-4 flex justify-center">
      <Pagination
        :total-pages="totalPages"
        :current-page="currentPage"
        :sibling-count="1"
        @page-changed="fetchLogs"
      />
    </div>
  </div>
</template>