import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

export default function UpdateSettingsForm() {
  const {
    settings: {
      min_booking_length,
      max_booking_length,
      max_guests_per_booking,
      breakfast_price,
    } = {},
    isLoading,
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    field:
      | "min_booking_length"
      | "max_booking_length"
      | "max_guests_per_booking"
      | "breakfast_price"
  ) => {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={min_booking_length}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={max_booking_length}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={max_guests_per_booking}
          onBlur={(e) => handleUpdate(e, "max_guests_per_booking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfast_price}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}
