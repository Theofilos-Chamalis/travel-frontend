import { defineStore } from "pinia";

export type Moods = {
  nature: number;
  relax: number;
  culture: number;
  history: number;
  party: number;
};

export type Travel = {
  id: string;
  name: string;
  nameShort?: string;
  slug: string;
  image?: string;
  description: string;
  startingDate: string;
  endingDate: string;
  price: number;
  moods: Moods;
};

export type Booking = {
  destinationId: string;
  userEmail: string;
  numSeats: number;
  id: string;
  confirmed: boolean;
  createdAt: string;
  expiresAt: string;
};
export type BookingActionPayload = Booking;

export type NotificationType = "success" | "error" | "warning" | "info" | "";
export type NotificationMessage = string;
export type NotificationActionPayload = {
  type: NotificationType;
  message: NotificationMessage;
};

export const useTravelStore = defineStore("travelStore", {
  state: (): {
    travels: Travel[];
    notificationType: NotificationType;
    notificationMessage: NotificationMessage;
    bookings: Booking[][];
  } => ({
    travels: [],
    notificationType: "",
    notificationMessage: "",
    bookings: [],
  }),
  actions: {
    async fetchTravelsAction() {
      let { BACKEND_URL } = useRuntimeConfig().public;

      if (!BACKEND_URL) {
        if (!process.env.BACKEND_URL) return;

        BACKEND_URL = process.env.BACKEND_URL;
      }

      const travelsResponse: Travel[] = await $fetch(
        `${BACKEND_URL}/destination`,
      );

      this.travels = travelsResponse.map((travel, index) => ({
        ...travel,
        nameShort: travel.name.split(":")[0],
        image: `https://picsum.photos/id/${10 + index}/400`,
      }));
    },
    showNotificationAction(notificationPayload: NotificationActionPayload) {
      this.notificationType = notificationPayload.type;
      this.notificationMessage = notificationPayload.message;

      setTimeout(() => {
        this.notificationType = "";
        this.notificationMessage = "";
      }, 5000);
    },
    addBookingAction(bookingPayload: BookingActionPayload[]) {
      this.bookings.push(bookingPayload);
    },
  },
});
