<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 响应式数据：存储文章列表
const posts = ref([])
const loading = ref(true)
const error = ref(null)

// 获取文章数据
const fetchPosts = async () => {
  try {
    // 关键修改：使用 127.0.0.1 代替 localhost
    const response = await axios.get('https://myblog-production-3eb8.up.railway.app/api/posts/?format=json')
    posts.value = response.data
    loading.value = false
  } catch (err) {
    error.value = '加载失败：' + err.message
    loading.value = false
    console.error('API 错误:', err)
  }
}

// 组件挂载时自动获取数据
onMounted(fetchPosts)
</script>

<template>
  <div class="container">
    <h1>📝 我的博客</h1>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="status">⏳ 正在加载文章...</div>
    
    <!-- 错误提示 -->
    <div v-if="error" class="error">{{ error }}</div>
    
    <!-- 文章列表 -->
    <div v-if="!loading && !error" class="posts">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h2>{{ post.title }}</h2>
        <p class="content">{{ post.content }}</p>
        <div class="meta">
          👤 作者：{{ post.author_name }} | 
          📅 {{ new Date(post.created_at).toLocaleString('zh-CN') }}
        </div>
      </div>
      
      <!-- 无文章提示 -->
      <div v-if="posts.length === 0" class="empty">
        📭 暂无文章，快去 Admin 后台添加一篇吧！
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
h1 {
  text-align: center;
  color: #1a73e8;
  margin-bottom: 2rem;
}
.status, .error, .empty {
  text-align: center;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
}
.status { background-color: #e3f2fd; color: #1976d2; }
.error { background-color: #ffebee; color: #c62828; }
.empty { background-color: #f5f5f5; color: #616161; }
.posts { display: flex; flex-direction: column; gap: 1.5rem; }
.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s;
}
.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}
.content {
  color: #5f6368;
  line-height: 1.6;
  margin: 0.8rem 0;
}
.meta {
  color: #5f6368;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid #f1f3f4;
}
</style>
