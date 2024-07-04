<template>
  <div v-if="weeklyWeather === null || otherCitiesList.length === 0" class="loading-page">
    <img src="/assets/images/loading.gif" alt="loading">
    <span>Loading...</span>
  </div>
  <div v-else class="background-page">
    <header>
      <!-- Logotype -->
      <div class="logo">
        <img src="/assets/images/weather-app.png" alt="logo">
        <span class="font-bold">Weather</span>
      </div>
      <!-- Current location -->
      <div class="current-location">
        <Icon name="ci:location" size="28px"/>
        <span class="font-bold">{{ weeklyWeather?.location.name }}</span>
      </div>
      <!-- Search -->
      <div class="search">
        <div class="search-input-back">
          <input type="text" v-model="searchQuery" @keyup="searchCities" placeholder="Search City...." class="search-input" />
          <span class="icon-wrapper">
            <Icon name="ph:magnifying-glass" size="20px" />
          </span>
        </div>
        <ul class="search-result" :style="{ display: citiesList.length > 0 ? 'block' : 'none' }">
          <li v-for="city in citiesList" @click="getWeather(city)">
            {{city}} <Icon name="material-symbols-light:chevron-right-rounded" size="28px" />
          </li>
        </ul>
      </div>
      <!-- Date -->
      <div class="today-date">
        <div class="font-bold">
          {{dayOfWeek}} <span>{{formattedTime}}</span>
        </div>
        <span>{{formattedDate}}</span>
      </div>
    </header>
    <!-- Weather dashboard -->
    <div class="weather-dashboard">
      <!-- Current weather background -->
      <div class="current-weather-back">
        <!-- Current weather -->
        <div class="current-weather">
          <img v-if="weeklyWeather?.current.condition.code === 1000" src="/assets/images/sun.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code === 1003 || weeklyWeather?.current.condition.code === 1006" src="/assets/images/cloudy2.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code > 1006 && weeklyWeather?.current.condition.code < 1063" src="/assets/images/clouds2.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code === 1035 || weeklyWeather?.current.condition.code === 1147" src="/assets/images/cloud2.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code === 1063 || weeklyWeather?.current.condition.code === 1072" src="/assets/images/rain2.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code >= 1150 && weeklyWeather?.current.condition.code <= 1207" src="/assets/images/rain2.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code >= 1240 && weeklyWeather?.current.condition.code <= 1246" src="/assets/images/rain2.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code >= 1261 && weeklyWeather?.current.condition.code <= 1264" src="/assets/images/rain2.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code === 1066 || weeklyWeather?.current.condition.code === 1069 || weeklyWeather?.current.condition.code === 1114 || weeklyWeather?.current.condition.code === 1117" src="/assets/images/snow.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code >= 1210 && weeklyWeather?.current.condition.code <= 1237" src="/assets/images/snow.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code >= 1210 && weeklyWeather?.current.condition.code <= 1237" src="/assets/images/snow.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code >= 1252 && weeklyWeather?.current.condition.code <= 1258" src="/assets/images/snow.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code >= 1279 && weeklyWeather?.current.condition.code <= 1282" src="/assets/images/snow.png" alt="weather" class="current-weather-icon">
          <img v-else-if="weeklyWeather?.current.condition.code === 1087 || weeklyWeather?.current.condition.code === 1273 || weeklyWeather?.current.condition.code === 1276" src="/assets/images/thunder.png" alt="weather" class="current-weather-icon">
          <div>
            <span class="current-temp">{{Math.round(weeklyWeather?.current.temp_c)}}°C</span>
            <div class="temp-detail mb-2">
              <img src="/assets/images/high-temp.png" alt="h-temp">
              <span>H: {{Math.round(weeklyWeather?.forecast.forecastday[0].day.maxtemp_c)}}°C</span>
            </div>
            <div class="temp-detail">
              <img src="/assets/images/low-temp.png" alt="l-temp">
              <span>L: {{Math.round(weeklyWeather?.forecast.forecastday[0].day.mintemp_c)}}°C</span>
            </div>
          </div>
        </div>
        <!-- Divider -->
        <hr class="w-full mt-10 mb-6">
        <!-- Current date -->
        <div class="current-date">
          <span>Date Today</span>
          <div class="flex gap-5">
            <span>{{dayOfWeek}}</span>
            <span>{{formattedTime}}</span>
          </div>
        </div>
        <!-- Current weather details -->
        <div class="weather-details">
          <span>Weather Details</span>
          <div class="detail-item mt-5">
            <img src="/assets/images/information.png" alt="cloud" style="width: 35px">
            <span class="detail-item-span">{{weeklyWeather?.current.condition.text}}</span>
          </div>
          <div class="detail-item mt-3">
            <img src="/assets/images/humidity.png" alt="humidity">
            <span class="detail-item-span">Humidity - {{weeklyWeather?.current.humidity}}%</span>
          </div>
          <div class="detail-item mt-3">
            <img src="/assets/images/wind.png" alt="wind">
            <span class="detail-item-span">Wind - {{Math.round(weeklyWeather?.current.wind_kph)}}km/h</span>
          </div>
        </div>
      </div>
      <!-- Right sight of the page -->
      <div class="weather-suggestions">
        <!-- Weekly forecast -->
        <div class="suggestion-item mb-12">
          <!-- Title and navigation -->
          <div class="title_nav">
            <span>Weekly Forecast</span>
            <div class="swiper-navigation">
              <button class="weekly-nav-prev border border-black hover:opacity-70">
                <Icon name="prime:arrow-up-right" size="21" class="opacity-85" />
              </button>
              <button class="weekly-nav-next bg-blue-500 hover:bg-blue-400">
                <Icon name="prime:arrow-up-right" size="21" class="text-white" />
              </button>
            </div>
          </div>
          <Swiper
            ref="weeklySwiper"
            :slides-per-view="'auto'"
            :space-between="20"
            :navigation="{ nextEl: '.weekly-nav-next', prevEl: '.weekly-nav-prev' }"
            :loop="true"
            @swiper="onWeeklySwiper"
            class="mt-5"
          >
            <SwiperSlide v-for="ind in 7" :key="ind">
              <WeatherCard :weather="weeklyWeather?.forecast.forecastday[ind - 1]" :index="ind - 1" />
            </SwiperSlide>
          </Swiper>
        </div>
        <!-- Other cities weather -->
        <div class="suggestion-item">
          <!-- Title and navigation -->
          <div class="title_nav">
            <span>Other Cities Weather</span>
            <div class="swiper-navigation">
              <button class="cities-nav-prev border border-black hover:opacity-70">
                <Icon name="prime:arrow-up-right" size="21" class="opacity-85" />
              </button>
              <button class="cities-nav-next bg-blue-500 hover:bg-blue-400">
                <Icon name="prime:arrow-up-right" size="21" class="text-white" />
              </button>
            </div>
          </div>
          <Swiper
              ref="citiesSwiper"
              :slides-per-view="'auto'"
              :space-between="20"
              :navigation="{ nextEl: '.cities-nav-next', prevEl: '.cities-nav-prev' }"
              :loop="true"
              @swiper="onCitiesSwiper"
              class="mt-5"
          >
            <SwiperSlide v-for="ind in 10" :key="ind">
              <OtherCityCard :city="otherCitiesList[ind - 1]" :index="ind - 1" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { onMounted, onUnmounted, ref } from 'vue'
  import { format } from 'date-fns'

  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, Pagination } from "swiper/modules";
  import SwiperCore from "swiper";
  import "swiper/swiper-bundle.css";

  import { fetchCurrentWeather, fetchWeeklyWeather } from "~/services/WeatherService.js";
  import { fetchCity, getLocation } from "~/services/UserLocationService.js";

  import { search, randomCitiesList } from "~/services/SearchCityService.js";
  import { debounce } from "lodash";

  const currentDate = ref(new Date())
  const weeklyWeather = ref(null);
  const city = ref(null);

  const citiesWeather = ref([]);
  const otherCitiesList = ref([]);

  let citiesList = ref([]);
  const searchQuery = ref('');

  SwiperCore.use([Navigation, Pagination]);

  onMounted(async () => {
    const interval = setInterval(() => {
      currentDate.value = new Date()
    }, 1000);

    onUnmounted(() => {
      clearInterval(interval)
    });

    await userLocation();
    await getOtherCitiesWeather();
  });

  // Date configurations
  const formattedDate = computed(() => {
    return format(currentDate.value, 'dd') + " " + currentDate.value.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    }).replace(',', ' ')
  });
  const formattedTime = computed(() => {
    return format(currentDate.value, 'HH:mm')
  });
  const dayOfWeek = computed(() => {
    return format(currentDate.value, 'EEEE')
  });

  // Current user location
  const userLocation = async () => {
    try {
      const pos = await getLocation()
      city.value = await fetchCity(pos.latitude, pos.longitude);

      if(city.value != null) {
        await getWeather(city.value);
      }
    } catch(error) {
      console.error('Cannot find user position and city:', error);
    }
  }

  // Current weather
  const getWeather = async (city) => {
    try {
      weeklyWeather.value = await fetchWeeklyWeather(city);

      searchQuery.value = '';
      citiesList = [];

    } catch(error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Other cities weather
  const getOtherCitiesWeather = async () => {
    citiesWeather.value = await randomCitiesList(10);
    for(const city of citiesWeather.value) {
      const cityWeather = await fetchCurrentWeather(city);
      otherCitiesList.value.push(cityWeather);
    }
  }

  // Search
  const searchCities = debounce(() => {
    // const query = searchQuery.value.trim().toLowerCase().replace(/\b\w/g, match => match.toUpperCase());

    if(searchQuery.value.length >= 3) {
      citiesList = search(searchQuery.value);
    } else {
      citiesList = [];
    }
  });

  // Swiper configurations
  const weeklySwiper = ref(null);
  const citiesSwiper = ref(null);

  const onWeeklySwiper = (swiper) => {
    weeklySwiper.value = swiper;
  };
  const onCitiesSwiper = (swiper) => {
    citiesSwiper.value = swiper;
  };

</script>