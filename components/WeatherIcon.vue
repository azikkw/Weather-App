<template>
  <NuxtImg :src="typeof weatherImageMap[code] === 'object' ? weatherImageMap[code][isDay] : weatherImageMap[code]" alt="weather" class="current-weather-icon"/>
</template>

<script setup>
  import { weatherImageMap } from "~/types/weatherImage.js";
  const { code, isDay } = defineProps(['code', 'isDay']);
</script>