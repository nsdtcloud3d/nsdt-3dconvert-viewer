<template>
  <div style="min-height: 100vh" class="flex flex-col">
    <Header></Header>
    <div class="flex-1 flex flex-col">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
<script lang="ts" setup>
// @ts-ignore
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// const layout = route.meta.layout
console.log('layout:', route.name)
</script>
