<template>
  <div class="background-page w-full h-screen font-satoshi font-normal">
    <header class="w-full bg-white pr-9 flex items-center justify-between">
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
      <div class="search w-full relative">
        <input type="text" placeholder="Search City...." class="search-input w-full" />
        <span class="icon-wrapper absolute left-0 top-1/2 -translate-y-1/2 ml-9">
            <Icon name="ph:magnifying-glass" size="20px" />
          </span>
      </div>
      <!-- Date -->
      <div class="today-date flex flex-col items-end">
        <div class="font-bold">
          Monday <span class="font-medium opacity-80 ml-0.5">15:30</span>
        </div>
        <span class="font-medium opacity-65">02 July 2024</span>
      </div>
    </header>
    <div class="w-full h-[calc(100%-110px)] flex">
      <!-- Current weather background -->
      <div class="current-weather h-full overflow-y-auto flex flex-col px-9 bg-white">
        <!-- Current weather -->
        <div class="flex justify-center box-content gap-7 mt-5">
          <img src="/assets/images/cloudy.png" alt="weather" class="current-weather-icon">
          <div>
            <span class="current-temp font-black">18°C</span>
            <div class="temp-detail mb-2">
              <img src="/assets/images/high-temp.png" alt="h-temp">
              <span class="font-medium opacity-80">H: 25°C</span>
            </div>
            <div class="temp-detail">
              <img src="/assets/images/low-temp.png" alt="l-temp">
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
            <img src="/assets/images/cloud.png" alt="cloud" style="width: 37px">
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
      <div class="w-[calc(100%-390px)] pl-10 py-10">
        <div class="w-full mb-10"> <!-- Other weather suggestions -->
          <div class="flex justify-between items-center pr-10">
            <span class="font-medium text-xl">Weekly Forecast</span>
            <div class="swiper-navigation flex items-center gap-2">
              <button @click="goToPrevSlide" class="rounded-3xl border border-black flex justify-center items-center">
                <Icon name="prime:arrow-up-right" size="21" class="cursor-pointer opacity-85" />
              </button>
              <button @click="goToNextSlide" class="rounded-3xl bg-blue-500 flex justify-center items-center">
                <Icon name="prime:arrow-up-right" size="21" class="cursor-pointer text-white" />
              </button>
            </div>
          </div>
          <Swiper
            :slides-per-view="5"
            :free-mode="true"
            :space-between="30"
            @slideChange="onSlideChange"
            @swiper="onSwiper"
            class="mt-5"
          >
            <SwiperSlide v-for="slide in 7" :key="slide">
              <div class="weather-card">
                <span>Tue 12</span>
                <img src="/assets/images/cloudy.png" alt="weather-card-img">
                <div class="flex items-center justify-between px-2.5">
                  <span class="font-bold">26°C</span>
                  <span>–</span>
                  <span>18°C</span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div> <!-- Weather suggestions in other cities -->
          <span class="font-medium text-xl">Other Large Cities</span>
          <div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, FreeMode } from "swiper/modules";

import "swiper/swiper-bundle.css";

const mySwiper = ref(null);

const onSwiper = (swiper) => {
  mySwiper.value = swiper;
};
const onSlideChange = () => {
  console.log('slide change');
};

const goToNextSlide = () => {
  if (mySwiper.value) {
    mySwiper.value.slideNext();
  }
};

const goToPrevSlide = () => {
  if (mySwiper.value) {
    mySwiper.value.slidePrev();
  }
};

</script>