import { ReactNode } from 'react';
import type { ColorButtonKey } from '../interfaces';
import BaseButton from './BaseButton';
import BaseButtons from './BaseButtons';
import CardBox from './CardBox';
import CardBoxComponentTitle from './CardBoxComponentTitle';
import OverlayLayer from './OverlayLayer';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  buttonColor: ColorButtonKey;
  buttonLabel: string;
  isActive: boolean;
  children?: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
};

const CardBoxModal = ({
  title,
  buttonColor,
  buttonLabel,
  isActive,
  children,
  onConfirm,
  onCancel,
}: Props) => {
  const { t } = useTranslation('common');

  if (!isActive) {
    return null;
  }

  const footer = (
    <BaseButtons>
      <BaseButton label={buttonLabel} color={buttonColor} onClick={onConfirm} />
      {!!onCancel && (
        <BaseButton
          label={t('users.cancel')}
          color={buttonColor}
          outline
          onClick={onCancel}
        />
      )}
    </BaseButtons>
  );

  return (
    <OverlayLayer
      onClick={onCancel}
      className={onCancel ? 'cursor-pointer' : ''}
    >
      <CardBox
        className={`transition-transform shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50`}
        isModal
        footer={footer}
      >
        <CardBoxComponentTitle title={title}></CardBoxComponentTitle>

        <div className='space-y-3 mt-6'>{children}</div>
      </CardBox>
    </OverlayLayer>
  );
};

export default CardBoxModal;
