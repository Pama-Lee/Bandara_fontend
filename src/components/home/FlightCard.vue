<template>
  <div @mouseover="MouseEnter" @mouseleave="MouseLeave" :class="[isMouseover]" style="
      min-height: 120px;
      max-height: 350px;
      border-radius: 8px;
      border: 1px solid #ccc;
      transition: 0.4s;
      overflow: hidden;
      margin: 8px;
      cursor: pointer;
    " @click="go2Detail">
    <img v-if="width < 600" :src="'https://daisycon.io/images/airline/?width=300&height=200&iata=' + airline" alt=""
      style="width: 100%; height: 100px; object-fit: cover; border: 2px solid #ccc; padding: 10px" />
    <v-row style="height: 100%; margin-left: 5px;" justify="center">
      <v-col cols="0" sm="2" md="2" align-self="center" style="height: 100%" v-if="width > 600">
        <v-img :src="'https://daisycon.io/images/airline/?width=300&height=200&iata=' + airline" height="100%"
          width="100%" class="grey lighten-2" object-fit="cover" style="opacity: 0.9;" />
      </v-col>
      <v-col cols="12" sm="10" md="10" style="padding: 20px; color: #2d2d2d">
        <v-row style="padding: 13px;" align-content="center">
          <span style="font-weight: bold; font-size: 24px;">{{ props.flight.flightNumber }}<span
              style="margin-left: 20px;font-size: 17px;">{{ departureDateStr }}</span></span>
        </v-row>
        <v-divider :thickness="2" style="margin-top: 10px; margin-bottom: 10px;" />
        <v-row :style="getFontSizeStyle()">
          <v-col>
                <p> 
                  <v-icon>mdi-airplane-takeoff</v-icon>
                  {{ departureTimeStr }}
                </p>
          </v-col>
          <v-col>
            <div
              style="display: grid; grid-template-columns: auto 1fr auto 1fr; align-items: center; white-space: nowrap; overflow: hidden;">
              <v-icon>mdi-airport</v-icon>
              <span style="margin-left: 15px;">{{ flight.departureAirport }}</span>
              <v-icon>mdi-arrow-right</v-icon>
              <span style="margin-left: 15px;">{{ flight.destinationAirport }}</span>
            </div>
          </v-col>
          <v-col>
            <p style="font-weight: bold;">
              <v-icon>mdi-account-supervisor</v-icon>
              <span style="margin-left: 15px; margin-right: 20px">{{ flight.passenger }}</span>
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style>
.mouseOver {
  background-color: rgba(255, 255, 255, 1.0);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
}

.mouseNotOver {
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
}
</style>
<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue'
import { request } from "@/services/api"
import { useRouter } from 'vue-router';

const router = useRouter()

type Flight = {
  flightNumber: string
  departureAirport: string
  destinationAirport: string
  passenger: number
  departureTime: string
  uuid: string
}

const props = defineProps({
  flight: {
    type: Object as PropType<Flight>,
    required: true
  }
})

const go2Detail = () => {
  router.push("/detail/" + props.flight.uuid)
}

const departureTimeStr = ref("")
const departureDateStr = ref("")

const getFontSizeStyle = () => {
  return "padding: 8px; font-size:" + (width.value > 600 ? "16px" : "13px")
}

// 获取flihtNumber的前两位
const airline = ref()

onMounted(() => {
  airline.value = props.flight.flightNumber.substring(0, 2).toLowerCase()
  const time = new Date(props.flight.departureTime);
  departureTimeStr.value = time.toLocaleTimeString()
  departureDateStr.value = time.toLocaleDateString()
})


const width = ref(window.innerWidth)

// 当屏幕大小改变时
onMounted(() => {
  // 监听屏幕大小改变
  window.addEventListener('resize', () => {
    // 获取屏幕宽度
    width.value = window.innerWidth
  })
})


const isMouseover = ref("mouseNotOver")

function MouseEnter() {
  isMouseover.value = "mouseOver"
}
function MouseLeave() {
  isMouseover.value = "mouseNotOver"
}

</script>