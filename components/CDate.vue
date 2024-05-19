<template>
  <div class="date">
    <NAvatar round size="large">
      <NIcon :size="25" :component="CalendarIcon" />
    </NAvatar>
    <div class="date-content">
      <span class="day-text">{{ date.format('dddd') }}</span>
      <span class="day-month">{{ date.format('DD MMMM') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NAvatar, NIcon } from 'naive-ui'
import { CalendarHeatMap as CalendarIcon } from '@vicons/carbon'
import { Dayjs } from 'dayjs'

const { date } = defineProps({
  date: {
    type: Dayjs,
    required: true
  }
})
</script>

<style scoped>
.date {
  display: flex;
  text-transform: capitalize;
  align-items: center;
  gap: 8px;
}
.date-content {
  display: flex;
  flex-direction: column;
}
.day-text {
  font-size: 12px;
  line-height: 16px;
  font-weight: lighter;
}
.day-month {
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
}
</style>
