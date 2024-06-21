<script setup lang="ts">
import moment from "moment";

const { $client } = useNuxtApp();
const { data } = await $client.events.useLazyQuery()

const formatDate = (date: string) => {
  return moment(date).format('DD.MM.YY')
}

</script>

<template>
  <div class="bg-gradient-to-b from-white to-blue-200 bg-fixed flex flex-col items-center py-8">
    <div class="container">
      <div class="text-center mb-8">
    <h1 class="drop-shadow-2xl text-4xl font-bold mb-4">Philos-L List Archive (RSS)</h1>
    <p class="text-xl">A visualization of the latest posts in the Philos-L mailing list.</p>
  </div>
    <div v-if="!data" class="flex justify-center">
      <LoadingSpinner />
    </div>
    <div class=" " v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
      <div v-for="event in data" :key="event.id" class="bg-white p-6 border rounded text-ellipsis overflow-hidden shadow-lg">
        <h2 class="text-xl font-bold hover:text-slate-600 mb-2">
          <NuxtLink :href="event.link">{{ event.title }}</NuxtLink>
        </h2>
        <div class="font-semibold">
          {{ event.creator }}
        </div>
        <div class="is-size-7"> {{ formatDate(event.pubDate) }}</div>
        <div class="my-3"><span v-html="event.content"></span>
        </div>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.event{
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
