<template>
  <div id="app">
    <NConfigProvider :theme="isDarkThemed ? darkTheme : null">
      <NGlobalStyle />
      <NNotificationProvider>
        <NLayout>
          <NLayoutHeader bordered class="header">
            <NGradientText type="success"><h1>Daily Planner</h1></NGradientText>
            <CDate :date="dayjs()" />
            <NSwitch v-model:value="isDarkThemed" size="large">
              <template #checked-icon>
                <NIcon :component="MoonIcon" />
              </template>
              <template #unchecked-icon>
                <NIcon :component="SunIcon" />
              </template>
            </NSwitch>
          </NLayoutHeader>
          <NLayout has-sider class="layout">
            <NLayoutSider
              bordered
              show-trigger
              collapse-mode="width"
              :collapsed-width="64"
              :width="240"
              :native-scrollbar="false"
            >
              <NMenu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
            </NLayoutSider>
            <NLayout>
              <NScrollbar class="page">
                <NuxtPage />
              </NScrollbar>
            </NLayout>
          </NLayout>
        </NLayout>
      </NNotificationProvider>
    </NConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { h, type Component } from 'vue'
import {
  NConfigProvider,
  NGlobalStyle,
  darkTheme,
  NIcon,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NMenu,
  NScrollbar,
  NSwitch,
  NGradientText,
  NNotificationProvider
} from 'naive-ui'
import {
  Calendar as CalendarIcon,
  UserActivity as UserActivityIcon,
  Moon as MoonIcon,
  Sun as SunIcon
} from '@vicons/carbon'
import { NuxtLink } from '#components'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/fr'

dayjs.extend(localeData)
dayjs.locale('fr')

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const isDarkThemed = ref(true)

const menuOptions = [
  {
    label: () => h(NuxtLink, { to: '/' }, { default: () => 'Planning du jour' }),
    key: 'daily-planning',
    icon: renderIcon(CalendarIcon)
  },
  {
    label: () => h(NuxtLink, { to: '/activites' }, { default: () => 'Gérer les activités' }),
    key: 'activities',
    icon: renderIcon(UserActivityIcon)
  }
]

const route = useRoute()
onMounted(() => {
  const menuItems = document.querySelectorAll('.n-menu-item-content')
  menuItems.forEach((menuItem) => {
    if (menuItem.querySelector('a')?.getAttribute('href') === route.fullPath) {
      menuItem.dispatchEvent(new Event('click'))
    }
  })
})
</script>

<style scoped>
.layout {
  height: calc(100vh - 60px);
  overflow: hidden;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 60px;
}
.header h1 {
  margin: 0;
}
</style>
