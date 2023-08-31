<template>
  <div>
    <v-card style="margin: 50px;">
      <v-row>
        <v-col cols="3">
          <v-img src="https://daisycon.io/images/airline/?width=300&height=200&iata=AK" style="
            border-radius: 50%
            width: 200px; 
            height: 200px;
          "/>
        </v-col>
        <v-col cols="9" align-self="center">
          <v-row>
            <p style="font-size: 24px; margin: 15px;">
              <span>FlighNumber:</span>
              <span style="margin-left: 15px;">AK7100</span>
            </p>
          </v-row>
          <v-row>
            <p style="font-size: 24px; margin: 15px;">
              <span>FlighTime:</span>
              <span style="margin-left: 15px;">12:00   2023-09-12</span>
            </p>
          </v-row>
        </v-col>
      </v-row>
      <v-divider thickness="3" color="rgba(0,0,0)"></v-divider>
      <v-table density="compact">
        <tbody>
          <tr v-for="item in flightDataTest" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.data }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-divider thickness="3" color="rgba(0,0,0)"></v-divider>
      <span style="font-size: 32px; font-weight: bold;">Comment Area</span>
      <ul>
        <v-banner avatar="https://daisycon.io/images/airline/?width=300&height=200&iata=AK" v-for="item in commentTest" :key="item.userName" color="rgba(255, 0, 0)" style="
          padding: 15px;
        ">
         {{ item.userName +": " }}{{ item.content }}
        </v-banner>
      </ul>
      <v-text-field density="compact" variant="solo" label="发送评论" append-inner-icon="mdi-SendVariant"
          hide-details></v-text-field>
    </v-card>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getFlightDetail} from "@/services/flight/flight";
import { pbkdf2 } from "crypto";

//测试填补数据
const commentTest=[
  {
    userName: "User1",
    content: "hahahahahahahha"
  },
  {
    userName: "User1",
    content: "hahahahahahahha"
  },
  {
    userName: "User1",
    content: "hahahahahahahha"
  },
  {
    userName: "User1",
    content: "hahahahahahahha"
  },
  {
    userName: "User1",
    content: "hahahahahahahha"
  },
  {
    userName: "User1",
    content: "hahahahahahahha"
  },
  {
    userName: "User1",
    content: "hahahahahahahha"
  },
  {
    userName: "User1",
    content: "hahahahahahahha"
  },
]
const flightDataTest=[
  {
    name: "Flight Number",
    data: "AK7100"
  },
  {
    name: "Flight Time",
    data: "12:30"
  },
  {
    name: "Flight Date",
    data: "2023-09-12"
  },
  {
    name: "DepartureAirport",
    data: "HZH"
  },
  {
    name: "ArriveAirport",
    data: "KUL"
  },
  {
    name: "Co-passenger",
    data: 20
  },
  {
    name: "State",
    data: "History" 
  }
]


// 获取router中的参数
const router = useRouter();
const uuid = ref(router.currentRoute.value.params.uuid)

const flightData = ref<any>({})

onMounted(async () => {
  const data = await getFlightDetail({
    uuid: uuid.value,
  })
  flightData.value = data
})


</script>