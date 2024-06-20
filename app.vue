<script setup lang="ts">
import moment from "moment";

const {$client} = useNuxtApp();

const { data } = await $client.events.useLazyQuery()

const formatDate = (date: string) => {
  return moment(date).format('DD.MM.YY')
}
</script>

<template>
  <div class="container pt-6">
    <h1 class="title has-text-centered">Philos-L List Archive (RSS)</h1>
    <div v-if="!data" class="is-flex is-justify-content-center is-align-items-center">
      <LoadingSpinner />
    </div>
    <div v-else>
      <div class="grid is-col-min-3 is-gap-2">
      <div v-for="event in data" class="cell p-5  ">
        <h2 class="is-size-4 mb-2">
          <NuxtLink :href="event.link">{{ event.title }}</NuxtLink>
        </h2>
        <div class="has-text-weight-semibold">
          {{ event.creator }}
        </div>
        <div class="is-size-7"> {{ formatDate(event.pubDate) }}</div>

        <div class="my-3"><span v-html="event.content"></span>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.cell{
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
