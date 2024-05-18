<template>
  <div>
    <h1>À faire aujourd'hui ({{ startDate.toLocaleDateString() }})</h1>
    <ul>
      <li v-for="event in eventWithActivity" :key="event.id">
        {{ event.activity.name }} - de {{ new Date(event.startDate).toLocaleTimeString() }} à
        {{ new Date(event.endDate).toLocaleTimeString() }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ActivityDTO } from '~/server/app/activities/presentation/ActivityDTO'
import type { EventDTO } from '~/server/app/events/presentation/EventDTO'

const startDate = new Date()
startDate.setHours(0, 0, 0, 0)
const endDate = new Date()
endDate.setHours(0, 0, 0, 0)
endDate.setDate(endDate.getDate() + 1)

const { data: events } = await useFetch<EventDTO[]>(`/api/events`, {
  query: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
  method: 'GET'
})

const eventWithActivity = await Promise.all(
  events.value!.map(async (event) => {
    const { data: activity } = await useFetch<ActivityDTO>(`/api/activities/${event.activityId}`, {
      method: 'GET'
    })
    return { ...event, activity: activity.value! }
  })
)
</script>
