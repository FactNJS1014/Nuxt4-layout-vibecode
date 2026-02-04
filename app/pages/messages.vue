<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Chat with your team members.
      </p>
    </div>

    <!-- Chat Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Conversation List -->
      <div
        class="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="relative">
            <Search
              class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              class="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div
          class="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto"
        >
          <div
            v-for="chat in chats"
            :key="chat.id"
            :class="
              selectedChat === chat.id
                ? 'bg-indigo-50 dark:bg-indigo-900/20'
                : ''
            "
            class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            @click="selectedChat = chat.id"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold"
              >
                {{ chat.avatar }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-center">
                  <h3
                    class="font-semibold text-gray-900 dark:text-white truncate"
                  >
                    {{ chat.name }}
                  </h3>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{
                    chat.time
                  }}</span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {{ chat.lastMessage }}
                </p>
              </div>
              <div
                v-if="chat.unread"
                class="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-xs text-white font-medium"
              >
                {{ chat.unread }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Window -->
      <div
        class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col"
      >
        <div
          class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold"
          >
            JD
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">
              John Doe
            </h3>
            <p class="text-sm text-emerald-500">Online</p>
          </div>
        </div>

        <div class="flex-1 p-4 space-y-4 max-h-72 overflow-y-auto">
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="msg.sent ? 'justify-end' : 'justify-start'"
            class="flex"
          >
            <div
              :class="
                msg.sent
                  ? 'bg-linear-to-r from-indigo-500 to-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              "
              class="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl"
            >
              {{ msg.text }}
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              class="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              class="p-2.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl text-white hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              <Send class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Send } from "lucide-vue-next";
import { ref } from "vue";

const selectedChat = ref(1);

const chats = [
  {
    id: 1,
    name: "John Doe",
    avatar: "JD",
    lastMessage: "Sure, I'll send it over!",
    time: "2m",
    unread: 2,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "JS",
    lastMessage: "The design looks great!",
    time: "1h",
    unread: 0,
  },
  {
    id: 3,
    name: "Mike Wilson",
    avatar: "MW",
    lastMessage: "Let's schedule a meeting",
    time: "3h",
    unread: 1,
  },
  {
    id: 4,
    name: "Sarah Davis",
    avatar: "SD",
    lastMessage: "Thanks for the update",
    time: "1d",
    unread: 0,
  },
];

const messages = [
  { id: 1, text: "Hey! How's the project going?", sent: false },
  { id: 2, text: "It's going well! Almost done with the UI.", sent: true },
  { id: 3, text: "That's great! Can you share the mockups?", sent: false },
  { id: 4, text: "Sure, I'll send it over!", sent: true },
];
</script>
