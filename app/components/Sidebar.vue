<template>
  <!-- Desktop Sidebar (>= 800px) -->
  <aside
    class="sidebar-desktop hidden md-lg:block fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-50"
  >
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <h1
        class="text-2xl font-bold bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
      >
        Vibe App
      </h1>
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
      v-for="item in menuItems"
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
  MessageSquare,
  Calendar,
  Settings,
  User,
} from "lucide-vue-next";

const route = useRoute();

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Projects", path: "/projects", icon: FolderKanban },
  { name: "Tasks", path: "/tasks", icon: CheckSquare },
  { name: "Messages", path: "/messages", icon: MessageSquare },
  { name: "Calendar", path: "/calendar", icon: Calendar },
  { name: "Settings", path: "/settings", icon: Settings },
  { name: "Profile", path: "/profile", icon: User },
];

const isActive = (path: string) => {
  if (path === "/") {
    return route.path === "/";
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
