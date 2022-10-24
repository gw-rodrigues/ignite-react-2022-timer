import { ButtonContainer, TButtonVariant } from './Button.styles';

interface IButtonVariants {
  variant?: TButtonVariant;
}

export function Button({ variant = 'primary' }: IButtonVariants) {
  return <ButtonContainer variant={variant} />;
}
