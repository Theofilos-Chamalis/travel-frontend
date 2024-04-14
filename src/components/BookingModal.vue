<script lang="ts" setup>
/**
 * This component provides a modal dialog to add a booking to the cart using the addBookingToCartHandler prop.
 */
import type { Travel } from "~/types";

const props = defineProps<{
  travel: Travel;
  addBookingToCartHandler: () => void;
}>();
const { name } = props.travel;
</script>

<template>
  <dialog id="booking_modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-3">
          X
        </button>
      </form>
      <h3 class="-mt-3 text-center text-xl font-bold text-white">
        Add booking to cart
      </h3>
      <p class="py-8 text-gray-200">
        Please fill out your email and the number of people that will be joining
        you on the {{ name }} trip to create your booking.
      </p>
      <div class="flex flex-col gap-4">
        <label class="input input-bordered flex items-center gap-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="white"
            class="h-4 w-4 opacity-90"
          >
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
            />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
            />
          </svg>
          <input
            type="email"
            class="grow text-white"
            placeholder="Booking email"
          />
        </label>
        <label class="input input-bordered flex items-center gap-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="white"
            class="h-4 w-4 opacity-90"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
            />
          </svg>
          <input
            type="number"
            class="grow text-white"
            placeholder="Number of people"
          />
        </label>
      </div>
      <p class="pb-8 pt-4 italic">
        Note: Your booking will be confirmed once you have made the payment and
        will be available in your cart for 15 minutes.
      </p>
      <button
        class="btn btn-primary w-full text-white"
        @click="addBookingToCartHandler"
      >
        Add booking to cart
      </button>
    </div>
  </dialog>
</template>
