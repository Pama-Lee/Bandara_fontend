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
                            <v-btn color="red" block @click="lastStep" v-if="step === 2" style="margin-top: 20px;">上一步</v-btn>
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
                                <h3>选择起飞机场</h3>
                            </v-card-title>
                            <v-alert type="success" icon="mdi-check-circle-outline" v-if="confirmAirportName"
                                style="margin-bottom: 20px;">
                                <p>
                                    你选择的机场是: {{ confirmAirportName }}
                                </p>
                            </v-alert>
                            <v-text-field label="搜索起飞机场(三位编号如KUL)" v-model="flightAirport"></v-text-field>
                            <v-list style="max-height: 200px;">
                                <v-list-item v-for="item in airportList" :key="item.code"
                                    @click="confirmAirportName = item.name; confirmAirportCode = item.code">
                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            <v-alert type="warning" icon="mdi-information-outline" style="margin-top: 20px;">
                                如果没有找到你的机场, 请在下方创建一个新的机场
                            </v-alert>
                            <v-row style="margin-top: 20px;">
                                <v-col cols="6">
                                    <v-text-field label="机场名称" v-model="airportName"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="机场三位编号" v-model="airportCode"></v-text-field>
                                </v-col>
                                <v-btn block :disabled="airportName === '' || airportCode === ''">创建机场</v-btn>
                            </v-row>
                        </v-card>

                        <div style="margin-bottom: 30px;"></div>

                        <v-card v-if="confirmAirportCode">
                            <v-card-title>
                                <h2>确认信息</h2>
                            </v-card-title>
                            <v-card-text>
                                <p>航班号: {{ flightNumber }}</p>
                                <p>起飞日期: {{ flightDate }}</p>
                                <p>起飞时间: {{ flightTime }}</p>
                                <p>起飞机场: {{ confirmAirportName }}</p>
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

import { onMounted, ref } from 'vue'

const flightNumber = ref('')

const step = ref(1)

const flightDate = ref('')
const flightTime = ref('')
const flightAirport = ref('')
const confirmAirportName = ref('')
const confirmAirportCode = ref('')
const airportList = ref([])
const airportName = ref('')
const airportCode = ref('')

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

    // 获取机场列表
    airportList.value = getAirportList()
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

const getAirportList = () => {
    return Array(10)
        .fill(0)
        .map((item, index) => {
            return {
                code: `KUL${index}`,
                name: `机场${index}`,
            }
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

    // 发送请求
}

</script>