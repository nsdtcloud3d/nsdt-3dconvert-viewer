<template>
  <div class="flex flex-1 flex-col relative">
    <div class="flex-1" id="share3dviewer" style="background: linear-gradient(to top right, #ffffff, #c8e8ff)"></div>

    <div
      className="absolute w-64 z-50"
      :style="{ top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }"
      v-if="loading"
    >
      <Progress
        :percent="percent"
        :showInfo="false"
        :strokeColor="{ '0%': '#c8e8ff', '100%': '#00A7FF' }"
        :style="{ width: '100%' }"
      />
    </div>

    <div class="absolute top-6 left-6" v-show="!hideOperator">
      <ViewerTools
        :animationClips="animationClips"
        :sunConfig="sunConfig"
        @sunConfigChange="sunConfigChange"
        :yup="yup"
        @onZYUp="onZYUp"
        @onCut="onCut"
        :viewMode="vieweMode"
        @onViewerMode="onVieweModeChange"
      ></ViewerTools>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-nocheck

import { Progress } from 'ant-design-vue'
import { useViewer } from '../service/useTools'
import ViewerTools from '../components/ViewerTools.vue'

/**
 * Viewer use Function
 */
const {
  viewerInit,
  loadProgress: percent,
  loading,
  onZYUp,
  onCut,
  yup,
  vieweMode,
  onVieweModeChange,
  sunConfigChange,
  sunConfig,
} = useViewer()

const modelInfo = ref()

const fileId = 'cb1224158a'
onMounted(async () => {
  await viewerInit('share3dviewer', fileId)
})
</script>

<style lang="css">
.content {
  height: 100%;
  width: 100%;
}
</style>
