import { Fragment, useState } from 'react';
import {
  Box, Typography, Button, TextField, Select, MenuItem,
  FormControl, InputLabel, Table, TableHead, TableBody,
  TableRow, TableCell, Chip, Divider,
} from '@mui/material';
import {
  CheckRounded, ArrowBackRounded, ExpandMoreRounded,
  ExpandLessRounded, BusinessRounded, PersonRounded,
} from '@mui/icons-material';
import { EXPLORE_CUSTOMERS, type ExploreCustomer } from '../data/exploreCustomers';

// ─── Shared styles ─────────────────────────────────────────────────────────────

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

// ─── Breadcrumbs ───────────────────────────────────────────────────────────────

const Breadcrumbs = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2.5 }}>
    <ArrowBackRounded sx={{ fontSize: 14, color: '#526973' }} />
    <Typography sx={{ fontSize: 13, color: '#526973', cursor: 'pointer', '&:hover': { color: '#3866b0' } }}>
      Get Paid
    </Typography>
    <Typography sx={{ fontSize: 13, color: '#526973', mx: 0.25 }}>/</Typography>
    <Typography sx={{ fontSize: 13, color: '#526973' }}>Invoice</Typography>
  </Box>
);

// ─── Stepper ───────────────────────────────────────────────────────────────────

const STEPS_A = ['Customers', 'Line items', 'Review and send'];

const InvoiceStepperA = ({ activeStep }: { activeStep: number }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3.5 }}>
    {STEPS_A.map((step, i) => (
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
              bgcolor: i === activeStep ? '#283e48' : i < activeStep ? '#3866b0' : 'transparent',
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
        {i < STEPS_A.length - 1 && (
          <Box sx={{ flex: 1, height: 1, bgcolor: '#E2E8F0', mx: 2, minWidth: 32 }} />
        )}
      </Fragment>
    ))}
  </Box>
);

// ─── Footer ────────────────────────────────────────────────────────────────────

const Footer = ({
  canContinue,
  onContinue,
}: {
  canContinue: boolean;
  onContinue: () => void;
}) => (
  <Box
    sx={{
      flexShrink: 0,
      borderTop: '1px solid #e2e8f0',
      px: 3,
      py: 2.5,
      bgcolor: 'white',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 1.5,
    }}
  >
    <Button
      variant="outlined"
      sx={{
        textTransform: 'none',
        fontWeight: 500,
        fontSize: 14,
        borderRadius: '6px',
        borderColor: '#e2e8f0',
        color: '#526973',
        px: 3,
        '&:hover': { borderColor: '#94a3b8' },
      }}
    >
      Cancel
    </Button>
    <Button
      variant="contained"
      disabled={!canContinue}
      onClick={onContinue}
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
      Continue
    </Button>
  </Box>
);

// ─── Current state: plain form (Figma-faithful) ────────────────────────────────

const CurrentForm = () => {
  const [abn, setAbn] = useState('');
  const [customerType, setCustomerType] = useState('');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', mb: 0.25 }}>
        Who are you invoicing?
      </Typography>
      <Typography sx={{ fontSize: 14, color: '#526973', mb: 2.5 }}>
        Who are you invoicing for?
      </Typography>

      {/* Row 1 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 0.48fr', gap: 2, mb: 2 }}>
        <TextField label="Email" placeholder="Enter recipients email address" size="small" sx={fieldSx} />
        <TextField label="Contact name" placeholder="Enter recipients email address" size="small" sx={fieldSx} />
      </Box>

      {/* Row 2 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 0.48fr', gap: 2 }}>
        <FormControl size="small" sx={fieldSx}>
          <InputLabel>ABN / Business name</InputLabel>
          <Select value={abn} onChange={e => setAbn(e.target.value)} label="ABN / Business name">
            <MenuItem value="graham">12 345 678 901 — Graham Plumbers</MenuItem>
            <MenuItem value="acme">98 765 432 100 — Acme Office Supplies Pty Ltd</MenuItem>
            <MenuItem value="sarah">Sarah Mitchell (Individual)</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={fieldSx}>
          <InputLabel>Customer type</InputLabel>
          <Select value={customerType} onChange={e => setCustomerType(e.target.value)} label="Customer type">
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="individual">Individual</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

// ─── Detail panel (right side) ─────────────────────────────────────────────────

const DetailPanel = ({
  customer,
  onUse,
}: {
  customer: ExploreCustomer;
  onUse: () => void;
}) => {
  const [openSection, setOpenSection] = useState<string | null>('details');

  const sections = [
    {
      id: 'details',
      label: 'Customer details',
      content: (
        <Box sx={{ px: 3, pb: 2, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { label: 'Name', value: customer.name },
            { label: 'ABN', value: customer.abn ?? '—' },
            { label: 'Email', value: customer.email },
          ].map(({ label, value }) => (
            <Box key={label} sx={{ py: 1.5, borderBottom: '1px solid #f5f5f5' }}>
              <Typography sx={{ fontSize: 11, color: '#94a3b8', mb: 0.25 }}>{label}</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#283e48', wordBreak: 'break-word' }}>{value}</Typography>
            </Box>
          ))}
          <Box sx={{ py: 1.5, borderBottom: '1px solid #f5f5f5' }}>
            <Typography sx={{ fontSize: 11, color: '#94a3b8', mb: 0.5 }}>Type</Typography>
            <Chip
              label={customer.type}
              size="small"
              icon={customer.type === 'Business' ? <BusinessRounded sx={{ fontSize: 13 }} /> : <PersonRounded sx={{ fontSize: 13 }} />}
              sx={{
                fontSize: 12,
                height: 24,
                bgcolor: customer.type === 'Business' ? '#EEF2FF' : '#F0FDF4',
                color: customer.type === 'Business' ? '#3866b0' : '#166534',
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          </Box>
          <Box sx={{ py: 1.5 }}>
            <Typography sx={{ fontSize: 11, color: '#94a3b8', mb: 0.25 }}>Last invoiced</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#283e48' }}>{customer.lastInvoiced}</Typography>
          </Box>
        </Box>
      ),
    },
    { id: 'payments', label: 'Payment history', content: null },
    { id: 'notes', label: 'Notes', content: null },
  ];

  return (
    <Box
      sx={{
        width: 368,
        flexShrink: 0,
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        bgcolor: 'white',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #f5f5f5', bgcolor: '#fafafa' }}>
        <Typography sx={{ fontSize: 13, color: '#526973', mb: 0.25 }}>Selected customer</Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48' }}>{customer.name}</Typography>
      </Box>

      {/* Accordion sections */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {sections.map(section => (
          <Box key={section.id} sx={{ borderBottom: '1px solid #f0f0f0' }}>
            <Box
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              sx={{
                px: 3,
                py: 1.75,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#fafafa' },
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#283e48' }}>{section.label}</Typography>
              {openSection === section.id
                ? <ExpandLessRounded sx={{ fontSize: 18, color: '#526973' }} />
                : <ExpandMoreRounded sx={{ fontSize: 18, color: '#526973' }} />
              }
            </Box>
            {openSection === section.id && (
              section.content ?? (
                <Box sx={{ px: 3, pb: 2 }}>
                  <Typography sx={{ fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>No data available.</Typography>
                </Box>
              )
            )}
          </Box>
        ))}
      </Box>

      {/* Action */}
      <Box sx={{ p: 3, borderTop: '1px solid #f0f0f0' }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onUse}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: 14,
            borderRadius: '6px',
            bgcolor: '#3866b0',
            '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' },
          }}
        >
          Use this customer
        </Button>
        <Typography sx={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', mt: 1 }}>
          Total invoiced: {customer.totalInvoiced}
        </Typography>
      </Box>
    </Box>
  );
};

// ─── Future state: search + results table + detail panel ───────────────────────

const FutureSearch = ({
  onCustomerSelected,
}: {
  onCustomerSelected: (c: ExploreCustomer | null) => void;
}) => {
  const [selected, setSelected] = useState<ExploreCustomer | null>(null);
  const [nameQuery, setNameQuery] = useState('');
  const [abnQuery, setAbnQuery] = useState('');
  const [paymentType, setPaymentType] = useState('');

  const filtered = EXPLORE_CUSTOMERS.filter(c => {
    const nameMatch = !nameQuery || c.name.toLowerCase().includes(nameQuery.toLowerCase());
    const abnMatch = !abnQuery || (c.abn ?? '').includes(abnQuery);
    const typeMatch = !paymentType || c.type.toLowerCase() === paymentType;
    return nameMatch && abnMatch && typeMatch;
  });

  const handleSelect = (c: ExploreCustomer) => {
    setSelected(c);
    onCustomerSelected(c);
  };

  const handleUse = () => {
    // already selected — Continue button in footer handles navigation
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', mb: 0.5 }}>
        Find or add a customer
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
        {/* Row 1: Customer name (full) */}
        <TextField
          fullWidth
          label="Customer name"
          placeholder="Search by name…"
          value={nameQuery}
          onChange={e => setNameQuery(e.target.value)}
          size="small"
          sx={fieldSx}
        />
      </Box>

      {/* Row 2: ABN + Payment type */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="ABN lookup"
          placeholder="XX XXX XXX XXX"
          value={abnQuery}
          onChange={e => setAbnQuery(e.target.value)}
          size="small"
          sx={{ ...fieldSx, flex: '0 0 58%' }}
        />
        <FormControl size="small" sx={{ ...fieldSx, flex: 1 }}>
          <InputLabel>Customer type</InputLabel>
          <Select value={paymentType} onChange={e => setPaymentType(e.target.value)} label="Customer type">
            <MenuItem value="">All types</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="individual">Individual</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Results + detail panel side by side */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        {/* Left: results table */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Pagination row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.25,
              bgcolor: 'white',
              border: '1px solid #e2e8f0',
              borderBottom: 'none',
              borderRadius: '8px 8px 0 0',
            }}
          >
            <Typography sx={{ fontSize: 13, color: '#526973' }}>
              1–{filtered.length} of {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: 12, color: '#526973' }}>Sort:</Typography>
              <Button
                size="small"
                sx={{
                  textTransform: 'none',
                  fontSize: 12,
                  color: '#3866b0',
                  p: 0,
                  minWidth: 'auto',
                  fontWeight: 600,
                }}
              >
                Last invoiced
              </Button>
            </Box>
          </Box>

          {/* Table */}
          <Box
            sx={{
              border: '1px solid #e2e8f0',
              borderRadius: '0 0 8px 8px',
              bgcolor: 'white',
              overflow: 'hidden',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#fafafa' }}>
                  {['Customer name', 'ABN', 'Type', ''].map((h, i) => (
                    <TableCell
                      key={i}
                      sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: '#526973',
                        py: 1.25,
                        borderBottom: '1px solid #f0f0f0',
                        width: i === 3 ? 90 : 'auto',
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
                    onClick={() => handleSelect(c)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: selected?.id === c.id ? '#EEF4FF' : 'transparent',
                      '&:hover': { bgcolor: selected?.id === c.id ? '#EEF4FF' : '#fafafa' },
                      '&:last-child td': { borderBottom: 0 },
                    }}
                  >
                    <TableCell sx={{ fontSize: 13, fontWeight: 500, color: '#283e48', py: 1.5, borderBottom: '1px solid #f5f5f5' }}>
                      {c.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, color: '#526973', borderBottom: '1px solid #f5f5f5' }}>
                      {c.abn ?? '—'}
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
                    <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                      <Button
                        size="small"
                        variant={selected?.id === c.id ? 'contained' : 'outlined'}
                        onClick={e => { e.stopPropagation(); handleSelect(c); }}
                        sx={{
                          textTransform: 'none',
                          fontSize: 12,
                          fontWeight: 600,
                          borderRadius: '6px',
                          minWidth: 70,
                          ...(selected?.id === c.id
                            ? { bgcolor: '#3866b0', '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' } }
                            : { borderColor: '#e2e8f0', color: '#526973', '&:hover': { borderColor: '#3866b0', color: '#3866b0' } }
                          ),
                        }}
                      >
                        {selected?.id === c.id ? 'Selected' : 'Select →'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4, color: '#94a3b8', fontSize: 13 }}>
                      No customers match your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

          <Box sx={{ mt: 1.5 }}>
            <Typography
              component="span"
              sx={{
                fontSize: 13,
                color: '#3866b0',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              + Add new customer
            </Typography>
          </Box>
        </Box>

        {/* Right: detail panel */}
        {selected ? (
          <DetailPanel customer={selected} onUse={handleUse} />
        ) : (
          <Box
            sx={{
              width: 368,
              flexShrink: 0,
              border: '1px dashed #e2e8f0',
              borderRadius: '8px',
              bgcolor: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 6,
            }}
          >
            <Typography sx={{ fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>
              Select a customer to<br />see their details
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// ─── Main export ───────────────────────────────────────────────────────────────

export const CustomerExploreA = ({ futureState }: { futureState: 'current' | 'future' }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<ExploreCustomer | null>(null);

  const canContinue = futureState === 'future' ? selectedCustomer !== null : false;

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, pt: 3, pb: 2 }}>
        <Box sx={{ maxWidth: 1152 }}>
          <Breadcrumbs />
          <InvoiceStepperA activeStep={0} />

          <Divider sx={{ mb: 3 }} />

          {futureState === 'current' ? (
            <>
              <CurrentForm />
              {/* Empty state below form (matches Figma's sparse layout) */}
              <Box sx={{ height: 200 }} />
            </>
          ) : (
            <FutureSearch onCustomerSelected={c => setSelectedCustomer(c)} />
          )}
        </Box>
      </Box>

      <Footer canContinue={canContinue} onContinue={() => {}} />
    </Box>
  );
};
