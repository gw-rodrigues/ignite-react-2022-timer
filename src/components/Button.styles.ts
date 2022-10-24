import styled, { css } from 'styled-components';

export type TButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface IButtonContainerProps {
  variant: TButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
};

export const ButtonContainer = styled.button<IButtonContainerProps>`
  width: 100px;
  height: 40px;

  ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }}
`;
