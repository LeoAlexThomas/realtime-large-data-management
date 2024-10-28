import { notifications } from "@mantine/notifications";
import { NotificationProps } from "@mantine/core";

export enum ToastStatus {
  info = "info",
  warning = "warning",
  success = "success",
  error = "error",
}
export const getStyles = (status: ToastStatus) => {
  switch (status) {
    case ToastStatus.info:
      return {
        color: "blue",
      };
    case ToastStatus.warning:
      return {
        color: "orange",
      };
    case ToastStatus.success:
      return {
        color: "green",
      };
    case ToastStatus.error:
      return {
        color: "red",
      };
  }
};
export const useCustomToast = () => {
  const showToast = ({
    message,
    status = ToastStatus.success,
    ...props
  }: {
    message: string;
    status: ToastStatus;
  } & NotificationProps) => {
    notifications.show({
      message,
      id: "toast-id",
      withCloseButton: true,
      autoClose: 3000,
      loading: false,
      ...getStyles(status),
      ...props,
    });
  };

  return { showToast };
};
