import { Fragment, useState } from 'react';
import {
  Box, Typography, Button, TextField, Table, TableHead, TableBody,
  TableRow, TableCell, Chip, InputAdornment, Drawer, ToggleButton,
  ToggleButtonGroup, Divider,
} from '@mui/material';
import {
  CheckRounded, SearchRounded, CloseRounded, AddRounded,
} from '@mui/icons-material';
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

// ─── Stepper (C version: Customer → Invoice → Review → Send) ──────────────────

const STEPS_C = ['Customer', 'Invoice', 'Review', 'Send'];

const InvoiceStepperC = ({ activeStep }: { activeStep: number }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
    {STEPS_C.map((step, i) => (
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
              bgcolor: i < activeStep ? '#3866b0' : i === activeStep ? '#283e48' : 'transparent',
              border: i > activeStep ? '2px solid #CBD5E1' : 'none',
              transition: 'all 0.2s',
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
        {i < STEPS_C.length - 1 && (
          <Box
            sx={{
              flex: 1,
              height: 1,
              bgcolor: i < activeStep ? '#3866b0' : '#E2E8F0',
              mx: 2,
              minWidth: 24,
              transition: 'background-color 0.3s',
            }}
          />
        )}
      </Fragment>
    ))}
  </Box>
);

// ─── Add customer drawer ───────────────────────────────────────────────────────

const AddCustomerDrawer = ({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (c: ExploreCustomer) => void;
}) => {
  const [type, setType] = useState<'Business' | 'Individual'>('Business');
  const [name, setName] = useState('');
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
    setName('');
    setAbn('');
    setEmail('');
    setType('Business');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 400, p: 0, display: 'flex', flexDirection: 'column' },
      }}
    >
      {/* Drawer header */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'white',
          flexShrink: 0,
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#283e48' }}>
          Add a new customer
        </Typography>
        <Box
          onClick={onClose}
          sx={{ cursor: 'pointer', color: '#526973', '&:hover': { color: '#283e48' }, display: 'flex' }}
        >
          <CloseRounded sx={{ fontSize: 20 }} />
        </Box>
      </Box>

      {/* Form */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 3 }}>
        {/* Type toggle */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 13, color: '#526973', mb: 0.75 }}>Customer type</Typography>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={(_, v) => { if (v) setType(v); }}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                textTransform: 'none',
                fontSize: 14,
                fontWeight: 500,
                color: '#526973',
                border: '1px solid #e2e8f0',
                px: 3,
                py: 0.75,
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label={type === 'Business' ? 'Business name *' : 'Full name *'}
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            size="small"
            sx={fieldSx}
            autoFocus
          />
          {type === 'Business' && (
            <TextField
              label="ABN *"
              placeholder="XX XXX XXX XXX"
              value={abn}
              onChange={e => setAbn(e.target.value)}
              fullWidth
              size="small"
              sx={fieldSx}
            />
          )}
          <TextField
            label="Email (optional)"
            placeholder="customer@business.com.au"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            size="small"
            type="email"
            helperText="Needed to send the invoice by email"
            sx={fieldSx}
          />
        </Box>
      </Box>

      {/* Drawer footer */}
      <Box sx={{ px: 3, py: 2.5, borderTop: '1px solid #f0f0f0', flexShrink: 0 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={!canSave}
          onClick={handleSave}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: 15,
            borderRadius: '6px',
            bgcolor: '#3866b0',
            py: 1.25,
            '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' },
            '&.Mui-disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' },
          }}
        >
          Save and select
        </Button>
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            mt: 1,
            textTransform: 'none',
            fontSize: 14,
            color: '#526973',
            '&:hover': { bgcolor: '#fafafa' },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Drawer>
  );
};

// ─── Main export ───────────────────────────────────────────────────────────────

export const CustomerExploreC = () => {
  const [customers, setCustomers] = useState<ExploreCustomer[]>(EXPLORE_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<ExploreCustomer | null>(null);
  const [flashId, setFlashId] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const filtered = search
    ? customers.filter(
        c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          (c.abn ?? '').includes(search)
      )
    : customers;

  const handleSelect = (c: ExploreCustomer) => {
    setSelected(c);
    setFlashId(c.id);
    setTimeout(() => {
      setFlashId(null);
      setActiveStep(1);
    }, 800);
  };

  const handleSaveNew = (c: ExploreCustomer) => {
    setCustomers(prev => [c, ...prev]);
    setDrawerOpen(false);
    handleSelect(c);
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, pt: 3, pb: 2 }}>
        <Box sx={{ maxWidth: 1000 }}>

          {/* Breadcrumbs */}
          <Typography sx={{ fontSize: 13, color: '#526973', mb: 2.5 }}>
            ← Get Paid / Invoice
          </Typography>

          <InvoiceStepperC activeStep={activeStep} />

          <Divider sx={{ mb: 3 }} />

          {/* Page header */}
          <Box sx={{ mb: 2.5 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#283e48', mb: 0.5 }}>
              Who are you invoicing?
            </Typography>
            <Typography sx={{ fontSize: 14, color: '#526973' }}>
              Select an existing customer or add a new one.
            </Typography>
          </Box>

          {/* Search + Add button row */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Search by name or ABN…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="small"
              sx={{ width: 320, ...fieldSx }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded sx={{ fontSize: 18, color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ flex: 1 }} />
            <Button
              variant="outlined"
              startIcon={<AddRounded />}
              onClick={() => setDrawerOpen(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 14,
                borderRadius: '6px',
                borderColor: '#3866b0',
                color: '#3866b0',
                '&:hover': { bgcolor: '#EEF4FF', borderColor: '#3866b0' },
              }}
            >
              Add a new customer
            </Button>
          </Box>

          {/* Customer table */}
          <Box
            sx={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              bgcolor: 'white',
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#fafafa' }}>
                  {['Name', 'Type', 'ABN', 'Last invoiced', 'Total invoiced', ''].map((h, i) => (
                    <TableCell
                      key={i}
                      sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: '#526973',
                        py: 1.25,
                        borderBottom: '1px solid #f0f0f0',
                        width: i === 5 ? 110 : 'auto',
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map(c => (
                  <TableRow
                    key={c.id}
                    sx={{
                      bgcolor:
                        flashId === c.id
                          ? '#DCFCE7'
                          : selected?.id === c.id && flashId === null
                          ? '#EEF4FF'
                          : 'transparent',
                      transition: 'background-color 0.3s',
                      '&:hover': { bgcolor: flashId === c.id ? '#DCFCE7' : selected?.id === c.id ? '#EEF4FF' : '#fafafa' },
                      '&:last-child td': { borderBottom: 0 },
                    }}
                  >
                    <TableCell sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', py: 1.75, borderBottom: '1px solid #f5f5f5' }}>
                      {c.name}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                      <Chip
                        label={c.type}
                        size="small"
                        sx={{
                          fontSize: 11,
                          height: 22,
                          bgcolor: c.type === 'Business' ? '#EEF2FF' : '#F0FDF4',
                          color: c.type === 'Business' ? '#3866b0' : '#166534',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, color: '#526973', borderBottom: '1px solid #f5f5f5' }}>
                      {c.abn ?? '—'}
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, color: '#526973', borderBottom: '1px solid #f5f5f5' }}>
                      {c.lastInvoiced}
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, fontWeight: 500, color: '#283e48', borderBottom: '1px solid #f5f5f5' }}>
                      {c.totalInvoiced}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                      {flashId === c.id ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#16a34a' }}>
                          <CheckRounded sx={{ fontSize: 16 }} />
                          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#16a34a' }}>Selected</Typography>
                        </Box>
                      ) : (
                        <Button
                          size="small"
                          variant={selected?.id === c.id ? 'contained' : 'outlined'}
                          onClick={() => handleSelect(c)}
                          sx={{
                            textTransform: 'none',
                            fontSize: 13,
                            fontWeight: 600,
                            borderRadius: '6px',
                            minWidth: 90,
                            ...(selected?.id === c.id
                              ? { bgcolor: '#3866b0', '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' } }
                              : { borderColor: '#e2e8f0', color: '#526973', '&:hover': { borderColor: '#3866b0', color: '#3866b0' } }
                            ),
                          }}
                        >
                          Select
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: 'center', py: 5, color: '#94a3b8', fontSize: 13 }}>
                      No customers match your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

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
              maxWidth: 280,
              lineHeight: 1.5,
              zIndex: 100,
            }}
          >
            Testing: Does seeing the list first reduce first-invoice anxiety?
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
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          {selected && activeStep === 1 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckRounded sx={{ fontSize: 16, color: '#16a34a' }} />
              <Typography sx={{ fontSize: 13, color: '#526973' }}>
                <strong>{selected.name}</strong> selected — ready to continue
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" sx={{ textTransform: 'none', fontSize: 14, borderRadius: '6px', borderColor: '#e2e8f0', color: '#526973' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!selected}
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
            Continue to invoice
          </Button>
        </Box>
      </Box>

      <AddCustomerDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveNew}
      />
    </Box>
  );
};
