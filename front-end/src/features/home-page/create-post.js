import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import * as yup from "yup";
import { createPost, uploadImage } from "../../services/hiring-post.service";

const CreatePostSchema = yup.object().shape({
  title: yup.string().required("Title must be filled"),
  description: yup.string().required("Description must be filled"),
});

const CreatePostModal = ({ isOpen, onClose }) => {
  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm({
    mode: "all",
    resolver: yupResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [file, setFile] = useState(null);

  const upload = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (body) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        console.log(body);
        formData.append('upload_preset', 'ml_default');
        const imageRes = await uploadImage(formData);
        const response = await createPost({...body, bannerUrl: imageRes.data.secure_url});
        if(response.status === 201) {
            toast.success('Create Succeed');
            reset();
            onClose();
            return;
        }
        toast.error('Create Failed')
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text>Title:</Text>
            <FormControl isInvalid={errors.title}>
            <Input {...register("title")} placeholder='title' />
            <ErrorMessage
              errors={errors}
              name='title'
              render={({ message }) => (
                <FormErrorMessage>{message}</FormErrorMessage>
              )}
            />
            </FormControl>
            <Text>Description:</Text>
            <FormControl isInvalid={errors.description}>
            <Textarea
              {...register("description")}
              placeholder='Here is a sample placeholder'
            />
            <ErrorMessage
              errors={errors}
              name='description'
              render={({ message }) => (
                <FormErrorMessage>{message}</FormErrorMessage>
              )}
            />
            </FormControl>
            <Text>Image:</Text>
            {!file && (
              <>
                <input
                  accept='image/png, image/gif, image/jpeg'
                  type='file'
                  id='upload'
                  onChange={upload}
                  style={{ display: "none" }}
                />
                <IconButton
                  as='label'
                  htmlFor='upload'
                  aria-label='upload'
                  icon={<FaUpload />}
                />
              </>
            )}
            {file && (
              <Box boxSize='sm' position="relative" margin="auto">
                <IconButton onClick={() => setFile(null)} position="absolute" top="3px" right="3px" icon={<FaTimes />} />
                <Image src={URL.createObjectURL(file)} />
              </Box>
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button disabled={!isValid} colorScheme='blue' onClick={handleSubmit(onSubmit)}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
