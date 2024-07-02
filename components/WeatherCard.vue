<template>
  <!-- Today's weather card -->
  <div v-if="slide === 1" class="weather-card !w-fit block">
    <span>Today</span>
    <div class="flex gap-7">
      <img src="/assets/images/sun2.png" alt="weather-card-img" style="width: 140px; object-fit: contain">
      <div class="mr-1">
        <ul style="font-size: 30px">
          <li class="font-black">25°C</li>
          <li class="-mt-2.5">15°C</li>
        </ul>
        <div class="-mt-2 text-2xl font-medium">--</div>
        <ul class="font-medium opacity-70">
          <li>Mostly Cloudy</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Weekly weather cards -->
  <div v-else class="weather-card">
    <span>Tue {{slide + 1}}</span>
    <img src="/assets/images/rain2.png" alt="weather-card-img">
    <div class="flex items-center justify-center gap-3" style="font-size: 21px">
      <span class="font-bold">26°C</span>
      <span>–</span>
      <span>18°C</span>
    </div>
  </div>
</template>

<script setup lang="ts">

  const { slide } = defineProps(['slide'])

</script>