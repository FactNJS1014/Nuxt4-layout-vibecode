<template>
  <div class="space-y-6 text-white">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Schedule Meeting</h1>
        <p class="text-gray-400 mt-1">จัดตารางการประชุมของคุณ</p>
      </div>
      <button
        @click="showNewModal = true"
        class="px-4 py-2 bg-linear-to-r from-emerald-500 to-teal-600 font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
      >
        <Plus class="w-5 h-5" />
        <span>New Meeting</span>
      </button>
    </div>

    <!-- Calendar View -->
    <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <!-- Calendar Header -->
      <div class="flex items-center justify-between mb-6">
        <button class="p-2 hover:bg-gray-700 rounded-xl transition-colors">
          <ChevronLeft class="w-5 h-5" />
        </button>
        <h2 class="text-xl font-semibold">กุมภาพันธ์ 2026</h2>
        <button class="p-2 hover:bg-gray-700 rounded-xl transition-colors">
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>

      <!-- Days of Week -->
      <div class="grid grid-cols-7 gap-2 mb-4">
        <div
          v-for="day in ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']"
          :key="day"
          class="text-center text-gray-400 text-sm py-2"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="grid grid-cols-7 gap-2">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="[
            day.isToday
              ? 'bg-emerald-600'
              : day.hasMeeting
                ? 'bg-gray-700'
                : 'hover:bg-gray-700',
            day.isOtherMonth ? 'text-gray-600' : 'text-white',
          ]"
          class="aspect-square flex flex-col items-center justify-center rounded-xl cursor-pointer transition-colors relative"
        >
          <span class="text-sm font-medium">{{ day.date }}</span>
          <div v-if="day.hasMeeting" class="flex gap-1 mt-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scheduled Meetings List -->
    <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h2 class="text-xl font-semibold mb-4">การประชุมที่จัดไว้</h2>
      <div class="space-y-4">
        <div
          v-for="meeting in scheduledMeetings"
          :key="meeting.id"
          class="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors"
        >
          <div class="flex items-center gap-4">
            <div
              :class="meeting.color"
              class="w-12 h-12 rounded-xl flex items-center justify-center"
            >
              <CalendarDays class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-semibold">{{ meeting.title }}</h3>
              <div class="flex items-center gap-3 text-sm text-gray-400">
                <span class="flex items-center gap-1">
                  <Clock class="w-4 h-4" />
                  {{ meeting.date }} {{ meeting.time }}
                </span>
                <span class="flex items-center gap-1">
                  <Users class="w-4 h-4" />
                  {{ meeting.participants }} คน
                </span>
                <span class="flex items-center gap-1">
                  <Timer class="w-4 h-4" />
                  {{ meeting.duration }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-2 hover:bg-gray-600 rounded-lg transition-colors">
              <Pencil class="w-4 h-4 text-gray-400" />
            </button>
            <button class="p-2 hover:bg-gray-600 rounded-lg transition-colors">
              <Trash2 class="w-4 h-4 text-red-400" />
            </button>
            <button
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium transition-colors ml-2"
            >
              Copy Link
            </button>
          </div>
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
  CalendarDays,
  Clock,
  Users,
  Timer,
  Pencil,
  Trash2,
} from "lucide-vue-next";
import { ref } from "vue";

const showNewModal = ref(false);

// Generate calendar days for February 2026
const calendarDays = (() => {
  const days = [];
  // Previous month days (January ends, Feb starts on Sunday)
  for (let i = 0; i < 0; i++) {
    days.push({
      date: 31 - i,
      isOtherMonth: true,
      hasMeeting: false,
      isToday: false,
    });
  }
  days.reverse();

  // Current month days
  for (let i = 1; i <= 28; i++) {
    days.push({
      date: i,
      isOtherMonth: false,
      hasMeeting: [5, 10, 12, 18, 25].includes(i),
      isToday: i === 5,
    });
  }

  // Next month days
  const remaining = 35 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: i,
      isOtherMonth: true,
      hasMeeting: false,
      isToday: false,
    });
  }

  return days;
})();

const scheduledMeetings = [
  {
    id: 1,
    title: "Weekly Team Standup",
    date: "5 ก.พ. 2026",
    time: "10:00 น.",
    duration: "30 นาที",
    participants: 8,
    color: "bg-emerald-600",
  },
  {
    id: 2,
    title: "Project Kickoff Meeting",
    date: "10 ก.พ. 2026",
    time: "14:00 น.",
    duration: "1 ชม.",
    participants: 12,
    color: "bg-blue-600",
  },
  {
    id: 3,
    title: "Design Review Session",
    date: "12 ก.พ. 2026",
    time: "09:30 น.",
    duration: "45 นาที",
    participants: 5,
    color: "bg-purple-600",
  },
  {
    id: 4,
    title: "Client Presentation",
    date: "18 ก.พ. 2026",
    time: "15:00 น.",
    duration: "1 ชม. 30 นาที",
    participants: 6,
    color: "bg-amber-600",
  },
];
</script>
