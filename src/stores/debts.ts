import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { uuid } from "../interfaces/uuid";
import type { Debt, DebtType } from "../interfaces/debt";

interface DebtState {
  debts: Debt[];
  addDebt: (newDebt: Debt) => void;
  removeDebt: (id: uuid) => void;
  getMaxMonths: () => number;
  getTotalBalance: () => number;
}

const useDebts = create<DebtState>()(
  persist<DebtState>(
    (set, get) => ({
      debts: [],
      addDebt: (newDebt) =>
        set((state) => ({ debts: [...state.debts, newDebt] })),
      removeDebt: (id: uuid) =>
        set((state) => ({
          debts: state.debts.filter((debt) => debt.id !== id),
        })),
      getMaxMonths: () =>
        get().debts.reduce((max, d) => {
          if (d.monthlyMinimumPayment === 0) return max;
          const months = Math.ceil(d.balance / d.monthlyMinimumPayment);
          return Math.max(max, months);
        }, 0),
      getTotalBalance: () => get().debts.reduce((sum, d) => sum + d.balance, 0),
    }),
    {
      name: "debts",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useDebts;
