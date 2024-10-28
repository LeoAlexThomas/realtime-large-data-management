import PageLoaderModal from "@/components/PageLoaderModal";
import { createContext, useContext, useState } from "react";

interface PageLoaderProps {
  isModalOpen: boolean;
  showPageLoader: () => void;
  hidePageLoader: () => void;
}

const PageLoaderContext = createContext<PageLoaderProps>({
  isModalOpen: false,
  showPageLoader: () => {},
  hidePageLoader: () => {},
});

const PageLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <PageLoaderContext.Provider
      value={{
        isModalOpen,
        showPageLoader: onModalOpen,
        hidePageLoader: onModalClose,
      }}
    >
      {children}
      <PageLoaderModal isOpen={isModalOpen} onClose={onModalClose} />
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = () => useContext(PageLoaderContext);

export default PageLoaderProvider;
