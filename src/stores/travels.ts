import { defineStore } from "pinia";
import type {
  Travel,
  NotificationType,
  NotificationMessage,
  Booking,
  NotificationActionPayload,
  BookingActionPayload,
} from "~/types";
import { getAllTravels } from "~/services";

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
      const travelsResponse = await getAllTravels();

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
