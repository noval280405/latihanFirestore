<template>
    <v-container>
        <v-dialog v-model="data.dialogedit">
           <v-card>
                <v-card-title>Edit Data</v-card-title>
                <v-card-text>
                     <v-text-field variant="solo" label="Nama" v-model="data.datapemain.nama"></v-text-field>
                     <v-text-field variant="solo" label="Umur" v-model.number="data.datapemain.umur"></v-text-field>
                     <v-text-field variant="solo" label="Posisi" v-model="data.datapemain.posisi"></v-text-field>
                </v-card-text>
                <v-card-actions>
                     <v-btn color="red" @click="saveeditdialog">Save</v-btn>
                </v-card-actions>
           </v-card>
        </v-dialog>
        <v-text-field variant="solo" label="Nama" v-model="data.datapemain.nama"></v-text-field>
        <v-text-field variant="solo" label="Umur" v-model.number="data.datapemain.umur"></v-text-field>
        <v-text-field variant="solo" label="Posisi" v-model="data.datapemain.posisi"></v-text-field>
        <v-btn color="red" @click="tambahData">Click me</v-btn>
        <v-data-table :headers="data.headerstable" :items="data.listpemain">
            <template v-slot:item.tindakan="{ item,index }">
                <v-btn color="red" @click="hapusData(item)">Hapus</v-btn>
                <v-btn color="blue" @click="opendialog(index)">Edit</v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>
<script setup lang="ts">
import _ from "lodash";
const data = reactive({
    datapemain: {
        nama: "",
        umur: 0,
        posisi: "",
    },
    dialogedit:false,

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
    data.listpemain.push(data.datapemain);
    data.datapemain = {
        nama: "",
        umur: 0,
        posisi: "",
    };
}

function hapusData(index: number) {
    data.listpemain.splice(index, 1);
}

function opendialog(index : number) {
    data.dialogedit = true;
    data.datapemain = data.listpemain[index];
    data.onselectindex = index;
}

function saveeditdialog() {
    data.dialogedit = false;
    data.datapemain = _.assign({}, data.listpemain[data.onselectindex] = data.datapemain);
}

function saveedit(index : number) {
    data.datapemain = _.assign({}, data.listpemain[index] = data.datapemain);
    data.onselectindex = index;
}

</script>
