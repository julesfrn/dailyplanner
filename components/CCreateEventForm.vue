<template>
  <NFloatButton
    right="56px"
    bottom="56px"
    icon="plus"
    type="primary"
    width="50"
    height="50"
    @click="toggleEventForm"
  >
    <NIcon size="25" :component="PlusIcon" />
  </NFloatButton>
  <NDrawer :show="isDrawerOut" placement="right" @update:show="toggleEventForm" :width="442">
    <NDrawerContent title="Ajouter un événement" closable>
      <NForm ref="formRef" :model="formValue" :rules="rules">
        <NFormItem label="Date et heures de l'évennement" path="range" required>
          <NDatePicker v-model:value="formValue.range" type="datetimerange" />
        </NFormItem>
        <NFormItem label="Activité" path="activityId" required>
          <NSelect
            :options="activitiesOptions"
            v-model:value="formValue.activityId"
            placeholder="Votre activité"
          />
        </NFormItem>
        <NFormItem label="Description supplémentaire" path="description" required>
          <NInput v-model:value="formValue.description" placeholder="Description" type="textarea" />
        </NFormItem>
        <NFormItem>
          <NButton type="primary" @click="validateForm">Ajouter</NButton>
        </NFormItem>
      </NForm>
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="ts">
import {
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItem,
  NDatePicker,
  NFloatButton,
  NIcon,
  NSelect,
  NButton,
  useNotification,
  NInput
} from 'naive-ui'
import { TaskAdd as PlusIcon } from '@vicons/carbon'
import type { ActivityDTO } from '~/server/app/activities/presentation/ActivityDTO'
import dayjs from 'dayjs'

const emit = defineEmits(['addedEvent'])

const isDrawerOut = ref(false)
const toggleEventForm = () => {
  isDrawerOut.value = !isDrawerOut.value
}

const { data: activitiesData } = await useFetch<ActivityDTO[]>(`/api/activities`, {
  method: 'GET'
})

const formRef = ref<typeof NForm | null>(null)

const formValue = ref({
  range: null as [number, number] | null,
  activityId: null as string | null,
  description: null as string | null
})

const rules = {
  range: { required: true, message: 'Veuillez sélectionner une date et une heure' },
  activityId: { required: true, message: 'Veuillez sélectionner une activité' },
  description: { required: false }
}

const activitiesOptions = computed(() =>
  activitiesData.value
    ? activitiesData.value.map((activity) => ({ value: activity.id, label: activity.name }))
    : []
)

const notification = useNotification()

const addEvent = async () => {
  if (
    !formValue.value.range ||
    !formValue.value.range[0] ||
    !formValue.value.range[1] ||
    !formValue.value.activityId
  )
    return
  try {
    await $fetch(`/api/events`, {
      method: 'POST',
      body: {
        startDate: dayjs(formValue.value.range[0]).toISOString(),
        endDate: dayjs(formValue.value.range[1]).toISOString(),
        activityId: formValue.value.activityId,
        description: formValue.value.description ? formValue.value.description : undefined
      }
    })
    toggleEventForm()
    emit('addedEvent')
    notification.success({
      title: `Événement ajouté : ${activitiesData.value!.find(({ id }) => formValue.value.activityId === id)!.name}`,
      meta: `Du ${dayjs(formValue.value.range[0]).format('DD/MM/YYYY HH:mm')} au ${dayjs(formValue.value.range[1]).format('DD/MM/YYYY HH:mm')}`,
      duration: 4000
    })
  } catch (error) {
    notification.error({
      title: "Erreur lors de l'ajout de l'événement",
      meta: (error as Error).message,
      duration: 4000
    })
  }
}

const validateForm = () =>
  formRef.value?.validate((errors: boolean) => {
    if (!errors) addEvent()
  })
</script>

<style scoped></style>
