import { Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  ArrowForwardIos,
  DesktopWindowsOutlined,
  FileUploadOutlined,
  DescriptionOutlined,
} from '@mui/icons-material';
import { theme } from '@packages/ui';

interface OptionCardProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function OptionCard({ icon, label, onClick }: OptionCardProps) {
  return (
    <Paper
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 3,
        borderRadius: '6px',
        boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.05), 0px 2px 3px 0px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0px 2px 12px 0px rgba(0,0,0,0.1), 0px 4px 6px 0px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.shade30p,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            letterSpacing: '0.2px',
          }}
        >
          {label}
        </Typography>
      </Box>
      <ArrowForwardIos
        sx={{
          fontSize: 18,
          color: theme.palette.primary.main,
        }}
      />
    </Paper>
  );
}

export function SupplierPayment() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 5 }}>
      {/* Back link */}
      <Box
        onClick={() => navigate('/account')}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          cursor: 'pointer',
          color: theme.palette.primary.main,
          mb: 5,
        }}
      >
        <ArrowBack sx={{ fontSize: 20 }} />
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.primary.main,
            letterSpacing: '0.2px',
          }}
        >
          Payment
        </Typography>
      </Box>

      {/* Heading */}
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.text.primary,
          mb: 1,
        }}
      >
        Supplier payment
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.primary,
          mt: 3,
          mb: 4,
        }}
      >
        How would you like to enter payee information?
      </Typography>

      {/* Single payment section */}
      <Box sx={{ maxWidth: 400 }}>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Single payment
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <OptionCard
            icon={
              <DesktopWindowsOutlined
                sx={{ fontSize: 22, color: theme.palette.primary.main }}
              />
            }
            label="Enter manually"
          />
          <OptionCard
            icon={
              <FileUploadOutlined
                sx={{ fontSize: 22, color: theme.palette.primary.main }}
              />
            }
            label="Upload invoice"
            onClick={() => navigate('/account/new-payment/upload-invoice')}
          />
        </Box>

        {/* Batch payments section */}
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.text.primary,
            mt: 4,
            mb: 2,
          }}
        >
          Batch payments
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <OptionCard
            icon={
              <DescriptionOutlined
                sx={{ fontSize: 22, color: theme.palette.primary.main }}
              />
            }
            label="Import from ABA"
          />
          <OptionCard
            icon={
              <Box
                component="svg"
                viewBox="0 0 22 6.34"
                sx={{ width: 22, height: 10 }}
              >
                <path
                  d="M3.76 3.16L6.16.75a.3.3 0 00-.3-.5.43.43 0 00-.31.13L3.15 2.55.74.14A.43.43 0 00.43.01a.3.3 0 00-.3.13.3.3 0 00-.02.36.3.3 0 00.13.13.3.3 0 00.13.13L2.53 3.16.13 5.57a.3.3 0 00.3.5.43.43 0 00.31-.13l3.15-2.55 2.4 2.4a.43.43 0 00.31.13.3.3 0 00.3-.13.3.3 0 00.02-.36.3.3 0 00-.13-.13L3.76 3.16zm14.29 0a.78.78 0 101.56 0 .78.78 0 10-1.56 0zm-1.49 0a2.27 2.27 0 104.53 0 2.27 2.27 0 10-4.53 0zm-.89 0a3.16 3.16 0 106.32 0 3.16 3.16 0 10-6.32 0zm-.22-3.1h-.13a1.3 1.3 0 00-1.1.37.43.43 0 00-.85.09l.01 5.33a.43.43 0 00.86 0V2.57c0-1.09.1-1.53 1.03-1.65h.18a.43.43 0 00.43-.43.43.43 0 00-.43-.43zM7.18 2.64a2.27 2.27 0 014.43 0H7.18zm5.32-.08a3.16 3.16 0 00-5.73-.74A3.16 3.16 0 006.24 3.19c0 .25.03.51.09.76a3.16 3.16 0 002.68 2.36c.38.05.75.03 1.14-.07.33-.08.65-.21.94-.4.31-.2.56-.46.81-.77l.01-.01a.43.43 0 00-.05-.66.43.43 0 00-.64.1 3.5 3.5 0 01-.15.2 2.7 2.7 0 01-.62.5 2.27 2.27 0 01-1.06.27A2.27 2.27 0 017.14 3.57l-.01-.06h4.49c.62-.01.95-.45.86-.95z"
                  fill={theme.palette.secondary.main}
                />
              </Box>
            }
            label="Import from Xero"
          />
        </Box>
      </Box>
    </Box>
  );
}
