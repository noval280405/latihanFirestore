<template>
  <div class="pa-6">
    <h1 class="text-h5 mb-4">Latihan Watch Vue 3</h1>

    <!-- Latihan 1 -->
    <section class="mb-6">
      <h2 class="text-h6">1. Watch Dasar</h2>
      <v-btn class="mt-2" @click="count++">Tambah Count</v-btn>
      <p class="mt-2">Count: {{ count }}</p>
    </section>

    <v-divider />

    <!-- Latihan 2 -->
    <section class="mb-6 mt-6">
      <h2 class="text-h6">2. Watch Input</h2>
      <v-text-field
        v-model="name"
        label="Nama"
        variant="outlined"
      />
      <p class="mt-2">{{ warningName }}</p>
    </section>

    <v-divider />

    <!-- Latihan 3 -->
    <section class="mb-6 mt-6">
      <h2 class="text-h6">3. Watch Multiple Source</h2>
      <v-text-field v-model="firstName" label="First Name" />
      <v-text-field v-model="lastName" label="Last Name" />
      <p class="mt-2">Full Name: {{ fullName }}</p>
    </section>

    <v-divider />

    <!-- Latihan 4 -->
    <section class="mb-6 mt-6">
      <h2 class="text-h6">4. Watch Object (Deep)</h2>
      <v-text-field v-model="user.name" label="Nama User" />
      <v-text-field v-model.number="user.age" label="Umur" type="number" />
      <p class="mt-2">Check console log</p>
    </section>

    <v-divider />

    <!-- Latihan 5 -->
    <section class="mb-6 mt-6">
      <h2 class="text-h6">5. Computed vs Watch</h2>
      <v-text-field v-model.number="price" label="Harga" type="number" />
      <v-text-field v-model.number="qty" label="Qty" type="number" />
      <p class="mt-2">Total: {{ total }}</p>
    </section>

    <v-divider />

    <!-- Latihan 6 -->
    <section class="mb-6 mt-6">
      <h2 class="text-h6">6. Watch API</h2>
      <v-select
        v-model="selectedCategory"
        :items="['all', 'elektronik', 'fashion']"
        label="Kategori"
      />
      <p class="mt-2">Kategori aktif: {{ selectedCategory }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

/* =====================
   Latihan 1 – Watch dasar
===================== */
const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(`Count berubah dari ${oldVal} ke ${newVal}`)
})

/* =====================
   Latihan 2 – Watch input
===================== */
const name = ref('')
const warningName = ref('')

watch(name, (val) => {
  if (val.length > 0 && val.length < 3) {
    warningName.value = 'Nama minimal 3 karakter'
  } else {
    warningName.value = ''
  }
})

/* =====================
   Latihan 3 – Watch multiple source
===================== */
const firstName = ref('')
const lastName = ref('')
const fullName = ref('')

watch([firstName, lastName], ([newFirst, newLast]) => {
  fullName.value = `${newFirst} ${newLast}`
})

/* =====================
   Latihan 4 – Watch object (deep)
===================== */
const user = ref({
  name: '',
  age: 0
})

watch(
  user,
  (newVal) => {
    console.log('User berubah:', newVal)
  },
  { deep: true }
)

/* =====================
   Latihan 5 – Computed
===================== */
const price = ref(0)
const qty = ref(1)

const total = computed(() => {
  return price.value * qty.value
})

/* =====================
   Latihan 6 – Watch API
===================== */
const selectedCategory = ref('all')

watch(
  selectedCategory,
  async (val) => {
    console.log('Panggil API kategori:', val)
    // simulasi API call
    await new Promise(resolve => setTimeout(resolve, 500))
  },
  { immediate: true }
)
</script>

<style scoped>
section {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}
</style>
