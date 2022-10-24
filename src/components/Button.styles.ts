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
  border: 0;
  border-radius: 8px;
  margin: 1rem;

  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};

  /*
  ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }}
  */
`;
