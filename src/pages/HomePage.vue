<template>
  <div class="background-container">
    <v-row class="row-style" justify-sm="center" justify-md="space-between">
      <v-col lg="8" md="10" sm="12" offset-md="1" offset-lg="2">
        <v-text-field density="compact" variant="solo" label="搜索航班号/出发城市" append-inner-icon="mdi-magnify"
          hide-details></v-text-field>
        <div style="margin-bottom: 20px"></div>
        <div id="flight-list" class="flight-list" @scroll="handleListScroll">
          <LoadingLay v-model:active="loading" :can-cancel="false" :is-full-page="fullPage" color="blue" />
          <FlightCard v-for="item in flightData" :key="item.id" :flight="item" />
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
import request from '@/services/api';
import { onMounted, ref } from 'vue';

const openModal = ref(false)
const loading = ref(false)
const init = ref(false)
const fullPage = ref(true)
const flightData = ref<any>([])

onMounted(() => {
  if (init.value) return
  loading.value = true
  getFlightList()

  if (!localStorage.getItem('_token')) {
    setTimeout(()=>{
      openModal.value = true
    }, 8000)
  }
})

const go2Login = ()=> {
  window.location.href = "/login"
}

const getFlightList = () => {
  loading.value = true
  request.get('/api/flight/list').then((res) => {
    console.log(res.data)
    flightData.value = res.data.list
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

.background-container {
  background-image: url("https://picsum.photos/1920/1080?blur");
  background-size: cover;
  background-position: center;
  height: 93vh;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.background-container::-webkit-scrollbar {
  display: none;
}

.flight-list {
  overflow-y: scroll;
  height: 75vh;
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
  