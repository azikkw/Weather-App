<template><!-- Other city card -->
  <div class="other-city-card">
    <ul>
      <li>Almaty</li>
      <li>Mostly Sunny</li>
    </ul>
    <img src="/assets/images/cloudy2.png" alt="weather-icon">
    <span>20°C</span>
  </div>
</template>

<script setup lang="ts">

  const { city, index } = defineProps(['city', 'index'])

</script>