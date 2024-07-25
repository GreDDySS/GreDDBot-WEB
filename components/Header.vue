<script lang="ts">
    export default {
        name: 'Header'
    }
</script>

<template>
    <header class="flex items-center justify-between px-4 py-3 shadow-sm border-b">
        <div class="flex items-center ml-5 gap-2">
            <div class="flex items-center gap-2">
                <Icon name="simple-line-icons:layers" size="24" />
                <h1 class="text-lg font-semibold">GreDDBot</h1>
            </div>
            <nav>
                <a href="/" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-accent-foreground">
                    <Icon name="grommet-icons:command" size="20" />
                    Dashboard
                </a>
                <a href="/logs" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-accent-foreground">
                    <Icon name="simple-line-icons:pencil" size="20" />
                    Logs
                </a>
            </nav>
        </div>
        <div class="mr-5">
            <a target="_blank" alt="GitHub" class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary/50" href="https://github.com/GreDDySS">
                <Icon name="grommet-icons:github" size="24" />
                GitHub
            </a>
        </div>
    </header>
</template>