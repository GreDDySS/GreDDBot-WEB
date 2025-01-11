<script setup>
import Header from '~/components/common/Header.vue'
import Footer from '~/components/common/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background">
    <Header />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>