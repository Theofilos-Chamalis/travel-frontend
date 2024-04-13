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

export type BookingResult = {
  nameShort: string;
  message: string;
};

export type BookingResultsCategorized = {
  success: BookingResult[];
  failed: BookingResult[];
};

export type BookingCreatePayload = {
  destinationId: string;
  userEmail: string;
  numSeats: number;
};
