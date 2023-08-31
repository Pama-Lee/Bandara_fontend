<template>
  <div class="background">
    <div id="loading" v-if="!flightData?.flightNumber" style="display: flex; text-align: center; justify-content: center; align-items: center; height: 100vh;">
        <v-progress-circular indeterminate color="blue" size="large"></v-progress-circular>
      </div>
    <v-card style="margin: 5vw; padding: 20px;" v-if="flightData?.flightNumber">
      <v-row>
        <v-col cols="3" style="text-align: center; padding: 20px;">
          <img :src="'https://daisycon.io/images/airline/?width=300&height=300&iata='+flightNum.substring(0, 2)" style="
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
              <span style="margin-left: 15px;">{{ flightData?.flightNumber }}</span>
            </h2>
          </v-row>
          <v-row>
            <h3 style="">
              <span style="margin-left: 15px;">{{ new Date(flightData?.departureTime).toLocaleString() }}</span>
            </h3>
          </v-row>
        </v-col>
      </v-row>
      <v-divider thickness="3" color="rgba(0,0,0)" style="margin-top: 20px;margin-bottom: 20px;"></v-divider>
      <v-table density="compact">
        <tbody>
          <tr>
            <td>航空公司</td>
            <td>{{ airlineName }}</td>
          </tr>
          <tr>
            <td>航班号</td>
            <td>{{ flightData?.flightNumber }}</td>
          </tr>
          <tr>
            <td>起飞时间</td>
            <td>{{ new Date(flightData?.departureTime).toLocaleString() }}</td>
          </tr>
          <tr>
            <td>起飞机场</td>
            <td>
              <a v-if="airportWeb" :href="airportWeb">{{ flightData?.departureAirport }}</a>
              <span v-else>{{ flightData?.departureAirport }}</span>
            </td>
          </tr>
          <tr>
            <td>起飞机场名</td>
            <td>{{ airportName }}</td>
          </tr>
          <tr>
            <td>起飞机场电话(仅供参考)</td>
            <td>{{ airportTel }}</td>
          </tr>
          <tr>
            <td>落地机场</td>
            <td>{{ flightData?.destinationAirport }}</td>
          </tr>
          <tr>
            <td>已参与人数</td>
            <td>{{ flightData?.passenger }}</td>
          </tr>
          <tr>
            <td>航班状态</td>
            <td>等待中</td>
          </tr>
        </tbody>
      </v-table>
      <hr style="margin-top: 20px; margin-bottom: 10px;" />

      <span style="font-size: 25px; font-weight: bold;">讨论区</span>
      
      <v-row justify="center">
        <v-col cols="9" md="10" lg="11">
          <v-text-field style="margin-top: 20px;" density="compact" variant="solo" label="发送评论" append-inner-icon="mdi-SendVariant" v-model="commentText"
        hide-details></v-text-field>
        </v-col>
        <v-col cols="3" md="2" lg="1">
          <v-btn style="margin-top: 20px;" color="primary" block @click="sendComment">发送</v-btn>
          </v-col>
      </v-row>
      <v-list style="margin-top: 20px;">
        <div v-if="comments.length == 0" style="text-align: center; margin-top: 20px;">暂无评论</div>
        <v-list lines="two">
          <v-list-item v-for="item in comments" :key="item.id" style="box-shadow: 0 3px 4px 1px rgba(0, 0, 0, 0.1);">
            <v-list-item-content>
              <v-list-item-title>
                {{ item?.name || "佚名" }} - <span style="font-size: small;">{{ new Date(item.time).toLocaleDateString() }}</span>
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.comment }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>

    </v-card>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getFlightDetail, getFlightCommentService, sendFlightCommentService } from "@/services/flight/flight";
import request from "@/services/api";



// 获取router中的参数
const router = useRouter();
const uuid = ref<any>(router.currentRoute.value.params.uuid)

const flightData = ref<any>({})

const flightNum = ref("")
const airlineName = ref("查询中...")
const airportName = ref("查询中...")
const airportTel = ref("查询中...")
const airportWeb = ref("")

const comments = ref([])

// 待发送的评论
const commentText = ref("")

const getAirlineInfo = async () => {
  const airline = flightNum.value.substring(0, 2)
  const data = await request.get('https://api.mocd.cc/flight/query/airline?code='+airline,{
    prefix: ''
  })
  const dataE = JSON.parse(data.data)
  airlineName.value = dataE.name
}

const getAirportInfo = async () => {
  const airport = flightData.value.departureAirport
  const data = await request.get('https://api.mocd.cc/flight/query/airport?iata='+airport,{
    prefix: ''
  })
  const dataE = JSON.parse(data.data)
  airportName.value = dataE.name
  airportTel.value = dataE.phone
  airportWeb.value = dataE.website
}

onMounted(async () => {
  const data = await getFlightDetail({
    uuid: uuid.value,
  })
  flightData.value = data.data

  flightNum.value = data.data.flightNumber
  getAirlineInfo()
  getAirportInfo()

  // 获取评论
  getFlightCommentService({
    uuid: uuid.value,
  }).then((res) => {
    comments.value = res.data
  })

})

const sendComment = () => {
  if (commentText.value == "") {
    return
  }


  sendFlightCommentService({
    uuid: uuid.value,
    comment: commentText.value,
  }).then((res) => {
    if (res.code == 1) {
      commentText.value = ""
      getFlightCommentService({
        uuid: uuid.value,
      }).then((res) => {
        comments.value = res.data
      })
    }
  })
}


</script>

<style scoped>
.background {
  height: 100vh;
  width: 100%;
  overflow: auto;
  background-image: url("https://api.oyohen.com/bing.php");
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>