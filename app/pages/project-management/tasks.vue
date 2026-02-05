<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          จัดการและติดตามงานทั้งหมดของคุณ
        </p>
      </div>
      <button
        class="px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
      >
        <Plus class="w-5 h-5" />
        <span>สร้างงาน</span>
      </button>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 overflow-x-auto pb-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="
          activeTab === tab.id
            ? 'bg-indigo-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
        "
        class="px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors"
      >
        {{ tab.label }}
        <span
          :class="
            activeTab === tab.id
              ? 'bg-white/20'
              : 'bg-gray-200 dark:bg-gray-700'
          "
          class="ml-2 px-2 py-0.5 rounded-full text-sm"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>

    <!-- Tasks List -->
    <div class="space-y-4">
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start gap-4">
          <!-- Checkbox -->
          <button
            @click="task.completed = !task.completed"
            :class="
              task.completed
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
            "
            class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 mt-1"
          >
            <Check v-if="task.completed" class="w-4 h-4 text-white" />
          </button>

          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3
                  :class="
                    task.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  "
                  class="font-semibold"
                >
                  {{ task.title }}
                </h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {{ task.description }}
                </p>
              </div>
              <span
                :class="task.priorityColor"
                class="px-3 py-1 text-sm font-medium rounded-full shrink-0"
              >
                {{ task.priority }}
              </span>
            </div>

            <!-- Task Meta -->
            <div class="flex items-center gap-4 mt-4 flex-wrap">
              <div
                class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
              >
                <FolderKanban class="w-4 h-4" />
                <span>{{ task.project }}</span>
              </div>
              <div
                class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
              >
                <Calendar class="w-4 h-4" />
                <span>{{ task.dueDate }}</span>
              </div>
              <div class="flex items-center gap-1">
                <div
                  class="w-6 h-6 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium"
                >
                  {{ task.assignee[0] }}
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{
                  task.assignee
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Check, FolderKanban, Calendar } from "lucide-vue-next";
import { ref, computed } from "vue";

const activeTab = ref("all");

const tabs = [
  { id: "all", label: "ทั้งหมด", count: 8 },
  { id: "inProgress", label: "กำลังทำ", count: 4 },
  { id: "pending", label: "รอดำเนินการ", count: 2 },
  { id: "completed", label: "เสร็จสิ้น", count: 2 },
];

const tasks = ref([
  {
    id: 1,
    title: "ออกแบบหน้า Dashboard ใหม่",
    description: "สร้าง UI/UX design สำหรับ Dashboard ตามที่ลูกค้าต้องการ",
    completed: false,
    priority: "สูง",
    priorityColor:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    project: "Website Redesign",
    dueDate: "วันนี้",
    assignee: "สมชาย",
    status: "inProgress",
  },
  {
    id: 2,
    title: "พัฒนา API Authentication",
    description: "สร้าง JWT authentication สำหรับระบบ login",
    completed: false,
    priority: "สูง",
    priorityColor:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    project: "API Development",
    dueDate: "พรุ่งนี้",
    assignee: "สมหญิง",
    status: "inProgress",
  },
  {
    id: 3,
    title: "เขียน Unit Tests",
    description: "เขียน test cases สำหรับ API endpoints ทั้งหมด",
    completed: false,
    priority: "ปานกลาง",
    priorityColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    project: "API Development",
    dueDate: "28 ก.พ.",
    assignee: "สมศักดิ์",
    status: "pending",
  },
  {
    id: 4,
    title: "อัพเดทเอกสาร API",
    description: "อัพเดท Swagger documentation ให้ครบถ้วน",
    completed: true,
    priority: "ต่ำ",
    priorityColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    project: "API Development",
    dueDate: "เสร็จแล้ว",
    assignee: "สมหญิง",
    status: "completed",
  },
  {
    id: 5,
    title: "ทดสอบ Responsive Design",
    description: "ตรวจสอบการแสดงผลบน devices ขนาดต่างๆ",
    completed: false,
    priority: "ปานกลาง",
    priorityColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    project: "Website Redesign",
    dueDate: "1 มี.ค.",
    assignee: "สมชาย",
    status: "inProgress",
  },
  {
    id: 6,
    title: "Setup CI/CD Pipeline",
    description: "ตั้งค่า automated deployment ผ่าน GitHub Actions",
    completed: false,
    priority: "สูง",
    priorityColor:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    project: "Mobile App",
    dueDate: "3 มี.ค.",
    assignee: "สมศักดิ์",
    status: "inProgress",
  },
  {
    id: 7,
    title: "ออกแบบ Logo ใหม่",
    description: "สร้าง logo สำหรับ branding ใหม่",
    completed: true,
    priority: "ต่ำ",
    priorityColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    project: "Marketing Campaign",
    dueDate: "เสร็จแล้ว",
    assignee: "สมใจ",
    status: "completed",
  },
  {
    id: 8,
    title: "วางแผน Sprint ถัดไป",
    description: "จัดลำดับความสำคัญของงานสำหรับ Sprint 5",
    completed: false,
    priority: "ปานกลาง",
    priorityColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    project: "Website Redesign",
    dueDate: "5 มี.ค.",
    assignee: "สมหญิง",
    status: "pending",
  },
]);

const filteredTasks = computed(() => {
  if (activeTab.value === "all") return tasks.value;
  return tasks.value.filter((task) => task.status === activeTab.value);
});
</script>
