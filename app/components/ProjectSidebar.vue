<template>
  <!-- Desktop Sidebar (>= 800px) -->
  <aside
    class="sidebar-desktop hidden md-lg:block fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-50"
  >
    <!-- Header with Back Button -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors mb-3"
      >
        <ArrowLeft class="w-4 h-4" />
        <span class="text-sm">กลับหน้าหลัก</span>
      </NuxtLink>
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
        >
          <FolderKanban class="w-5 h-5 text-white" />
        </div>
        <h1 class="text-lg font-bold text-gray-900 dark:text-white">
          Project Management
        </h1>
      </div>
    </div>

    <nav class="p-4 space-y-2">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
        :class="
          isActive(item.path)
            ? 'bg-linear-to-r from-indigo-500 to-purple-600 text-white! shadow-md'
            : ''
        "
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </nav>
  </aside>

  <!-- Mobile Bottom Bar (< 800px) -->
  <nav
    class="bottom-bar md-lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 flex justify-around items-center px-2 z-50"
  >
    <NuxtLink
      to="/"
      class="flex flex-col items-center justify-center px-2 py-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
    >
      <ArrowLeft class="w-6 h-6" />
      <span class="text-xs mt-1">กลับ</span>
    </NuxtLink>
    <NuxtLink
      v-for="item in mobileMenuItems"
      :key="item.path"
      :to="item.path"
      class="flex flex-col items-center justify-center px-2 py-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
      :class="
        isActive(item.path) ? 'text-indigo-600! dark:text-indigo-400!' : ''
      "
    >
      <component :is="item.icon" class="w-6 h-6" />
      <span class="text-xs mt-1">{{ item.name }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Calendar,
  Users,
  ArrowLeft,
} from "lucide-vue-next";

const route = useRoute();

const menuItems = [
  { name: "Dashboard", path: "/project-management", icon: LayoutDashboard },
  {
    name: "Projects",
    path: "/project-management/projects",
    icon: FolderKanban,
  },
  { name: "Tasks", path: "/project-management/tasks", icon: CheckSquare },
  { name: "Calendar", path: "/project-management/calendar", icon: Calendar },
  { name: "Team", path: "/project-management/team", icon: Users },
];

const mobileMenuItems = menuItems.slice(0, 4);

const isActive = (path: string) => {
  if (path === "/project-management") {
    return route.path === "/project-management";
  }
  return route.path.startsWith(path);
};
</script>

<style>
/* Custom breakpoint at 800px */
@media (min-width: 800px) {
  .md-lg\:block {
    display: block !important;
  }
  .md-lg\:hidden {
    display: none !important;
  }
}
</style>
