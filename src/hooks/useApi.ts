import { usePageLoader } from "@/contexts/PageLoaderProvider";
import { ToastStatus, useCustomToast } from "@/hooks/useToast";
import { AxiosError } from "axios";

export const getApiErrorMessage = (e: unknown, message?: string) => {
  if (e instanceof AxiosError) {
    const errResponse = e?.response?.data;
    if (Array.isArray(errResponse?.message)) {
      return errResponse?.message?.join(", ");
    }
    if (errResponse?.message) {
      return errResponse.message;
    }
    if (e?.request && navigator && !navigator.onLine) {
      return "You seem to be offline. Please check your internet connection";
    }
  }
  return message ?? "Error";
};

const successToastId = "successToastId";
const errorToastId = "errorToastId";

export default function useApi() {
  const { showToast } = useCustomToast();
  const { showPageLoader, hidePageLoader } = usePageLoader();

  const makeApiCall = async function <T>({
    apiFn,
    onSuccessFn,
    onFailureFn,
    successMsg,
    showLoader = true,
    failureMessage,
    showFailureMsg = true,
  }: {
    apiFn: () => Promise<T>;
    onSuccessFn?: (response: T) => void;
    onFailureFn?: (error: unknown) => void;
    successMsg?: { title?: string; description: string; duration?: number };
    showLoader?: boolean;
    failureMessage?: string;
    showFailureMsg?: boolean;
  }) {
    if (showLoader) {
      showPageLoader();
    }
    try {
      const response = await apiFn();
      hidePageLoader();
      if (successMsg) {
        showToast({
          title: successMsg.title,
          message: successMsg.description,
          id: successToastId,
          status: ToastStatus.success,
        });
      }

      if (onSuccessFn) {
        onSuccessFn(response);
      }
    } catch (e: unknown) {
      hidePageLoader();
      console.log("error");
      console.log(e);
      if (onFailureFn) {
        onFailureFn(e);
      }
      if (!showFailureMsg) {
        return;
      }
      showToast({
        id: errorToastId,
        message: getApiErrorMessage(e, failureMessage),
        status: ToastStatus.error,
      });
    }
  };

  return { makeApiCall };
}
