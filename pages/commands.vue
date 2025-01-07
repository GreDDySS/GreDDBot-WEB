<script setup lang="ts">
  interface Command {
    name: string;
    description: string;
    usage: string;
  }

  const commands: Command[] = [
    { name: '!Ты', description: 'Думал', usage: '!Тут' },
    { name: '!Что-то', description: 'Будет', usage: '!А нет' },
    { name: '!Друг', description: 'Крутой', usage: '!А ты попался' },
  ];
</script>

<template>
  <div class="container mx-auto py-16">
    <h1 class="text-4xl font-bold mb-8 text-center">Список команд</h1>
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="command in commands"
        :key="command.name"
        class="border rounded-lg p-6 bg-card text-card-foreground"
      >
        <h2 class="text-xl font-semibold mb-2">{{ command.name }}</h2>
        <p class="text-sm text-muted-foreground mb-2">
          {{ command.description }}
        </p>
        <p class="text-sm font-mono text-primary">
          Пример: {{ command.usage }}
        </p>
      </div>
    </div> -->
    <div class="flex justify-center">
      <img src="https://cm.author.today/content/2024/05/07/53207513e27e4eb3b5e97f518cf9c5ba.png?height=400&width=750&rmode=max" height="560px" width="560px">
    </div>
  </div>
</template>
