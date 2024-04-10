<template>
    <no-ssr>
      <div class="flex flex-col justify-center items-center">
        <template v-if="props.viewMode == 1">
          <Tooltip title="Z/Y轴向上切换" placement="right">
            <div
              class="w-10 h-10 p-2 cursor-pointer bg-slate-400 hover:bg-blue-300 border-b-1"
              @click="$emit('onZYUp')"
            >
              <img v-if="props.yup" src="/img/rotatez.svg" />
              <img v-else src="/img/rotatey.svg" />
            </div>
          </Tooltip>
          <Tooltip title="剖切" placement="right">
            <div
              class="w-10 h-10 p-2 cursor-pointer bg-slate-400 hover:bg-blue-300 border-b-1"
              @click="$emit('onCut')"
            >
              <img src="/img/pouqie.svg" />
            </div>
          </Tooltip>
  
          <Tooltip title="动画" placement="top">
            <Popover
              placement="rightTop"
              color="#94A3B8"
              v-if="props.animationClips && props.animationClips.length > 0"
            >
              <template #content>
                <div class="flex flex-col gap-1 cursor-pointer">
                  <div
                    :class="`flex items-center hover:bg-gray-500 border-b-1 border-gray-500 ${
                      clip.action ? 'text-[#1296db]' : ''
                    }`"
                    v-for="clip in props.animationClips"
                    @click="$emit('toggleAnimation', clip.name)"
                  >
                    <div class="w-6 h-6 p-1 cursor-pointer">
                      <img src="/img/stop.svg" v-if="clip.action" />
                      <img src="/img/play.svg" v-if="!clip.action" />
                    </div>
                    <span class="pl-1">{{ clip.name }}</span>
                  </div>
                </div>
              </template>
  
              <div class="w-10 h-10 p-2 cursor-pointer bg-slate-400 hover:bg-blue-300 border-b-1">
                <img src="/img/anime.svg" />
              </div>
            </Popover>
          </Tooltip>
  
          <Tooltip title="光照设置" placement="top">
            <Popover
              placement="rightTop"
              color="#94A3B8"
            >
              <template #content>
                <SunSetting :sun-config="props.sunConfig" @sun-config-change="sunConfigChange"></SunSetting>
              </template>
  
              <div class="w-10 h-10 p-2 cursor-pointer bg-slate-400 hover:bg-blue-300 border-b-1">
                <img src="/img/sun.svg" />
              </div>
            </Popover>
          </Tooltip>
        </template>
  
        <Tooltip
          :title="props.viewMode === 1 ? '点击切换到看图模式' : '点击切换到3D模式'"
          placement="right"
        >
          <div
            class="w-10 h-10 p-2 cursor-pointer bg-slate-400 hover:bg-blue-300"
            @click="$emit('onViewerMode')"
          >
            <img :src="props.viewMode === 2 ? `/img/3d.svg` : `/img/cad.svg`" />
          </div>
        </Tooltip>
      </div>
    </no-ssr>
  </template>
  <script setup lang="ts">
  import { Tooltip, Popover} from "ant-design-vue";
  import SunSetting from "./SunSetting.vue";
  
  const props = defineProps({
    yup: Boolean,
    viewMode: Number,
    sunConfig: Object
  });
  
  const emit = defineEmits(['sunConfigChange'])
  
  const sunConfigChange = (config: any) => {
    emit('sunConfigChange',config)
  }
  
  
  </script>
  
  <style>
  .anmationpover {
  }
  </style>
  