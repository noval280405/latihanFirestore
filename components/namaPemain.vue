<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  dialog: boolean;
  produk: {
    id: number;
    nama: string;
    harga: number;
  };
}>();

const emit = defineEmits<{
  (e: "update:dialog", value: boolean): void;
}>();

// 🔥 WRAPPER UNTUK v-model
const dialogModel = computed({
  get: () => props.dialog,
  set: (val: boolean) => emit("update:dialog", val),
});
</script>

<template>
  <!-- DIALOG -->
  <v-dialog v-model="dialogModel" max-width="400">
    <v-card>
      <v-card-title>
        Detail Produk
      </v-card-title>

      <v-card-text>
        <p><strong>ID:</strong> {{ produk.id }}</p>
        <p><strong>Nama:</strong> {{ produk.nama }}</p>
        <p><strong>Harga:</strong> Rp {{ produk.harga.toLocaleString() }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="dialogModel = false">
          Tutup
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 🔥 TOMBOL OPEN DIALOG DI CHILD -->
  <v-btn color="success" @click="dialogModel = true">
    Open Dialog
  </v-btn>
</template>
