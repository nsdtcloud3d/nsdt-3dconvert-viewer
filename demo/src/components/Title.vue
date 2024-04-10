<template>
  <div
    class="select-none cursor-pointer inline-block bg-no-repeat pt-1 pl-2 pr-10 bg-cover font-medium tracking-widest text-lg text-white"
    style="
      min-width: 13rem;
      background-size: 100% 100%;
      background-image: url('/img/module_card_active.png');
    "
    :style="{backgroundImage: `url('${VITE_PUBLIC_PATH}/img/module_card_active.png')`}"
  >
    <h2 class="font-medium pl-2 pt-1 text-xl pr-2 text-blue-400 text-white"><span class="pr-8">{{ props.title }}</span></h2>
    <span></span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
})

const VITE_PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH

</script>
