<template>
  <v-container>
    <v-dialog v-model="data.dialogedit">
      <v-card>
        <v-card-title>Edit Data</v-card-title>
        <v-card-text>
          <v-text-field
            variant="solo"
            label="Nama"
            v-model="newpeople.nama"
          ></v-text-field>
          <v-text-field
            variant="solo"
            label="Usia"
            v-model.number="newpeople.usia"
          ></v-text-field>
          <v-text-field
            variant="solo"
            label="Alamat"
            v-model="newpeople.alamat"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="saveeditdialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-text-field
      variant="solo"
      label="Nama"
      v-model="newpeople.nama"
    ></v-text-field>
    <v-text-field
      variant="solo"
      label="Usia"
      v-model.number="newpeople.usia"
    ></v-text-field>
    <v-text-field
      variant="solo"
      label="Alamat"
      v-model="newpeople.alamat"
    ></v-text-field>
    <v-btn color="red" @click="tambahData">Click me</v-btn>
    <v-data-table :headers="data.headerstable" :items="data.listpemain">
      <template v-slot:item.tindakan="{ item, index }">
        <v-btn color="red" @click="hapusData(item)">Hapus</v-btn>
        <v-btn color="blue" @click="opendialog(index)">Edit</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script setup lang="ts">
import _ from "lodash";
import { usePeopleStore } from "~/stores/peopleStore";
import type { peopleM } from "~/types/peopleModel";
const peoplestore = usePeopleStore();

onMounted(async () => {
  await peoplestore.tarikdatapeople();
});
const newpeople = ref<peopleM>({
  nama: "",
  usia: 0,
  alamat: "",
});
const data = reactive({
  dialogedit: false,

  listpemain: [],
  onselectindex: -1,

  headerstable: [
    { title: "Nama", value: "nama" },
    { title: "Umur", value: "umur" },
    { title: "Posisi", value: "posisi" },
    { title: "Tindakan", value: "tindakan" },
  ],
});

function tambahData() {
  peoplestore.tambahpeople(newpeople.value);
  newpeople.value = {
    nama: "",
    usia: 0,
    alamat: "",
  };
}

function hapusData(id: string) {
  peoplestore.hapuspeople(id);
}

function opendialog(index: number) {
  data.dialogedit = true;
  newpeople.value = data.listpemain[index];
  data.onselectindex = index;
}

function saveeditdialog() {
  data.dialogedit = false;
  peoplestore.editpeople(newpeople.value);
}

function saveedit(index: number) {
  newpeople.value = _.assign({}, (data.listpemain[index] = newpeople.value));
  data.onselectindex = index;
}
</script>
