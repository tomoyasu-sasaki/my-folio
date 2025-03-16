import { defineStore } from 'pinia'

export const useScrollStore = defineStore({
    id: 'scroll',
    state: () => ({
        sectionToScroll: ''
    }),
    actions: {
        setSectionToScroll(section: any) {
            this.sectionToScroll = section
        }
    }
})
