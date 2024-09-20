import styled, { css } from "styled-components";

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "horizontal" | "vertical";
}

const Row = styled.div<RowProps>`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;