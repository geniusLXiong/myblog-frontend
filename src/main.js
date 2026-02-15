// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// ✅ 设置全局 API 基础地址（替换为你的实际域名）
const API_BASE_URL = 'https://myblog-production-3eb8.up.railway.app';

// 创建应用实例
const app = createApp(App)

// ✅ 将 API 地址挂载到全局，方便所有组件调用
app.config.globalProperties.$apiUrl = API_BASE_URL;

// 挂载应用
app.mount('#app')