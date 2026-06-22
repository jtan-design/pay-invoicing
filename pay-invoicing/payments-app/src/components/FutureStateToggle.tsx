import { Box, Button, Typography } from '@mui/material';

interface FutureStateToggleProps {
  state: 'current' | 'future';
  onChange: (state: 'current' | 'future') => void;
}

export const FutureStateToggle = ({ state, onChange }: FutureStateToggleProps) => (
  <Box
    sx={{
      position: 'fixed',
      bottom: 20,
      left: 296,
      zIndex: 1200,
      bgcolor: 'white',
      borderRadius: '24px',
      p: '4px',
      boxShadow: '0px 2px 12px rgba(0,0,0,0.10)',
      border: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      gap: '2px',
    }}
  >
    <Typography sx={{ fontSize: 11, color: '#94a3b8', px: 1, fontWeight: 500 }}>
      View:
    </Typography>
    {(['current', 'future'] as const).map((s) => (
      <Button
        key={s}
        onClick={() => onChange(s)}
        size="small"
        sx={{
          borderRadius: '20px',
          px: 1.5,
          py: 0.5,
          minWidth: 'auto',
          fontSize: 12,
          fontWeight: 500,
          textTransform: 'none',
          bgcolor: state === s ? '#3866b0' : 'transparent',
          color: state === s ? 'white' : '#526973',
          '&:hover': { bgcolor: state === s ? '#3866b0' : 'rgba(0,0,0,0.04)' },
        }}
      >
        {s === 'current' ? 'Current' : 'Future state'}
      </Button>
    ))}
  </Box>
);
