import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "../../features/cabins/CreateCabinForm";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}
