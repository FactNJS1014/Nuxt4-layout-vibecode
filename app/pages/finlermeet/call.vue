<template>
  <div class="min-h-[calc(100vh-3rem)] flex flex-col text-white">
    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="flex-1 flex items-center justify-center bg-gray-800 rounded-2xl"
    >
      <div class="text-center space-y-4">
        <div
          class="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"
        ></div>
        <p class="text-gray-400">{{ loadingMessage }}</p>
        <p class="text-xs text-gray-500">Room: {{ roomCode }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex-1 flex items-center justify-center bg-gray-800 rounded-2xl"
    >
      <div class="text-center space-y-4">
        <div
          class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto"
        >
          <AlertCircle class="w-8 h-8 text-red-500" />
        </div>
        <p class="text-red-400">{{ error }}</p>
        <NuxtLink
          to="/finlermeet"
          class="inline-block px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
        >
          กลับหน้าหลัก
        </NuxtLink>
      </div>
    </div>

    <!-- Meeting Interface -->
    <template v-else>
      <div class="flex-1 flex flex-col lg:flex-row gap-4">
        <!-- Main Video Area (Jitsi Container) -->
        <div class="flex-1 bg-gray-800 rounded-2xl overflow-hidden relative">
          <!-- Jitsi Meet IFrame Container -->
          <div ref="jitsiContainer" class="absolute inset-0"></div>

          <!-- Meeting Info Overlay -->
          <div
            class="absolute top-4 left-4 bg-black/50 px-4 py-2 rounded-xl flex items-center gap-4 z-10"
          >
            <div class="flex items-center gap-2 text-sm">
              <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>กำลัง Meeting</span>
            </div>
            <span class="text-gray-400">|</span>
            <span class="text-sm">{{ meetingDuration }}</span>
          </div>

          <!-- Room Code Display -->
          <div
            class="absolute top-4 right-4 bg-black/50 px-4 py-2 rounded-xl flex items-center gap-2 z-10"
          >
            <span class="text-sm text-gray-400">Room:</span>
            <span class="font-mono text-sm">{{ roomCode }}</span>
            <button
              @click="copyRoomCode"
              class="p-1 hover:bg-white/10 rounded transition-colors"
              title="Copy room code"
            >
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Participants Panel (Desktop) -->
        <div
          v-if="showParticipants"
          class="hidden lg:flex lg:w-80 flex-col bg-gray-800 rounded-2xl overflow-hidden"
        >
          <div class="p-4 border-b border-gray-700">
            <h3 class="font-semibold flex items-center gap-2">
              <Users class="w-5 h-5" />
              ผู้เข้าร่วม ({{ participantCount }})
            </h3>
          </div>
          <div class="flex-1 p-4 overflow-y-auto space-y-3">
            <div
              v-for="participant in participants"
              :key="participant.participantId"
              class="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl"
            >
              <div
                class="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-bold"
              >
                {{ participant.displayName?.[0] || "?" }}
              </div>
              <span class="text-sm">{{
                participant.displayName || "Unknown"
              }}</span>
            </div>
            <div
              v-if="participants.length === 0"
              class="text-center text-gray-500 py-8"
            >
              <Users class="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>ยังไม่มีผู้เข้าร่วม</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls Bar -->
      <div class="mt-4 bg-gray-800 rounded-2xl p-4">
        <div class="flex items-center justify-center gap-4">
          <button
            @click="toggleAudio"
            :class="
              !isAudioMuted
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-red-600 hover:bg-red-500'
            "
            class="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
            :title="isAudioMuted ? 'เปิดไมค์' : 'ปิดไมค์'"
          >
            <component :is="isAudioMuted ? MicOff : Mic" class="w-6 h-6" />
          </button>

          <button
            @click="toggleVideo"
            :class="
              !isVideoMuted
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-red-600 hover:bg-red-500'
            "
            class="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
            :title="isVideoMuted ? 'เปิดกล้อง' : 'ปิดกล้อง'"
          >
            <component
              :is="isVideoMuted ? VideoOff : VideoIcon"
              class="w-6 h-6"
            />
          </button>

          <button
            @click="toggleScreenShare"
            :class="
              isScreenSharing
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : 'bg-gray-700 hover:bg-gray-600'
            "
            class="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
            title="แชร์หน้าจอ"
          >
            <Monitor class="w-6 h-6" />
          </button>

          <button
            @click="showParticipants = !showParticipants"
            :class="
              showParticipants
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : 'bg-gray-700 hover:bg-gray-600'
            "
            class="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors"
            title="รายชื่อผู้เข้าร่วม"
          >
            <Users class="w-6 h-6" />
          </button>

          <button
            @click="leaveMeeting"
            class="w-14 h-14 bg-red-600 hover:bg-red-500 rounded-2xl flex items-center justify-center transition-colors ml-4"
            title="ออกจาก Meeting"
          >
            <PhoneOff class="w-6 h-6" />
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Monitor,
  Users,
  PhoneOff,
  Copy,
  AlertCircle,
} from "lucide-vue-next";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useJitsiMeet } from "~/composables/jitsi";

const router = useRouter();
const route = useRoute();

// Get room code from query params
const roomCode = computed(() => (route.query.room as string) || "");

// Jitsi container ref
const jitsiContainer = ref<HTMLElement | null>(null);

// UI state
const showParticipants = ref(false);
const meetingDuration = ref("00:00");
let timer: ReturnType<typeof setInterval> | null = null;
let seconds = 0;

// Initialize Jitsi Meet
const {
  isLoading,
  isJoined,
  isAudioMuted,
  isVideoMuted,
  isScreenSharing,
  participants,
  error,
  loadingMessage,
  initMeet,
  toggleAudio,
  toggleVideo,
  toggleScreenShare,
  hangup,
  dispose,
} = useJitsiMeet({
  roomName: roomCode.value,
  displayName: "User",
  onMeetingEnd: () => {
    router.push("/finlermeet");
  },
});

// Participant count
const participantCount = computed(() => participants.value.length + 1); // +1 for self

/**
 * Copy room code to clipboard
 */
const copyRoomCode = async () => {
  try {
    await navigator.clipboard.writeText(roomCode.value);
    // Could add a toast notification here
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

/**
 * Leave the meeting and navigate back
 */
const leaveMeeting = () => {
  hangup();
  router.push("/finlermeet");
};

/**
 * Start meeting duration timer
 */
const startTimer = () => {
  timer = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    meetingDuration.value = `${mins}:${secs}`;
  }, 1000);
};

onMounted(async () => {
  // Validate room code
  if (!roomCode.value) {
    router.push("/finlermeet");
    return;
  }

  // Initialize Jitsi when container is ready
  if (jitsiContainer.value) {
    await initMeet(jitsiContainer.value);
    startTimer();
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  dispose();
});
</script>
