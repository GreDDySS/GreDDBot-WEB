<script>
export default {
  name: 'HomePage'
}
</script>

<template>
    <div class="flex flex-col items-center justify-center m-20">
    <h1 class="text-4xl font-bold mb-8">Welcome</h1>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col gap-4 p4">
            <div class="flex-[2] bg-card rounded-md p-4">
                <div class="flex items-center gap-10 pb-5 leading-8">
                    <img src="https://cdn.7tv.app/emote/60bfb67aa2610d253072f14a/4x.webp" height="160px" width="160px">
                    <div>
                        <h2 class="text-2xl font-bold">Twitch Bot</h2>
                        <ul class="text-muted-foreground list-disc">
                            <li>Этот бот предназначен для работы с чатом Twitch.</li>
                            <li>Он позволяет автоматизировать различные задачи, выполнение команд чата.</li>
                            <li>Бот также ведёт логирование сообщений и тесно интегрирован с базой данных.</li>
                        </ul>
                    </div>
                </div>
                <div class="flex flex-row gap-4">
                    <a href="/commands" class="bg-popover rounded-md p-4 gap-4 flex-1 flex items-center justify-center hover:bg-accent hover:text-accent-foreground">
                        <Icon name="grommet-icons:command" size="24"/>
                        Commands
                    </a>
                    <a href="/logs" class="bg-popover rounded-md p-4 gap-4 flex-1 flex items-center justify-center hover:bg-accent hover:text-accent-foreground">
                        <Icon name="simple-line-icons:pencil" size="24"/>
                        Logs
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>