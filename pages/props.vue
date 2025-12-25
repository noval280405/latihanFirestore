<script setup lang="ts">
import { ref } from "vue";

interface ProdukM {
  id: number;
  nama: string;
  harga: number;
}

// 🔥 DATA PRODUK ARRAY (3 OBJECT)
const produkList = ref<ProdukM[]>([
  { id: 1, nama: "Laptop Gaming", harga: 15000000 },
  { id: 2, nama: "Mouse Gaming", harga: 350000 },
  { id: 3, nama: "Keyboard Mechanical", harga: 750000 },
]);

// 🔥 STATE DIALOG & PRODUK TERPILIH
const dialog = ref(false);
const selectedProduk = ref<ProdukM | null>(null);

// 🔥 TOMBOL OPEN DIALOG
const openDialog = (id: number) => {
  const data = produkList.value.find((item) => item.id === id);
  if (!data) return;

  selectedProduk.value = data;
  dialog.value = true;
};
</script>

<template>
  <div>
    <h1>Halaman Props</h1>

    <!-- LIST PRODUK + TOMBOL -->
    <div
      v-for="item in produkList"
      :key="item.id"
      style="display: flex; gap: 12px; margin-bottom: 8px"
    >
      <!-- <span>
        {{ item.nama }} - Rp {{ item.harga.toLocaleString() }}
      </span> -->

      <!-- 🔥 TOMBOL OPEN DIALOG -->
      <v-btn size="small" color="primary" @click="openDialog(item.id)">
        Detail
      </v-btn>
    </div>

    <!-- 🔥 COMPONENT DIALOG -->
    <NamaPemain
      v-if="selectedProduk"
      v-model:dialog="dialog"
      :produk="selectedProduk"
    />
  </div>
</template>
