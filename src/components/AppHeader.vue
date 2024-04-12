<script lang="ts" setup>
import { useTravelStore } from "../stores/travels";
const { travels } = useTravelStore();
</script>

<template>
  <div class="navbar rounded-lg bg-neutral text-neutral-content">
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
          <li><a>Item 1</a></li>
          <li>
            <a>Parent</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
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
          <span class="badge indicator-item badge-primary badge-xs"></span>
        </div>
      </div>
      <div
        tabindex="0"
        class="card dropdown-content card-compact z-[1] mt-56 w-52 border-2 border-primary bg-base-100 shadow"
      >
        <div class="card-body">
          <span class="text-lg font-bold text-white">No items in cart</span>
          <span class="text-info">Subtotal: $0</span>
          <div class="card-actions">
            <button class="btn btn-primary btn-block text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
