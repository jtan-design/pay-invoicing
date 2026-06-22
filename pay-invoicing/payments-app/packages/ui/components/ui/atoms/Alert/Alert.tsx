import {
  AlertTitle,
  Box,
  IconButton,
  Alert as MuiAlert,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  CircularProgress,
  Slide,
} from '@mui/material';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import type {
  AlertProps as MuiAlertProps,
  SxProps,
  Theme,
} from '@mui/material';
import { useState, forwardRef } from 'react';
import type { ReactNode } from 'react';
import { useSnackbar } from 'notistack';
import type { SnackbarKey } from 'notistack';

interface AlertV2Props extends Omit<MuiAlertProps, 'action'> {
  /**
   * The title to display.
   */
  title?: string;
  /**
   * Is alert dimissable. If so, it will display a close icon on the top right of the alert.
   * @default false
   */
  dismissable?: boolean;
  /**
   * The size of the alert. 'small' is not really used, was only made to cater for notifications.
   * @default 'regular'
   */
  size?: 'small' | 'regular';
  /**
   * The position of the alert on the screen.
   */
  position?: 'top-right';
  /**
   * The name of the action to display.
   */
  actionName?: string;
  /**
   * Snackbar ID to close notifications. Only used for notifications.
   */
  snackbarId?: SnackbarKey; // used to close notifications and have the sliding animation.
  /**
   * Callback for when the action button is clicked.
   */
  action?: () => void;
  /**
   * Enable the action button loading state
   */
  actionLoading?: boolean;
  /**
   * Action button container style
   */
  actionSx?: SxProps;
  /**
   * Action button text style
   */
  actionTextSx?: SxProps;
  /**
   * Action button icon
   */
  actionIcon?: ReactNode;
  /**
   * Action button disabled
   */
  actionDisabled?: boolean;
  customCta?: ReactNode;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertV2Props>(({
  children,
  title,
  variant,
  sx,
  size = 'regular',
  dismissable = false,
  snackbarId,
  actionName,
  action,
  actionLoading,
  actionDisabled,
  actionTextSx,
  actionSx,
  actionIcon,
  customCta,
  onClose,
  position,
  ...rest
}: AlertV2Props, ref) => {
  const { closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    if (position === 'top-right') {
      setOpen(false); // Let the slide animation handle the onClose callback
    } else if (onClose) {
      onClose();
    } else if (snackbarId) {
      closeSnackbar(snackbarId);
    } else {
      setOpen(false);
    }
  };

  const onExited = () => {
    if (onClose) {
      onClose();
    }
  }

  const colorSchemes = {
    success: {
      backgroundColor: '#F0F9F5',
      borderColor: '#0D7E51',
      iconColor: '#0D7E51',
    },
    info: {
      backgroundColor: '#F3F8FE',
      borderColor: '#3A81F4',
      iconColor: '#3A81F4',
    },
    warning: {
      backgroundColor: '#FFF9F2',
      borderColor: '#FFA117',
      iconColor: '#FFA117',
    },
    error: {
      backgroundColor: '#FEF4F5',
      borderColor: '#D03643',
      iconColor: '#D03643',
    },
  };

  const currentScheme = colorSchemes[rest.severity || 'info'];

  const ActionButton = () => (
    <Button
      onClick={action}
      disabled={actionDisabled || actionLoading}
      sx={{
        p: 0,
        minWidth: 0,
        display: 'inline-flex',
        alignItems: 'center',
        alignSelf: 'flex-end',
        mr: size === 'small' ? 2 : 0,
        position: 'absolute',
        right: 50,
        top: 50,
        width: '100px',
        height: '100px',
        ...actionSx,
      }}
      startIcon={actionLoading ? <CircularProgress size={16} color="inherit" /> : actionIcon}
    >
      <Typography
        sx={{
          color:
            actionDisabled || actionLoading
              ? 'action.disabled'
              : 'primary.main',
          fontWeight: 'bold',
          fontSize: '12px',
          textTransform: 'capitalize',
          whiteSpace: 'nowrap',
          ...actionTextSx,
        }}
      >
        {actionName}
      </Typography>
      {!actionLoading && (
        <Box
          sx={{
            color: 'inherit',
            ml: 0.5,
            lineHeight: 0,
          }}
        >
          {actionIcon}
        </Box>
      )}
    </Button>
  );

  const alertSx: SxProps<Theme> = {
    boxShadow:
      size === 'small'
        ? '0px 4px 12px 1px rgba(0, 0, 0, 0.1), 0px 3px 10px 1px rgba(0, 0, 0, 0.1)'
        : '0px 1px 3px 1px rgba(0, 0, 0, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.03)',
    backgroundColor: currentScheme.backgroundColor,
    borderColor: currentScheme.borderColor,
    ...sx,
  };

  if (position === 'top-right') {
    (alertSx as any).position = 'fixed';
    (alertSx as any).top = 24;
    (alertSx as any).right = 24;
    (alertSx as any).zIndex = theme.zIndex.snackbar;
    (alertSx as any).minWidth = '300px';
  }

  const alertContent = (
    <MuiAlert
      ref={ref}
      sx={alertSx}
      variant={variant || 'outlined'}
      iconMapping={{
        success: <CheckCircleRoundedIcon sx={{ color: colorSchemes.success.iconColor }} />,
        info: <InfoRoundedIcon sx={{ color: colorSchemes.info.iconColor }} />,
        warning: <WarningRoundedIcon sx={{ color: colorSchemes.warning.iconColor }} />,
        error: <ErrorRoundedIcon sx={{ color: colorSchemes.error.iconColor }} />,
      }}
      {...rest}
    >
      <Stack spacing={1}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          spacing={1}
        >
          <Stack spacing={1} alignSelf={'center'}>
            {title && (
              <AlertTitle
                sx={{
                  fontWeight: 'bold',
                  mb: 0,
                }}
              >
                {title}
              </AlertTitle>
            )}
            {children && (
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: 14,
                }}
              >
                {children}
              </Typography>
            )}
          </Stack>
          <Stack
            justifyContent={dismissable || onClose ? 'space-between' : 'flex-end'}
            alignItems={size === 'small' ? 'flex-start' : 'flex-end'}
            direction={size === 'small' ? 'row-reverse' : 'column'}
          >
            {(dismissable || onClose) && (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                sx={{
                  color: 'rgba(0, 0, 0, 0.54)',
                  marginLeft: 0,
                  fontSize: 24,
                  padding: 0,
                }}
                onClick={handleClose}
              >
                <CloseRoundedIcon fontSize="inherit" />
              </IconButton>
            )}
            {!!customCta && !downSm && customCta}
          </Stack>
        </Stack>
        {!!customCta && downSm && customCta}
        {!!actionName && <ActionButton />}
      </Stack>
    </MuiAlert>
  );

  if (position === 'top-right') {
    return (
      <Slide direction="down" in={open} onExited={onExited} mountOnEnter unmountOnExit>
        {alertContent}
      </Slide>
    );
  }

  return (
    <>
      {open && alertContent}
    </>
  );
});