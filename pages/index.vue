<script setup lang="ts">
import {Button} from "../components/ui/button"
</script>

<template>
  <div class="container mx-auto text-center py-16">
    <h1 class="text-4xl font-bold mb-4">Добро пожаловать в GreDDBot</h1>
    <p class="text-lg text-muted-foreground mb-8">
      Управляйте вашим Twitch-ботом с помощью удобного интерфейса.
    </p>
    <div class="flex justify-center space-x-4">
      <Button variant="outline" as-child>
        <a href="/commands" class="btn btn-primary">Команды</a>
      </Button>
      <Button variant="outline" as-child>
        <a href="/logs" class="btn btn-primary">Логи</a>
      </Button>
      <Button variant="outline" as-child disabled>
        <a href="/dashboard" class="btn btn-secondary">Личный кабинет</a>
      </Button>
    </div>
  </div>
</template>
