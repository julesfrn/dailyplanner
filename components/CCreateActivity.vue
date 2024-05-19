<template>
  <NDrawer :show="show" placement="right" @update:show="emitDrawerUpdate" :width="442">
    <NDrawerContent title="Ajouter une activité" closable>
      <NForm ref="formRef" :model="formValue" :rules="rules">
        <NFormItem label="Nom de l'évennement" path="name" required>
          <NInput v-model:value="formValue.name" />
        </NFormItem>
        <NFormItem label="Couleur de l'activité">
          <div class="colors">
            <button
              v-for="color in colors"
              :key="color"
              class="colors"
              :style="getColorStyle(color, formValue.color === color)"
              @click="formValue.color = color"
            >
              {{ color.replaceAll('-', ' ')}}
            </button>
          </div>
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
  addedActivity: []
}>()
const props = defineProps({ show: Boolean })
const { show } = toRefs(props)

const emitDrawerUpdate = () => emit('update:show', !show.value)

const formRef = ref<typeof NForm | null>(null)

const formValue = ref({
  name: null as string | null,
  color: null as string | null
})

const rules = {
  name: { required: true, message: 'Veuillez renseigner un nom pour votre activité' },
  color: { required: true, message: 'Veuillez choisir une couleur pour votre activité' }
}

const notification = useNotification()

const addEvent = async () => {
  if (!formValue.value.name || !formValue.value.color) return
  try {
    await $fetch(`/api/activities`, {
      method: 'POST',
      body: { name: formValue.value.name, color: formValue.value.color }
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

const colors = ['light-coral', 'sunset', 'aquamarine', 'light-sky-blue']

const getColorStyle = (color: string, isActive: boolean) =>
  isActive
    ? `background-color: var(--my-color-${color}); border-color: var(--my-color-${color}); color: black;`
    : `background-color: transparent; border-color: var(--my-color-${color}); color: var(--my-color-${color});`
</script>

<style scoped>
.colors {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 90px);
  gap: 11px;
}
.colors button {
  padding: 0;
  height: 24px;
  border: solid 1px;
  border-radius: 3px;
  text-align: center;
  line-height: 22px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}
</style>
