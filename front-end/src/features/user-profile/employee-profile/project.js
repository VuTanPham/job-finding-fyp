import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
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
  import { useContext, useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { toast } from "react-toastify";
  import * as yup from "yup";
  import { authContext } from "../../../cores/context/auth";
  import { addNewProject } from "../../../services/profile.service";
  
  const ProjectValidateSchema = yup.object().shape({
    name: yup.string().required("Company name must be filled"),
    repositoryUrl: yup.string().required("Project url must be filled"),
    projectDescription: yup.string().required("Description must be filled"),
    startDate: yup.date().required("Start date must be filled"),
    endDate: yup.date().required("End date must be filled"),
  });
  
  const ProjectModal = ({ isOpen, onClose, data, reload }) => {
    const {
      formState: { errors, isValid },
      handleSubmit,
      register,
      reset,
      setValue,
      clearErrors,
    } = useForm({
      mode: "all",
      resolver: yupResolver(ProjectValidateSchema),
      defaultValues: {
        name: "",
        projectDescription: "",
        startDate: null,
        endDate: null,
        repositoryUrl: "",
      },
    });
  
    useEffect(() => {
      //   if (data) {
      //     setValue("title", data?.title);
      //     setValue("description", data?.description);
      //     setValue("bannerUrl", data?.bannerUrl);
      //   }
  
      return () => {
        reset();
        clearErrors();
      };
    }, [data, setValue]);
  
    const {
      state: { token, user },
    } = useContext(authContext);
  
    const onSubmit = async (body) => {
      try {
        const response = await addNewProject(
          user?._id,
          { ...body },
          token
        );
        if (response.status === 201) {
          await reload();
          reset();
          toast.success("Add Project Succeed");
          onClose();
          return;
        }
        toast.error("Add Project Failed");
      } catch (error) {
        console.log(error);
      }
    };
  
    const onUpdate = async (body) => {
      // try {
      //   const response = await updatePost(data?._id, { ...body }, token);
      //   if (response.status === 200) {
      //     await reload();
      //     reset();
      //     toast.success("Update Succeed");
      //     onClose();
      //     return;
      //   }
      //   toast.error("Create Failed");
      // } catch (error) {
      //   console.log(error);
      // }
    };
  
    return (
      <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text>Project Name:</Text>
              <FormControl isInvalid={errors.companyName}>
                <Input {...register("name")} placeholder='Project Name' />
                <ErrorMessage
                  errors={errors}
                  name='name'
                  render={({ message }) => (
                    <FormErrorMessage>{message}</FormErrorMessage>
                  )}
                />
              </FormControl>
              <Text>Project repository:</Text>
              <FormControl isInvalid={errors.companyName}>
                <Input {...register('repositoryUrl')} placeholder='Project Link' />
                <ErrorMessage
                  errors={errors}
                  name='repositoryUrl'
                  render={({ message }) => (
                    <FormErrorMessage>{message}</FormErrorMessage>
                  )}
                />
              </FormControl>
              <Text>Project Description:</Text>
              <FormControl isInvalid={errors.description}>
                <Textarea
                  {...register("projectDescription")}
                  placeholder='Explain about your project?'
                />
                <ErrorMessage
                  errors={errors}
                  name='projectDescription'
                  render={({ message }) => (
                    <FormErrorMessage>{message}</FormErrorMessage>
                  )}
                />
              </FormControl>
              <Text>Start Date:</Text>
              <FormControl>
                <Input
                  {...register("startDate")}
                  type='date'
                  placeholder='Start Date'
                />
              </FormControl>
              <Text>End Date:</Text>
              <FormControl>
                <Input
                  {...register("endDate")}
                  type='date'
                  placeholder='End Date'
                />
              </FormControl>
            </Box>
          </ModalBody>
  
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
            //   disabled={!isValid}
              colorScheme='blue'
              onClick={data ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}
            >
              {data ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ProjectModal;
  