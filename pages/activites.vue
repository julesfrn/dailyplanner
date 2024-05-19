<template>
  <div class="page">
    <h2>Activités</h2>
    <div class="activities">
      <NCard
        v-for="activity in activities"
        :title="activity.name"
        :key="activity.id"
        class="activity"
      >
      </NCard>
      <NCard class="activity" @click="toggleActivityForm">
        <div class="activity-last-content">
          <NIcon size="24" :component="AddIcon"></NIcon>
          <div class="flex justify-center items-center h-full">Ajouter une activité</div>
        </div>
      </NCard>
    </div>
    <CCreateActivity
      :show="isDrawerOut"
      @update:show="toggleActivityForm"
      @added-activity="refreshActivities"
    />
  </div>
</template>

<script setup lang="ts">
import { NCard, NIcon } from 'naive-ui'
import { AddFilled as AddIcon } from '@vicons/carbon'
import type { ActivityDTO } from '~/server/app/activities/presentation/ActivityDTO'

const isDrawerOut = ref(false)
const toggleActivityForm = () => (isDrawerOut.value = !isDrawerOut.value)

const getActivities = async () => $fetch<ActivityDTO[]>(`/api/activities`, { method: 'GET' })

const { data: activities } = await useAsyncData(getActivities)

const refreshActivities = async () => {
  activities.value = await getActivities()
}
</script>

<style scoped>
.page {
  padding: 32px 56px 56px;
}
.page h2 {
  margin-top: 0;
}
.activities {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, 200px);
  width: 100%;
}
.activity {
  width: 200px;
  height: 200px;
}
.activity:last-child {
  width: 200px;
  height: 200px;
  cursor: pointer;
  opacity: 0.5;
  border-style: dashed;
  transition: all 0.3s ease-in-out;
}
.activity:last-child:hover {
  border-color: var(--n-color-target);
  opacity: 1;
}
.activity-last-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: all 0.3s ease-in-out;
}
.activity:last-child:hover .activity-last-content {
  color: var(--n-color-target);
}
</style>
