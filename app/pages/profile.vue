<template>
  <div class="space-y-6">
    <!-- Profile Header -->
    <div
      class="bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white"
    >
      <div class="flex flex-col sm:flex-row items-center gap-6">
        <div
          class="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold border-4 border-white/30"
        >
          JD
        </div>
        <div class="text-center sm:text-left">
          <h1 class="text-3xl font-bold">John Doe</h1>
          <p class="text-indigo-100 mt-1">Senior Developer</p>
          <div
            class="flex flex-wrap justify-center sm:justify-start gap-4 mt-4"
          >
            <span class="flex items-center gap-2 text-sm">
              <Mail class="w-4 h-4" />
              john.doe@example.com
            </span>
            <span class="flex items-center gap-2 text-sm">
              <MapPin class="w-4 h-4" />
              Bangkok, Thailand
            </span>
          </div>
        </div>
        <button
          class="sm:ml-auto px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors"
        >
          <Edit class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ stat.value }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Profile Details -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Personal Info -->
      <div class="profile-card">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Personal Information
        </h2>
        <div class="space-y-4">
          <div class="info-row">
            <span class="info-label">Full Name</span>
            <span class="info-value">John Doe</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-value">john.doe@example.com</span>
          </div>
          <div class="info-row">
            <span class="info-label">Phone</span>
            <span class="info-value">+66 81 234 5678</span>
          </div>
          <div class="info-row">
            <span class="info-label">Location</span>
            <span class="info-value">Bangkok, Thailand</span>
          </div>
          <div class="info-row">
            <span class="info-label">Joined</span>
            <span class="info-value">January 2024</span>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="profile-card">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Skills
        </h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="skill in skills" :key="skill" class="skill-tag">
            {{ skill }}
          </span>
        </div>

        <h3
          class="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-4"
        >
          Languages
        </h3>
        <div class="space-y-3">
          <div v-for="lang in languages" :key="lang.name">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-700 dark:text-gray-300">{{
                lang.name
              }}</span>
              <span class="text-gray-500 dark:text-gray-400">{{
                lang.level
              }}</span>
            </div>
            <div
              class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            >
              <div
                class="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full"
                :style="{ width: lang.percent + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="profile-card">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Recent Activity
      </h2>
      <div class="space-y-4">
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="flex items-start gap-4"
        >
          <div
            :class="activity.color"
            class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          >
            <component :is="activity.icon" class="w-5 h-5 text-white" />
          </div>
          <div class="flex-1">
            <p class="text-gray-900 dark:text-white">{{ activity.text }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ activity.time }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Mail,
  MapPin,
  Edit,
  FolderKanban,
  CheckSquare,
  MessageSquare,
} from "lucide-vue-next";

const stats = [
  { label: "Projects", value: "24" },
  { label: "Tasks Done", value: "156" },
  { label: "Comments", value: "89" },
  { label: "Team Members", value: "12" },
];

const skills = [
  "Vue.js",
  "Nuxt",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Git",
  "Figma",
  "REST API",
];

const languages = [
  { name: "Thai", level: "Native", percent: 100 },
  { name: "English", level: "Fluent", percent: 90 },
  { name: "Japanese", level: "Intermediate", percent: 50 },
];

const activities = [
  {
    id: 1,
    text: 'Created new project "Mobile App"',
    time: "2 hours ago",
    icon: FolderKanban,
    color: "bg-indigo-500",
  },
  {
    id: 2,
    text: 'Completed task "Design API endpoints"',
    time: "5 hours ago",
    icon: CheckSquare,
    color: "bg-emerald-500",
  },
  {
    id: 3,
    text: 'Commented on "Dashboard Analytics"',
    time: "1 day ago",
    icon: MessageSquare,
    color: "bg-amber-500",
  },
];
</script>
