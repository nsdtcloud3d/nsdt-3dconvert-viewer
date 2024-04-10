<script setup lang="ts">
import { Divider } from 'ant-design-vue'

const router = useRouter()
const goto = () => router.push('/')
</script>

<template>
  <header class="h-17 flex flex-col items-end ">
    <div class="flex w-full h-16 border-3  text-white text-2xl   items-center px-6 gap-4 cursor-pointer pb-1" @click="goto">
      <img src="/logo.svg" alt="" class="h-3/5" />
      <h1 class="mb-0">3dconvert-viewer.js SDK Demo</h1>
    </div>
    <Divider style="margin-bottom: 0px; margin-top: 0px;"/>
  </header>
</template>
