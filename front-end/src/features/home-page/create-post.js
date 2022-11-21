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
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import * as yup from "yup";
import { authContext } from "../../cores/context/auth";
import { createPost, updatePost, uploadImage } from "../../services/hiring-post.service";

const CreatePostSchema = yup.object().shape({
  title: yup.string().required("Title must be filled"),
  description: yup.string().required("Description must be filled"),
});

const CreatePostModal = ({ isOpen, onClose, data, reload }) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    mode: "all",
    resolver: yupResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      description: "",
      bannerUrl: "",
    },
  });

  useEffect(() => {
    if(data) {
      setValue('title', data?.title);
      setValue('description', data?.description);
      setValue('bannerUrl', data?.bannerUrl);
    }

    return () => {
      reset();
    }
  }, [data, setValue]);

  const {
    state: { token },
  } = useContext(authContext);

  const upload = async (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "ml_default");
      const imageRes = await uploadImage(formData);
      setValue("bannerUrl", imageRes.data.secure_url);
    }
  };

  const onSubmit = async (body) => {
    try {
      const response = await createPost({ ...body }, token);
      if (response.status === 201) {
        await reload();
        reset();
        toast.success("Create Succeed");
        onClose();
        return;
      }
      toast.error("Create Failed");
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async (body) => {
    try {
      const response = await updatePost(data?._id,{ ...body }, token);
      if (response.status === 200) {
        await reload();
        reset();
        toast.success("Update Succeed");
        onClose();
        return;
      }
      toast.error("Create Failed");
    } catch (error) {
      console.log(error);
    }
  };

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
            {!watch("bannerUrl") && (
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
            {watch("bannerUrl") && (
              <Box boxSize='sm' position='relative' margin='auto'>
                <IconButton
                  onClick={() => setValue("bannerUrl")}
                  position='absolute'
                  top='3px'
                  right='3px'
                  icon={<FaTimes />}
                />
                <Image src={getValues("bannerUrl")} />
              </Box>
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            disabled={!isValid}
            colorScheme='blue'
            onClick={data ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}
          >
            {data ? 'Update': 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
