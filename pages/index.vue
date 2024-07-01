<template>
  <div class="background-page w-full h-screen flex font-satoshi font-normal">
    <!-- Current weather background -->
    <div class="current-weather h-full flex flex-col px-9 bg-white border-r">
      <!-- Logotype -->
      <div class="logo">
        <img src="/assets/images/weather-app.png" alt="weather">
        <span class="font-bold">Weather</span>
      </div>
      <!-- Current weather -->
      <div class="flex justify-center box-content gap-7 mt-5">
        <img src="/assets/images/cloudy.png" alt="weather" class="current-weather-icon">
        <div>
          <span class="current-temp font-black">18°C</span>
          <div class="temp-detail mb-2">
            <img src="/assets/images/high-temp.png" alt="weather">
            <span class="font-medium opacity-80">H: 25°C</span>
          </div>
          <div class="temp-detail">
            <img src="/assets/images/low-temp.png" alt="weather">
            <span class="font-medium opacity-80">L: 15°C</span>
          </div>
        </div>
      </div>
      <!-- Divider -->
      <hr class="w-full mt-10 mb-6">
      <!-- Current date -->
      <div class="current-date">
        <span class="font-medium opacity-55" style="font-size: 16.5px">Date Today</span>
        <div class="flex gap-5">
          <span class="font-black">Monday</span>
          <span class="font-medium opacity-55">15:30</span>
        </div>
      </div>
      <!-- Current weather details -->
      <div class="weather-details w-full mt-7">
        <span class="font-medium opacity-55" style="font-size: 16.5px">Weather Details</span>
        <div class="detail-item mt-5">
          <img src="/assets/images/cloud.png" alt="weather" style="width: 42px">
          <span class="detail-item-span">Mostly Cloudly</span>
        </div>
        <div class="detail-item mt-3">
          <img src="/assets/images/humidity.png" alt="weather">
          <span class="detail-item-span">Humidity - 77%</span>
        </div>
        <div class="detail-item mt-3">
          <img src="/assets/images/wind.png" alt="weather">
          <span class="detail-item-span">Wind - 6km/h</span>
        </div>
      </div>
    </div>
    <!-- Right sight of the page -->
    <div class="flex-1">
      <header class="w-full bg-white px-12 border-b flex items-center justify-between">
        <!-- Current location -->
        <div class="current-location">
          <Icon name="ci:location" size="28px"/>
          <span class="font-bold">Almaty</span>
        </div>
        <!-- Search -->
        <div class="search w-full relative">
          <input type="text" placeholder="Search City...." class="search-input w-full" />
          <span class="icon-wrapper absolute left-0 top-1/2 -translate-y-1/2 ml-9">
            <Icon name="ph:magnifying-glass" size="20px" />
          </span>
        </div>
        <!-- Date -->
        <div class="today-date">
          <div class="font-bold">
            Monday <span class="font-medium opacity-80 ml-0.5">15:30</span>
          </div>
          <span class="font-medium opacity-65">02 July 2024</span>
        </div>
      </header>
      <div> <!-- Other weather suggestions -->

      </div>
      <div> <!-- Weather suggestions in other cities -->

      </div>
    </div>
  </div>
</template>

<script setup>

</script>