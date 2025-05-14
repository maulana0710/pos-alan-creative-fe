import { StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";

type TConversionState = {
  eventId: string | null;
};

type TConversionAction = {
  initEventId: () => void;
  setEventId: (id: string) => void;
};

export type TConversionSlice = TConversionState & TConversionAction;

const EVENT_ID_KEY = "event-id";

const getStoredEventId = (): string | null => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(EVENT_ID_KEY) || null;
};

const storeEventId = (eventId: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(EVENT_ID_KEY, eventId);
  }
};

export const createConversionSlice: StateCreator<TConversionSlice, [], [], TConversionSlice> = (set) => ({
  eventId: null,

  setEventId: (id) => {
    storeEventId(id);
    set({ eventId: id });
  },

  initEventId: () => {
    let storedEventId = getStoredEventId();
    if (!storedEventId) {
      storedEventId = uuidv4();
      storeEventId(storedEventId);
    }
    set({ eventId: storedEventId });
  },
});
