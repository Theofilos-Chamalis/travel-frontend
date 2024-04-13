import type { Travel } from "~/types";
import { getBackendUrl } from ".";

export const getAllTravels = async () => {
  const BACKEND_URL = getBackendUrl();

  try {
    const travelsResponse: Travel[] = await $fetch(
      `${BACKEND_URL}/destination`,
    );
    return travelsResponse;
  } catch (error) {
    return [];
  }
};

export const getTravelBySlug = async (slug: string | string[]) => {
  const BACKEND_URL = getBackendUrl();

  try {
    let travelSlug = slug;
    if (Array.isArray(slug)) {
      travelSlug = slug[0];
    }
    const travelResponse: Travel[] = await $fetch(
      `${BACKEND_URL}/destination/${travelSlug}`,
    );
    return travelResponse;
  } catch (error) {
    return [];
  }
};
