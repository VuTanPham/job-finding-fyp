import {
  Input,
  FormControl,
  Box,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendMail } from "../../services/mail.serivce";

const OfferDialog = ({ isOpen, onClose, employeeId, companyId, token }) => {
  const [address, setAddress] = useState("");

  const onSend = async () => {
    try {
      const response = await sendMail(employeeId, companyId, address, token);
      if (response.status === 200) {
        toast.success("offer sent");
        setAddress("");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Your Company Address</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormControl isInvalid={!address}>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Company'
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={onSend} disabled={!address} colorScheme='blue'>
            Send Offer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OfferDialog;
