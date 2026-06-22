import { Card, Box, Typography, IconButton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // assumes you can use an icon instead of an image

type Props = {
  title: string;
  icon: string; // assumes this is a URL
  sx?: SxProps<Theme>;
};

const HotlinkButton = ({ title, icon, sx }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 2,
        px: 2,
        py: 1.5,
        backgroundColor: '#fff',
        borderColor: '#F5F5F5',
        width: '100%',
        minWidth: '224px',
        maxWidth: '480px',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: '#F7F9FA', // change this to whatever colour you want
          cursor: 'pointer',
          boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.05)',
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
          flexGrow: 1,
          p: 0,
        }}
      >
        <Box
          component="img"
          src={icon}
          alt={title}
          sx={{ width: 20, height: 20 }}
        />
        <Typography
          sx={{
            fontFamily: 'Europa-Regular, Helvetica, sans-serif',
            fontWeight: 400,
            color: '#283e48',
            fontSize: '1rem',
            lineHeight: '1.6rem',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
      </Box>
      <IconButton size="small" disableRipple>
        <ArrowForwardIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Card>
  );
};

export default HotlinkButton;
