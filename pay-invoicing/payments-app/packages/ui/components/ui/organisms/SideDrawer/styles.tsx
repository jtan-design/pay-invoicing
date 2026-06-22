import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';

interface SideDrawerContainerProps {
  width: number | string;
}

export const SideDrawerModalContainer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'width',
})<SideDrawerContainerProps>(({ theme, width }) => ({
  '& .MuiDrawer-paper': {
    width: typeof width === 'number' ? `${width}px` : width,
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(244, 245, 246, 0.8)',
    backdropFilter: 'blur(10px)',
  },
}));

export const SideDrawerModalHeaderContainer = styled('div')<{
  showBackdrop?: boolean;
}>`
  display: flex;

  align-items: center;
  gap: 16px;

  padding: 16px;

  background-color: ${({ theme }) => theme.palette.background.paper};

  box-shadow: ${({ showBackdrop }) =>
    showBackdrop
      ? '0px 4px 12px rgba(0, 0, 0, 0.1)'
      : '0px 1px 3px 0px rgba(0, 0, 0, 0.03), 0px 1px 3px 1px rgba(0, 0, 0, 0.05)'};
`;

export const SideDrawerModalContentContainer = styled(Box)`
  flex-grow: 1;
  overflow: auto;
  padding: 24px 32px;
`;

export const SideDrawerModalActions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
`;

export const ScrollPromptContainer = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
`;