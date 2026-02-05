<template>
  <div class="space-y-8 text-white">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-2">ยินดีต้อนรับสู่ FinlerMeet</h1>
      <p class="text-gray-400">Video Call Meeting ที่ง่ายและรวดเร็ว</p>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      <!-- New Meeting -->
      <button
        @click="startNewMeeting"
        class="group bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 hover:scale-[1.02] transition-transform cursor-pointer text-left"
      >
        <div class="flex items-center gap-4 mb-4">
          <div
            class="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Video class="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 class="text-xl font-bold">New Meeting</h2>
            <p class="text-emerald-100">เริ่ม Meeting ใหม่ทันที</p>
          </div>
        </div>
        <div
          class="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors"
        >
          <span>เริ่มเลย</span>
          <ArrowRight
            class="w-4 h-4 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </button>

      <!-- Join Meeting -->
      <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <div class="flex items-center gap-4 mb-4">
          <div
            class="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center"
          >
            <Link2 class="w-7 h-7 text-gray-300" />
          </div>
          <div>
            <h2 class="text-xl font-bold">Join Meeting</h2>
            <p class="text-gray-400">เข้าร่วม Meeting ด้วย Code</p>
          </div>
        </div>
        <form @submit.prevent="joinMeeting" class="flex gap-2">
          <input
            v-model="meetingCode"
            type="text"
            placeholder="ใส่ Meeting Code"
            class="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            type="submit"
            :disabled="!meetingCode.trim()"
            class="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-medium transition-colors"
          >
            เข้าร่วม
          </button>
        </form>
      </div>
    </div>

    <!-- Upcoming Meetings -->
    <div class="max-w-4xl mx-auto">
      <h2 class="text-xl font-semibold mb-4">การประชุมที่กำลังจะมาถึง</h2>
      <div class="space-y-4">
        <div
          v-for="meeting in upcomingMeetings"
          :key="meeting.id"
          class="bg-gray-800 border border-gray-700 rounded-2xl p-5 flex items-center justify-between hover:border-gray-600 transition-colors"
        >
          <div class="flex items-center gap-4">
            <div
              :class="meeting.color"
              class="w-12 h-12 rounded-xl flex items-center justify-center"
            >
              <CalendarDays class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-white">{{ meeting.title }}</h3>
              <div class="flex items-center gap-3 text-sm text-gray-400">
                <span class="flex items-center gap-1">
                  <Clock class="w-4 h-4" />
                  {{ meeting.time }}
                </span>
                <span class="flex items-center gap-1">
                  <Users class="w-4 h-4" />
                  {{ meeting.participants }} คน
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span
              class="text-sm text-gray-400 font-mono bg-gray-700 px-3 py-1 rounded-lg"
            >
              {{ meeting.roomCode }}
            </span>
            <button
              @click="joinRoom(meeting.roomCode)"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium transition-colors"
            >
              เข้าร่วม
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Meetings -->
    <div class="max-w-4xl mx-auto">
      <h2 class="text-xl font-semibold mb-4">การประชุมล่าสุด</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="meeting in recentMeetings"
          :key="meeting.id"
          @click="joinRoom(meeting.roomCode)"
          class="bg-gray-800 border border-gray-700 rounded-2xl p-5 hover:border-gray-600 transition-colors cursor-pointer"
        >
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center"
            >
              <Video class="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <h3 class="font-semibold text-white text-sm">
                {{ meeting.title }}
              </h3>
              <p class="text-xs text-gray-500">{{ meeting.date }}</p>
            </div>
          </div>
          <div class="flex items-center justify-between text-sm text-gray-400">
            <span>{{ meeting.duration }}</span>
            <span class="font-mono bg-gray-700 px-2 py-0.5 rounded text-xs">{{
              meeting.roomCode
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Video,
  Link2,
  CalendarDays,
  Clock,
  Users,
  ArrowRight,
} from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { preloadJitsiScript } from "~/composables/jitsi";

// Preload Jitsi script when user visits index page
onMounted(() => {
  preloadJitsiScript();
});

const router = useRouter();
const meetingCode = ref("");

/**
 * Generate a unique room code
 */
const generateRoomCode = (): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const segments = [];
  for (let i = 0; i < 3; i++) {
    let segment = "";
    for (let j = 0; j < 4; j++) {
      segment += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    segments.push(segment);
  }
  return segments.join("-");
};

/**
 * Start a new meeting with a generated room code
 */
const startNewMeeting = () => {
  const roomCode = generateRoomCode();
  router.push(`/finlermeet/call?room=${roomCode}`);
};

/**
 * Join an existing meeting with the entered code
 */
const joinMeeting = () => {
  if (meetingCode.value.trim()) {
    router.push(`/finlermeet/call?room=${meetingCode.value.trim()}`);
  }
};

/**
 * Join a specific room by code
 */
const joinRoom = (roomCode: string) => {
  router.push(`/finlermeet/call?room=${roomCode}`);
};

const upcomingMeetings = [
  {
    id: 1,
    title: "Weekly Team Standup",
    time: "วันนี้ 10:00 น.",
    participants: 8,
    color: "bg-emerald-600",
    roomCode: "team-standup-001",
  },
  {
    id: 2,
    title: "Project Review Meeting",
    time: "วันนี้ 14:00 น.",
    participants: 5,
    color: "bg-blue-600",
    roomCode: "project-review-002",
  },
  {
    id: 3,
    title: "Client Presentation",
    time: "พรุ่งนี้ 09:00 น.",
    participants: 12,
    color: "bg-purple-600",
    roomCode: "client-pres-003",
  },
];

const recentMeetings = [
  {
    id: 1,
    title: "Sprint Planning",
    date: "เมื่อวาน",
    duration: "1 ชม. 30 นาที",
    participants: 6,
    roomCode: "sprint-plan-001",
  },
  {
    id: 2,
    title: "Design Review",
    date: "3 วันที่แล้ว",
    duration: "45 นาที",
    participants: 4,
    roomCode: "design-rev-002",
  },
  {
    id: 3,
    title: "Training Session",
    date: "1 สัปดาห์ที่แล้ว",
    duration: "2 ชม.",
    participants: 15,
    roomCode: "training-003",
  },
];
</script>
