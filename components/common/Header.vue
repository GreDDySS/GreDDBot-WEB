<script setup>
import Button from '../ui/button/Button.vue'

const navItems = [
  { href: '/commands', label: 'КОМАНДЫ'},
  { href: '/logs', label: 'ЛОГИ'},
  // { href: '/docs', label: 'ДОКУМЕНТАЦИЯ'},
  ];
</script>

<template>
  <header>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-12">
          <NuxtLink to="/" class="flex items-center gap-2">
            <Icon name="ri:robot-2-line" class="h-6 w-6" />
            <span class="font-bold">GREDDBOT</span>
          </NuxtLink>
          <div class="md:flex items-center gap-6">
            <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            class="text-sm hover:text-primary transition-colors"
            :class="{ 'text-white': $route.path === item.href, 'text-white/70': $route.path !== item.href }"
          >
              {{ item.label }}
            </NuxtLink>
          </div>
          <div class="flex items-center gap-4">
            <Button variant="outline">
              ЛИЧНЫЙ КАБИНЕТ
            </Button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
