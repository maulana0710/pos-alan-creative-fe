import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

import { createConversionSlice, TConversionSlice } from "./conversion-slice";

export type TStore = TConversionSlice;

export const useStore = create<TStore>()(
  persist(
    devtools((...a) => ({
      ...createConversionSlice(...a),
    })),
    {
      name: "backoffice-store",
      partialize: (state) => ({
        eventId: state.eventId,
      }),
    }
  )
);

export const useUniqueIdentifierStore = create<TConversionSlice>()(
  persist((set, get, api) => createConversionSlice(set, get, api), {
    name: "event-id",
    storage: createJSONStorage(() => sessionStorage),
  })
);
