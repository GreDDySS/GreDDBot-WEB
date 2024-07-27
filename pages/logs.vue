<script setup lang="ts">
  import { ScrollArea } from '~/components/ui/scroll-area'

  const channels = await $fetch('/api/getChannel')

  const logs = await $fetch('/api/getMessage')
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
                <button class="text-md font-semibold w-full rounded-sm bg-popover p-2 m-1.5">
                  {{ channel.name }}
                </button>
              </div>
            </div>
          </ScrollArea>
        </div>
        <!-- Block Log message -->
        <div class="col-span-3 bg-card p-5 rounded-lg">
          <h4 class="text-3xl text-center mb-2">Logs</h4>
          <ScrollArea class="h-[450px] w-full rounded-md border">
            <div class="p-1">
              <div v-for="log in logs" :key="log.id">
                <p><span class="text-neutral-600">{{ log.date }}</span> <span class="text-md" :style="{color: log.color}">{{ log.username }}:</span> {{ log.message }}</p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

    </div>
</template>