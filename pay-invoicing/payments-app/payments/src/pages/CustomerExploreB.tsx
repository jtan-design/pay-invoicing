import { Fragment, useState, useRef } from 'react';
import {
  Box, Typography, Button, TextField, Chip,
  Paper, Divider, ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import { CheckRounded, CloseRounded, AddRounded } from '@mui/icons-material';
import { EXPLORE_CUSTOMERS, type ExploreCustomer } from '../data/exploreCustomers';

// ─── Styles ────────────────────────────────────────────────────────────────────

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
    fontSize: 14,
    bgcolor: 'white',
    '& fieldset': { borderColor: '#e2e8f0' },
    '&:hover fieldset': { borderColor: '#94a3b8' },
    '&.Mui-focused fieldset': { borderColor: '#3866b0' },
  },
  '& .MuiInputLabel-root': { fontSize: 14 },
};

const disabledFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
    fontSize: 14,
    bgcolor: '#f8fafc',
    '& fieldset': { borderColor: '#f0f0f0' },
  },
  '& .MuiInputLabel-root': { fontSize: 14, color: '#CBD5E1' },
  opacity: 0.5,
  pointerEvents: 'none',
};

// ─── Stepper (B version: Create invoice) ───────────────────────────────────────

const STEPS_B = ['Create invoice', 'Review', 'Send'];

const InvoiceStepperB = ({ activeStep }: { activeStep: number }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
    {STEPS_B.map((step, i) => (
      <Fragment key={step}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: i <= activeStep ? '#283e48' : 'transparent',
              border: i > activeStep ? '2px solid #CBD5E1' : 'none',
            }}
          >
            {i < activeStep ? (
              <CheckRounded sx={{ fontSize: 14, color: 'white' }} />
            ) : i === activeStep ? (
              <CheckRounded sx={{ fontSize: 14, color: 'white' }} />
            ) : (
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', lineHeight: 1 }}>
                {i + 1}
              </Typography>
            )}
          </Box>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: i === activeStep ? 600 : 400,
              color: i <= activeStep ? '#283e48' : '#94a3b8',
              whiteSpace: 'nowrap',
            }}
          >
            {step}
          </Typography>
        </Box>
        {i < STEPS_B.length - 1 && (
          <Box sx={{ flex: 1, height: 1, bgcolor: '#E2E8F0', mx: 2, minWidth: 32 }} />
        )}
      </Fragment>
    ))}
  </Box>
);

// ─── Inline "Add new customer" panel ──────────────────────────────────────────

const InlineAddPanel = ({
  initialName,
  onSave,
  onCancel,
}: {
  initialName: string;
  onSave: (c: ExploreCustomer) => void;
  onCancel: () => void;
}) => {
  const [type, setType] = useState<'Business' | 'Individual'>('Business');
  const [name, setName] = useState(initialName);
  const [abn, setAbn] = useState('');
  const [email, setEmail] = useState('');

  const canSave = name.trim().length > 0 && (type === 'Individual' || abn.trim().length > 0);

  const handleSave = () => {
    const newCustomer: ExploreCustomer = {
      id: Date.now(),
      name: name.trim(),
      type,
      abn: type === 'Business' ? abn.trim() : null,
      email: email.trim(),
      lastInvoiced: 'Just now',
      totalInvoiced: '$0',
    };
    onSave(newCustomer);
  };

  return (
    <Box
      sx={{
        mt: 1,
        border: '1px solid #C7D7F8',
        borderRadius: '8px',
        bgcolor: '#F7FAFF',
        p: 2.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#283e48' }}>
          New customer
        </Typography>
        <Box
          onClick={onCancel}
          sx={{ cursor: 'pointer', color: '#526973', '&:hover': { color: '#283e48' } }}
        >
          <CloseRounded sx={{ fontSize: 18 }} />
        </Box>
      </Box>

      {/* Type toggle */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontSize: 12, color: '#526973', mb: 0.75 }}>Customer type</Typography>
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={(_, v) => { if (v) setType(v); }}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontSize: 13,
              fontWeight: 500,
              color: '#526973',
              border: '1px solid #e2e8f0',
              px: 2,
              py: 0.5,
              '&.Mui-selected': {
                bgcolor: '#3866b0',
                color: 'white',
                borderColor: '#3866b0',
                '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' },
              },
            },
          }}
        >
          <ToggleButton value="Business">Business</ToggleButton>
          <ToggleButton value="Individual">Individual</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Fields */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <TextField
          label={type === 'Business' ? 'Business name *' : 'Full name *'}
          value={name}
          onChange={e => setName(e.target.value)}
          size="small"
          fullWidth
          sx={fieldSx}
        />
        {type === 'Business' && (
          <TextField
            label="ABN *"
            placeholder="XX XXX XXX XXX"
            value={abn}
            onChange={e => setAbn(e.target.value)}
            size="small"
            fullWidth
            sx={fieldSx}
          />
        )}
        <TextField
          label="Email (optional)"
          placeholder="customer@example.com.au"
          value={email}
          onChange={e => setEmail(e.target.value)}
          size="small"
          fullWidth
          type="email"
          helperText="Needed to send the invoice"
          sx={fieldSx}
        />
      </Box>

      <Button
        variant="contained"
        disabled={!canSave}
        onClick={handleSave}
        sx={{
          mt: 2,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: 14,
          borderRadius: '6px',
          bgcolor: '#3866b0',
          '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' },
          '&.Mui-disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' },
        }}
      >
        Save customer
      </Button>
    </Box>
  );
};

// ─── Type-ahead customer selector ─────────────────────────────────────────────

const CustomerSelector = ({
  onSelected,
}: {
  onSelected: (c: ExploreCustomer | null) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ExploreCustomer | null>(null);
  const [showInlineAdd, setShowInlineAdd] = useState(false);
  const [addName, setAddName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = inputValue.length > 0
    ? EXPLORE_CUSTOMERS.filter(c => c.name.toLowerCase().includes(inputValue.toLowerCase()))
    : EXPLORE_CUSTOMERS;

  const showAdd = inputValue.length > 1 && !EXPLORE_CUSTOMERS.some(
    c => c.name.toLowerCase() === inputValue.toLowerCase()
  );

  const handleSelect = (c: ExploreCustomer) => {
    setSelected(c);
    setOpen(false);
    setInputValue('');
    onSelected(c);
  };

  const handleAddNew = () => {
    setAddName(inputValue);
    setOpen(false);
    setShowInlineAdd(true);
  };

  const handleSaveNew = (c: ExploreCustomer) => {
    setSelected(c);
    setShowInlineAdd(false);
    onSelected(c);
  };

  const handleRemove = () => {
    setSelected(null);
    onSelected(null);
  };

  return (
    <Box>
      {selected ? (
        // Selected customer chip
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={selected.name}
            onDelete={handleRemove}
            deleteIcon={<CloseRounded />}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              height: 36,
              bgcolor: '#EEF4FF',
              color: '#3866b0',
              border: '1px solid #C7D7F8',
              '& .MuiChip-deleteIcon': { color: '#3866b0', '&:hover': { color: '#283e48' } },
            }}
          />
          {selected.abn && (
            <Typography sx={{ fontSize: 13, color: '#526973' }}>ABN {selected.abn}</Typography>
          )}
        </Box>
      ) : (
        // Type-ahead input
        <Box sx={{ position: 'relative' }}>
          <TextField
            inputRef={inputRef}
            fullWidth
            label="Search customers or type a name to add…"
            value={inputValue}
            onChange={e => { setInputValue(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            size="small"
            sx={fieldSx}
          />
          {open && (inputValue.length > 0 || true) && (
            <Paper
              elevation={4}
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1000,
                mt: 0.5,
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                maxHeight: 240,
                overflowY: 'auto',
              }}
            >
              {filtered.map(c => (
                <Box
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  sx={{
                    px: 2,
                    py: 1.25,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': { bgcolor: '#fafafa' },
                    borderBottom: '1px solid #f5f5f5',
                    '&:last-child': showAdd ? {} : { borderBottom: 'none' },
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#283e48' }}>{c.name}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>{c.email}</Typography>
                  </Box>
                  <Chip
                    label={c.type}
                    size="small"
                    sx={{ fontSize: 11, height: 20, bgcolor: c.type === 'Business' ? '#EEF2FF' : '#F0FDF4', color: c.type === 'Business' ? '#3866b0' : '#166534' }}
                  />
                </Box>
              ))}
              {showAdd && (
                <Box
                  onClick={handleAddNew}
                  sx={{
                    px: 2,
                    py: 1.25,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: '#F7FAFF',
                    borderTop: filtered.length > 0 ? '1px solid #f0f0f0' : 'none',
                    '&:hover': { bgcolor: '#EEF4FF' },
                  }}
                >
                  <AddRounded sx={{ fontSize: 16, color: '#3866b0' }} />
                  <Typography sx={{ fontSize: 13, color: '#3866b0', fontWeight: 500 }}>
                    Add "{inputValue}" as a new customer
                  </Typography>
                </Box>
              )}
              {filtered.length === 0 && !showAdd && (
                <Box sx={{ px: 2, py: 2 }}>
                  <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>No customers found.</Typography>
                </Box>
              )}
            </Paper>
          )}
          {/* Click-outside closer */}
          {open && (
            <Box
              sx={{ position: 'fixed', inset: 0, zIndex: 999 }}
              onClick={() => setOpen(false)}
            />
          )}
        </Box>
      )}

      {/* Inline add panel */}
      {showInlineAdd && !selected && (
        <InlineAddPanel
          initialName={addName}
          onSave={handleSaveNew}
          onCancel={() => setShowInlineAdd(false)}
        />
      )}
    </Box>
  );
};

// ─── Greyed invoice form ───────────────────────────────────────────────────────

const GreyedInvoiceForm = ({ locked }: { locked: boolean }) => (
  <Box sx={{ opacity: locked ? 0.45 : 1, pointerEvents: locked ? 'none' : 'auto', transition: 'opacity 0.2s' }}>
    <Divider sx={{ my: 3 }} />

    <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#283e48', mb: 2 }}>
      Invoice details
    </Typography>

    {/* Invoice number + dates */}
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 2 }}>
      <TextField label="Invoice number" defaultValue="INV-2026-006" size="small" sx={locked ? disabledFieldSx : fieldSx} InputProps={{ readOnly: true }} />
      <TextField label="Issue date" defaultValue="2026-06-18" size="small" sx={locked ? disabledFieldSx : fieldSx} InputProps={{ readOnly: true }} />
      <TextField label="Due date" placeholder="Select…" size="small" sx={locked ? disabledFieldSx : fieldSx} />
    </Box>

    {/* Line items placeholder */}
    <Box
      sx={{
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        bgcolor: 'white',
        p: 2.5,
        mb: 2,
      }}
    >
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', mb: 1.5 }}>
        Line items
      </Typography>
      {[
        { desc: 'Enter an item or description…', qty: '1', rate: '$0.00', gst: '—', amount: '$0.00' },
      ].map((row, i) => (
        <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 0.5fr 1fr', gap: 1.5, mb: 1 }}>
          <TextField placeholder={row.desc} size="small" sx={locked ? disabledFieldSx : fieldSx} />
          <TextField placeholder={row.qty} size="small" sx={locked ? disabledFieldSx : fieldSx} />
          <TextField placeholder={row.rate} size="small" sx={locked ? disabledFieldSx : fieldSx} />
          <TextField placeholder={row.gst} size="small" sx={locked ? disabledFieldSx : fieldSx} />
          <TextField placeholder={row.amount} size="small" sx={locked ? disabledFieldSx : fieldSx} InputProps={{ readOnly: true }} />
        </Box>
      ))}
      <Typography sx={{ fontSize: 13, color: locked ? '#CBD5E1' : '#3866b0', cursor: locked ? 'default' : 'pointer' }}>
        + Add item
      </Typography>
    </Box>

    <TextField
      label="Notes (optional)"
      placeholder="Add a note for your customer"
      multiline
      rows={2}
      fullWidth
      size="small"
      sx={locked ? disabledFieldSx : fieldSx}
    />
  </Box>
);

// ─── Main export ───────────────────────────────────────────────────────────────

export const CustomerExploreB = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<ExploreCustomer | null>(null);

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, pt: 3, pb: 2 }}>
        <Box sx={{ maxWidth: 880, position: 'relative' }}>

          {/* Breadcrumbs */}
          <Typography sx={{ fontSize: 13, color: '#526973', mb: 2.5 }}>
            ← Get Paid / New invoice
          </Typography>

          <InvoiceStepperB activeStep={0} />

          <Divider sx={{ mb: 3 }} />

          {/* Customer selector */}
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#283e48', mb: 0.5 }}>
              Invoice to
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#526973', mb: 1.5 }}>
              Select an existing customer or add a new one.
            </Typography>
            <CustomerSelector onSelected={setSelectedCustomer} />
          </Box>

          {/* Rest of invoice form — locked until customer selected */}
          <GreyedInvoiceForm locked={!selectedCustomer} />

          {/* Prototype note */}
          <Box
            sx={{
              position: 'fixed',
              bottom: 80,
              right: 24,
              bgcolor: 'rgba(30,30,63,0.85)',
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: '6px',
              fontSize: 11,
              maxWidth: 260,
              lineHeight: 1.5,
              zIndex: 100,
            }}
          >
            Testing: Does inline add remove the step overhead?
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          flexShrink: 0,
          borderTop: '1px solid #e2e8f0',
          px: 3,
          py: 2.5,
          bgcolor: 'white',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1.5,
        }}
      >
        <Button variant="outlined" sx={{ textTransform: 'none', fontSize: 14, borderRadius: '6px', borderColor: '#e2e8f0', color: '#526973' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!selectedCustomer}
          sx={{
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
          Review invoice
        </Button>
      </Box>
    </Box>
  );
};
