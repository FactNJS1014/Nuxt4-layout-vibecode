<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Manage your application preferences.
      </p>
    </div>

    <!-- Settings Sections -->
    <div class="space-y-6">
      <!-- General Settings -->
      <div class="settings-card">
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
            <SettingsIcon
              class="w-5 h-5 text-indigo-600 dark:text-indigo-400"
            />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            General
          </h2>
        </div>

        <div class="space-y-4">
          <div class="setting-item">
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">
                Language
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Select your preferred language
              </p>
            </div>
            <select class="select-input">
              <option>English</option>
              <option>Thai</option>
              <option>Japanese</option>
            </select>
          </div>

          <div class="setting-item">
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">
                Timezone
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Set your local timezone
              </p>
            </div>
            <select class="select-input">
              <option>Asia/Bangkok (GMT+7)</option>
              <option>Asia/Tokyo (GMT+9)</option>
              <option>America/New_York (GMT-5)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Appearance -->
      <div class="settings-card">
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <Palette class="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Appearance
          </h2>
        </div>

        <div class="space-y-4">
          <div class="setting-item">
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">Theme</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Choose your preferred theme
              </p>
            </div>
            <div class="flex gap-3">
              <button class="theme-btn bg-white border-2 border-indigo-500">
                <Sun class="w-5 h-5 text-amber-500" />
              </button>
              <button class="theme-btn bg-gray-800">
                <Moon class="w-5 h-5 text-indigo-400" />
              </button>
              <button class="theme-btn bg-linear-to-br from-white to-gray-800">
                <Monitor class="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div class="setting-item">
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">
                Compact Mode
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Use smaller spacing in the UI
              </p>
            </div>
            <label class="toggle">
              <input type="checkbox" class="sr-only peer" />
              <div class="toggle-track"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="settings-card">
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
            <Bell class="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Notifications
          </h2>
        </div>

        <div class="space-y-4">
          <div class="setting-item">
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">
                Email Notifications
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Receive updates via email
              </p>
            </div>
            <label class="toggle">
              <input type="checkbox" class="sr-only peer" checked />
              <div class="toggle-track"></div>
            </label>
          </div>

          <div class="setting-item">
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">
                Push Notifications
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Receive browser notifications
              </p>
            </div>
            <label class="toggle">
              <input type="checkbox" class="sr-only peer" checked />
              <div class="toggle-track"></div>
            </label>
          </div>

          <div class="setting-item">
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">
                Sound Effects
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Play sounds for notifications
              </p>
            </div>
            <label class="toggle">
              <input type="checkbox" class="sr-only peer" />
              <div class="toggle-track"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button class="btn-primary">
          <Save class="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Settings as SettingsIcon,
  Palette,
  Bell,
  Sun,
  Moon,
  Monitor,
  Save,
} from "lucide-vue-next";
</script>
