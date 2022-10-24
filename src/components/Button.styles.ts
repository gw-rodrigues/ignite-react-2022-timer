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

  border-radius: 8px;
  margin-right: 1rem;

  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};

  /*
  ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }}
  */
`;
