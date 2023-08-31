<template>
    <div style="padding: 20px;">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" sm="12" md="3">
                    <v-card>
                        <v-card-title>
                            帮助
                        </v-card-title>
                        <v-card-text>
                            <v-alert type="info" icon="mdi-information-outline" v-if="step === 1">
                                <p>
                                    你可以在这里创建一个航班, 以便寻找同航班的同学
                                </p>
                            </v-alert>
                            <v-alert type="info" icon="mdi-information-outline" v-if="step === 2">
                                <p>
                                    您可以搜索机场三字码, 例如: KUL(吉隆坡国际机场), 如果没有找到, 您可以选择创建一个新的机场
                                </p>
                            </v-alert>
                            <v-btn color="red" block @click="lastStep" v-if="step === 2"
                                style="margin-top: 20px;">上一步</v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-rol cols="12" sm="12" md="9">
                    <div id="step1" v-if="step === 1">
                        <h1>
                            没有找到你想要的航班? 请填写以下信息, 新建一个航班
                        </h1>
                        <p>
                            请注意, 你填写的信息将会被公开, 请不要填写任何个人信息
                        </p>
                        <div style="margin-bottom: 30px;"></div>
                        <v-form fast-fail @submit.prevent>
                            <v-text-field v-model="flightNumber" label="航班号(例如: AK2020)"
                                :rules="flightNumberRules"></v-text-field>

                            <v-text-field v-model="flightDate" label="起飞日期" type="date"></v-text-field>
                            <v-text-field v-model="flightTime" label="起飞时间" type="time"></v-text-field>


                            <v-btn type="submit" block class="mt-2" @click="submit">下一步</v-btn>
                        </v-form>
                    </div>
                    <div id="step2" v-if="step === 2">
                        <h1>
                            请确认你的航班信息
                        </h1>
                        <p>
                            请注意, 你填写的信息将会被公开, 请不要填写任何个人信息
                        </p>
                        <div style="margin-bottom: 30px;"></div>
                        <v-card>
                            <v-card-title>
                                <h2>航班信息</h2>
                            </v-card-title>
                            <v-card-text>
                                <p>航班号: {{ flightNumber }}</p>
                                <p>起飞日期: {{ flightDate }}</p>
                                <p>起飞时间: {{ flightTime }}</p>
                            </v-card-text>
                        </v-card>
                        <v-card style="margin-top: 20px; padding: 20px;">
                            <v-card-title>
                                <h3>选择机场</h3>
                            </v-card-title>
                            <v-alert type="success" icon="mdi-check-circle-outline"
                                v-if="confirmAirportName && confirmArrivalAirportName" style="margin-bottom: 20px;">
                                <p>
                                    你选择的机场是: {{ confirmAirportName }} -> {{ confirmArrivalAirportName }}
                                </p>
                                <p>
                                    如果你想更改机场, 请刷新即可, 临时数据已经保存
                                </p>
                            </v-alert>
                            <v-alert type="info" icon="mdi-check-circle-outline" style="margin-bottom: 20px;"
                                v-if="!confirmAirportName || !confirmArrivalAirportName">
                                <p>
                                    {{ confirmAirportCode ? '你已经选择了起飞机场, 请继续选择到达机场' : '请先选择起飞机场' }}
                                </p>
                            </v-alert>
                            <v-text-field label="搜索机场编号(如KUL)或机场名" v-model="flightAirport"></v-text-field>
                            <v-list style="max-height: 200px;" v-if="!confirmAirportCode || !confirmArrivalAirportCode">
                                <div v-if="loading" style="text-align: center;">
                                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                </div>
                                <div v-if="airportList.length === 0 && flightAirport !== '' && !loading">
                                    <v-alert type="warning" icon="mdi-information-outline" style="margin-top: 20px;">
                                        没有找到你的机场, 请在下方创建一个新的机场
                                    </v-alert>
                                </div>
                                <v-list-item v-for="item in airportList" :key="item.code" @click="selectAirport(item)">
                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            <v-row style="margin-top: 20px;"
                                v-if="!loading && airportList.length === 0 && flightAirport != ''">
                                <v-col cols="6">
                                    <v-text-field label="机场名称" v-model="airportName"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="机场三位编号" v-model="airportCode"></v-text-field>
                                </v-col>
                                <v-btn block :disabled="airportName === '' || airportCode === ''"
                                    @click="createAirp">创建机场</v-btn>
                            </v-row>
                        </v-card>

                        <div style="margin-bottom: 30px;"></div>

                        <v-card v-if="confirmAirportCode && confirmArrivalAirportCode">
                            <v-card-title>
                                <h2>确认信息</h2>
                            </v-card-title>
                            <v-card-text>
                                <p>航班号: {{ flightNumber }}</p>
                                <p>起飞日期: {{ flightDate }}</p>
                                <p>起飞时间: {{ flightTime }}</p>
                                <p>起飞机场: {{ confirmAirportName }}</p>
                                <p>到达机场: {{ confirmArrivalAirportName }}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn block @click="createFlight">确认</v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-rol>
            </v-row>
        </v-container>

    </div>
</template>

<script setup lang="ts">

import { createAirport, searchAirport } from '@/services/flight/airport';
import { newFlightService } from '@/services/flight/flight';
import { onMounted, ref, watch } from 'vue'

const flightNumber = ref('')

const step = ref(1)

const flightDate = ref('')
const flightTime = ref('')
const flightAirport = ref('')

// 确认起飞机场
const confirmAirportName = ref('')
const confirmAirportCode = ref('')

// 确认到达机场
const confirmArrivalAirportName = ref('')
const confirmArrivalAirportCode = ref('')


const airportList = ref([])
const airportName = ref('')
const airportCode = ref('')

const loading = ref(false)

const searchingID = ref()


// 当flightAirport变化时, 重新获取机场列表
watch(flightAirport, (val) => {

    if (val === '') {
        airportList.value = []
    } else {
        clearInterval(searchingID.value)
        loading.value = true
        // 防抖动, 当用户输入完毕后再发送请求
        searchingID.value = setInterval(() => {
            getAirportList(val)
            clearInterval(searchingID.value)
            loading.value = false
        }, 500)
    }
})

const selectAirport = (item: any) => {
    // 先定义起飞机场，在定义到达机场
    if (!confirmAirportCode.value) {
        confirmAirportName.value = item.name
        confirmAirportCode.value = item.code
    } else {
        confirmArrivalAirportName.value = item.name
        confirmArrivalAirportCode.value = item.code
    }
}

const resetAirport = () => {
    confirmAirportName.value = ''
    confirmAirportCode.value = ''
    confirmArrivalAirportName.value = ''
    confirmArrivalAirportCode.value = ''
}

onMounted(() => {
    flightNumber.value = localStorage.getItem('flightNumber') || ''
    flightDate.value = localStorage.getItem('flightDate') || ''
    flightTime.value = localStorage.getItem('flightTime') || ''

    // 获取URL参数
    const url = new URL(window.location.href)
    const stepParam = url.searchParams.get('step')
    if (stepParam) {
        step.value = parseInt(stepParam)
    }
})

const nextStep = () => {
    // 添加URL参数
    const url = new URL(window.location.href)
    url.searchParams.set('step', '2')
    window.history.pushState({}, '', url.toString())
    step.value += 1
}

const lastStep = () => {
    // 添加URL参数
    const url = new URL(window.location.href)
    url.searchParams.set('step', '1')
    window.history.pushState({}, '', url.toString())
    step.value -= 1
}

const createAirp = async () => {
    // 创建机场
    if (!airportName.value || !airportCode.value) {
        return
    }
    // 检查机场三位码
    if (!/^[A-Z]{3}$/.test(airportCode.value)) {
        return
    }

    // 发送请求
    createAirport({
        airport: airportCode.value,
        chineseName: airportName.value
    })
}

// 当焦点回到页面时, 获取剪贴板内容
window.onfocus = () => {
    return;
    // const clipboard = navigator.clipboard
    // if (clipboard) {
    //     clipboard.readText().then((text) => {
    //         // 如果剪贴板内容是机场编号和机场名, 则自动填写 例子： DLC 大连周水子国际机场
    //         console.log(text)
    //         // DLC 大连周水子国际机场
    //         if (text) {
    //             airportCode.value = text.split(' ')[0]
    //             airportName.value = text.split(' ')[1]
    //         }

    //     })
    // }
}

const getAirportList = (keywrods: string) => {
    searchAirport(keywrods).then((res) => {
        console.log(res.data)
        airportList.value = res.data
    })
}


const flightNumberRules = ref([
    (v: string) => !!v || '请填写航班号',
    // 前两位字母, 后为数字
    (v: string) => /^[a-zA-Z]{2}\d+$/.test(v) || '航班号格式不正确, 例: AK2020',
    (v: string) => v.length <= 10 || '航班号长度不能超过10个字符',
])

const submit = () => {
    // 校验数据
    if (!flightNumber.value) {
        return
    }
    // 检查Rules
    if (flightNumberRules.value.some((rule: any) => !rule(flightNumber.value))) {
        return
    }

    // 保存草稿在localStorage
    localStorage.setItem('flightNumber', flightNumber.value)
    localStorage.setItem('flightDate', flightDate.value)
    localStorage.setItem('flightTime', flightTime.value)

    nextStep()
}

const createFlight = () => {
    // 创建航班
    // 校验数据
    if (!flightNumber.value || !flightDate.value || !flightTime.value || !confirmAirportCode.value) {
        return
    }
    // 检查Rules
    if (flightNumberRules.value.some((rule: any) => !rule(flightNumber.value))) {
        return
    }
    // 检查confirmAirportCode是否是正确的机场三位码
    if (!/^[A-Z]{3}$/.test(confirmAirportCode.value)) {
        return
    }

    // 将date和time合并为时间戳
    const time = new Date(flightDate.value + ' ' + flightTime.value).getTime()

    // 发送请求
    newFlightService({
        flightNumber: flightNumber.value,
        departureTime: time,
        departureAirport: confirmAirportCode.value,
        destinationAirport: confirmArrivalAirportCode.value
    }).then((res) => {
        if (res.code === 1) {
            // 清空localStorage
            localStorage.removeItem('flightNumber')
            localStorage.removeItem('flightDate')
            localStorage.removeItem('flightTime')
            // 跳转到航班详情页
            window.location.href = '/flight/' + res.data.uuid
        }

    })
}

</script>