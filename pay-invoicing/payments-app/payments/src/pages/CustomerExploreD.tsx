import { useState } from 'react';
import { Box, Typography, Button, TextField, Chip } from '@mui/material';
import {
  CheckRounded, BusinessRounded, PersonRounded,
  EditRounded, ArrowForwardRounded,
} from '@mui/icons-material';

// ─── Styles ────────────────────────────────────────────────────────────────────

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
    fontSize: 15,
    bgcolor: 'white',
    '& fieldset': { borderColor: '#e2e8f0' },
    '&:hover fieldset': { borderColor: '#94a3b8' },
    '&.Mui-focused fieldset': { borderColor: '#3866b0' },
  },
  '& .MuiInputLabel-root': { fontSize: 15 },
};

// ─── Internal progress dots ────────────────────────────────────────────────────

const ProgressDots = ({ step, total }: { step: number; total: number }) => (
  <Box sx={{ display: 'flex', gap: 0.75, mb: 3 }}>
    {Array.from({ length: total }).map((_, i) => (
      <Box
        key={i}
        sx={{
          width: i === step ? 20 : 8,
          height: 8,
          borderRadius: 4,
          bgcolor: i <= step ? '#3866b0' : '#E2E8F0',
          transition: 'all 0.2s',
        }}
      />
    ))}
    <Typography sx={{ fontSize: 12, color: '#94a3b8', ml: 0.5, alignSelf: 'center' }}>
      Step {step + 1} of {total}
    </Typography>
  </Box>
);

// ─── Step 1: Type selection cards ─────────────────────────────────────────────

const TypeCard = ({
  label,
  sublabel,
  icon,
  selected,
  onClick,
}: {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) => (
  <Box
    onClick={onClick}
    sx={{
      flex: 1,
      border: `2px solid ${selected ? '#3866b0' : '#e2e8f0'}`,
      borderRadius: '10px',
      p: 3,
      cursor: 'pointer',
      bgcolor: selected ? '#EEF4FF' : 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1.5,
      position: 'relative',
      transition: 'all 0.15s',
      '&:hover': {
        borderColor: selected ? '#3866b0' : '#94a3b8',
        bgcolor: selected ? '#EEF4FF' : '#fafafa',
      },
    }}
  >
    {selected && (
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 20,
          height: 20,
          borderRadius: '50%',
          bgcolor: '#3866b0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CheckRounded sx={{ fontSize: 13, color: 'white' }} />
      </Box>
    )}
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '12px',
        bgcolor: selected ? '#3866b0' : '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.15s',
      }}
    >
      <Box sx={{ color: selected ? 'white' : '#526973', display: 'flex' }}>{icon}</Box>
    </Box>
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#283e48', mb: 0.5 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>{sublabel}</Typography>
    </Box>
  </Box>
);

// ─── Step 2: Fields for chosen type ───────────────────────────────────────────

interface FormState {
  name: string;
  abn: string;
  contactName: string;
  email: string;
}

const FieldsStep = ({
  type,
  form,
  onChange,
  onNext,
}: {
  type: 'Business' | 'Individual';
  form: FormState;
  onChange: (f: Partial<FormState>) => void;
  onNext: () => void;
}) => {
  const canNext = form.name.trim().length > 0 && (type === 'Individual' || form.abn.trim().length > 0);

  return (
    <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #f0f0f0' }}>
      <Typography sx={{ fontSize: 13, color: '#3866b0', fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {type === 'Business' ? <BusinessRounded sx={{ fontSize: 16 }} /> : <PersonRounded sx={{ fontSize: 16 }} />}
        {type === 'Business' ? 'Business details' : 'Individual details'}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label={type === 'Business' ? 'Business name *' : 'Full name *'}
          value={form.name}
          onChange={e => onChange({ name: e.target.value })}
          size="small"
          fullWidth
          sx={fieldSx}
          autoFocus
        />

        {type === 'Business' && (
          <>
            <TextField
              label="ABN *"
              placeholder="XX XXX XXX XXX"
              value={form.abn}
              onChange={e => onChange({ abn: e.target.value })}
              size="small"
              fullWidth
              sx={fieldSx}
            />
            <TextField
              label="Contact name (optional)"
              placeholder="e.g. Jane Smith"
              value={form.contactName}
              onChange={e => onChange({ contactName: e.target.value })}
              size="small"
              fullWidth
              sx={fieldSx}
            />
          </>
        )}

        <Box>
          <TextField
            label="Email (optional)"
            placeholder="customer@example.com.au"
            value={form.email}
            onChange={e => onChange({ email: e.target.value })}
            type="email"
            size="small"
            fullWidth
            sx={fieldSx}
          />
          <Typography sx={{ fontSize: 11, color: '#94a3b8', mt: 0.5 }}>
            Needed to send the invoice by email
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        disabled={!canNext}
        onClick={onNext}
        endIcon={<ArrowForwardRounded />}
        sx={{
          mt: 3,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: 14,
          borderRadius: '6px',
          bgcolor: '#3866b0',
          px: 3,
          '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' },
          '&.Mui-disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' },
        }}
      >
        Next
      </Button>
    </Box>
  );
};

// ─── Step 3: Summary confirmation ─────────────────────────────────────────────

const SummaryStep = ({
  type,
  form,
  onEdit,
  onContinue,
}: {
  type: 'Business' | 'Individual';
  form: FormState;
  onEdit: () => void;
  onContinue: () => void;
}) => (
  <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #f0f0f0' }}>
    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#526973', mb: 1.5 }}>
      Invoice to
    </Typography>

    <Box
      sx={{
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        p: 2.5,
        bgcolor: '#fafafa',
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Chip
          label={type}
          size="small"
          icon={type === 'Business' ? <BusinessRounded sx={{ fontSize: 13 }} /> : <PersonRounded sx={{ fontSize: 13 }} />}
          sx={{
            fontSize: 12,
            height: 24,
            bgcolor: type === 'Business' ? '#EEF2FF' : '#F0FDF4',
            color: type === 'Business' ? '#3866b0' : '#166534',
            '& .MuiChip-icon': { color: 'inherit' },
          }}
        />
      </Box>
      <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#283e48', mb: 0.5 }}>
        {form.name}
      </Typography>
      {form.abn && (
        <Typography sx={{ fontSize: 13, color: '#526973', mb: 0.25 }}>
          ABN {form.abn}
        </Typography>
      )}
      {form.contactName && (
        <Typography sx={{ fontSize: 13, color: '#526973', mb: 0.25 }}>
          Attn: {form.contactName}
        </Typography>
      )}
      <Typography sx={{ fontSize: 13, color: form.email ? '#526973' : '#CBD5E1', fontStyle: form.email ? 'normal' : 'italic' }}>
        {form.email || 'No email added'}
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Button
        fullWidth
        variant="contained"
        onClick={onContinue}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          fontSize: 15,
          borderRadius: '6px',
          bgcolor: '#3866b0',
          py: 1.25,
          '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' },
        }}
      >
        Save and continue to invoice
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={onEdit}
        startIcon={<EditRounded sx={{ fontSize: 16 }} />}
        sx={{
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 15,
          borderRadius: '6px',
          borderColor: '#e2e8f0',
          color: '#526973',
          py: 1.25,
          '&:hover': { borderColor: '#94a3b8' },
        }}
      >
        Edit details
      </Button>
    </Box>
  </Box>
);

// ─── Main export ───────────────────────────────────────────────────────────────

export const CustomerExploreD = () => {
  const [selectedType, setSelectedType] = useState<'Business' | 'Individual' | null>(null);
  const [internalStep, setInternalStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormState>({ name: '', abn: '', contactName: '', email: '' });

  const handleTypeSelect = (t: 'Business' | 'Individual') => {
    setSelectedType(t);
    if (internalStep < 2) setInternalStep(2);
  };

  const handleNext = () => setInternalStep(3);

  const handleEdit = () => setInternalStep(2);

  const handleContinue = () => {
    // Navigate to invoice step — stub
  };

  const handleFormChange = (patch: Partial<FormState>) => {
    setForm(prev => ({ ...prev, ...patch }));
    if (internalStep !== 3) setInternalStep(2);
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        pt: 4,
        pb: 10,
        bgcolor: '#f8fafc',
      }}
    >
      {/* Breadcrumbs */}
      <Box sx={{ width: 600, mb: 0.5 }}>
        <Typography sx={{ fontSize: 13, color: '#526973' }}>← Get Paid / New invoice</Typography>
      </Box>

      {/* Card */}
      <Box
        sx={{
          width: 600,
          bgcolor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0px 4px 24px rgba(0,0,0,0.07)',
          p: 4,
          mt: 2,
        }}
      >
        <ProgressDots step={internalStep - 1} total={3} />

        {/* Step 1: Type question (always visible) */}
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#283e48', mb: 0.5 }}>
          Who are you invoicing?
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#526973', mb: 3 }}>
          Choose the customer type to see the relevant fields.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TypeCard
            label="A business"
            sublabel="ABN required"
            icon={<BusinessRounded sx={{ fontSize: 24 }} />}
            selected={selectedType === 'Business'}
            onClick={() => handleTypeSelect('Business')}
          />
          <TypeCard
            label="An individual"
            sublabel="Name only required"
            icon={<PersonRounded sx={{ fontSize: 24 }} />}
            selected={selectedType === 'Individual'}
            onClick={() => handleTypeSelect('Individual')}
          />
        </Box>

        {/* Step 2: Form (appears after type selected) */}
        {selectedType && internalStep >= 2 && internalStep < 3 && (
          <FieldsStep
            type={selectedType}
            form={form}
            onChange={handleFormChange}
            onNext={handleNext}
          />
        )}

        {/* Step 3: Summary */}
        {selectedType && internalStep === 3 && (
          <SummaryStep
            type={selectedType}
            form={form}
            onEdit={handleEdit}
            onContinue={handleContinue}
          />
        )}

        {/* Prototype note */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #f5f5f5' }}>
          <Typography sx={{ fontSize: 11, color: '#CBD5E1', fontStyle: 'italic', textAlign: 'center' }}>
            Testing: Does type-first reduce perceived field count?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
