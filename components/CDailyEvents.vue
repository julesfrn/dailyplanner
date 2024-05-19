<template>
  <NCard
    :title="eventWithActivity.activity.name"
    size="small"
    class="daily-event"
    @mouseenter="enableCheckboxHover"
    @mouseleave="disableCheckboxHover"
    @click.prevent="toggleEventDone"
  >
    De {{ dayjs(eventWithActivity.startDate).format('HH:mm') }} à
    {{ dayjs(eventWithActivity.endDate).format('HH:mm') }}
    <NCheckbox size="large" ref="isDoneCheckbox" class="is-done-checkbox" :checked="isChecked" />
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NCheckbox } from 'naive-ui'
import dayjs from 'dayjs'
import type { PropType } from 'vue'
import type { ActivityDTO } from '~/server/app/activities/presentation/ActivityDTO'
import type { EventDTO } from '~/server/app/events/presentation/EventDTO'

const { eventWithActivity } = defineProps({
  eventWithActivity: {
    type: Object as PropType<EventDTO & { activity: ActivityDTO }>,
    required: true
  }
})

const isChecked = ref(eventWithActivity.isDone)

const isDoneCheckbox = ref<typeof NCheckbox | null>(null)
const enableCheckboxHover = () => isDoneCheckbox.value?.focus()
const disableCheckboxHover = () => isDoneCheckbox.value?.blur()
const toggleEventDone = async () => {
  const { isDone } = await $fetch<{ isDone: boolean }>(
    `/api/events/${eventWithActivity.id}/is-done`,
    { method: 'PUT' }
  )
  isChecked.value = isDone
}
</script>

<style scoped>
.daily-event {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.daily-event:hover {
  border-color: var(--n-color-target);
}
.is-done-checkbox {
  position: absolute;
  transform-origin: center center;
  right: var(--n-padding-left);
  top: calc(50% - 9px);
}
</style>
