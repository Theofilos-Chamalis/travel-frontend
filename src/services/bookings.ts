/**
 * This file contains the services for the bookings.
 */
import type { Booking, BookingCreatePayload } from "~/types";
import { getBackendUrl } from ".";

export const createBooking = async (bookingPayload: BookingCreatePayload) => {
  const BACKEND_URL = getBackendUrl();

  try {
    const bookingResponse: Booking[] = await $fetch(`${BACKEND_URL}/booking`, {
      method: "POST",
      body: JSON.stringify(bookingPayload),
    });
    return bookingResponse;
  } catch (error: any) {
    const errorMessage =
      typeof error.data.message === "string"
        ? error.data.message
        : error.data.message[0];
    const errorResponse = {
      error: error.data.error as string,
      message: errorMessage as string,
    };
    return errorResponse;
  }
};

export const confirmBooking = async (bookingId: string) => {
  const BACKEND_URL = getBackendUrl();

  try {
    const bookingResponse: Booking[] = await $fetch(
      `${BACKEND_URL}/booking/${bookingId}`,
      {
        method: "PATCH",
      },
    );
    return bookingResponse;
  } catch (error: any) {
    const errorMessage =
      typeof error.data.message === "string"
        ? error.data.message
        : error.data.message[0];
    const errorResponse = {
      error: error.data.error as string,
      message: errorMessage as string,
    };
    return errorResponse;
  }
};
