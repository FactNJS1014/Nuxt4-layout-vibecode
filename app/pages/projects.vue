<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Projects
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Manage all your projects in one place.
        </p>
      </div>
      <button class="btn-primary">
        <Plus class="w-5 h-5" />
        New Project
      </button>
    </div>

    <!-- Project Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project-card group"
      >
        <div class="flex items-start justify-between mb-4">
          <div :class="project.color" class="p-3 rounded-xl">
            <FolderKanban class="w-6 h-6 text-white" />
          </div>
          <span
            :class="getStatusClass(project.status)"
            class="px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ project.status }}
          </span>
        </div>

        <h3
          class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
        >
          {{ project.name }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {{ project.description }}
        </p>

        <!-- Progress -->
        <div class="mt-4">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-gray-500 dark:text-gray-400">Progress</span>
            <span class="font-medium text-gray-900 dark:text-white"
              >{{ project.progress }}%</span
            >
          </div>
          <div
            class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          >
            <div
              :class="project.color"
              class="h-full rounded-full transition-all duration-500"
              :style="{ width: project.progress + '%' }"
            ></div>
          </div>
        </div>

        <!-- Team -->
        <div class="mt-4 flex items-center justify-between">
          <div class="flex -space-x-2">
            <div
              v-for="n in 3"
              :key="n"
              class="w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 border-2 border-white dark:border-gray-800"
            ></div>
          </div>
          <span class="text-sm text-gray-500 dark:text-gray-400"
            >{{ project.tasks }} tasks</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FolderKanban, Plus } from "lucide-vue-next";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of the company website",
    status: "In Progress",
    progress: 65,
    tasks: 24,
    color: "bg-indigo-500",
  },
  {
    id: 2,
    name: "Mobile App",
    description: "Native mobile application development",
    status: "Planning",
    progress: 20,
    tasks: 18,
    color: "bg-emerald-500",
  },
  {
    id: 3,
    name: "API Integration",
    description: "Third-party API integrations",
    status: "Completed",
    progress: 100,
    tasks: 12,
    color: "bg-amber-500",
  },
  {
    id: 4,
    name: "Dashboard Analytics",
    description: "Real-time analytics dashboard",
    status: "In Progress",
    progress: 45,
    tasks: 32,
    color: "bg-purple-500",
  },
  {
    id: 5,
    name: "E-commerce Platform",
    description: "Online shopping platform development",
    status: "Planning",
    progress: 10,
    tasks: 45,
    color: "bg-rose-500",
  },
  {
    id: 6,
    name: "CRM System",
    description: "Customer relationship management",
    status: "In Progress",
    progress: 80,
    tasks: 28,
    color: "bg-cyan-500",
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400";
    case "In Progress":
      return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400";
    case "Planning":
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400";
    default:
      return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
  }
};
</script>
