<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Projects
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          จัดการโปรเจคทั้งหมดของคุณ
        </p>
      </div>
      <button
        class="px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
      >
        <Plus class="w-5 h-5" />
        <span>สร้างโปรเจค</span>
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div class="flex items-start justify-between mb-4">
          <div :class="project.color" class="p-3 rounded-xl">
            <FolderKanban class="w-6 h-6 text-white" />
          </div>
          <span
            :class="project.statusColor"
            class="px-3 py-1 text-sm font-medium rounded-full"
          >
            {{ project.status }}
          </span>
        </div>

        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {{ project.name }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">
          {{ project.description }}
        </p>

        <!-- Progress -->
        <div class="mb-4">
          <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-500 dark:text-gray-400"
              >ความคืบหน้า</span
            >
            <span class="text-sm font-medium text-gray-900 dark:text-white"
              >{{ project.progress }}%</span
            >
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              :class="project.color"
              class="h-2 rounded-full transition-all duration-500"
              :style="{ width: project.progress + '%' }"
            ></div>
          </div>
        </div>

        <!-- Team & Due Date -->
        <div class="flex items-center justify-between">
          <div class="flex -space-x-2">
            <div
              v-for="i in project.teamSize"
              :key="i"
              class="w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-medium"
            >
              {{ String.fromCharCode(64 + i) }}
            </div>
          </div>
          <div
            class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <Calendar class="w-4 h-4" />
            <span>{{ project.dueDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FolderKanban, Plus, Calendar } from "lucide-vue-next";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "ออกแบบและพัฒนาเว็บไซต์ใหม่ให้ทันสมัย",
    progress: 85,
    status: "กำลังดำเนินการ",
    statusColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    color: "bg-indigo-500",
    teamSize: 4,
    dueDate: "28 ก.พ.",
  },
  {
    id: 2,
    name: "Mobile App",
    description: "พัฒนาแอปพลิเคชันมือถือ iOS และ Android",
    progress: 60,
    status: "กำลังดำเนินการ",
    statusColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    color: "bg-emerald-500",
    teamSize: 3,
    dueDate: "15 มี.ค.",
  },
  {
    id: 3,
    name: "API Development",
    description: "พัฒนา RESTful API สำหรับระบบหลังบ้าน",
    progress: 40,
    status: "รอดำเนินการ",
    statusColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    color: "bg-amber-500",
    teamSize: 2,
    dueDate: "20 มี.ค.",
  },
  {
    id: 4,
    name: "Marketing Campaign",
    description: "แคมเปญการตลาดสำหรับผลิตภัณฑ์ใหม่",
    progress: 25,
    status: "เริ่มต้น",
    statusColor:
      "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400",
    color: "bg-purple-500",
    teamSize: 5,
    dueDate: "1 เม.ย.",
  },
  {
    id: 5,
    name: "Security Audit",
    description: "ตรวจสอบความปลอดภัยของระบบทั้งหมด",
    progress: 100,
    status: "เสร็จสิ้น",
    statusColor:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    color: "bg-green-500",
    teamSize: 2,
    dueDate: "10 ก.พ.",
  },
  {
    id: 6,
    name: "Database Migration",
    description: "ย้ายฐานข้อมูลไปยังระบบใหม่",
    progress: 70,
    status: "กำลังดำเนินการ",
    statusColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    color: "bg-rose-500",
    teamSize: 3,
    dueDate: "5 มี.ค.",
  },
];
</script>
