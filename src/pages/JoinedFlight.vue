<template>
    <div class="background">
        <v-card style="margin: 5vw; padding: 20px;">
            <span style="font-size: 25px; font-weight: bold;">已加入航班</span>
            <v-divider thickness="3" color="rgba(0,0,0)" style="margin-top: 20px;margin-bottom: 20px;"></v-divider>
            <v-banner v-for="item in flight" :key="item.name">
                    <v-row>
                        <v-col cols="3">
                            <img :src="'https://daisycon.io/images/airline/?width=300&height=300&iata='+item.name.substring(0, 2)" style="
                                border-radius: 50%;
                                padding: 5px;
                                background-color: rgba(113, 113, 113, 0.05); 
                                max-width: 80px;
                                max-height: 80px;
                                width: 100%;
                                height: 100%;
                                box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.3);
                            "/>
                        </v-col>
                        <v-col cols="9" align-self="center">
                            <v-row>
                                <v-col cols="6" align-self="center">
                                    <v-row>
                                        <h2>
                                        <span style="margin-left: 15px;">{{ item.name }}</span>
                                        </h2>
                                    </v-row>
                                    <v-row>
                                        <h3>
                                            <span style="margin-left: 15px;">{{ item.time.substring(0,5) }}</span>
                                        </h3>
                                        <br v-if="width < 600">
                                        <h3>
                                            <span style="margin-left: 15px;">{{ item.time.substring(6) }}</span>
                                        </h3>
                                    </v-row>
                                </v-col>
                                <v-col cols="4" align-self="center">
                                    <span>航班状态： </span>
                                    <br v-if="width < 600">
                                    <span style="font-weight: bold;">{{ item.state }}</span>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
            </v-banner>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
//测试填充数据
const flight = [
    { 
        name: "AK7100",
        time: "14:25 2023/09/05",
        state:"等待中"
    },
    { 
        name: "MU7120",
        time: "06:56 2023/07/05",
        state:"已着陆"
    },
    { 
        name: "CA6593",
        time: "04:50 2023/09/05",
        state:"等待中"
    },
    { 
        name: "MF1200",
        time: "16:55 2023/09/15",
        state:"等待中"
    }
]

const width = ref(window.innerWidth)

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