<template>
  <!-- Desktop Sidebar (>= 800px) -->
  <aside
    class="sidebar-desktop hidden md-lg:block fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 shadow-lg z-50"
  >
    <!-- Header with Back Button -->
    <div class="p-4 border-b border-gray-800">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors mb-3"
      >
        <ArrowLeft class="w-4 h-4" />
        <span class="text-sm">กลับหน้าหลัก</span>
      </NuxtLink>
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center"
        >
          <Video class="w-5 h-5 text-white" />
        </div>
        <h1 class="text-lg font-bold text-white">FinlerMeet</h1>
      </div>
    </div>

    <nav class="p-4 space-y-2">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-emerald-400 transition-all duration-200"
        :class="
          isActive(item.path)
            ? 'bg-linear-to-r from-emerald-500 to-teal-600 text-white! shadow-md'
            : ''
        "
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <!-- Quick Actions -->
    <div class="absolute bottom-6 left-4 right-4">
      <NuxtLink
        to="/finlermeet/call"
        class="flex items-center justify-center gap-2 w-full py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
      >
        <Phone class="w-5 h-5" />
        <span>New Meeting</span>
      </NuxtLink>
    </div>
  </aside>

  <!-- Mobile Bottom Bar (< 800px) -->
  <nav
    class="bottom-bar md-lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-gray-900/90 backdrop-blur-lg border-t border-gray-800 flex justify-around items-center px-2 z-50"
  >
    <NuxtLink
      to="/"
      class="flex flex-col items-center justify-center px-2 py-2 rounded-xl text-gray-400 hover:text-emerald-400 transition-all duration-200"
    >
      <ArrowLeft class="w-6 h-6" />
      <span class="text-xs mt-1">กลับ</span>
    </NuxtLink>
    <NuxtLink
      v-for="item in mobileMenuItems"
      :key="item.path"
      :to="item.path"
      class="flex flex-col items-center justify-center px-2 py-2 rounded-xl text-gray-400 hover:text-emerald-400 transition-all duration-200"
      :class="isActive(item.path) ? 'text-emerald-400!' : ''"
    >
      <component :is="item.icon" class="w-6 h-6" />
      <span class="text-xs mt-1">{{ item.name }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import {
  Video,
  CalendarDays,
  MessageCircle,
  Users,
  Phone,
  ArrowLeft,
  Home,
} from "lucide-vue-next";

const route = useRoute();

const menuItems = [
  { name: "Home", path: "/finlermeet", icon: Home },
  { name: "Schedule", path: "/finlermeet/schedule", icon: CalendarDays },
  { name: "Chat", path: "/finlermeet/chat", icon: MessageCircle },
  { name: "Contacts", path: "/finlermeet/contacts", icon: Users },
];

const mobileMenuItems = menuItems.slice(0, 4);

const isActive = (path: string) => {
  if (path === "/finlermeet") {
    return route.path === "/finlermeet";
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
