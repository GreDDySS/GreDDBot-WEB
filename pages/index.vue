<script setup lang="ts">
import {Button} from "../components/ui/button"
</script>

<template>
  <div class="container pt-32">
    <!-- Content -->
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Добро пожаловать в GreDDBot
        </h1>
        <p class="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
          Управляйте Twitch-ботом с помощью удобного интерфейса. 
        </p>
      </div>
      <div class="flex justify-center space-x-4">
        <Button variant="outline" as-child>
        <a href="/commands">Команды</a>
        </Button>
        <Button variant="outline" as-child>
          <a href="/logs">Логи</a>
        </Button>
        <!-- <Button variant="outline" as-child>
          <a  href="/">Личный кабинет</a>
        </Button> -->
      </div>
  </div>
</template>
