<template>
  <!-- Weekly weather cards -->
  <div class="weather-card" @click="selectForecast">
    <span>{{index === 0 ? 'Today' : weatherDate(weather?.date_epoch)}}</span>
    <WeatherIcon :code="weather?.day.condition.code" :isDay="1" :class="{'w-[40px] lg:!w-[118px]': weather?.day.condition.code === 1000}" />
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

  const { weather, index } = defineProps(['weather', 'index']);
  const emit = defineEmits(['selectedForecast']);

  // Selected forecast weather info
  const selectForecast = () => {
    // Uniting all in one object
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
  // Day of week configuration
  const dayOfWeek = (date) => {
    return format(date, 'EEEE').slice(0, 3)
  };

  // Sending date of the weather
  const sendForecastDate = (date) => {
    if(date !== undefined) {
      const newDate = new Date(date * 1000);
      return format(newDate, 'dd') + " " + newDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      }).replace(',', ' ')
    }
  }
  // Sending date of week of the weather
  const sendForecastDayOfWeek = (date) => {
    const newDate = new Date(date * 1000);
    return format(newDate, 'EEEE')
  };

</script>