<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Calendar
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Schedule and manage your events.
        </p>
      </div>
      <button class="btn-primary">
        <Plus class="w-5 h-5" />
        Add Event
      </button>
    </div>

    <!-- Calendar Grid -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <!-- Month Header -->
      <div
        class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
      >
        <button
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          February 2026
        </h2>
        <button
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronRight class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <!-- Weekday Headers -->
      <div
        class="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700"
      >
        <div
          v-for="day in weekdays"
          :key="day"
          class="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="grid grid-cols-7">
        <div
          v-for="(date, idx) in calendarDays"
          :key="idx"
          class="min-h-24 p-2 border-r border-b border-gray-200 dark:border-gray-700 last:border-r-0"
          :class="date.isCurrentMonth ? '' : 'bg-gray-50 dark:bg-gray-800/50'"
        >
          <span
            :class="
              date.isToday
                ? 'w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center'
                : 'text-gray-900 dark:text-white'
            "
            class="text-sm font-medium"
          >
            {{ date.day }}
          </span>

          <div v-if="date.events.length" class="mt-1 space-y-1">
            <div
              v-for="event in date.events.slice(0, 2)"
              :key="event.id"
              :class="event.color"
              class="text-xs px-2 py-1 rounded-md truncate text-white"
            >
              {{ event.title }}
            </div>
            <div
              v-if="date.events.length > 2"
              class="text-xs text-gray-500 dark:text-gray-400 px-2"
            >
              +{{ date.events.length - 2 }} more
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Events -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Upcoming Events
      </h2>
      <div class="space-y-3">
        <div
          v-for="event in upcomingEvents"
          :key="event.id"
          class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
        >
          <div :class="event.color" class="w-1 h-12 rounded-full"></div>
          <div class="flex-1">
            <h3 class="font-medium text-gray-900 dark:text-white">
              {{ event.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ event.date }} • {{ event.time }}
            </p>
          </div>
          <CalendarIcon class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-vue-next";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calendarDays = [
  { day: 26, isCurrentMonth: false, isToday: false, events: [] },
  { day: 27, isCurrentMonth: false, isToday: false, events: [] },
  { day: 28, isCurrentMonth: false, isToday: false, events: [] },
  { day: 29, isCurrentMonth: false, isToday: false, events: [] },
  { day: 30, isCurrentMonth: false, isToday: false, events: [] },
  { day: 31, isCurrentMonth: false, isToday: false, events: [] },
  { day: 1, isCurrentMonth: true, isToday: false, events: [] },
  { day: 2, isCurrentMonth: true, isToday: false, events: [] },
  {
    day: 3,
    isCurrentMonth: true,
    isToday: false,
    events: [{ id: 1, title: "Team Meeting", color: "bg-indigo-500" }],
  },
  {
    day: 4,
    isCurrentMonth: true,
    isToday: true,
    events: [{ id: 2, title: "Project Review", color: "bg-emerald-500" }],
  },
  { day: 5, isCurrentMonth: true, isToday: false, events: [] },
  {
    day: 6,
    isCurrentMonth: true,
    isToday: false,
    events: [{ id: 3, title: "Sprint Planning", color: "bg-amber-500" }],
  },
  { day: 7, isCurrentMonth: true, isToday: false, events: [] },
  { day: 8, isCurrentMonth: true, isToday: false, events: [] },
  { day: 9, isCurrentMonth: true, isToday: false, events: [] },
  {
    day: 10,
    isCurrentMonth: true,
    isToday: false,
    events: [
      { id: 4, title: "Design Review", color: "bg-purple-500" },
      { id: 5, title: "Client Call", color: "bg-rose-500" },
    ],
  },
  { day: 11, isCurrentMonth: true, isToday: false, events: [] },
  { day: 12, isCurrentMonth: true, isToday: false, events: [] },
  { day: 13, isCurrentMonth: true, isToday: false, events: [] },
  { day: 14, isCurrentMonth: true, isToday: false, events: [] },
  {
    day: 15,
    isCurrentMonth: true,
    isToday: false,
    events: [{ id: 6, title: "Demo Day", color: "bg-cyan-500" }],
  },
  { day: 16, isCurrentMonth: true, isToday: false, events: [] },
  { day: 17, isCurrentMonth: true, isToday: false, events: [] },
  { day: 18, isCurrentMonth: true, isToday: false, events: [] },
  { day: 19, isCurrentMonth: true, isToday: false, events: [] },
  { day: 20, isCurrentMonth: true, isToday: false, events: [] },
  { day: 21, isCurrentMonth: true, isToday: false, events: [] },
  { day: 22, isCurrentMonth: true, isToday: false, events: [] },
  { day: 23, isCurrentMonth: true, isToday: false, events: [] },
  { day: 24, isCurrentMonth: true, isToday: false, events: [] },
  { day: 25, isCurrentMonth: true, isToday: false, events: [] },
  { day: 26, isCurrentMonth: true, isToday: false, events: [] },
  { day: 27, isCurrentMonth: true, isToday: false, events: [] },
  { day: 28, isCurrentMonth: true, isToday: false, events: [] },
  { day: 1, isCurrentMonth: false, isToday: false, events: [] },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Project Review",
    date: "Feb 4",
    time: "10:00 AM",
    color: "bg-emerald-500",
  },
  {
    id: 2,
    title: "Sprint Planning",
    date: "Feb 6",
    time: "2:00 PM",
    color: "bg-amber-500",
  },
  {
    id: 3,
    title: "Design Review",
    date: "Feb 10",
    time: "11:00 AM",
    color: "bg-purple-500",
  },
];
</script>
