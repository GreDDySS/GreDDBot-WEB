<script setup lang="ts">
  import { ScrollArea } from '~/components/ui/scroll-area'
  import {ref, onMounted} from 'vue'

  interface Channel {
    id: number
    name: string
  }

  interface Log {
    id: number
    username: string
    color: string
    message: string
    date: string
  }

  const channels = ref<Channel[]>([])
  const logs = ref<Log[]>([])

  const fetchChannels = async () => {
    channels.value = await $fetch('/api/getChannel')
  }
  
  const fetchMessages = async (channelId: number) => {
    logs.value = await $fetch(`/api/getMessage`, {
      params: {id: channelId}
    });
  };

  onMounted(() => {
    fetchChannels()
  })
</script>

<template>
    <div class="flex-col m-16">
      <div class=" h-[500px] grid grid-cols-4 gap-5">
        <!-- Block Channels -->
        <div class="bg-card p-5 rounded-lg">
          <h4 class="text-3xl text-center mb-2">Channels</h4>
          <ScrollArea class="h-[500px]  w-full rounded-md ">
            <div class="p-1">
              <div v-for="channel in channels" :key="channel.id">
                <button 
                class="text-md font-semibold w-full rounded-sm bg-popover p-2 m-1.5"
                @click="fetchMessages(channel.id)"
                >
                  {{ channel.name }}
                </button>
              </div>
            </div>
          </ScrollArea>
        </div>
        <!-- Block Log message -->
        <div class="col-span-3 bg-card p-5 rounded-lg">
          <h4 class="text-3xl text-center mb-2">Logs</h4>
          <div v-if="logs.length === 0" class="h-full flex items-center justify-center leading-8 text-neutral-600 text-center">

            <ul class=" bg-neutral-900 p-4 rounded-lg">
              <li>
                <div>
                  <Icon name="majesticons:chat-2-line" size="48px"/>
                </div>
              </li>
              <li>Выберите канал, чтобы увидеть сообщения.</li>
              <li>Если нет сообщений, выберите другой канал.</li>
              
            </ul>
          </div>
          <div v-else>
            <ScrollArea class="h-[450px] w-full rounded-md border">
              <div class="p-1">
                <div v-for="log in logs" :key="log.id">
                  <p>
                    <span class="text-neutral-600">{{ log.date }}</span> <span class=" font-semibold" :style="{color: log.color}">{{ log.username }}:</span>
                    {{ log.message }}
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
</template>