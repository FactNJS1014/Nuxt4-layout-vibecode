<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background gradient -->
    <div
      class="absolute inset-0 bg-[linear-gradient(135deg,#0f0f23_0%,#1a1a3e_25%,#2d1b4e_50%,#1a2a4a_75%,#0f0f23_100%)] z-0"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.2)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(100,200,255,0.15)_0%,transparent_40%)] animate-pulse"
      ></div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 min-h-screen flex flex-col items-center justify-center p-8"
    >
      <!-- Logo & Title -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-[0_20px_40px_rgba(99,102,241,0.4)] animate-bounce"
        >
          <Sparkles class="w-10 h-10 text-white" />
        </div>
        <h1
          class="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-white via-indigo-200 to-indigo-300 bg-clip-text text-transparent mb-2"
        >
          Vibe Workspace
        </h1>
        <p class="text-lg text-white/60">เลือกโปรแกรมที่คุณต้องการใช้งาน</p>
      </div>

      <!-- App Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] w-full">
        <!-- Project Management Card -->
        <NuxtLink
          to="/project-management"
          class="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 no-underline overflow-hidden transition-all duration-400 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-white/20"
        >
          <!-- Glow Effect -->
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.3)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          ></div>

          <div class="relative z-10">
            <div
              class="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-500 shadow-[0_10px_30px_rgba(99,102,241,0.4)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <FolderKanban class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-2xl font-bold text-white mb-3">
              Project Management
            </h2>
            <p class="text-[0.95rem] text-white/60 leading-relaxed mb-5">
              จัดการโปรเจค, Tasks, ติดตามความคืบหน้า และทำงานร่วมกับทีม
            </p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                class="text-sm px-3 py-1.5 bg-white/10 rounded-full text-white/80"
                >📁 Projects</span
              >
              <span
                class="text-sm px-3 py-1.5 bg-white/10 rounded-full text-white/80"
                >✅ Tasks</span
              >
              <span
                class="text-sm px-3 py-1.5 bg-white/10 rounded-full text-white/80"
                >📅 Calendar</span
              >
            </div>
            <div
              class="flex items-center gap-2 font-semibold text-white opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all duration-300"
            >
              <span>เข้าใช้งาน</span>
              <ArrowRight
                class="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </NuxtLink>

        <!-- FinlerMeet Card -->
        <NuxtLink
          to="/finlermeet"
          class="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 no-underline overflow-hidden transition-all duration-400 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-white/20"
        >
          <!-- Glow Effect -->
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.3)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          ></div>

          <div class="relative z-10">
            <div
              class="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <Video class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-2xl font-bold text-white mb-3">FinlerMeet</h2>
            <p class="text-[0.95rem] text-white/60 leading-relaxed mb-5">
              Video Call Meeting ที่ง่ายและรวดเร็ว พร้อม Chat และ Screen Share
            </p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                class="text-sm px-3 py-1.5 bg-white/10 rounded-full text-white/80"
                >📹 Video Call</span
              >
              <span
                class="text-sm px-3 py-1.5 bg-white/10 rounded-full text-white/80"
                >💬 Chat</span
              >
              <span
                class="text-sm px-3 py-1.5 bg-white/10 rounded-full text-white/80"
                >🖥️ Screen Share</span
              >
            </div>
            <div
              class="flex items-center gap-2 font-semibold text-white opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all duration-300"
            >
              <span>เข้าใช้งาน</span>
              <ArrowRight
                class="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Footer -->
      <div class="mt-12 text-center text-white/40 text-sm">
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
