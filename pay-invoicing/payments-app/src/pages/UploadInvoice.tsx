import {
  Box,
  Typography,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, UploadFileOutlined, KeyboardArrowDown } from '@mui/icons-material';
import {
  theme,
  StyledTextField,
  StyledSelect,
  StyledFormControl,
  PrimaryButton,
} from '@packages/ui';
import { useRef, useState, useCallback } from 'react';

export function UploadInvoice() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [paymentTiming, setPaymentTiming] = useState('');

  const handleFileSelect = useCallback((file: File) => {
    if (file.type === 'application/pdf' && file.size <= 3 * 1024 * 1024) {
      setUploadedFile(file);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 6,
          py: 2,
          borderBottom: `1px solid ${theme.palette.misc.divider}`,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          onClick={() => navigate('/account/new-payment')}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            color: theme.palette.text.primary,
          }}
        >
          <ArrowBack sx={{ fontSize: 20 }} />
          <Typography variant="body1">Review payment details</Typography>
        </Box>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          backgroundColor: theme.palette.background.default,
          overflow: 'auto',
        }}
      >
        {/* Left side — Upload zone */}
        <Box
          sx={{
            width: '50%',
            p: 6,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            sx={{
              width: '100%',
              maxWidth: 600,
              minHeight: 600,
              border: `1px solid ${theme.palette.misc.outlineBorder}`,
              borderRadius: '6px',
              backgroundColor: dragOver
                ? theme.palette.primary.shade4p
                : theme.palette.background.paper,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              transition: 'background-color 0.2s ease',
            }}
          >
            {uploadedFile ? (
              <>
                <UploadFileOutlined
                  sx={{ fontSize: 40, color: theme.palette.primary.main }}
                />
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  {uploadedFile.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => setUploadedFile(null)}
                >
                  Remove
                </Typography>
              </>
            ) : (
              <>
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
                  <UploadFileOutlined
                    sx={{ fontSize: 20, color: theme.palette.primary.main }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                  <Typography
                    variant="body1"
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                      color: theme.palette.primary.main,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Click to upload
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                    or drag and drop
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary, textAlign: 'center' }}
                >
                  PDF (max. 3MB)
                </Typography>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </Box>
        </Box>

        {/* Right side — Payment details form */}
        <Box
          sx={{
            width: '50%',
            p: 6,
            overflow: 'auto',
          }}
        >
          <Box sx={{ maxWidth: 504 }}>
            {/* Header */}
            <Typography
              variant="h3"
              sx={{ color: theme.palette.text.primary, mb: 1 }}
            >
              Payment details
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary, mb: 4 }}
            >
              Upload an invoice to get started. We'll automatically extract the
              payment details for you.
            </Typography>

            {/* Form fields */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Payee */}
              <StyledFormControl fullWidth>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.disabled, mb: 1 }}
                >
                  Payee
                </Typography>
                <StyledSelect
                  displayEmpty
                  defaultValue=""
                  IconComponent={KeyboardArrowDown}
                  renderValue={(value) => {
                    if (!value) {
                      return (
                        <Typography
                          sx={{ color: theme.palette.text.disabled }}
                        >
                          No payee selected
                        </Typography>
                      );
                    }
                    return value as string;
                  }}
                >
                  <MenuItem value="">
                    <em>No payee selected</em>
                  </MenuItem>
                </StyledSelect>
              </StyledFormControl>

              {/* ABN */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.disabled, mb: 1 }}
                >
                  ABN
                </Typography>
                <StyledTextField fullWidth placeholder="ABN" />
              </Box>

              {/* BSB + Account number */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.disabled, mb: 1 }}
                  >
                    BSB
                  </Typography>
                  <StyledTextField fullWidth placeholder="BSB" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.disabled, mb: 1 }}
                  >
                    Account number
                  </Typography>
                  <StyledTextField fullWidth placeholder="Account number" />
                </Box>
              </Box>

              {/* Reference number */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.disabled, mb: 1 }}
                >
                  Reference number
                </Typography>
                <StyledTextField
                  fullWidth
                  placeholder="Reference e.g. invoice number"
                />
              </Box>

              {/* Description */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.disabled, mb: 1 }}
                >
                  Description for you (optional)
                </Typography>
                <StyledTextField
                  fullWidth
                  placeholder="Description for you (optional)"
                />
              </Box>

              {/* Payment amount */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.disabled, mb: 1 }}
                >
                  Payment amount
                </Typography>
                <StyledTextField
                  fullWidth
                  placeholder="0.00"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography sx={{ color: theme.palette.text.disabled }}>
                          $
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* When do you want to pay? */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.primary, mb: 1 }}
                >
                  When do you want to pay?
                </Typography>
                <RadioGroup
                  value={paymentTiming}
                  onChange={(e) => setPaymentTiming(e.target.value)}
                  sx={{ gap: 1.5 }}
                >
                  <FormControlLabel
                    value="now"
                    control={<Radio size="small" />}
                    label="Now"
                    sx={{ opacity: 0.5 }}
                  />
                  <FormControlLabel
                    value="later"
                    control={<Radio size="small" />}
                    label="Later"
                    sx={{ opacity: 0.5 }}
                  />
                  <FormControlLabel
                    value="recurring"
                    control={<Radio size="small" />}
                    label="Recurring"
                    sx={{ opacity: 0.5 }}
                  />
                </RadioGroup>
              </Box>
            </Box>

            {/* Action buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 4,
                pt: 4,
                borderTop: `1px solid ${theme.palette.misc.divider}`,
              }}
            >
              <PrimaryButton
                variant="outlined"
                fullWidth
                onClick={() => navigate('/account/new-payment')}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.misc.divider}`,
                  height: 50,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    border: `1px solid ${theme.palette.misc.divider}`,
                  },
                }}
              >
                Back
              </PrimaryButton>
              <PrimaryButton
                variant="contained"
                fullWidth
                sx={{ height: 50 }}
              >
                Continue
              </PrimaryButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
