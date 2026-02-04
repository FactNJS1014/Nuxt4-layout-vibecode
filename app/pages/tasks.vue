<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Track and manage your tasks efficiently.
        </p>
      </div>
      <button class="btn-primary">
        <Plus class="w-5 h-5" />
        Add Task
      </button>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 overflow-x-auto pb-2">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="activeTab === tab ? 'tab-active' : 'tab-inactive'"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Task List -->
    <div class="space-y-3">
      <div v-for="task in filteredTasks" :key="task.id" class="task-card">
        <div class="flex items-start gap-4">
          <button @click="toggleTask(task.id)" class="mt-1">
            <component
              :is="task.completed ? CheckCircle2 : Circle"
              :class="
                task.completed
                  ? 'text-emerald-500'
                  : 'text-gray-400 dark:text-gray-500'
              "
              class="w-6 h-6"
            />
          </button>

          <div class="flex-1">
            <h3
              :class="
                task.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-900 dark:text-white'
              "
              class="font-medium"
            >
              {{ task.title }}
            </h3>
            <div class="flex flex-wrap items-center gap-3 mt-2">
              <span
                :class="getPriorityClass(task.priority)"
                class="px-2 py-1 rounded-md text-xs font-medium"
              >
                {{ task.priority }}
              </span>
              <span
                class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1"
              >
                <Calendar class="w-4 h-4" />
                {{ task.dueDate }}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ task.project }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Circle, CheckCircle2, Calendar } from "lucide-vue-next";
import { ref, computed } from "vue";

const tabs = ["All", "Pending", "Completed"];
const activeTab = ref("All");

const tasks = ref([
  {
    id: 1,
    title: "Design homepage mockup",
    completed: false,
    priority: "High",
    dueDate: "Feb 5",
    project: "Website Redesign",
  },
  {
    id: 2,
    title: "Review API documentation",
    completed: true,
    priority: "Medium",
    dueDate: "Feb 3",
    project: "API Integration",
  },
  {
    id: 3,
    title: "Set up CI/CD pipeline",
    completed: false,
    priority: "High",
    dueDate: "Feb 6",
    project: "Mobile App",
  },
  {
    id: 4,
    title: "Write unit tests",
    completed: false,
    priority: "Medium",
    dueDate: "Feb 8",
    project: "Dashboard Analytics",
  },
  {
    id: 5,
    title: "Update user documentation",
    completed: true,
    priority: "Low",
    dueDate: "Feb 2",
    project: "CRM System",
  },
  {
    id: 6,
    title: "Fix login bug",
    completed: false,
    priority: "High",
    dueDate: "Feb 4",
    project: "E-commerce Platform",
  },
  {
    id: 7,
    title: "Optimize database queries",
    completed: false,
    priority: "Medium",
    dueDate: "Feb 10",
    project: "Dashboard Analytics",
  },
]);

const filteredTasks = computed(() => {
  if (activeTab.value === "Pending")
    return tasks.value.filter((t) => !t.completed);
  if (activeTab.value === "Completed")
    return tasks.value.filter((t) => t.completed);
  return tasks.value;
});

const toggleTask = (id: number) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
};

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400";
    case "Medium":
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400";
    case "Low":
      return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400";
    default:
      return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
  }
};
</script>
