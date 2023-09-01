<template>
  <div class="background-container">
    <v-row class="row-style" justify-sm="center" justify-md="space-between">
      <v-col lg="8" md="10" sm="12" offset-md="1" offset-lg="2">
        <v-row>
          <v-col cols="6">
            <v-text-field density="compact" variant="solo" label="搜索航班号" append-inner-icon="mdi-magnify" hide-details
              v-model="searchFlight"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field density="compact" variant="solo" label="搜索出发城市" append-inner-icon="mdi-magnify" hide-details
              v-model="searchCity"></v-text-field>
          </v-col>
        </v-row>
        <v-alert type="info" style="margin-top: 20px;" v-if="searchFlight == '' && searchCity == ''">
          <span>本页仅显示前20条记录</span>
          </v-alert>  

        <div style="margin-bottom: 20px"></div>
        <div id="flight-list" class="flight-list" @scroll="handleListScroll">
          <div v-if="flightData.length === 0 && !loading"
            style="text-align: center; background-color: rgba(255, 255, 255, 0.4); padding: 20px;height: 70vh;">
            <h1 style="font-size: 100px;opacity: 0.8;">😭</h1>
            <h1>暂无航班</h1>
            <v-btn color="primary" @click="router.push('/new')" style="margin-top: 20px;">点击前去创建你的航班</v-btn>
          </div>
          <div v-if="loading" class="loading">
            <v-progress-circular size="large" indeterminate color="primary"></v-progress-circular>
          </div>
          <div v-if="!loading">
            <FlightCard v-for="item in flightData" :key="item.id" :flight="item" />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
  <v-dialog width="400px" v-model="openModal">
    <v-card style="padding: 20px;">
      <v-card-title>
        👋 欢迎使用航迹
      </v-card-title>
      <v-card-text>
        登录后即可进行:
        <ul>
          <li>查看航班详情</li>
          <li>航班讨论</li>
          <li><mark>参与航班,寻找同航班的同学</mark></li>
          <li>查看参与历史</li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="go2Login">前往登录</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script setup lang="ts">
import FlightCard from '@/components/home/FlightCard.vue'
import router from '@/router';

import { getFlightListService } from '@/services/flight/flight';
import { onMounted, ref, watch } from 'vue';

const openModal = ref(false)
const loading = ref(false)
const init = ref(false)
const fullPage = ref(true)
const flightData = ref<any>([])

const searching = ref()

const searchFlight = ref('')
const searchCity = ref('')

watch(searchFlight, (val) => {
  if (val === '') {
    getFlightList()
  } else {
    req()
  } 
})

watch(searchCity, (val) => {
  if (val === '') {
    getFlightList()
  } else {
    req()
  } 
})

const req = async () => {
  loading.value = true
    clearTimeout(searching.value)
    searching.value = setTimeout(() => {

      getFlightListService({ 
        flightNumber: searchFlight.value,
        city: searchCity.value
      }).then(res => {
        if (res.data) {
          flightData.value = res.data
        }
        loading.value = false
        clearTimeout(searching.value)
      })
    }, 1000)
}

onMounted(() => {
  if (init.value) return
  loading.value = true
  getFlightList()

  if (!localStorage.getItem('_token')) {
    setTimeout(() => {
      openModal.value = true
    }, 8000)
  }
})

const go2Login = () => {
  window.location.href = "/login"
}

const getFlightList = () => {
  loading.value = true
  getFlightListService(null).then(res => {
    if (res.data) {
      flightData.value = res.data
    }

    loading.value = false
  })
}

const handleListScroll = (event: any) => {
  const flightList = event.target;
  const parentContainer = flightList.parentElement;
  parentContainer.scrollTop = flightList.scrollTop;
}
</script>
  
<style scoped>
.row-style {
  padding-top: 20px;
}

.loading {
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-container {
  height: 100vh;
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
  background-image: url("https://api.oyohen.com/bing.php");
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.background-container::-webkit-scrollbar {
  display: none;
}



.flight-list::-webkit-scrollbar {
  width: 4px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.3);
}

.flight-list::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
  