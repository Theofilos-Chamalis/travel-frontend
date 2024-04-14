<script lang="ts" setup>
/**
 * This page displays the details of a specific travel destination.
 * It also allows the user to book a trip and add it to the cart.
 */
import { getTravelBySlug, createBooking } from "~/services";
import type { Booking } from "~/types";

const { travelslug } = useRoute().params;
const { travels, showNotificationAction, addBookingAction } = useTravelStore();

/**
 * Fetch the travel destination data from the API and display it on the page or redirect to the homepage if not found.
 */
const travelFromSlug = await getTravelBySlug(travelslug);

if (travelFromSlug.length === 0) {
  await navigateTo("/", { redirectCode: 404 });
}

const tripData = travelFromSlug[0];
const imageUrl =
  travels.find((travel) => travel.slug === travelslug)?.image || "";
const moodsToDisplay = Object.fromEntries(
  Object.entries(tripData?.moods || {}).filter(([, value]) => value > 49),
);

/**
 * Methods to handle the booking process and show the booking notification
 */
const showAddToCartModalHandler = () => {
  const modal = document.getElementById("booking_modal") as HTMLDialogElement;
  modal?.showModal();
};

const addBookingToCartHandler = () => {
  const modal = document.getElementById("booking_modal") as HTMLDialogElement;

  const email = (
    document.querySelector('input[type="email"]') as HTMLInputElement
  ).value;
  const numberOfPeople = (
    document.querySelector('input[type="number"]') as HTMLInputElement
  ).value;

  createBooking({
    userEmail: email,
    numSeats: Number(numberOfPeople),
    destinationId: tripData?.id || "",
  }).then((bookingData) => {
    if (Array.isArray(bookingData) && bookingData.length === 0) {
      showNotificationAction({
        type: "error",
        message: "Booking failed! Please try again",
      });
      return;
    }

    if ("message" in bookingData && bookingData.message) {
      showNotificationAction({
        type: "error",
        message: `Booking failed!${bookingData.message}`,
      });
      return;
    }

    addBookingAction(bookingData as Booking[]);
    showNotificationAction({
      type: "success",
      message: "Booking successful! Pay now to confirm your booking",
    });
    modal?.close();
  });
};
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
      <img :src="imageUrl" class="max-w-xs rounded-lg shadow-2xl md:max-w-sm" />
      <div>
        <h1 class="text-pretty pt-4 text-5xl font-bold text-white md:pt-8">
          {{ tripData?.name }}
        </h1>
        <p class="text-pretty py-6">
          {{ tripData?.description }}
        </p>
        <div class="flex flex-col justify-between pb-8 md:flex-row">
          <div class="flex gap-4">
            <div
              class="badge badge-outline text-nowrap p-4 text-center text-green-400"
            >
              Price: ${{ tripData?.price }}
            </div>
            <div
              class="badge badge-outline p-4 text-center text-xs text-secondary md:text-sm"
            >
              {{ tripData?.startingDate }} to {{ tripData?.endingDate }}
            </div>
          </div>
          <div class="flex gap-4 pt-6 md:pt-0">
            <div v-for="(value, key, index) in moodsToDisplay" :key="index">
              <div class="badge badge-outline p-4 text-primary">
                {{ key }}
              </div>
            </div>
          </div>
        </div>
        <button
          class="btn btn-primary w-full text-white"
          @click="showAddToCartModalHandler"
        >
          Book Now
        </button>
      </div>
      <BookingModal
        :travel="tripData"
        :add-booking-to-cart-handler="addBookingToCartHandler"
      />
    </div>
  </div>
</template>
