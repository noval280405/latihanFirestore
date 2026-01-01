import { defineStore } from "pinia";
import _ from "lodash";
import { useloadingStore } from "./loadingStore";
import type { peopleM } from "~/types/peopleModel";

export const usePeopleStore = defineStore("usepeoplestore", {
    state: () => {
        return {
            datapeople: [] as peopleM[],
            detailpeople: {} as peopleM,
        };
    },

    getters: {
        getdatapeople(state) {
            return state.datapeople;
        },
        getdetailpeople(state) {
            return state.detailpeople;
        },
    },

    actions: {
        async tambahpeople(lemparpeople: peopleM) {
            try {
                useloadingStore().setLoading(true);
                await setdatabase('people', lemparpeople.nama, lemparpeople);
                useNuxtApp().$toast.success('Data people Berhasil Ditambahkan');
                this.tarikdatapeople()
                useloadingStore().setLoading(false);
            } catch (error) {
                useloadingStore().setLoading(false);
            }
        },

        async editpeople(lemparpeople: peopleM) {
            try {
                useloadingStore().setLoading(true);
                await updatedatabase('people', lemparpeople.id!, lemparpeople);
                useNuxtApp().$toast.success('Data people Berhasil Ditambahkan');
                this.tarikdatapeople()
                useloadingStore().setLoading(false);
            } catch (error) {
                useloadingStore().setLoading(false);
            }
        },

        async hapuspeople(id: string) {
            try {
                useloadingStore().setLoading(true);
                await hapusdatabase('people', id);
                useNuxtApp().$toast.success('Data people Berhasil Dihapus');
                this.tarikdatapeople()
                useloadingStore().setLoading(false);
            } catch (error) {
                useloadingStore().setLoading(false);
            }
        },

        async tarikdatapeople() {
            const datatarik = await queryambilid('people')
            this.datapeople = datatarik as unknown as peopleM[]
        },

        async tarikdetailpeople(idpeople: string) {
            const datatarik = await tarikdetaildatabase('people', idpeople)
            this.detailpeople = datatarik as unknown as peopleM
        },
    }
});

