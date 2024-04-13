<script lang="ts" setup>
import { confirmBooking } from "~/services";
import type {
  BookingResultsCategorized,
  NotificationType,
  NotificationMessage,
} from "~/types";
const { BACKEND_URL } = useRuntimeConfig().public;
const travelStore = useTravelStore();
const { showNotificationAction } = travelStore;
const { travels, bookings } = storeToRefs(travelStore);

const unConfirmedBookings = computed(() =>
  bookings?.value
    ?.filter((booking) => !booking[0].confirmed)
    .map((booking) => {
      return {
        ...booking[0],
        travel: travels?.value?.find(
          (travel) => travel.id === booking[0].destinationId,
        ),
      };
    }),
);

const totalPrice = computed(() =>
  unConfirmedBookings?.value?.reduce(
    (total, booking) => total + (booking.travel?.price || 0) * booking.numSeats,
    0,
  ),
);

const cartItems = computed(() =>
  unConfirmedBookings?.value?.map(
    (booking) =>
      `✈️ ${booking.travel?.nameShort} X ${booking.numSeats} seats = $${(booking.travel?.price || 0) * booking.numSeats}`,
  ),
);

const showPaymentNotification = (bookingResults: BookingResultsCategorized) => {
  let message: NotificationMessage = "";
  let notificationType: NotificationType = "";

  if (bookingResults.success.length > 0 && bookingResults.failed.length > 0) {
    const bookingPlural =
      bookingResults.success.length > 1 ? "bookings" : "booking";
    message = `Payment was partially successful! The ${bookingResults.failed
      .map((booking) => booking.nameShort)
      .join(", ")} ${bookingPlural} failed while the rest were successful`;
    notificationType = "warning";
  } else if (bookingResults.failed.length > 0) {
    message += `Payment was unsuccessful! Failed to book: ${bookingResults.failed
      .map((booking) => booking.nameShort)
      .join(", ")}`;
  } else {
    message = "Payment was successful! Enjoy your trip!";
    notificationType = "success";
  }

  showNotificationAction({
    type: notificationType,
    message,
  });
};

const checkoutHandler = async () => {
  if (!unConfirmedBookings?.value || unConfirmedBookings.value.length === 0) {
    return;
  }

  const bookingResults: BookingResultsCategorized = {
    success: [],
    failed: [],
  };

  for (const booking of unConfirmedBookings.value) {
    await confirmBooking(booking.id).then((bookingData) => {
      if ("message" in bookingData && bookingData.message) {
        bookingResults.failed.push({
          nameShort: booking.travel?.nameShort || "",
          message: bookingData.message,
        });
      } else {
        bookingResults.success.push({
          nameShort: booking.travel?.nameShort || "",
          message: "",
        });
      }
    });
  }

  showPaymentNotification(bookingResults);
  setTimeout(() => {
    bookings.value = [];
  }, 5000);
};
</script>

<template>
  <div
    class="navbar sticky top-0 z-10 rounded-lg bg-neutral text-neutral-content"
  >
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li class="text-white">
            <NuxtLink :to="'/'">Home</NuxtLink>
          </li>
          <li>
            <p class="text-white">Trips</p>
            <ul v-if="!travels || travels.length === 0" class="p-2">
              <li>
                <p class="w-full text-nowrap text-center">No available trips</p>
              </li>
            </ul>
            <ul v-else class="p-2">
              <li v-for="travel in travels" :key="travel.id">
                <NuxtLink
                  :to="`/travels/${travel.slug}`"
                  class="w-full text-nowrap text-center"
                  >{{ travel.nameShort }}</NuxtLink
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <NuxtLink class="btn btn-ghost text-xl text-white" :to="'/'"
        >Travel Destinations</NuxtLink
      >
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li class="text-white">
          <NuxtLink :to="'/'">Home</NuxtLink>
        </li>
        <li>
          <details>
            <summary class="text-white">Trips</summary>
            <ul v-if="!travels || travels.length === 0" class="p-2">
              <li>
                <p class="w-full text-nowrap text-center">No available trips</p>
              </li>
            </ul>
            <ul v-else class="p-2">
              <li v-for="travel in travels" :key="travel.id">
                <NuxtLink
                  :to="`/travels/${travel.slug}`"
                  class="w-full text-nowrap text-center"
                  >{{ travel.nameShort }}</NuxtLink
                >
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
    <div class="dropdown dropdown-end navbar-end flex">
      <div tabindex="0" role="button" class="btn btn-circle btn-ghost">
        <div class="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              color="white"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span
            v-if="unConfirmedBookings.length > 0"
            class="badge indicator-item badge-primary badge-xs"
          ></span>
        </div>
      </div>
      <div
        tabindex="0"
        :class="[
          'card dropdown-content card-compact z-[1] w-80 border-2 border-primary bg-base-100 shadow',
          'mt-' + (64 + unConfirmedBookings.length * 8),
        ]"
      >
        <div class="card-body">
          <span class="pb-2 text-lg font-bold text-white"
            >{{ unConfirmedBookings.length }} items in cart</span
          >
          <ul>
            <li
              v-for="(cartItem, index) in cartItems"
              :key="index"
              class="text-nowrap text-white"
            >
              {{ cartItem }}
            </li>
          </ul>
          <span class="py-2 text-green-400">Subtotal: ${{ totalPrice }}</span>
          <div class="card-actions">
            <button
              class="btn btn-primary btn-block text-white"
              @click="checkoutHandler"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
