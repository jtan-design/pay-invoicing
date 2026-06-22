import type { ReactNode } from 'react';
import { Typography, IconButton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SideDrawerModalHeaderContainer } from './styles';

export interface SideDrawerModalHeaderProps {
  title: ReactNode;
  showCancel?: boolean;
  onBack?: () => void;
  onClose: () => void;
  isScrollable?: boolean;
  sx?: SxProps<Theme>;
}

export const SideDrawerModalHeader = ({
  title,
  showCancel = true,
  onBack,
  onClose,
  isScrollable,
  sx,
}: SideDrawerModalHeaderProps) => (
  <SideDrawerModalHeaderContainer showBackdrop={!!isScrollable} sx={sx}>
    {showCancel && (
      <IconButton onClick={onBack || onClose}>
        {onBack ? <ArrowBackIcon /> : <CloseIcon />}
      </IconButton>
    )}
    <Typography variant="h3" fontWeight={'700'}>
      {title}
    </Typography>
  </SideDrawerModalHeaderContainer>
);