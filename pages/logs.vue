<script setup lang="ts">
  import { ScrollArea } from '~/components/ui/scroll-area'
  import { Separator } from '~/components/ui/separator'

  const channels = [
    {id: 1, name: 'GreDDySS'},
    {id: 2, name: 'GreDDBot'},
    {id: 3, name: 'Tastykirieshka_'},
    {id: 4, name: 'Borobushe'},
    {id: 5, name: 'Bjlaguk_'},
    {id: 6, name: 'ilotterytea'},
    {id: 7, name: 'Xomachel'},
    {id: 8, name: 'iamplugg'},
    {id: 9, name: 'zetnert_'},
    {id: 10, name: 'pwgood'},
    {id: 11, name: 'pwgood3'},
    {id: 12, name: 'pwgood34'},
    {id: 13, name: 'pwgood35'},
  ]

  const logs = [
    {id: 1, username: 'RandomCancer_', color: '#B22222', message: 'ирл опасно всех подряд хуесосами называть', date: '07-23 14:57' },
    {id: 2, username: 'RandomCancer_', color: '#B22222', message: 'зачем мне прикидываться я и так самый умный', date: '07-23 15:03' },
    {id: 3, username: 'borobushe', color: '#A9F5F2', message: 'ахаха', date: '07-23 15:04' },
    {id: 4, username: 'borobushe', color: '#A9F5F2', message: 'ну давай', date: '07-23 15:04' },
    {id: 5, username: 'borobushe', color: '#A9F5F2', message: 'расскажи мне налоговую роль амортизации основных средств', date: '07-23 15:04' },
    {id: 6, username: 'RandomCancer_', color: '#B22222', message: 'ты нахуя слова выдумал', date: '07-23 15:05' },
    {id: 7, username: 'RandomCancer_', color: '#B22222', message: 'рульки бульки пупульки', date: '07-23 15:05' },
    {id: 8, username: 'RandomCancer_', color: '#B22222', message: 'и че объясни давай', date: '07-23 15:05' },
    {id: 9, username: 'borobushe', color: '#A9F5F2', message: 'ты сколько ваще изнасилований то совершил', date: '07-23 15:05' },
    {id: 10, username: 'RandomCancer_', color: '#B22222', message: 'эм', date: '07-23 15:05' },
    {id: 11, username: 'RandomCancer_', color: '#B22222', message: 'нисколько', date: '07-23 15:05' },
    {id: 12, username: 'borobushe', color: '#A9F5F2', message: 'вот вот', date: '07-23 15:05' },
    {id: 13, username: 'RandomCancer_', color: '#B22222', message: 'а ты?', date: '07-23 15:05' },
    {id: 14, username: 'Dandaro', color: '#654A3A', message: 'Кансер не ебал малдован WeirdChamping', date: '07-23 15:05' },
    {id: 15, username: 'RandomCancer_', color: '#B22222', message: 'я никого не ебал еще бро', date: '07-23 15:06' },
    {id: 16, username: 'Dandaro', color: '#654A3A', message: 'Или кого у вас принято хз', date: '07-23 15:06' },
    {id: 17, username: 'borobushe', color: '#A9F5F2', message: 'я ебал дандаро в попу прям', date: '07-23 15:06' },
    {id: 18, username: 'Dandaro', color: '#654A3A', message: 'Как в приднестровцев посвящают', date: '07-23 15:06' },
    {id: 19, username: 'Dandaro', color: '#654A3A', message: 'Эм пруфы?', date: '07-23 15:06' },
    {id: 20, username: 'RandomCancer_', color: '#B22222', message: 'берегите свое целомудрие ребята', date: '07-23 15:06' },
    {id: 21, username: 'borobushe', color: '#A9F5F2', message: 'ээээ', date: '07-23 15:06' },
    {id: 22, username: 'borobushe', color: '#A9F5F2', message: 'пруфов не будет, не ебал', date: '07-23 15:06' },
    {id: 23, username: 'RandomCancer_', color: '#B22222', message: 'пиздунчик', date: '07-23 15:06' },
    {id: 24, username: 'borobushe', color: '#A9F5F2', message: 'в попу', date: '07-23 15:06' },
    {id: 25, username: 'Dandaro', color: '#654A3A', message: 'Пруфы?', date: '07-23 15:06' },
    {id: 26, username: 'borobushe', color: '#A9F5F2', message: 'Дандаро только ртом работал', date: '07-23 15:06' },
  ]
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
                <p><span class="text-neutral-600">{{ log.date }}</span> <span :style="{color: log.color}">{{ log.username }}:</span> {{ log.message }}</p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

    </div>
</template>