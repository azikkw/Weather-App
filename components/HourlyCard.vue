<template>
  <div class="hourly-card">
    {{weather.time.slice(-5, -3)}}
    <WeatherIcon :code="weather.condition.code" :isDay="weather.is_day" />
    <span>{{Math.round(weather.temp_c)}}°C</span>
  </div>
</template>

<script setup lang="ts">
  import { weatherImageMap } from "~/types/weatherImage";
  const { weather } = defineProps(['weather']);
</script>