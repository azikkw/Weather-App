<template>
  <!-- Welcome page -->
  <div v-if="welcome" :class="['first-page', themeMode]">
    <div class="first-title">
      <img src="/images/weather-app.png" alt="logo" />
      <p class="font-bold">Weather Forecast</p>
      <span>Welcome! Enter the city you are in to view the weather forecast.</span>
    </div>
    <!-- Search -->
    <button class="w-[200px] h-[58px] bg-blue-500 rounded-[29px] text-lg text-white font-medium sm:hidden" @click="handleFocus" aria-label="Start Btn">Get started</button>
    <div class="search" :class="{'is-focused': isFocused}">
      <div class="search-input-back">
        <input ref="searchInput" type="text" v-model="searchQuery" @keyup="searchCities" placeholder="Search City...." class="search-input"/>
        <span class="icon-wrapper mt-[0.5px]">
          <Icon name="ph:magnifying-glass" size="20px" />
        </span>
        <p class="text-[18px] sm:hidden" @click="handleBlur">Cancel</p>
      </div>
      <ul class="search-result" :style="{ display: citiesList.length > 0 ? 'block' : 'none' }">
        <li v-for="city in citiesList" @click="getStarted(city.name)">
          <p>{{city.name}}, <span class="opacity-70">{{city.country}}</span></p> <Icon class="-mr-2 opacity-80" name="material-symbols-light:chevron-right-rounded" size="28px" />
        </li>
      </ul>
    </div>
  </div>
  <!-- Loading page -->
  <div v-else-if="!weeklyWeather" class="loading-page">
    <Icon name="meteocons:compass-fill" size="70" />
  </div>
  <!-- Main page -->
  <div v-else :class="['background-page', themeMode]">
    <header>
      <!-- Logotype -->
      <div class="logo">
        <img src="/images/weather-app.png" alt="logo" />
        <span class="font-bold">Weather</span>
      </div>
      <!-- Current location -->
      <div class="current-location">
        <Icon class="text-blue-500" name="ci:location" size="28px"/>
        <span>{{ weeklyWeather?.location.name }}</span>
      </div>
      <!-- Search -->
      <div class="search" :class="{'is-focused': isFocused}">
        <div class="search-input-back">
          <input ref="searchInput" type="text" v-model="searchQuery" @keyup="searchCities" placeholder="Search City...." class="search-input" />
          <span class="icon-wrapper">
            <Icon name="ph:magnifying-glass" />
          </span>
          <p class="text-[18px] sm:hidden" @click="handleBlur">Cancel</p>
        </div>
        <ul class="search-result" :style="{ display: citiesList.length > 0 ? 'block' : 'none' }">
          <li v-for="city in citiesList" @click="findCity(city.name)">
            <p>{{city.name}}, <span class="opacity-70">{{city.country}}</span></p> <Icon class="-mr-2 opacity-80" name="material-symbols-light:chevron-right-rounded" size="28px" />
          </li>
        </ul>
      </div>
      <div @click="handleFocus" class="absolute right-[130px] top-1/2 -translate-y-1/2 mt-1 sm:hidden">
        <Icon name="ph:magnifying-glass" size="30px" />
      </div>
      <!-- Theme changer -->
      <div class="change-theme">
        <div class="light-theme" @click="changeThemeMode('light-mode')"><Icon name="ph:sun-dim-light" size="34px" /></div>
        <div class="dark-theme" @click="changeThemeMode('dark-mode')"><Icon name="material-symbols-light:dark-mode-outline" size="30px" /></div>
        <span class="active-theme"></span>
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
        <!-- For current weather -->
        <div v-if="currentWeather?.day === undefined" class="current-weather">
          <WeatherIcon :code="currentWeather?.condition.code" :isDay="currentWeather.is_day" />
          <div>
            <span class="current-temp">{{Math.round(currentWeather?.temp_c)}}°C</span>
            <div class="temp-detail-back">
              <div class="temp-detail lg:mb-2">
                <img src="/images/high-temp.png" alt="h-temp" />
                <span>H: {{Math.round(weeklyWeather?.forecast?.forecastday[0].day.maxtemp_c)}}°C</span>
              </div>
              <div class="temp-detail">
                <img src="/images/low-temp.png" alt="l-temp" />
                <span>L: {{Math.round(weeklyWeather?.forecast?.forecastday[0].day.mintemp_c)}}°C</span>
              </div>
            </div>
          </div>
        </div>
        <!-- For forecast weather -->
        <div v-else class="current-weather">
          <div class="block lg:hidden sm:absolute -top-[20px] z-10 text-[18.5px] mb-[15px] opacity-75 -mt-[25px]">
            {{currentWeather?.forecastDayOfWeek}}, {{currentWeather?.forecastDate.slice(0, -5)}}
          </div>
          <WeatherIcon :src="weatherImageMap[currentWeather?.day.condition.code]" />
          <div>
            <span class="current-temp">
              <span class="text-lg font-medium -mb-3 opacity-70">Avg:</span>
              {{Math.round(currentWeather?.day.avgtemp_c)}}°C
            </span>
            <div class="temp-detail-back">
              <div class="temp-detail lg:mb-2">
                <img src="/images/high-temp.png" alt="h-temp" />
                <span>H: {{Math.round(currentWeather?.day.maxtemp_c)}}°C</span>
              </div>
              <div class="temp-detail">
                <img src="/images/low-temp.png" alt="l-temp" />
                <span>L: {{Math.round(currentWeather?.day.mintemp_c)}}°C</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Divider -->
        <hr class="w-full mt-10 mb-6">
        <!-- Current date -->
        <div class="current-date hidden lg:block">
          <span>{{currentWeather?.day === undefined ? 'Date Today' : 'Date: ' + currentWeather?.forecastDate.slice(0, -5)}}</span>
          <div class="flex gap-5">
            <span>{{currentWeather?.day === undefined ? dayOfWeek : currentWeather?.forecastDayOfWeek}}</span>
            <span>{{currentWeather?.day === undefined ? formattedTime: currentWeather?.forecastDate.slice(-4)}}</span>
          </div>
        </div>
        <!-- Current weather details -->
        <div class="weather-details">
          <span class="hidden lg:block">Weather Details</span>
          <div class="detail-item border-b sm:border-none !rounded-b-none sm:!rounded-xl mt-3 lg:mt-5">
            <img src="/images/information.png" alt="cloud" />
            <span class="detail-item-span">{{currentWeather?.day === undefined ? currentWeather?.condition.text : currentWeather?.day?.condition?.text}}</span>
          </div>
          <div class="detail-item border-b sm:border-none !rounded-none sm:!rounded-xl sm:mt-3">
            <img src="/images/humidity.png" alt="humidity" />
            <span class="detail-item-span">Humidity - {{currentWeather?.day === undefined ? currentWeather?.humidity : currentWeather?.day?.avghumidity}}%</span>
          </div>
          <div class="detail-item !rounded-t-none rounded-b-xl sm:!rounded-xl sm:mt-3">
            <img src="/images/wind.png" alt="wind" />
            <span class="detail-item-span">Wind - {{currentWeather?.day === undefined ? Math.round(currentWeather?.wind_kph) : Math.round(currentWeather?.day?.maxwind_kph)}}km/h</span>
          </div>
        </div>
      </div>
      <!-- Right sight of the page -->
      <div class="weather-suggestions">
        <!-- Hourly forecast -->
        <div class="suggestion-item">
          <!-- Title and navigation -->
          <div class="title_nav">
            Hourly Forecast
            <div class="swiper-navigation">
              <button class="hourly-nav-prev border border-black hover:opacity-70" aria-label="Weekly Prev Btn">
                <Icon name="prime:arrow-up-right" size="21" class="opacity-85" />
              </button>
              <button class="hourly-nav-next bg-blue-500 hover:bg-blue-400" aria-label="Weekly Next Btn">
                <Icon name="prime:arrow-up-right" size="21" class="text-white" />
              </button>
            </div>
          </div>
          <Swiper
              ref="hourlySwiper"
              :slides-per-view="'auto'"
              :navigation="{ nextEl: '.hourly-nav-next', prevEl: '.hourly-nav-prev' }"
              :free-mode="true"
              :loop="true"
              @swiper="onHourlySwiper"
              class="hourly-swiper"
          >
            <SwiperSlide v-for="(weather, ind) in currentWeather.hour" :key="ind">
              <HourlyCard :weather="weather" />
            </SwiperSlide>
          </Swiper>
        </div>
        <!-- Weekly forecast -->
        <div class="suggestion-item">
          <!-- Title and navigation -->
          <div class="title_nav">
            Weekly Forecast
            <div class="swiper-navigation">
              <button class="weekly-nav-prev border border-black hover:opacity-70" aria-label="Weekly Prev Btn">
                <Icon name="prime:arrow-up-right" size="21" class="opacity-85" />
              </button>
              <button class="weekly-nav-next bg-blue-500 hover:bg-blue-400" aria-label="Weekly Next Btn">
                <Icon name="prime:arrow-up-right" size="21" class="text-white" />
              </button>
            </div>
          </div>
          <Swiper
            ref="weeklySwiper"
            :slides-per-view="'auto'"
            :space-between="15"
            :navigation="{ nextEl: '.weekly-nav-next', prevEl: '.weekly-nav-prev' }"
            :free-mode="true"
            @swiper="onWeeklySwiper"
            class="forecast-swiper"
          >
            <SwiperSlide v-for="(weather, ind) in weeklyWeather?.forecast.forecastday" :key="ind">
              <WeatherCard :weather="weather" @selectedForecast="handleForecast" :index="ind" />
            </SwiperSlide>
          </Swiper>
        </div>
        <!-- Current weather addition details -->
        <div class="suggestion-item">
          <!-- Title and navigation -->
          <div class="title_nav">
            Other Weather Details
            <div class="swiper-navigation">
              <button class="additions-nav-prev border border-black hover:opacity-70" aria-label="Additions Prev Btn">
                <Icon name="prime:arrow-up-right" size="21" class="opacity-85" />
              </button>
              <button class="additions-nav-next bg-blue-500 hover:bg-blue-400" aria-label="Additions Next Btn">
                <Icon name="prime:arrow-up-right" size="21" class="text-white" />
              </button>
            </div>
          </div>
          <Swiper
              ref="additionsSwiper"
              :slides-per-view="'auto'"
              :space-between="15"
              :navigation="{ nextEl: '.additions-nav-next', prevEl: '.additions-nav-prev' }"
              :free-mode="true"
              @swiper="onAdditionsSwiper"
              class="additions-swiper"
          >
            <SwiperSlide>
              <div class="sun-rise-set-back">
                <div class="rise-set-detail">
                  <img src="/images/sunrise.png" alt="sunrise" />
                  <div class="rise-set-detail-text">
                    <span class="opacity-75">Sunrise</span>
                    <span>{{currentWeather?.day === undefined ? weeklyWeather?.forecast.forecastday[0].astro.sunrise : currentWeather?.astro.sunrise}}</span>
                  </div>
                </div>
                <div class="rise-set-detail">
                  <img src="/images/sunset.png" alt="sunset" />
                  <div class="rise-set-detail-text">
                    <span class="opacity-75">Sunset</span>
                    <span>{{currentWeather?.day === undefined ? weeklyWeather?.forecast.forecastday[0].astro.sunset : currentWeather?.astro.sunset}}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide v-if="currentWeather?.day === undefined">
              <div class="add-detail">
                <div class="add-detail-text">
                  <span class="opacity-75">Feels like</span>
                  <span>{{Math.round(currentWeather?.feelslike_c)}}°C</span>
                </div>
                <img src="/images/thermometer.png" alt="thermometer" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="add-detail">
                <div class="add-detail-text">
                  <span class="opacity-75">{{currentWeather?.day === undefined ? 'Precipitation' : 'Avg. Precipitation'}}</span>
                  <span>{{currentWeather?.day === undefined ? Math.round(currentWeather?.precip_mm) : Math.round(currentWeather?.day.totalprecip_mm)}}mm</span>
                </div>
                <img src="/images/precipitation.png" alt="precipitation" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="add-detail">
                <div class="add-detail-text">
                  <span class="opacity-75">{{currentWeather?.day === undefined ? 'UV Index' : 'Avg. UV Index'}}</span>
                  <span>{{currentWeather?.day === undefined ? Math.round(currentWeather?.uv) : Math.round(currentWeather?.day.uv)}}</span>
                </div>
                <img src="/images/uv.png" alt="uv" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="add-detail">
                <div class="add-detail-text">
                  <span class="opacity-75">{{currentWeather?.day === undefined ? 'Visibility' : 'Avg. Visibility'}}</span>
                  <span>{{currentWeather?.day === undefined ? Math.round(currentWeather?.vis_km) : Math.round(currentWeather?.day.avgvis_km)}}km</span>
                </div>
                <img src="/images/visibility.png" alt="visibility" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="add-detail">
                <div class="add-detail-text">
                  <span class="opacity-75">{{currentWeather?.day === undefined ? 'Pressure' : 'Avg. Pressure'}}</span>
                  <span>{{currentWeather?.day === undefined ? Math.round(currentWeather?.pressure_in) : Math.round(currentWeather?.hour[10].pressure_in)}} in</span>
                </div>
                <img src="/images/pressure.png" alt="pressure" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
    <!-- GitHub if w=768 -->
    <a class="github" href="https://github.com/azikkw/Weather-App" target="_blank">
      <Icon name="mdi:github" size="30px"/>
      azikkw
    </a>
  </div>
</template>

<script setup>

  import { onMounted, onUnmounted, ref } from 'vue';
  import moment from "moment-timezone";

  import SwiperCore from "swiper";
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, FreeMode } from "swiper/modules";
  import "swiper/swiper-bundle.css";

  import { search } from "~/services/SearchCityService.js";
  import {weatherImageMap} from "~/types/weatherImage.js";
  import HourlyCard from "~/components/HourlyCard.vue";

  const welcome = ref(false);
  const themeMode = ref(null);

  const currentDate = ref(moment());

  /** @type {import('~/types/weather').WeatherData} */
  const weeklyWeather = ref(null);
  /** @type {import('~/types/weather').CurrentWeather} */
  const currentWeather = ref(null);

  // Search values
  let citiesList = ref([]);
  const searchQuery = ref('');
  const searchInput = ref(null);
  const isFocused = ref(false);

  // For swiper configuration
  SwiperCore.use([Navigation, FreeMode]);

  onMounted(async () => {
    setTheme(); // Configuring theme
    await getLocation(); // Defining location

    // Update current date
    const interval = setInterval(() => {
      getDateByCity();
    }, 1000);

    onUnmounted(() => clearInterval(interval));
  });

  // Set theme from local storage value
  const setTheme = () => {
    if(localStorage.getItem('themeMode') !== null) {
      themeMode.value = localStorage.getItem('themeMode');
    } else localStorage.setItem('themeMode', 'light-mode');
  }
  // Theme changer
  const changeThemeMode = (mode) => {
    if(mode === "dark-mode") themeMode.value = mode;
    else themeMode.value = mode;

    localStorage.setItem('themeMode', mode);
  }

  // Finding location (from local storage)
  const getLocation = async () => {
    const location = localStorage.getItem('location');
    if(location) {
      await getWeather(location);
    } else {
      welcome.value = true;
    }
  }

  // Date configurations
  const getDateByCity = () => {
    if(weeklyWeather.value !== null) {
      currentDate.value = moment().tz(weeklyWeather?.value.location.tz_id);
    }
  };
  const formattedDate = computed(() => {
    return currentDate.value.format('DD MMMM YYYY');
  });
  const formattedTime = computed(() => {
    return currentDate.value.format('HH:mm');
  });
  const dayOfWeek = computed(() => {
    return currentDate.value.format('dddd');
  });

  // On getting started
  const getStarted = async (city) => {
    await findCity(city);
    window.location.reload();
  }
  // Find weather of searched city
  const findCity = async (city) => {
    localStorage.setItem('location', city);
    await getWeather(city);
  }
  // Fetch current weather, weekly forecast
  const getWeather = async (city) => {
    try {
      weeklyWeather.value = await $fetch(`/api/weather/${city}`);
      // Checking to be not null
      if(weeklyWeather.value) {
        currentWeather.value = {...weeklyWeather?.value.current, hour: weeklyWeather?.value.forecast.forecastday[0].hour};
        console.log(currentWeather.value);
        handleBlur(); // Disabling search window
        getDateByCity(); // Finding date for found city
      } else if(!weeklyWeather.value || !weeklyWeather.value.current || !weeklyWeather.value.forecast.forecastday) {
        throw createError({statusCode: 404, statusMessage: `Couldn't determine the weather in ${city}, try again.`});
      }

    } catch(error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Handle forecast weather
  const handleForecast = (weatherInfo) => {
    if(weatherInfo.index !== 0) {
      currentWeather.value = {...weeklyWeather?.value.forecast.forecastday[weatherInfo.index], ...weatherInfo};
    }
    else currentWeather.value = {...weeklyWeather?.value.current, hour: weeklyWeather?.value.forecast.forecastday[0].hour};
  };

  // Search
  const searchCities = () => {
    // Checking for length to be more than 3
    if(searchQuery.value.length >= 3) {
      citiesList = search(searchQuery.value);
    } else {
      citiesList = [];
    }
  };

  // For search window opening
  const handleFocus = async () => {
    isFocused.value = true;
    document.body.style.overflow = 'hidden';

    // Focusing on input
    await nextTick();
    searchInput?.value.focus();
  };
  // For search window closing
  const handleBlur = () => {
    isFocused.value = false;
    // Disabling scrolling
    document.body.style.overflow = '';
    // Clearing search values
    searchQuery.value = '';
    citiesList = [];
  };

  // Swiper configuration
  const hourlySwiper = ref(null);
  const weeklySwiper = ref(null);
  const additionsSwiper = ref(null);

  const onHourlySwiper = (swiper) => {
    hourlySwiper.value = swiper;
  };
  const onWeeklySwiper = (swiper) => {
    weeklySwiper.value = swiper;
  };
  const onAdditionsSwiper = (swiper) => {
    additionsSwiper.value = swiper;
  };

</script>