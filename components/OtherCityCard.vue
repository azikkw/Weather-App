<template><!-- Other city card -->
  <div class="other-city-card">
    <ul>
      <li class="other-city-location">
        <span>{{city?.location.name}}</span>
        <span>{{city?.location.country}}</span>
      </li>
      <li class="-mt-1.5 -mb-1">--</li>
      <li>{{city?.current.condition.text}}</li>
    </ul>
    <img v-if="city?.current.condition.code === 1000" src="/assets/images/sun.png" alt="weather" class="current-weather-icon" style="width: 80px">
    <img v-else-if="city?.current.condition.code === 1003 || city?.current.condition.code === 1006" src="/assets/images/cloudy2.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code > 1006 && city?.current.condition.code < 1063" src="/assets/images/clouds2.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code === 1035 || city?.current.condition.code === 1147" src="/assets/images/cloud2.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code === 1063 || city?.current.condition.code === 1072" src="/assets/images/rain2.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code >= 1150 && city?.current.condition.code <= 1207" src="/assets/images/rain2.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code >= 1240 && city?.current.condition.code <= 1246" src="/assets/images/rain2.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code >= 1261 && city?.current.condition.code <= 1264" src="/assets/images/rain2.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code === 1066 || city?.current.condition.code === 1069 || city?.current.condition.code === 1114 || city?.current.condition.code === 1117" src="/assets/images/snow.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code >= 1210 && city?.current.condition.code <= 1237" src="/assets/images/snow.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code >= 1210 && city?.current.condition.code <= 1237" src="/assets/images/snow.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code >= 1252 && city?.current.condition.code <= 1258" src="/assets/images/snow.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code >= 1279 && city?.current.condition.code <= 1282" src="/assets/images/snow.png" alt="weather" class="current-weather-icon">
    <img v-else-if="city?.current.condition.code === 1087 || city?.current.condition.code === 1273 || city?.current.condition.code === 1276" src="/assets/images/thunder.png" alt="weather" class="current-weather-icon">
    <span>{{Math.round(city?.current.temp_c)}}°C</span>
  </div>
</template>

<script setup lang="ts">

  const { city, index } = defineProps(['city', 'index'])

</script>