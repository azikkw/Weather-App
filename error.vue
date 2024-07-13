<template>
  <div class="w-full h-screen flex flex-col items-center pt-28 px-9">
    <p class="font-bold text-4xl mb-2">{{error.statusCode}}</p>
    <p class="text-[17px] opacity-80">{{error.message}}</p>
  </div>
</template>

<script setup>
  defineProps(['error']);
</script>

<style scoped>

</style>