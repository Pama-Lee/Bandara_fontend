<template>
    <div class="background">
        <v-card style="margin: 5vw; padding: 20px;">
            <span style="font-size: 25px; font-weight: bold;">已加入航班</span>
            <v-divider thickness="3" color="rgba(0,0,0)" style="margin-top: 20px;margin-bottom: 20px;"></v-divider>
            <div id="loading" v-if="loading" style="text-align: center;">
                <v-progress-circular indeterminate size="40"></v-progress-circular>
            </div>
            <v-banner v-for="item in flightList" :key="item.uuid" @click="go2Detail(item)">
                <v-row>
                    <v-col cols="3">
                        <img :src="'https://daisycon.io/images/airline/?width=300&height=300&iata=' + item?.flightNumber.substring(0, 2)"
                            style="
                                border-radius: 50%;
                                padding: 5px;
                                background-color: rgba(113, 113, 113, 0.05); 
                                max-width: 80px;
                                max-height: 80px;
                                width: 100%;
                                height: 100%;
                                box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.3);
                            " />
                    </v-col>
                    <v-col cols="9" align-self="center">
                        <v-row>
                            <v-col cols="6" align-self="center">
                                <v-row>
                                    <h2>
                                        <span style="margin-left: 15px;">{{ item.flightNumber }}</span>
                                    </h2>
                                </v-row>
                                <v-row>
                                    <h3 style="">
                                        <span style="margin-left: 15px;">
                                            {{new Date(item?.departureTime).toTimeString().substring(0, 5) }} 
                                            <br v-if="width < 600">
                                        {{new Date(item?.departureTime).toLocaleDateString()
                                         }}</span>
                                    </h3>
                                </v-row>
                            </v-col>
                            <v-col cols="6" align-self="center">
                                <span>航班状态： </span>
                                <br v-if="width < 600">
                                <span style="font-weight: bold;">{{"等待中"}}</span>
                            </v-col>
                            
                        </v-row>
                    </v-col>
                </v-row>

            </v-banner>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { getUserFlightList } from '@/services/user/user';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const flightList = ref([])

const router = useRouter()
const loading = ref(true)
const width = ref(window.innerWidth)


const go2Detail = (item: any) => {
    router.push("/detail/" + item.uuid)
}

onMounted(() => {
    getUserFlightList(null).then(res => {
        if (res.code == 1) {
            flightList.value = res.data
            loading.value = false
        } else {
            alert("获取航班列表失败，请稍后再试")
        }
    })
})

// 当屏幕大小改变时
onMounted(() => {
  // 监听屏幕大小改变
  window.addEventListener('resize', () => {
    // 获取屏幕宽度
    width.value = window.innerWidth
  })
})
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