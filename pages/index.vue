<template>
  <div class="page">
    <div class="header">
      <p>{{ startDate.format('DD MMMM') }}</p>
      <NButton class="day-button" @click="goToPreviousDay">
        <template #icon>
          <NIcon :size="24" :component="ArrowLeftIcon"/>
        </template>
      </NButton>
      <NButton class="day-button" @click="goToNextDay">
        <template #icon>
          <NIcon :size="24" :component="ArrowRightIcon"/>
        </template>
      </NButton>
    </div>
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
import { NTimeline, NTimelineItem, NIcon, NButton } from 'naive-ui'
import { ArrowRight as ArrowRightIcon, ArrowLeft as ArrowLeftIcon } from '@vicons/carbon'
import type { ActivityDTO } from '~/server/app/activities/presentation/ActivityDTO'
import type { EventDTO } from '~/server/app/events/presentation/EventDTO'

const startDate = ref(dayjs().startOf('day'))
const endDate = ref(dayjs().endOf('day'))

const getEvents = async () => {
  const events = await $fetch<EventDTO[]>(`/api/events`, {
    query: { startDate: startDate.value.toISOString(), endDate: endDate.value.toISOString() },
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

const goToNextDay = () => {
  startDate.value = startDate.value.add(1, 'day')
  endDate.value = endDate.value.add(1, 'day')
  refreshEvents()
}

const goToPreviousDay = () => {
  startDate.value = startDate.value.subtract(1, 'day')
  endDate.value = endDate.value.subtract(1, 'day')
  refreshEvents()
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
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  text-transform: capitalize;
}
.day-button {
  cursor: pointer;
}
</style>
