import { create } from 'zustand'
import { FilterState, PropertyType } from '@/types'

interface FilterStore extends FilterState {
  setMinPrice: (value: number | null) => void
  setMaxPrice: (value: number | null) => void
  setBedrooms: (value: number | null) => void
  setType: (value: PropertyType | null) => void
  resetFilters: () => void
}

const initialState: FilterState = {
  minPrice: null,
  maxPrice: null,
  bedrooms: null,
  type: null,
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setMinPrice: (value) => set({ minPrice: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),
  setBedrooms: (value) => set({ bedrooms: value }),
  setType: (value) => set({ type: value }),
  resetFilters: () => set(initialState),
}))
