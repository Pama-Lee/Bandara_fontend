<template>
  <div class="background">
    <v-card style="margin: 5vw; padding: 20px;">
      <v-row>
        <v-col cols="3" style="text-align: center; padding: 20px;">
          <img src="https://daisycon.io/images/airline/?width=300&height=300&iata=AK" style="
            border-radius: 50%;
            padding: 10px;
            background-color: rgba(113, 113, 113, 0.05); 
            max-width: 120px;
            max-height: 120px;
            width: 100%;
            height: 100%;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.3);
          " />
        </v-col>
        <v-col cols="9" align-self="center">
          <v-row>
            <h2>
              <span style="margin-left: 15px;">AK7100</span>
            </h2>
          </v-row>
          <v-row>
            <h3 style="">
              <span style="margin-left: 15px;">12:00 2023-09-12</span>
            </h3>
          </v-row>
        </v-col>
      </v-row>
      <v-divider thickness="3" color="rgba(0,0,0)" style="margin-top: 20px;margin-bottom: 20px;"></v-divider>
      <v-table density="compact">
        <tbody>
          <tr>
            <td>航班号</td>
            <td>{{ flightData.flightNumber }}</td>
          </tr>
          <tr>
            <td>起飞时间</td>
            <td>{{ new Date(flightData?.departureTime).toLocaleString() }}</td>
          </tr>
          <tr>
            <td>起飞机场</td>
            <td>{{ flightData?.departureAirport }}</td>
          </tr>
          <tr>
            <td>落地机场</td>
            <td>{{ flightData?.arrivalAirport }}</td>
          </tr>
          <tr>
            <td>已参与人数</td>
            <td>{{ flightData?.passengers }}</td>
          </tr>
          <tr>
            <td>航班状态</td>
            <td>等待中</td>
          </tr>
        </tbody>
      </v-table>
      <hr style="margin-top: 20px; margin-bottom: 10px;" />

      <span style="font-size: 25px; font-weight: bold;">讨论区</span>
      
      <v-text-field style="margin-top: 20px;" density="compact" variant="solo" label="发送评论" append-inner-icon="mdi-SendVariant"
        hide-details></v-text-field>
      <v-list style="margin-top: 20px;">
        <v-list lines="two">
          <v-list-item v-for="n in 3" :key="n" :title="'Item ' + n"
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit" style="box-shadow: 0 3px 4px 1px rgba(0, 0, 0, 0.1);">
          </v-list-item>
        </v-list>
      </v-list>

    </v-card>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getFlightDetail } from "@/services/flight/flight";
import { pbkdf2 } from "crypto";
import request from "@/services/api";

//测试填补数据




// 获取router中的参数
const router = useRouter();
const uuid = ref(router.currentRoute.value.params.uuid)

const flightData = ref<any>({})

const flightNum = ref("")

const getAirlineInfo = async () => {
  const airline = flightNum.value.substring(0, 2)
  const data = await request.get('https://api.mocd.cc/flight/query/airline?code='+airline)
  
}

onMounted(async () => {
  const data = await getFlightDetail({
    uuid: uuid.value,
  })
  flightData.value = data.data

  flightNum.value = data.data.flightNumber
  getAirlineInfo()
})


</script>

<style scoped>
.background {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-image: url("https://api.oyohen.com/bing.php");
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>