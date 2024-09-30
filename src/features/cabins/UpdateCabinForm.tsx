import { useUpdateCabin } from "./useUpdateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";

import { useForm } from "react-hook-form";
import { Cabin } from "../../types/cabin";

export default function UpdateCabinForm({ cabinToUpdate = {} as Cabin }) {
  const { id: updateId, ...updateValues } = cabinToUpdate;
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<Cabin>({ defaultValues: updateValues });
  const { errors } = formState;
  const { updateCabin, isUpdating } = useUpdateCabin();

  function onSubmit(data: Cabin) {
    updateId !== undefined &&
      updateCabin(
        { newCabinData: data, id: updateId },
        { onSuccess: (newCabinData) => reset(newCabinData[0]) }
      );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isUpdating}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isUpdating}
          {...register("max_capacity", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isUpdating}
          {...register("regular_price", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isUpdating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regular_price ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for cabin"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isUpdating}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          disabled={isUpdating}
          accept="image/*"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}
