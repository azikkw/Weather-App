<template>
  <div class="background-page">
    <header>
      <!-- Logotype -->
      <div class="logo">
        <img src="/assets/images/weather-app.png" alt="logo">
        <span class="font-bold">Weather</span>
      </div>
      <!-- Current location -->
      <div class="current-location">
        <Icon name="ci:location" size="28px"/>
        <span class="font-bold">Almaty</span>
      </div>
      <!-- Search -->
      <div class="search">
        <input type="text" placeholder="Search City...." class="search-input" />
        <span class="icon-wrapper">
            <Icon name="ph:magnifying-glass" size="20px" />
          </span>
      </div>
      <!-- Date -->
      <div class="today-date">
        <div class="font-bold">
          Monday <span>15:30</span>
        </div>
        <span>02 July 2024</span>
      </div>
    </header>
    <!-- Weather dashboard -->
    <div class="weather-dashboard">
      <!-- Current weather background -->
      <div class="current-weather-back">
        <!-- Current weather -->
        <div class="current-weather">
          <img src="/assets/images/clouds2.png" alt="weather" class="current-weather-icon">
          <div>
            <span class="current-temp">18°C</span>
            <div class="temp-detail mb-2">
              <img src="/assets/images/high-temp.png" alt="h-temp">
              <span>H: 25°C</span>
            </div>
            <div class="temp-detail">
              <img src="/assets/images/low-temp.png" alt="l-temp">
              <span>L: 15°C</span>
            </div>
          </div>
        </div>
        <!-- Divider -->
        <hr class="w-full mt-10 mb-6">
        <!-- Current date -->
        <div class="current-date">
          <span>Date Today</span>
          <div class="flex gap-5">
            <span>Monday</span>
            <span>15:30</span>
          </div>
        </div>
        <!-- Current weather details -->
        <div class="weather-details">
          <span>Weather Details</span>
          <div class="detail-item mt-5">
            <img src="/assets/images/cloud2.png" alt="cloud" style="width: 37px">
            <span class="detail-item-span">Mostly Cloudly</span>
          </div>
          <div class="detail-item mt-3">
            <img src="/assets/images/humidity.png" alt="humidity">
            <span class="detail-item-span">Humidity - 77%</span>
          </div>
          <div class="detail-item mt-3">
            <img src="/assets/images/wind.png" alt="wind">
            <span class="detail-item-span">Wind - 6km/h</span>
          </div>
        </div>
      </div>
      <!-- Right sight of the page -->
      <div class="weather-suggestions">
        <!-- Weekly forecast -->
        <div class="suggestion-item mb-14">
          <!-- Title and navigation -->
          <div class="title_nav">
            <span>Weekly Forecast</span>
            <div class="swiper-navigation">
              <button @click="goToPrevWeeklySlide" class="border border-black hover:opacity-70">
                <Icon name="prime:arrow-up-right" size="21" class="opacity-85" />
              </button>
              <button @click="goToNextWeeklySlide" class="bg-blue-500 hover:bg-blue-400">
                <Icon name="prime:arrow-up-right" size="21" class="text-white" />
              </button>
            </div>
          </div>
          <Swiper
            ref="weeklySwiper"
            :slides-per-view="'auto'"
            :space-between="20"
            @swiper="onWeeklySwiper"
            class="mt-5"
          >
            <SwiperSlide v-for="ind in 7" :key="ind">
              <WeatherCard :slide="ind" />
            </SwiperSlide>
          </Swiper>
        </div>
        <!-- Other cities weather -->
        <div class="suggestion-item">
          <!-- Title and navigation -->
          <div class="title_nav">
            <span>Other Cities Weather</span>
            <div class="swiper-navigation">
              <button @click="goToPrevCitiesSlide" class="border border-black hover:opacity-70">
                <Icon name="prime:arrow-up-right" size="21" class="opacity-85" />
              </button>
              <button @click="goToNextCitiesSlide" class="bg-blue-500 hover:bg-blue-400">
                <Icon name="prime:arrow-up-right" size="21" class="text-white" />
              </button>
            </div>
          </div>
          <Swiper
              ref="citiesSwiper"
              :slides-per-view="'auto'"
              :space-between="20"
              @swiper="onCitiesSwiper"
              class="mt-5"
          >
            <SwiperSlide v-for="ind in 10" :key="ind">
              <OtherCityCard :slide="ind" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { Swiper, SwiperSlide } from "swiper/vue";
  import "swiper/swiper-bundle.css";

  const weeklySwiper = ref(null);
  const citiesSwiper = ref(null);

  const onWeeklySwiper = (swiper) => {
    weeklySwiper.value = swiper;
  };
  const onCitiesSwiper = (swiper) => {
    citiesSwiper.value = swiper;
  };

  const goToNextWeeklySlide = () => {
    if(weeklySwiper.value) weeklySwiper.value.slideNext();
  };
  const goToPrevWeeklySlide = () => {
    if(weeklySwiper.value) weeklySwiper.value.slidePrev();
  };

  const goToNextCitiesSlide = () => {
    if(citiesSwiper.value) citiesSwiper.value.slideNext();
  };
  const goToPrevCitiesSlide = () => {
    if(citiesSwiper.value) citiesSwiper.value.slidePrev();
  };

</script>