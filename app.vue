<script setup lang="ts">
import { ref } from "vue";

const { $client } = useNuxtApp();
const { status, data: events } = await useLazyAsyncData(
  () => $client.events.query({skip:0}))

let offset = 0
const batchSize = 3
const canGetMore = ref(true)

const loading = ref(false)
const getMoreEvents = async() => {
  offset = offset + batchSize;
  loading.value = true
  const {data: newEvents} = await useLazyAsyncData(
    () => $client.events.query({skip: offset})
  )
  
  if (!newEvents.value) return

  events.value?.push(...newEvents.value)
  canGetMore.value = (newEvents.value.length == batchSize)

  loading.value = false
}

</script>

<template>
  <div class="bg-slate-100 flex flex-col items-center py-8">
    <div class="container">
      <div class="text-center mb-8">
    <h1 class="drop-shadow-2xl text-4xl font-bold mb-4">
      Philos-L List Archive (RSS)
    </h1>
    <p class="text-xl">
      A visualization of the latest posts in the Philos-L mailing list.
    </p>
  </div>
  <div v-auto-animate class='flex flex-col items-center'>
      <LoadingSpinner v-if="status == 'pending'"/>
      <div v-auto-animate class="flex flex-wrap gap-5 justify-center"  v-else>
      <EventsCard v-for="event in events" :key="event.id" v-bind="event" />
      </div>
      <LoadingButton v-if="canGetMore" @click="getMoreEvents()" :is-loading="loading" />
    </div>
  </div></div>
</template>