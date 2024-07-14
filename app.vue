<template>
  <div class="flex flex-col h-screen w-full bg-background">
  <NuxtLayout/>
  <div class="flex flex-col items-center justify-center m-20">
        <h1 class="text-4xl font-bold mb-8">Welcome</h1>
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col gap-4 p-4">
          <div class="flex-[2] bg-muted rounded-md p-4">
            <div class="flex gap-4">
              <img src="https://cdn.7tv.app/emote/60bfb67aa2610d253072f14a/4x.webp">
              <div>
                <h2 class="text-2xl font-bold mb-2">Twitch Bot</h2>
                <p class="text-muted-foreground">Этот бот предназначен для работы с чатом Twitch.</p>
                <p class="text-muted-foreground">
                  Он позволяет автоматизировать различные задачи, выполнение команд чата.
                </p>
                <p class="text-muted-foreground">
                  Бот также ведёт логирование сообщений и тесно интегрирован с базой данных.
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-4">
            <a href="#" class="bg-muted rounded-md p-4 flex-1 flex items-center justify-center hover:bg-accent hover:text-accent-foreground">
              <h2 class="text-2xl font-bold">Commands</h2>
            </a>
            <a href="#" class="bg-muted rounded-md p-4 flex-1 flex items-center justify-center hover:bg-accent hover:text-accent-foreground">
              <h2 class="text-2xl font-bold">Logs</h2>
            </a>
          </div>
        </div>
      </div>
  </div>
</template>
