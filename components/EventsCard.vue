<script setup lang="ts">
import moment from "moment";

const event = defineProps({
    title: String,
    creator: String,
    content: String,
    pubDate: String,
    link: String
})

const formatDate = (date: string) => {
  return moment(date).format('DD.MM.YY')
}
</script>

<template>

<div class="flex-none w-1/4 bg-white p-6 border rounded text-ellipsis overflow-hidden shadow-lg">
        <h2 class="text-xl font-bold hover:text-slate-600 mb-2">
          <NuxtLink :href="event.link">{{ event.title }}</NuxtLink>
        </h2>
        <div class="font-semibold">
          {{ event.creator }}
        </div>
        <div class="is-size-7"> {{ formatDate(event.pubDate!) }}</div>
        <div class="my-3"><span v-html="event.content"></span>
        </div>
      </div>
</template>