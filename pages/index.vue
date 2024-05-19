<template>
  <div class="page">
    <NTimeline>
      <NTimelineItem
        v-for="event in eventWithActivity"
        :key="event.id"
        type="success"
        :color="`var(--my-color-${event.activity.color})`"
      >
        <CDailyEvents :event-with-activity="event" />
      </NTimelineItem>
    </NTimeline>
    <CCreateEventForm @addedEvent="refreshEvents" />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { NTimeline, NTimelineItem } from 'naive-ui'
import type { ActivityDTO } from '~/server/app/activities/presentation/ActivityDTO'
import type { EventDTO } from '~/server/app/events/presentation/EventDTO'

const startDate = dayjs().startOf('day')
const endDate = dayjs().endOf('day')

const getEvents = async () => {
  const events = await $fetch<EventDTO[]>(`/api/events`, {
    query: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
    method: 'GET'
  })

  return await Promise.all(
    events!.map(async (event) => {
      const activity = await $fetch<ActivityDTO>(`/api/activities/${event.activityId}`, {
        method: 'GET'
      })
      return { ...event, activity: activity! }
    })
  )
}

const { data: eventWithActivity } = await useAsyncData(getEvents)

const refreshEvents = async () => {
  eventWithActivity.value = await getEvents()
}
</script>

<style scoped>
.page {
  padding: 32px 56px 56px;
  position: relative;
}
.page h2 {
  margin-top: 0;
}
</style>
