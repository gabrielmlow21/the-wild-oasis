import styled from "styled-components";
import { format, isToday } from "date-fns";
import { Status } from "../../types/booking";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    // id: booking_id,
    // created_at,
    start_date,
    end_date,
    num_nights,
    // num_guests,
    total_price,
    status,
    guests: { full_name: guest_name, email },
    cabins: { name: cabin_name },
  },
}) {
  const statusToTagName: Record<Status, string> = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabin_name}</Cabin>

      <Stacked>
        <span>{guest_name}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}{" "}
          &rarr; {num_nights} night stay
        </span>
        <span>
          {format(new Date(start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status as Status]}>
        {status.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(total_price)}</Amount>
    </Table.Row>
  );
}

export default BookingRow;
