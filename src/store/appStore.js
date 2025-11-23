import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAppStore = defineStore('app', () => {
    // State
    // State
    // const selectedSetup = ref('GRK1') // Removed

    const deviceInfo = ref({
        brand: 'TP-Link',
        model: 'ARCHER-C5V1',
        firmware: '',
        server: 'GRK-1'
    })
    const globalConfig = ref({
        defaultDuration: 70000
    })
    
    // Home Tab Specific Data (Persistence for DailyRoutineCheck)
    const homeTab = ref({
        modules: {
            ping: false,
            wifi: false,
            pc: false,
            cpe: false
        }
    })
    
    // Tab Specific Data
    const pingTab = ref({
        pingList: [
            { ipv4: '', ipv6: '' },
            { ipv4: '', ipv6: '' },
            { ipv4: '', ipv6: '' }
        ], 
        pingDuration: 70000, // Initialized with default
        useIPv4: true,
        useIPv6: false
    })
    
    const wifiTab = ref({
        wifiDuration: 70000, // Initialized with default
        wifiGraphData: [],
        speedTestSettings: {
            brand: 'TP-Link',
            model: 'ARCHER-C5V1',
            period: 30,
            count: 38,
            firmware: '',
            serverId: 4667
        }
    })

    const cpeTab = ref({
        cpeLogContent: '',
        selectedCpeAction: null,
        selectedModem: null
    })

    const pcTab = ref({
        youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Default from constants
        torrentFile: null,
        torrentMagnetLink: '',
        baudRate: 115200
    })

    // Actions


    function setDeviceInfo(info) {
        deviceInfo.value = { ...deviceInfo.value, ...info }
    }

    function addPingIp(ip, type = 'ipv4') {
        pingTab.value.pingList.push({ ip, type })
    }

    function removePingIp(index) {
        pingTab.value.pingList.splice(index, 1)
    }

    function setPingDuration(duration) {
        pingTab.value.pingDuration = duration
    }

    function setWifiDuration(duration) {
        wifiTab.value.wifiDuration = duration
    }

    function setCpeLog(log) {
        cpeTab.value.cpeLogContent = log
    }

    // --- One-Way Synchronization Logic ---

    // 1. Duration Sync: Home (Global) -> Ping & Wifi
    watch(() => globalConfig.value.defaultDuration, (newDuration) => {
        pingTab.value.pingDuration = newDuration
        wifiTab.value.wifiDuration = newDuration
    })

    // 2. Device Info Sync: Home (Device Info) -> Speed Test Settings
    watch(() => deviceInfo.value, (newInfo) => {
        if (newInfo.brand) wifiTab.value.speedTestSettings.brand = newInfo.brand
        if (newInfo.model) wifiTab.value.speedTestSettings.model = newInfo.model
        if (newInfo.firmware) wifiTab.value.speedTestSettings.firmware = newInfo.firmware
    }, { deep: true })

    return { 

        deviceInfo,
        globalConfig,
        homeTab,
        pingTab,
        wifiTab,
        cpeTab,
        pcTab,

        setDeviceInfo,
        addPingIp,
        removePingIp,
        setPingDuration,
        setWifiDuration,
        setCpeLog
    }
})
