<template>
  <div class="launcher-container">
    <!-- Background gradient -->
    <div class="launcher-bg"></div>

    <!-- Content -->
    <div class="launcher-content">
      <!-- Logo & Title -->
      <div class="launcher-header">
        <div class="logo-container">
          <Sparkles class="logo-icon" />
        </div>
        <h1 class="launcher-title">Vibe Workspace</h1>
        <p class="launcher-subtitle">เลือกโปรแกรมที่คุณต้องการใช้งาน</p>
      </div>

      <!-- App Cards -->
      <div class="apps-grid">
        <!-- Project Management Card -->
        <NuxtLink to="/project-management" class="app-card project-card">
          <div class="app-card-glow project-glow"></div>
          <div class="app-card-content">
            <div class="app-icon-wrapper project-icon-bg">
              <FolderKanban class="app-icon" />
            </div>
            <h2 class="app-title">Project Management</h2>
            <p class="app-description">
              จัดการโปรเจค, Tasks, ติดตามความคืบหน้า และทำงานร่วมกับทีม
            </p>
            <div class="app-features">
              <span class="feature-tag">📁 Projects</span>
              <span class="feature-tag">✅ Tasks</span>
              <span class="feature-tag">📅 Calendar</span>
            </div>
            <div class="app-enter">
              <span>เข้าใช้งาน</span>
              <ArrowRight class="arrow-icon" />
            </div>
          </div>
        </NuxtLink>

        <!-- FinlerMeet Card -->
        <NuxtLink to="/finlermeet" class="app-card meet-card">
          <div class="app-card-glow meet-glow"></div>
          <div class="app-card-content">
            <div class="app-icon-wrapper meet-icon-bg">
              <Video class="app-icon" />
            </div>
            <h2 class="app-title">FinlerMeet</h2>
            <p class="app-description">
              Video Call Meeting ที่ง่ายและรวดเร็ว พร้อม Chat และ Screen Share
            </p>
            <div class="app-features">
              <span class="feature-tag">📹 Video Call</span>
              <span class="feature-tag">💬 Chat</span>
              <span class="feature-tag">🖥️ Screen Share</span>
            </div>
            <div class="app-enter">
              <span>เข้าใช้งาน</span>
              <ArrowRight class="arrow-icon" />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Footer -->
      <div class="launcher-footer">
        <p>© 2026 Vibe Workspace. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FolderKanban, Video, ArrowRight, Sparkles } from "lucide-vue-next";

definePageMeta({
  layout: "launcher",
});
</script>

<style scoped>
.launcher-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.launcher-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    #0f0f23 0%,
    #1a1a3e 25%,
    #2d1b4e 50%,
    #1a2a4a 75%,
    #0f0f23 100%
  );
  z-index: 0;
}

.launcher-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 20% 80%,
      rgba(120, 119, 198, 0.3) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 119, 198, 0.2) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 40% 40%,
      rgba(100, 200, 255, 0.15) 0%,
      transparent 40%
    );
  animation: bgPulse 8s ease-in-out infinite;
}

@keyframes bgPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.launcher-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.launcher-header {
  text-align: center;
  margin-bottom: 3rem;
}

.logo-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border-radius: 24px;
  margin-bottom: 1.5rem;
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.4);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.logo-icon {
  width: 40px;
  height: 40px;
  color: white;
}

.launcher-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #c7d2fe 50%, #a5b4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.launcher-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.6);
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 900px;
  width: 100%;
}

@media (max-width: 768px) {
  .apps-grid {
    grid-template-columns: 1fr;
  }

  .launcher-title {
    font-size: 2rem;
  }
}

.app-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2rem;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.2);
}

.app-card-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.app-card:hover .app-card-glow {
  opacity: 1;
}

.project-glow {
  background: radial-gradient(
    circle at center,
    rgba(99, 102, 241, 0.3) 0%,
    transparent 70%
  );
}

.meet-glow {
  background: radial-gradient(
    circle at center,
    rgba(16, 185, 129, 0.3) 0%,
    transparent 70%
  );
}

.app-card-content {
  position: relative;
  z-index: 1;
}

.app-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.app-card:hover .app-icon-wrapper {
  transform: scale(1.1);
}

.project-icon-bg {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.meet-icon-bg {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
}

.app-icon {
  width: 32px;
  height: 32px;
  color: white;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
}

.app-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.app-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.feature-tag {
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.app-enter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: white;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.app-card:hover .app-enter {
  opacity: 1;
  gap: 0.75rem;
}

.arrow-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.app-card:hover .arrow-icon {
  transform: translateX(4px);
}

.launcher-footer {
  margin-top: 3rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.875rem;
}
</style>
