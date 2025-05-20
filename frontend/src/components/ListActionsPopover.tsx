import React from 'react';
import Button from '@mui/material/Button';
import BaseIcon from './BaseIcon';
import {
  mdiDotsVertical,
  mdiEye,
  mdiPencilOutline,
  mdiTrashCan,
} from '@mdi/js';
import Popover from '@mui/material/Popover';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  itemId: string;
  onDelete: (id: string) => void;
  hasUpdatePermission: boolean;
  className?: string;
  iconClassName?: string;
  pathEdit: string;
  pathView: string;
};

const ListActionsPopover = ({
  itemId,
  onDelete,
  hasUpdatePermission,
  className,
  iconClassName,
  pathEdit,
  pathView,
}: Props) => {
  const { t, i18n } = useTranslation('common');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const linkView = pathView;
  const linkEdit = pathEdit;
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const isRTL = i18n.language === 'ar';

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        className={`rounded-full  ${className}`}
        size={'small'}
      >
        <BaseIcon
          className={`text-black dark:text-white ${iconClassName}`}
          w='w-10'
          h='h-10'
          size={24}
          path={mdiDotsVertical}
        />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={'flex flex-col'}>
          <Button
            {...(isRTL
              ? { endIcon: <BaseIcon path={mdiEye} size={24} /> }
              : { startIcon: <BaseIcon path={mdiEye} size={24} /> })}
            className='w-full MuiButton-colorInherit'
            href={linkView}
            sx={{
              justifyContent: isRTL ? 'end' : 'start',
            }}
          >
            {t('users.view')}
          </Button>
          {hasUpdatePermission && (
            <Button
              {...(isRTL
                ? { endIcon: <BaseIcon path={mdiPencilOutline} size={24} /> }
                : {
                    startIcon: <BaseIcon path={mdiPencilOutline} size={24} />,
                  })}
              className='w-full MuiButton-colorInherit'
              href={linkEdit}
              sx={{
                justifyContent: isRTL ? 'end' : 'start',
              }}
            >
              {t('users.edit')}
            </Button>
          )}
          {hasUpdatePermission && (
            <Button
              {...(isRTL
                ? { endIcon: <BaseIcon path={mdiTrashCan} size={24} /> }
                : { startIcon: <BaseIcon path={mdiTrashCan} size={24} /> })}
              className='MuiButton-colorInherit'
              onClick={() => {
                handleClose();
                onDelete(itemId);
              }}
              sx={{
                justifyContent: isRTL ? 'end' : 'start',
              }}
            >
              {t('users.delete')}
            </Button>
          )}
        </div>
      </Popover>
    </>
  );
};

export default ListActionsPopover;
