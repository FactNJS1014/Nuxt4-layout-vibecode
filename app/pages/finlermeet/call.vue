<template>
  <div class="min-h-[calc(100vh-3rem)] flex flex-col text-white">
    <!-- Video Call Interface -->
    <div class="flex-1 flex flex-col lg:flex-row gap-4">
      <!-- Main Video Area -->
      <div class="flex-1 bg-gray-800 rounded-2xl overflow-hidden relative">
        <!-- Video Grid -->
        <div class="absolute inset-0 grid grid-cols-2 gap-2 p-2">
          <div
            v-for="participant in participants.slice(0, 4)"
            :key="participant.id"
            class="bg-gray-700 rounded-xl relative overflow-hidden"
          >
            <!-- Video Placeholder -->
            <div
              class="absolute inset-0 flex items-center justify-center bg-linear-to-br"
              :class="participant.color"
            >
              <div class="text-center">
                <div
                  class="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mb-2"
                >
                  {{ participant.name[0] }}
                </div>
                <span class="font-medium">{{ participant.name }}</span>
              </div>
            </div>

            <!-- Participant Info -->
            <div class="absolute bottom-3 left-3 flex items-center gap-2">
              <span
                class="bg-black/50 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                <component
                  :is="participant.muted ? MicOff : Mic"
                  class="w-3 h-3"
                />
                {{ participant.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Self Preview -->
        <div
          class="absolute bottom-4 right-4 w-48 aspect-video bg-gray-900 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-lg"
        >
          <div
            class="absolute inset-0 flex items-center justify-center bg-linear-to-br from-emerald-600 to-teal-700"
          >
            <div class="text-center">
              <div
                class="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center text-xl font-bold mb-1"
              >
                คุณ
              </div>
              <span class="text-sm">คุณ (You)</span>
            </div>
          </div>
        </div>

        <!-- Meeting Info -->
        <div
          class="absolute top-4 left-4 bg-black/50 px-4 py-2 rounded-xl flex items-center gap-4"
        >
          <div class="flex items-center gap-2 text-sm">
            <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>กำลัง Meeting</span>
          </div>
          <span class="text-gray-400">|</span>
          <span class="text-sm">{{ meetingDuration }}</span>
        </div>
      </div>

      <!-- Chat Panel (Desktop) -->
      <div
        class="hidden lg:flex lg:w-80 flex-col bg-gray-800 rounded-2xl overflow-hidden"
      >
        <div class="p-4 border-b border-gray-700">
          <h3 class="font-semibold flex items-center gap-2">
            <MessageCircle class="w-5 h-5" />
            Chat
          </h3>
        </div>
        <div class="flex-1 p-4 overflow-y-auto space-y-4">
          <div
            v-for="message in chatMessages"
            :key="message.id"
            class="flex gap-3"
          >
            <div
              class="w-8 h-8 rounded-full bg-linear-to-br shrink-0 flex items-center justify-center text-sm font-bold"
              :class="message.color"
            >
              {{ message.sender[0] }}
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="font-medium text-sm">{{ message.sender }}</span>
                <span class="text-xs text-gray-500">{{ message.time }}</span>
              </div>
              <p class="text-sm text-gray-300">{{ message.text }}</p>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-gray-700">
          <div class="flex gap-2">
            <input
              type="text"
              placeholder="พิมพ์ข้อความ..."
              class="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 text-sm"
            />
            <button
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
            >
              <Send class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls Bar -->
    <div class="mt-4 bg-gray-800 rounded-2xl p-4">
      <div class="flex items-center justify-center gap-4">
        <button
          @click="toggleMic"
          :class="
            isMicOn
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-red-600 hover:bg-red-500'
          "
          class="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
        >
          <component :is="isMicOn ? Mic : MicOff" class="w-6 h-6" />
        </button>

        <button
          @click="toggleCamera"
          :class="
            isCameraOn
              ? 'bg-gray-700 hover:bg-gray-600'
              : 'bg-red-600 hover:bg-red-500'
          "
          class="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
        >
          <component :is="isCameraOn ? VideoIcon : VideoOff" class="w-6 h-6" />
        </button>

        <button
          class="w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-2xl flex items-center justify-center transition-colors"
        >
          <Monitor class="w-6 h-6" />
        </button>

        <button
          class="w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-2xl flex items-center justify-center transition-colors lg:hidden"
        >
          <MessageCircle class="w-6 h-6" />
        </button>

        <button
          class="w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-2xl flex items-center justify-center transition-colors"
        >
          <Users class="w-6 h-6" />
        </button>

        <NuxtLink
          to="/finlermeet"
          class="w-14 h-14 bg-red-600 hover:bg-red-500 rounded-2xl flex items-center justify-center transition-colors ml-4"
        >
          <PhoneOff class="w-6 h-6" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Monitor,
  MessageCircle,
  Users,
  PhoneOff,
  Send,
} from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";

const isMicOn = ref(true);
const isCameraOn = ref(true);
const meetingDuration = ref("00:00");
let timer: NodeJS.Timer | null = null;
let seconds = 0;

const toggleMic = () => {
  isMicOn.value = !isMicOn.value;
};

const toggleCamera = () => {
  isCameraOn.value = !isCameraOn.value;
};

onMounted(() => {
  timer = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    meetingDuration.value = `${mins}:${secs}`;
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const participants = [
  { id: 1, name: "สมชาย", muted: false, color: "from-blue-600 to-blue-800" },
  {
    id: 2,
    name: "สมหญิง",
    muted: true,
    color: "from-purple-600 to-purple-800",
  },
  {
    id: 3,
    name: "สมศักดิ์",
    muted: false,
    color: "from-amber-600 to-amber-800",
  },
  { id: 4, name: "สมใจ", muted: false, color: "from-rose-600 to-rose-800" },
];

const chatMessages = [
  {
    id: 1,
    sender: "สมชาย",
    text: "สวัสดีครับทุกคน",
    time: "10:01",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    sender: "สมหญิง",
    text: "สวัสดีค่ะ!",
    time: "10:02",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    sender: "สมศักดิ์",
    text: "พร้อมเริ่มได้เลยครับ",
    time: "10:02",
    color: "from-amber-500 to-amber-600",
  },
];
</script>
