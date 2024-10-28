import { Group, Loader, Modal, Text } from "@mantine/core";

const PageLoaderModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal opened={isOpen} onClose={onClose}>
      <Group wrap="nowrap">
        <Text>Loading...</Text>
        <Loader />
      </Group>
    </Modal>
  );
};

export default PageLoaderModal;
