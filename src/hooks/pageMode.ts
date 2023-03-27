
import { create } from 'zustand'

export const usePageMode = create((set) => ({
  pageMode: 'view',
  setPageMode: (mode) => set(state => ({pageMode: mode})),
}))