<template>
  <div class="min-h-screen flex flex-col md-desktop:flex-row bg-gray-900">
    <!-- Sidebar Component -->
    <FinlerMeetSidebar />

    <!-- Main Content Area -->
    <main class="flex-1 p-6 pb-24 md-desktop:pb-6 md-desktop:ml-64">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// FinlerMeet layout with sidebar
</script>
