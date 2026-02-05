<template>
  <div
    class="min-h-screen flex flex-col md-desktop:flex-row bg-gray-50 dark:bg-gray-900"
  >
    <!-- Sidebar Component -->
    <ProjectSidebar />

    <!-- Main Content Area -->
    <main class="flex-1 p-6 pb-24 md-desktop:pb-6 md-desktop:ml-64">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Project Management layout with sidebar
</script>
