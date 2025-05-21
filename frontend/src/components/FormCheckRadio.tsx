import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  type: 'checkbox' | 'radio' | 'switch';
  label?: string;
  className?: string;
  isRTL?: boolean;
};

const FormCheckRadio = (props: Props) => {
  const isRTL = props.isRTL;
  return (
    <label className={`${props.type} ${props.className}`}>
      {props.children}
      <span className='check' />
      <span className={`${isRTL ? 'pr-2' : 'pl-2'}`}>{props.label}</span>
    </label>
  );
};

export default FormCheckRadio;
