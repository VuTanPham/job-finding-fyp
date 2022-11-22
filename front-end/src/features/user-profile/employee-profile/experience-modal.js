import {
  Box,
  Button,
  Checkbox,
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
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { authContext } from "../../../cores/context/auth";
import { addNewExperience, updateExperience } from "../../../services/profile.service";

const ExperienceValidateSchema = yup.object().shape({
  companyName: yup.string().required("Company name must be filled"),
  jobPosition: yup.string().required("Job Position must be filled"),
  description: yup.string().required("Description must be filled"),
  startDate: yup.date().required("Start date must be filled"),
});

const ExperienceModal = ({ isOpen, onClose, data, reload }) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    setValue,
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: yupResolver(ExperienceValidateSchema),
    defaultValues: {
      companyName: "",
      jobPosition: "",
      description: "",
      startDate: null,
      endDate: null,
    },
  });

  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    if (data) {
      setValue("companyName", data?.companyName);
      setValue("jobPosition", data?.jobPosition);
      setValue("description", data?.description);
      setIsCurrent(data?.isCurrent);
      setValue("startDate", moment(data?.startDate).format("YYYY-MM-DD"));
      setValue("endDate", moment(data?.endDate).format("YYYY-MM-DD"));
    }

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
      const response = await addNewExperience(
        user?._id,
        { ...body, isCurrent },
        token
      );
      if (response.status === 201) {
        await reload();
        reset();
        toast.success("Add Experience Succeed");
        onClose();
        return;
      }
      toast.error("Add Experience Failed");
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async (body) => {
    try {
      const response = await updateExperience(user?._id, data?._id, { ...body }, token);
      if (response.status === 204) {
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
        <ModalHeader>{data ? 'Update': 'Add New'} Experience</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text>Company Name:</Text>
            <FormControl isInvalid={errors.companyName}>
              <Input {...register("companyName")} placeholder='Company Name' />
              <ErrorMessage
                errors={errors}
                name='companyName'
                render={({ message }) => (
                  <FormErrorMessage>{message}</FormErrorMessage>
                )}
              />
            </FormControl>
            <Text>Job Position:</Text>
            <FormControl isInvalid={errors.jobPosition}>
              <Input {...register("jobPosition")} placeholder='Job Position' />
              <ErrorMessage
                errors={errors}
                name='jobPosition'
                render={({ message }) => (
                  <FormErrorMessage>{message}</FormErrorMessage>
                )}
              />
            </FormControl>
            <Text>Job Description:</Text>
            <FormControl isInvalid={errors.description}>
              <Textarea
                {...register("description")}
                placeholder='What are you doing here?'
              />
              <ErrorMessage
                errors={errors}
                name='description'
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
            <Text>Is Your Current Job:</Text>
            <FormControl>
              <Checkbox
                size='md'
                colorScheme='green'
                value={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
                defaultChecked={isCurrent}
              >
                Yes
              </Checkbox>
            </FormControl>
            {!isCurrent && (
              <>
                <Text>End Date:</Text>
                <FormControl>
                  <Input
                    {...register("endDate")}
                    type='date'
                    placeholder='End Date'
                  />
                </FormControl>
              </>
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
            {data ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExperienceModal;
