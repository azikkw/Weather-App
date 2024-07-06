<template>
  <!-- Weekly weather cards -->
  <div class="weather-card" @click="selectForecast">
    <span>{{index === 0 ? 'Today' : weatherDate(weather?.date_epoch)}}</span>
    <NuxtImg preload v-if="weather?.day.condition.code === 1000" src="/sun.png" alt="weather" class="current-weather-icon" style="width: 120px" />
    <NuxtImg preload v-else-if="weather?.day.condition.code === 1003 || weather?.day.condition.code === 1006" src="/cloudy.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code > 1006 && weather?.day.condition.code < 1063" src="/clouds.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code === 1035 || weather?.day.condition.code === 1147" src="/cloud.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code === 1063 || weather?.day.condition.code === 1072" src="/rain.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code >= 1150 && weather?.day.condition.code <= 1207" src="/rain.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code >= 1240 && weather?.day.condition.code <= 1246" src="/rain.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code >= 1261 && weather?.day.condition.code <= 1264" src="/rain.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code === 1066 || weather?.day.condition.code === 1069 || weather?.day.condition.code === 1114 || weather?.day.condition.code === 1117" src="/snow.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code >= 1210 && weather?.day.condition.code <= 1237" src="/snow.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code >= 1210 && weather?.day.condition.code <= 1237" src="/snow.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code >= 1252 && weather?.day.condition.code <= 1258" src="/snow.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code >= 1279 && weather?.day.condition.code <= 1282" src="/snow.png" alt="weather" class="current-weather-icon" />
    <NuxtImg preload v-else-if="weather?.day.condition.code === 1087 || weather?.day.condition.code === 1273 || weather?.current.condition.code === 1276" src="/assets/images/thunder.png" alt="weather" class="current-weather-icon" />
    <div class="flex items-center justify-center gap-3" style="font-size: 21px">
      <span class="font-bold">{{Math.round(weather?.day.maxtemp_c)}}°C</span>
      <span>–</span>
      <span>{{Math.round(weather?.day.mintemp_c)}}°C</span>
    </div>
  </div>
</template>

<script setup>

  import { format } from "date-fns";
  import { defineEmits } from 'vue';

  const { weather, index } = defineProps(['weather', 'index'])
  const emit = defineEmits(['selectedForecast']);

  // Selected forecast weather info
  const selectForecast = () => {
    const weatherInfo = {
      forecastDate: sendForecastDate(weather?.date_epoch),
      forecastDayOfWeek: sendForecastDayOfWeek(weather?.date_epoch),
      index: index
    }
    emit('selectedForecast', weatherInfo);
  };

  // Date configuration
  const weatherDate = (date) => {
    if(date !== undefined) {
      const newDate = new Date(date * 1000);
      return dayOfWeek(newDate) + " " + format(newDate, 'dd')
    }
  };
  const dayOfWeek = (date) => {
    return format(date, 'EEEE').slice(0, 3)
  };

  const sendForecastDate = (date) => {
    if(date !== undefined) {
      const newDate = new Date(date * 1000);
      return format(newDate, 'dd') + " " + newDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      }).replace(',', ' ')
    }
  }
  const sendForecastDayOfWeek = (date) => {
    const newDate = new Date(date * 1000);
    return format(newDate, 'EEEE')
  };

</script>