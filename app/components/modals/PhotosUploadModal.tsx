/** @format */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import PhotoUpload from "@/app/components/upload/PhotoUpload";
import ListingUploadCarousel from "@/app/components/carousels/ListingUploadCarousel";

interface PhotosUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  handlePhotoUpload: (selectedFiles: FileList | null) => Promise<void>;
  handleClearPhotosClick: () => void;
  imageURLs: string[];
}

const PhotosUploadModal: React.FC<PhotosUploadModalProps> = ({
  isOpen,
  onClose,
  handlePhotoUpload,
  handleClearPhotosClick,
  imageURLs,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Photos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PhotoUpload
            onPhotoSelect={handlePhotoUpload}
            onClearPhotos={handleClearPhotosClick}
          />
          {imageURLs.length > 0 && <ListingUploadCarousel images={imageURLs} />}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => {
              /* Update backend logic here */ onClose();
            }}
          >
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PhotosUploadModal;
