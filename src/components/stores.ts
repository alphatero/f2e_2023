import { create } from "zustand";

export enum SectionOne {
  one = "得票數",
  two = "得票率",
  three = "投票變化率",

}

type State = {
  open: boolean;
  country: string
  currentCountry: string
  isOpenDialog: boolean
  selectedSectionOne: string
}

const defaultState: State = {
  open: false,
  country: "",
  currentCountry: "",
  isOpenDialog: false,
  selectedSectionOne: SectionOne.one
}

type Actions = {
  toggle: () => void;
  setCountry: (country: string) => void
  setCurrentCountry: (currentCountry: string) => void
  openDialog: () => void
  closeDialog: () => void
  setSelectedSectionOne: (selectedSectionOne: string) => void
}

export const useStore = create<State & Actions>()((set) => ({
  ...defaultState,
  toggle: () => set((state) => ({ open: !state.open })),

  setCountry: (country: string) => set({ country }),

  setCurrentCountry: (currentCountry: string) => set({ currentCountry }),

  openDialog: () => set({ isOpenDialog: true }),

  closeDialog: () => set({ isOpenDialog: false }),

  setSelectedSectionOne: (selectedSectionOne: string) => set({ selectedSectionOne })
}));