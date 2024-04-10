<template>
  <div class="flex flex-col">
    <div key="{pKey}" className="flex items-center justify-start">
      <label className="inline-block w-20 text-justify text-sm text-white">开启阴影:</label>
      <div className="inline-block w-32">
        <Switch
          size="small"
          :checked="sunConfig.castShadow"
          @change="(castShadow: any) => sunChange('castShadow',castShadow)"
        ></Switch>
      </div>
    </div>

    <div key="{pKey}" className="flex items-center justify-start">
      <label className="inline-block w-20 text-justify text-sm text-white">太阳光强度:</label>
      <div className="inline-block w-32">
        <Slider
          size="small"
          :min="0"
          :max="10"
          :step="0.1"
          :value="sunConfig.intensity"
          @change="(intensity: any) => sunChange('intensity',intensity)"
        ></Slider>
      </div>
    </div>

    <div key="{pKey}" className="flex items-center justify-start">
      <label className="inline-block w-20 text-justify text-sm text-white">太阳高度:</label>
      <div className="inline-block w-32">
        <Slider
          size="small"
          :tip-formatter="formatter"
          :min="0"
          :max="Math.PI"
          :step="Math.PI / 50"
          className="inline-block w-32"
          :value="sunConfig.elevation"
          @change="(elevation: any) => sunChange('elevation',elevation)"
        ></Slider>
      </div>
    </div>

    <div key="{pKey}" className="flex items-center justify-start">
      <label className="inline-block w-20 text-justify text-sm text-white">太阳方位角:</label>
      <div className="inline-block w-32">
        <Slider
          :tip-formatter="formatter"
          size="small"
          :min="-Math.PI / 2"
          :max="Math.PI / 2"
          :step="Math.PI / 50"
          className="inline-block w-32"
          :value="sunConfig.azimuth"
          @change="(azimuth: any) => sunChange('azimuth',azimuth)"
        ></Slider>
      </div>
    </div>

    <div key="{pKey}" className="flex items-center justify-start">
      <label className="inline-block w-20 text-justify text-sm text-white">间接光:</label>
      <div className="inline-block w-32">
        <Slider
          size="small"
          :tip-formatter="formatter"
          :min="0"
          :max="5"
          :step="0.1"
          className="inline-block w-32"
          :value="sunConfig.indirectLightIntensity"
          @change="(indirectLightIntensity: any) => sunChange('indirectLightIntensity',indirectLightIntensity)"
        ></Slider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Switch, Slider } from 'ant-design-vue'

const props = defineProps({
  sunConfig: Object,
})

onMounted(() => {})

const emit = defineEmits(['sunConfigChange'])

const formatter = (value: number) => {
  return (value || 0).toFixed(2)
}

const sunChange = (type: any, value: any) => {
  emit('sunConfigChange', Object.assign({}, props.sunConfig, { [type]: value }))
}
</script>
