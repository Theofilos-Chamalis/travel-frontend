export type NotificationType = "success" | "error" | "warning" | "info" | "";
export type NotificationMessage = string;
export type NotificationActionPayload = {
  type: NotificationType;
  message: NotificationMessage;
};
