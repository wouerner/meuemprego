<template>
  <v-card class="glass-panel pa-6 rounded-xl h-100" elevation="0">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h5 font-weight-bold gradient-text-subtle">Tarefas do Projeto</h3>
        <p class="text-subtitle-2 text-grey">Sua lista de prioridades em tempo real</p>
      </div>

      <v-btn
        class="glass-btn-primary"
        rounded="pill"
        size="small"
        prepend-icon="mdi-plus"
        @click="showDialog = true"
      >
        Nova Tarefa
      </v-btn>
    </div>

    <!-- Task List -->
    <v-list density="compact" class="bg-transparent pa-0">
      <v-list-item
        v-for="task in tasks"
        :key="task.id"
        class="glass-item mb-2 rounded-lg pa-2"
        :class="{ 'opacity-50': task.completed }"
      >
        <template #prepend>
          <v-checkbox-btn
            v-model="task.completed"
            color="secondary"
          ></v-checkbox-btn>
        </template>

        <v-list-item-title
          class="font-weight-medium"
          :class="{ 'text-decoration-line-through': task.completed }"
        >
          {{ task.title }}
        </v-list-item-title>

        <template #append>
          <span
            class="glass-badge"
            :style="{ borderColor: getPriorityColor(task.priority) }"
          >
            {{ task.priority }}
          </span>
        </template>
      </v-list-item>
    </v-list>

    <!-- Glass Dialog Modal for adding new task -->
    <v-dialog v-model="showDialog" max-width="480">
      <v-card class="glass-panel pa-6 rounded-xl" elevation="0">
        <div class="d-flex align-center justify-space-between mb-4">
          <h3 class="text-h6 font-weight-bold gradient-text">Adicionar Nova Tarefa</h3>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showDialog = false"></v-btn>
        </div>

        <v-text-field
          v-model="newTaskTitle"
          label="Título da Tarefa"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-select
          v-model="newTaskPriority"
          :items="['Baixa', 'Média', 'Alta']"
          label="Prioridade"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-4"
          hide-details
        ></v-select>

        <div class="d-flex justify-end gap-2">
          <v-btn variant="text" rounded="pill" @click="showDialog = false">Cancelar</v-btn>
          <v-btn class="glass-btn-primary" rounded="pill" @click="addTask">Salvar Tarefa</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Task {
  id: number
  title: string
  priority: 'Baixa' | 'Média' | 'Alta'
  completed: boolean
}

const showDialog = ref(false)
const newTaskTitle = ref('')
const newTaskPriority = ref<'Baixa' | 'Média' | 'Alta'>('Média')

const tasks = ref<Task[]>([
  { id: 1, title: 'Implementar Vuetify 3 Theme Provider', priority: 'Alta', completed: true },
  { id: 2, title: 'Criar componentes com efeito Glassmorphism', priority: 'Alta', completed: false },
  { id: 3, title: 'Otimizar backdrop-filter para dispositivos móveis', priority: 'Média', completed: false },
  { id: 4, title: 'Configurar rotas e internacionalização', priority: 'Baixa', completed: false },
])

function getPriorityColor(priority: string) {
  if (priority === 'Alta') return 'rgba(239, 68, 68, 0.5)'
  if (priority === 'Média') return 'rgba(245, 158, 11, 0.5)'
  return 'rgba(16, 185, 129, 0.5)'
}

function addTask() {
  if (!newTaskTitle.value.trim()) return
  tasks.value.unshift({
    id: Date.now(),
    title: newTaskTitle.value.trim(),
    priority: newTaskPriority.value,
    completed: false,
  })
  newTaskTitle.value = ''
  showDialog.value = false
}
</script>

<style scoped>
.glass-item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;
}
.glass-item:hover {
  background: rgba(255, 255, 255, 0.08);
}
.gap-2 {
  gap: 8px;
}
</style>
