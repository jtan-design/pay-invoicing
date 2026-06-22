import { Box, Typography } from '@mui/material';

const DashboardHeading = ({ title, points }: { title: string, points: string }) => {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        maxWidth: '1200px',
        alignItems: 'center',
        gap: 4, // If using MUI v5 and theme.spacing is 8px, this is 32px. Adjust as needed.
        position: 'relative',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, flexGrow: 1 }}>
        <Typography
          sx={{
            fontWeight: 'medium',
            fontSize: { xs: '18px', sm: '24px' },
            color: '#283e48',
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '24px', sm: '32px' },
            color: '#283e48',
            textAlign: 'right',
            letterSpacing: '0',
            lineHeight: '22.4px',
          }}
        >
          {points}
        </Typography>
        <Typography
          variant="body2" // Using body2 for 'text-sm'. Adjust if needed.
          sx={{
            fontWeight: 'normal',
            color: '#526973',
            textAlign: 'right',
            letterSpacing: '0', 
            lineHeight: '22.4px',
          }}
        >
          PayRewards Points
        </Typography>
      </Box>
    </Box>
  )
}

export default DashboardHeading;