<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back! Here's your overview.
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
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
          <span class="text-gray-400 ml-2">from last month</span>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
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
</template>

<script setup lang="ts">
import {
  FolderKanban,
  CheckSquare,
  MessageSquare,
  User,
} from "lucide-vue-next";

const stats = [
  {
    label: "Total Projects",
    value: "24",
    icon: FolderKanban,
    bgColor: "bg-indigo-500",
    change: 12,
  },
  {
    label: "Active Tasks",
    value: "156",
    icon: CheckSquare,
    bgColor: "bg-emerald-500",
    change: 8,
  },
  {
    label: "Messages",
    value: "42",
    icon: MessageSquare,
    bgColor: "bg-amber-500",
    change: -3,
  },
  {
    label: "Team Members",
    value: "18",
    icon: User,
    bgColor: "bg-purple-500",
    change: 5,
  },
];

const activities = [
  {
    id: 1,
    title: "New project created: Website Redesign",
    time: "2 hours ago",
    icon: FolderKanban,
    color: "bg-indigo-500",
  },
  {
    id: 2,
    title: "Task completed: Update documentation",
    time: "4 hours ago",
    icon: CheckSquare,
    color: "bg-emerald-500",
  },
  {
    id: 3,
    title: "New message from John Doe",
    time: "6 hours ago",
    icon: MessageSquare,
    color: "bg-amber-500",
  },
  {
    id: 4,
    title: "New team member joined",
    time: "1 day ago",
    icon: User,
    color: "bg-purple-500",
  },
];
</script>
