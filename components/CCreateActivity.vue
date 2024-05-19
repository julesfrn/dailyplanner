<template>
  <NDrawer :show="show" placement="right" @update:show="emitDrawerUpdate" :width="442">
    <NDrawerContent title="Ajouter une activité" closable>
      <NForm ref="formRef" :model="formValue" :rules="rules">
        <NFormItem label="Date et heures de l'évennement" path="name" required>
          <NInput v-model:value="formValue.name" />
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
  NInput,
  NForm,
  NFormItem,
  NButton,
  useNotification
} from 'naive-ui'

const emit = defineEmits<{
  'update:show': [value: boolean]
  'addedActivity': []
}>()
const props = defineProps({ show: Boolean })
const { show } = toRefs(props)

const emitDrawerUpdate = () => emit('update:show', !show.value)

const formRef = ref<typeof NForm | null>(null)

const formValue = ref({
  name: null as string | null
})

const rules = {
  name: { required: true, message: 'Veuillez renseigner un nom pour votre activité' }
}

const notification = useNotification()

const addEvent = async () => {
  if (!formValue.value.name) return
  try {
    await $fetch(`/api/activities`, {
      method: 'POST',
      body: { name: formValue.value.name }
    })
    emitDrawerUpdate()
    notification.success({
      title: `Activité ajoutée : ${formValue.value.name}`,
      meta: `Vous pouvez maintenant l'ajouter à un événement`,
      duration: 4000
    })
    emit('addedActivity')
  } catch (error) {
    notification.error({
      title: "Erreur lors de l'ajout de l'activitée",
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
