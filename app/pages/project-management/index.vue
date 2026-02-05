<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          ภาพรวมโปรเจคและงานทั้งหมดของคุณ
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat-card bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ stat.label }}
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {{ stat.value }}
            </p>
          </div>
          <div :class="stat.bgColor" class="p-3 rounded-xl">
            <component :is="stat.icon" class="w-6 h-6 text-white" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <span :class="stat.change >= 0 ? 'text-green-500' : 'text-red-500'">
            {{ stat.change >= 0 ? "+" : "" }}{{ stat.change }}%
          </span>
          <span class="text-gray-400 ml-2">จากเดือนที่แล้ว</span>
        </div>
      </div>
    </div>

    <!-- Charts & Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Project Progress -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          ความคืบหน้าโปรเจค
        </h2>
        <div class="space-y-4">
          <div v-for="project in projects" :key="project.name">
            <div class="flex justify-between mb-2">
              <span class="text-gray-700 dark:text-gray-300">{{
                project.name
              }}</span>
              <span class="text-gray-500 dark:text-gray-400"
                >{{ project.progress }}%</span
              >
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                :class="project.color"
                class="h-2.5 rounded-full transition-all duration-500"
                :style="{ width: project.progress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          กิจกรรมล่าสุด
        </h2>
        <div class="space-y-4">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div
              :class="activity.color"
              class="w-10 h-10 rounded-full flex items-center justify-center"
            >
              <component :is="activity.icon" class="w-5 h-5 text-white" />
            </div>
            <div class="flex-1">
              <p class="text-gray-900 dark:text-white font-medium">
                {{ activity.title }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ activity.time }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FolderKanban, CheckSquare, Clock, Users } from "lucide-vue-next";

const stats = [
  {
    label: "โปรเจคทั้งหมด",
    value: "12",
    icon: FolderKanban,
    bgColor: "bg-indigo-500",
    change: 12,
  },
  {
    label: "งานที่กำลังทำ",
    value: "48",
    icon: CheckSquare,
    bgColor: "bg-emerald-500",
    change: 8,
  },
  {
    label: "รอดำเนินการ",
    value: "15",
    icon: Clock,
    bgColor: "bg-amber-500",
    change: -3,
  },
  {
    label: "สมาชิกทีม",
    value: "8",
    icon: Users,
    bgColor: "bg-purple-500",
    change: 5,
  },
];

const projects = [
  { name: "Website Redesign", progress: 85, color: "bg-indigo-500" },
  { name: "Mobile App", progress: 60, color: "bg-emerald-500" },
  { name: "API Development", progress: 40, color: "bg-amber-500" },
  { name: "Marketing Campaign", progress: 25, color: "bg-purple-500" },
];

const activities = [
  {
    id: 1,
    title: "สร้างโปรเจคใหม่: Website Redesign",
    time: "2 ชั่วโมงที่แล้ว",
    icon: FolderKanban,
    color: "bg-indigo-500",
  },
  {
    id: 2,
    title: "งานเสร็จสิ้น: อัพเดทเอกสาร",
    time: "4 ชั่วโมงที่แล้ว",
    icon: CheckSquare,
    color: "bg-emerald-500",
  },
  {
    id: 3,
    title: "สมาชิกใหม่เข้าร่วมทีม",
    time: "1 วันที่แล้ว",
    icon: Users,
    color: "bg-purple-500",
  },
];
</script>
