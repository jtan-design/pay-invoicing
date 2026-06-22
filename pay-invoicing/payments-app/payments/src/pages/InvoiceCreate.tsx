import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, TextField, Select, MenuItem,
  FormControl, InputLabel, Table, TableHead, TableBody,
  TableRow, TableCell, Checkbox, IconButton, Divider,
  Tooltip, Radio, RadioGroup, FormControlLabel,
} from '@mui/material';
import {
  CheckRounded, DeleteOutlineRounded,
  ExpandLessRounded, InfoOutlined,
} from '@mui/icons-material';
import { INVOICE_CUSTOMERS } from '../data/invoices';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n);

const fmtPts = (n: number) => new Intl.NumberFormat('en-AU').format(n);

const ISSUE_DATE = '2026-06-19';

const generatePayLink = (invoiceNumber: string) => {
  const slug = invoiceNumber.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `https://invoice.pay.com.au/unique-link/${slug}-a3f8b2c1d4e9`;
};

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const formatDateLabel = (iso: string) => {
  const [, m, d] = iso.split('-');
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${iso.split('-')[0]}`;
};

const calcDueIso = (days: number) => {
  const d = new Date(ISSUE_DATE);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

// ─── Shared field style ────────────────────────────────────────────────────────

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
    fontSize: 15,
    bgcolor: 'white',
    '& fieldset': { borderColor: '#c4c4c4' },
    '&:hover fieldset': { borderColor: '#94a3b8' },
    '&.Mui-focused fieldset': { borderColor: '#3866b0', borderWidth: 2 },
  },
  '& .MuiInputLabel-root': { fontSize: 14, color: '#526973' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#3866b0' },
};

// ─── Stepper ──────────────────────────────────────────────────────────────────

const STEPS = ['Create invoice', 'Review and send'];

const InvoiceStepper = ({ stepperIndex }: { stepperIndex: number }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {STEPS.map((label, i) => {
      const done = i < stepperIndex;
      const active = i === stepperIndex;
      return (
        <Fragment key={label}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            <Box sx={{
              width: 24, height: 24, borderRadius: '50%',
              bgcolor: done ? '#3866b0' : 'white',
              border: done ? 'none' : active ? '2px solid #3866b0' : '2px solid #bdbdbd',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: active ? '0 0 0 3px rgba(56,102,176,0.12)' : 'none',
            }}>
              {done ? (
                <CheckRounded sx={{ fontSize: 14, color: 'white' }} />
              ) : (
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: active ? '#3866b0' : '#bdbdbd', lineHeight: 1 }}>
                  {i + 1}
                </Typography>
              )}
            </Box>
            <Typography sx={{
              fontSize: 14, fontWeight: active ? 600 : 400,
              color: done || active ? '#283e48' : '#bdbdbd',
              whiteSpace: 'nowrap',
            }}>
              {label}
            </Typography>
          </Box>
          {i < STEPS.length - 1 && (
            <Box sx={{ flex: 1, height: 1, bgcolor: done ? '#3866b0' : '#e0e0e0', mx: 2, minWidth: 40 }} />
          )}
        </Fragment>
      );
    })}
  </Box>
);

// ─── Customer step ────────────────────────────────────────────────────────────

interface CustomerData {
  email: string;
  contactName: string;
  customerId: string;
  customerType: string;
}

const CustomerStep = ({
  data,
  onChange,
}: {
  data: CustomerData;
  onChange: (patch: Partial<CustomerData>) => void;
}) => {
  const handleSelect = (id: string) => {
    const c = INVOICE_CUSTOMERS.find(c => c.id === id);
    onChange({
      customerId: id,
      customerType: c?.abn ? 'business' : 'individual',
    });
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', mb: 3 }}>
        Who are you invoicing?
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2, mb: 2 }}>
        <TextField
          label="Email address"
          placeholder="Enter recipient's email address"
          value={data.email}
          onChange={e => onChange({ email: e.target.value })}
          size="small"
          type="email"
          sx={fieldSx}
        />
        <TextField
          label="Contact name"
          placeholder="Enter contact name"
          value={data.contactName}
          onChange={e => onChange({ contactName: e.target.value })}
          size="small"
          sx={fieldSx}
        />
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
        <FormControl size="small" sx={fieldSx}>
          <InputLabel>ABN / Business name</InputLabel>
          <Select
            value={data.customerId}
            onChange={e => handleSelect(e.target.value)}
            label="ABN / Business name"
            displayEmpty
          >
            {INVOICE_CUSTOMERS.map(c => (
              <MenuItem key={c.id} value={c.id} sx={{ fontSize: 14 }}>
                {c.abn ? `${c.name} (${c.abn})` : c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={fieldSx}>
          <InputLabel>Customer type</InputLabel>
          <Select
            value={data.customerType}
            onChange={e => onChange({ customerType: e.target.value })}
            label="Customer type"
          >
            <MenuItem value="" disabled sx={{ fontSize: 14 }}>Select a type</MenuItem>
            <MenuItem value="business" sx={{ fontSize: 14 }}>Business</MenuItem>
            <MenuItem value="individual" sx={{ fontSize: 14 }}>Individual</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

// ─── Right panel (summary + payment details) ──────────────────────────────────

const PAYMENT_DETAILS = {
  email: 'creativedirectionmanagement@invoice.pay.com.au',
  accountName: 'pay.com.au',
  bsb: '633-123',
  accountNumber: '123456789780',
};

const PACKAGE_FEE_RATE = 0.018;

const RightPanel = ({ total }: { subtotal: number; gstAmount: number; total: number }) => {
  const [subtotalExpanded, setSubtotalExpanded] = useState(true);

  const packageFee = total * PACKAGE_FEE_RATE;
  const gstOnFee = packageFee * 0.1;
  const youReceive = total - packageFee - gstOnFee;
  const prpPoints = Math.round(youReceive);

  return (
    <Box sx={{ width: 368, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{
        bgcolor: 'white', borderRadius: '6px', overflow: 'hidden',
        boxShadow: '0px 1px 4px rgba(0,0,0,0.05), 0px 2px 6px rgba(0,0,0,0.06)',
      }}>
        <Box
          onClick={() => setSubtotalExpanded(p => !p)}
          sx={{ px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', minHeight: 48, '&:hover': { bgcolor: '#fafafa' } }}
        >
          <Typography sx={{ fontSize: 16, color: '#283e48' }}>Subtotal</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%' }}>
            <ExpandLessRounded sx={{ fontSize: 22, color: '#526973', transform: subtotalExpanded ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }} />
          </Box>
        </Box>
        {subtotalExpanded && (
          <Box sx={{ px: 4, pb: 2, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            {[
              { label: 'Amount to be paid', value: fmt(total) },
              { label: 'GST on fees', value: fmt(gstOnFee) },
            ].map(({ label, value }) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                <Typography sx={{ fontSize: 14, color: '#526973' }}>{label}</Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', fontVariantNumeric: 'tabular-nums' }}>{value}</Typography>
              </Box>
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box>
                  <Typography sx={{ fontSize: 14, color: '#526973' }}>Package fees (1.8%)</Typography>
                  <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>at your selected tier</Typography>
                </Box>
                <Tooltip title="Package fee is deducted from the total amount to be paid" arrow>
                  <InfoOutlined sx={{ fontSize: 16, color: '#bdbdbd', cursor: 'help' }} />
                </Tooltip>
              </Box>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', fontVariantNumeric: 'tabular-nums' }}>{fmt(packageFee)}</Typography>
            </Box>
          </Box>
        )}
        <Divider sx={{ borderColor: '#e0e0e0' }} />
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 16, color: '#283e48' }}>You will receive</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', fontVariantNumeric: 'tabular-nums' }}>{fmt(youReceive)}</Typography>
        </Box>
        <Divider sx={{ borderColor: '#e0e0e0' }} />
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 14, color: '#526973' }}>PayRewards Points</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#3866b0', fontVariantNumeric: 'tabular-nums' }}>{fmtPts(prpPoints)} pts</Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#f9fbfe', border: '1px solid #eef2fc', borderRadius: '8px', px: 3, py: 3 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', mb: 2 }}>Payment details</Typography>
        {[
          { label: 'PayID email', value: PAYMENT_DETAILS.email },
          { label: 'Account name', value: PAYMENT_DETAILS.accountName },
          { label: 'BSB', value: PAYMENT_DETAILS.bsb },
          { label: 'Account number', value: PAYMENT_DETAILS.accountNumber },
        ].map(({ label, value }, i, arr) => (
          <Box key={label}>
            <Box sx={{ py: 1.5 }}>
              <Typography sx={{ fontSize: 14, color: '#526973', mb: 0.5 }}>{label}</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', wordBreak: 'break-all' }}>{value}</Typography>
            </Box>
            {i < arr.length - 1 && (
              i === 0 ? (
                <Divider sx={{ borderColor: '#e0e0e0', '& .MuiDivider-wrapper': { px: 1 } }}>
                  <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>or</Typography>
                </Divider>
              ) : (
                <Divider sx={{ borderColor: '#e0e0e0' }} />
              )
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// ─── Invoice PDF preview ───────────────────────────────────────────────────────

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
}

const InvoicePDF = ({
  invoiceNumber,
  issueDate,
  dueDate,
  payLink,
  customer,
  lineItems,
  gstEnabled,
  subtotal,
  gstAmount,
  total,
  reference,
}: {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  payLink: string;
  customer: { name: string; email: string; abn?: string };
  lineItems: LineItem[];
  gstEnabled: boolean;
  subtotal: number;
  gstAmount: number;
  total: number;
  reference: string;
}) => (
  <Box sx={{
    bgcolor: 'white', fontFamily: 'inherit',
    fontSize: 11, color: '#1a1a1a', lineHeight: 1.5,
    p: 3,
  }}>
    {/* Header */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#283e48', mb: 0.5 }}>Creative Direction Management</Typography>
        <Typography sx={{ fontSize: 10, color: '#526973' }}>ABN: 12 345 678 901</Typography>
        <Typography sx={{ fontSize: 10, color: '#526973' }}>creativedirectionmanagement@invoice.pay.com.au</Typography>
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#283e48', lineHeight: 1, mb: 1.5 }}>Invoice</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: 2, rowGap: 0.25 }}>
          <Typography sx={{ fontSize: 10, color: '#526973' }}>Invoice number</Typography>
          <Typography sx={{ fontSize: 10, fontWeight: 600, color: '#283e48', textAlign: 'right' }}>{invoiceNumber}</Typography>
          <Typography sx={{ fontSize: 10, color: '#526973' }}>Date of issue</Typography>
          <Typography sx={{ fontSize: 10, fontWeight: 600, color: '#283e48', textAlign: 'right' }}>{formatDateLabel(issueDate)}</Typography>
          <Typography sx={{ fontSize: 10, color: '#526973' }}>Date due</Typography>
          <Typography sx={{ fontSize: 10, fontWeight: 600, color: '#283e48', textAlign: 'right' }}>{formatDateLabel(dueDate)}</Typography>
        </Box>
      </Box>
    </Box>

    {/* From / Bill to */}
    <Box sx={{ display: 'flex', gap: 4, mb: 2.5 }}>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontSize: 9, fontWeight: 700, color: '#526973', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.75 }}>From</Typography>
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#283e48' }}>Creative Direction Management</Typography>
        <Typography sx={{ fontSize: 10, color: '#526973' }}>creativedirectionmanagement@invoice.pay.com.au</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontSize: 9, fontWeight: 700, color: '#526973', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.75 }}>Bill to</Typography>
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#283e48' }}>{customer.name || '—'}</Typography>
        <Typography sx={{ fontSize: 10, color: '#526973' }}>{customer.email || '—'}</Typography>
        {customer.abn && <Typography sx={{ fontSize: 10, color: '#526973' }}>ABN: {customer.abn}</Typography>}
      </Box>
    </Box>

    {/* Amount due banner */}
    <Box sx={{ bgcolor: '#f9fbfe', border: '1px solid #eef2fc', borderRadius: '6px', px: 2, py: 1.5, mb: 2.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
        <Typography sx={{ fontSize: 11, color: '#526973' }}>
          <strong style={{ color: '#283e48', fontSize: 13 }}>{fmt(total)}</strong> due {formatDateLabel(dueDate)}
        </Typography>
        <Box component="a" href={payLink} target="_blank" rel="noreferrer"
          sx={{ fontSize: 10, fontWeight: 600, color: 'white', bgcolor: '#3866b0', px: 1.25, py: 0.5, borderRadius: '4px', textDecoration: 'none', '&:hover': { bgcolor: '#2d56a0' } }}>
          Pay via PayID
        </Box>
      </Box>
      <Typography sx={{ fontSize: 9, color: '#94a3b8', wordBreak: 'break-all' }}>{payLink}</Typography>
    </Box>

    {/* Line items */}
    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden', mb: 2 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', bgcolor: '#f8f9fa', px: 1.5, py: 1, borderBottom: '1px solid #e0e0e0' }}>
        {['Description', 'Qty', 'Unit price', 'Amount'].map(h => (
          <Typography key={h} sx={{ fontSize: 9, fontWeight: 700, color: '#526973', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: h !== 'Description' ? 'right' : 'left', minWidth: h !== 'Description' ? 52 : undefined }}>
            {h}
          </Typography>
        ))}
      </Box>
      {lineItems.map((li, i) => (
        <Box key={li.id} sx={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', px: 1.5, py: 1, borderBottom: i < lineItems.length - 1 ? '1px solid #f0f0f0' : 'none', bgcolor: 'white' }}>
          <Typography sx={{ fontSize: 10, color: '#283e48' }}>{li.description || <span style={{ color: '#bdbdbd', fontStyle: 'italic' }}>Untitled item</span>}</Typography>
          <Typography sx={{ fontSize: 10, color: '#283e48', textAlign: 'right', minWidth: 52 }}>{li.quantity}</Typography>
          <Typography sx={{ fontSize: 10, color: '#283e48', textAlign: 'right', minWidth: 52 }}>{fmt(li.rate)}</Typography>
          <Typography sx={{ fontSize: 10, color: '#283e48', textAlign: 'right', minWidth: 52 }}>{fmt(li.quantity * li.rate)}</Typography>
        </Box>
      ))}
    </Box>

    {/* Totals */}
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2.5 }}>
      <Box sx={{ width: 220 }}>
        {[
          { label: 'Subtotal', value: fmt(subtotal) },
          ...(gstEnabled ? [{ label: 'GST (10%)', value: fmt(gstAmount) }] : []),
        ].map(({ label, value }) => (
          <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
            <Typography sx={{ fontSize: 10, color: '#526973' }}>{label}</Typography>
            <Typography sx={{ fontSize: 10, color: '#283e48', fontVariantNumeric: 'tabular-nums' }}>{value}</Typography>
          </Box>
        ))}
        <Divider sx={{ my: 0.75, borderColor: '#e0e0e0' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#283e48' }}>Total</Typography>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#283e48', fontVariantNumeric: 'tabular-nums' }}>{fmt(total)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#283e48' }}>Amount due</Typography>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#3866b0', fontVariantNumeric: 'tabular-nums' }}>{fmt(total)}</Typography>
        </Box>
      </Box>
    </Box>

    {/* Payment details footer */}
    <Box sx={{ borderTop: '1px solid #e0e0e0', pt: 1.5 }}>
      <Typography sx={{ fontSize: 9, fontWeight: 700, color: '#526973', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>Payment details</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2, rowGap: 0.5 }}>
        {[
          { label: 'PayID / Email', value: PAYMENT_DETAILS.email },
          { label: 'Account name', value: PAYMENT_DETAILS.accountName },
          { label: 'BSB', value: PAYMENT_DETAILS.bsb },
          { label: 'Account number', value: PAYMENT_DETAILS.accountNumber },
        ].map(({ label, value }) => (
          <Box key={label}>
            <Typography sx={{ fontSize: 9, color: '#94a3b8' }}>{label}</Typography>
            <Typography sx={{ fontSize: 9, fontWeight: 600, color: '#283e48', wordBreak: 'break-all' }}>{value}</Typography>
          </Box>
        ))}
      </Box>
      {reference && (
        <Box sx={{ mt: 1 }}>
          <Typography sx={{ fontSize: 9, color: '#94a3b8' }}>Reference</Typography>
          <Typography sx={{ fontSize: 9, fontWeight: 600, color: '#283e48' }}>{reference}</Typography>
        </Box>
      )}
      <Typography sx={{ fontSize: 8, color: '#94a3b8', mt: 1.5, textAlign: 'center' }}>Page 1 of 1</Typography>
    </Box>
  </Box>
);

// ─── Review step ──────────────────────────────────────────────────────────────

interface DetailsData {
  invoiceNumber: string;
  dueDate: string;
  lineItems: LineItem[];
  gstEnabled: boolean;
  reference: string;
}

const ReviewStep = ({
  customerData,
  detailsData,
  subtotal,
  gstAmount,
  total,
  notes,
  onNotesChange,
  onCustomerChange,
}: {
  customerData: CustomerData;
  detailsData: DetailsData;
  subtotal: number;
  gstAmount: number;
  total: number;
  notes: string;
  onNotesChange: (v: string) => void;
  onCustomerChange: (patch: Partial<CustomerData>) => void;
}) => {
  const customer = INVOICE_CUSTOMERS.find(c => c.id === customerData.customerId) ?? {
    name: customerData.contactName,
    email: customerData.email,
    abn: '',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>

        {/* Left: confirm recipient */}
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48' }}>
            Who are you invoicing for?
          </Typography>

          <RadioGroup
            row
            value={customerData.customerType || 'business'}
            onChange={e => onCustomerChange({ customerType: e.target.value })}
            sx={{ gap: 2 }}
          >
            {['business', 'individual'].map(v => (
              <FormControlLabel
                key={v}
                value={v}
                control={<Radio size="small" sx={{ color: '#bdbdbd', '&.Mui-checked': { color: '#3866b0' } }} />}
                label={<Typography sx={{ fontSize: 16, color: '#283e48' }}>{v === 'business' ? 'Business' : 'Individual'}</Typography>}
                sx={{ m: 0 }}
              />
            ))}
          </RadioGroup>

          <TextField
            label="Email"
            value={customerData.email}
            onChange={e => onCustomerChange({ email: e.target.value })}
            size="small"
            fullWidth
            sx={fieldSx}
          />
          <TextField
            label="Contact name"
            value={customerData.contactName}
            onChange={e => onCustomerChange({ contactName: e.target.value })}
            size="small"
            fullWidth
            sx={fieldSx}
          />
          {customerData.customerType !== 'individual' && (
            <FormControl size="small" fullWidth sx={fieldSx}>
              <InputLabel>ABN / Business name</InputLabel>
              <Select
                value={customerData.customerId}
                onChange={e => {
                  onCustomerChange({ customerId: e.target.value });
                }}
                label="ABN / Business name"
              >
                {INVOICE_CUSTOMERS.map(c => (
                  <MenuItem key={c.id} value={c.id} sx={{ fontSize: 14 }}>
                    {c.abn ? `${c.name} (${c.abn})` : c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            label="Notes / message (optional)"
            placeholder="Add a note or message for your customer"
            value={notes}
            onChange={e => onNotesChange(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={fieldSx}
          />
        </Box>

        {/* Right: PDF preview card */}
        <Box sx={{ width: 560, flexShrink: 0 }}>
          <Box sx={{
            bgcolor: 'white', border: '1px solid #e0e0e0', borderRadius: '12px',
            overflow: 'hidden', p: 2,
            boxShadow: '0px 1px 4px rgba(0,0,0,0.04), 0px 2px 8px rgba(0,0,0,0.04)',
          }}>
            <Typography sx={{ fontSize: 14, color: '#283e48', mb: 1.5 }}>
              invoice-{detailsData.invoiceNumber.toLowerCase().replace('pay-', '')}.pdf
            </Typography>
            <Box sx={{ border: '1px solid #f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
              <InvoicePDF
                invoiceNumber={detailsData.invoiceNumber}
                issueDate={ISSUE_DATE}
                dueDate={detailsData.dueDate}
                payLink={generatePayLink(detailsData.invoiceNumber)}
                customer={customer}
                lineItems={detailsData.lineItems}
                gstEnabled={detailsData.gstEnabled}
                subtotal={subtotal}
                gstAmount={gstAmount}
                total={total}
                reference={detailsData.reference}
              />
            </Box>
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

// ─── Invoice details step ─────────────────────────────────────────────────────

const DetailsStep = ({
  data,
  onChange,
  subtotal,
  gstAmount,
  total,
}: {
  data: DetailsData;
  onChange: (patch: Partial<DetailsData>) => void;
  subtotal: number;
  gstAmount: number;
  total: number;
}) => {
  const updateLine = (id: number, field: keyof LineItem, value: string | number) =>
    onChange({ lineItems: data.lineItems.map(li => li.id === id ? { ...li, [field]: value } : li) });

  const addLine = () =>
    onChange({ lineItems: [...data.lineItems, { id: Date.now(), description: '', quantity: 1, rate: 0 }] });

  const removeLine = (id: number) =>
    onChange({ lineItems: data.lineItems.filter(li => li.id !== id) });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

      {/* Section 1: What are you invoicing for? */}
      <Box>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', mb: 2 }}>
          What are you invoicing for?
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 14, color: '#526973', mb: 0.75 }}>Invoice number</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48' }}>{data.invoiceNumber}</Typography>
          </Box>
          <Box sx={{ width: 368, flexShrink: 0 }}>
            <Typography sx={{ fontSize: 14, color: '#526973', mb: 0.75 }}>Due date</Typography>
            <TextField
              type="date"
              size="small"
              fullWidth
              value={data.dueDate}
              onChange={e => onChange({ dueDate: e.target.value })}
              inputProps={{ min: ISSUE_DATE }}
              sx={fieldSx}
            />
          </Box>
        </Box>
        <TextField
          label="Reference"
          placeholder="Enter your reference"
          value={data.reference}
          onChange={e => onChange({ reference: e.target.value })}
          fullWidth
          size="small"
          sx={fieldSx}
        />
      </Box>

      {/* Section 2: Invoice details */}
      <Box>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', mb: 2 }}>
          Invoice details
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '10px', bgcolor: 'white', overflow: 'hidden' }}>
              <Table sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow>
                    {[
                      { label: 'Items', width: 'auto' },
                      { label: 'Quantity', width: 120 },
                      { label: 'Price', width: '22%' },
                      { label: 'Amount', width: '22%' },
                    ].map(col => (
                      <TableCell key={col.label} sx={{ width: col.width, fontSize: 16, fontWeight: 700, color: '#283e48', py: 2, px: 2, bgcolor: '#fcfcfc', borderBottom: '1px solid #e0e0e0' }}>
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.lineItems.map((li, idx) => {
                    const amount = li.quantity * li.rate;
                    return (
                      <TableRow key={li.id} sx={{ bgcolor: 'white', borderBottom: idx < data.lineItems.length - 1 ? '1px solid #e0e0e0' : 'none', '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ py: 1, px: 2, borderBottom: 'inherit' }}>
                          <TextField
                            value={li.description}
                            onChange={e => updateLine(li.id, 'description', e.target.value)}
                            placeholder="Enter item name"
                            size="small"
                            fullWidth
                            sx={{
                              '& .MuiOutlinedInput-root': { fontSize: 14, bgcolor: 'transparent', '& fieldset': { border: 'none' }, '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }, '&.Mui-focused fieldset': { border: '1px solid #3866b0', borderRadius: '4px', bgcolor: 'white' } },
                              '& .MuiInputBase-input::placeholder': { color: '#526973', fontStyle: 'italic', opacity: 1 },
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1, px: 2, textAlign: 'center', borderBottom: 'inherit' }}>
                          <TextField
                            value={li.quantity}
                            onChange={e => updateLine(li.id, 'quantity', parseFloat(e.target.value) || 0)}
                            type="number"
                            size="small"
                            sx={{ width: 72, '& .MuiOutlinedInput-root': { fontSize: 14, '& fieldset': { border: 'none' }, '&.Mui-focused fieldset': { border: '1px solid #3866b0', borderRadius: '4px' } }, '& input': { textAlign: 'center', p: 1 } }}
                            inputProps={{ min: 0 }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1, px: 2, borderBottom: 'inherit' }}>
                          <TextField
                            value={li.rate === 0 ? '' : li.rate}
                            onChange={e => updateLine(li.id, 'rate', parseFloat(e.target.value) || 0)}
                            type="number"
                            size="small"
                            placeholder="0.00"
                            fullWidth
                            sx={{ '& .MuiOutlinedInput-root': { fontSize: 14, '& fieldset': { border: 'none' }, '&.Mui-focused fieldset': { border: '1px solid #3866b0', borderRadius: '4px' } }, '& input': { p: 1 } }}
                            InputProps={{ startAdornment: <Typography sx={{ fontSize: 14, color: '#283e48', mr: 0.25 }}>$</Typography> }}
                            inputProps={{ min: 0, step: 0.01 }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1, px: 2, borderBottom: 'inherit' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 14, color: amount > 0 ? '#283e48' : '#bdbdbd', fontVariantNumeric: 'tabular-nums' }}>
                              $ {amount > 0 ? amount.toFixed(2) : '0.00'}
                            </Typography>
                            {data.lineItems.length > 1 && (
                              <IconButton size="small" onClick={() => removeLine(li.id)} sx={{ p: 0.5, color: '#bdbdbd', '&:hover': { color: '#e53935', bgcolor: 'rgba(229,57,53,0.06)' } }}>
                                <DeleteOutlineRounded sx={{ fontSize: 18 }} />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e0e0e0' }}>
                <Button
                  onClick={addLine}
                  size="small"
                  sx={{ textTransform: 'none', color: '#3866b0', fontSize: 14, fontWeight: 700, bgcolor: 'white', border: '1px solid #b7c9f0', borderRadius: '6px', px: 1.5, py: 0.75, '&:hover': { bgcolor: '#f5f9ff', borderColor: '#3866b0' } }}
                >
                  Add item
                </Button>
                <Box onClick={() => onChange({ gstEnabled: !data.gstEnabled })} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', userSelect: 'none' }}>
                  <Checkbox
                    checked={data.gstEnabled}
                    onChange={e => onChange({ gstEnabled: e.target.checked })}
                    size="small"
                    sx={{ p: 0.5, color: '#cbd5e1', '&.Mui-checked': { color: '#3866b0' } }}
                    onClick={e => e.stopPropagation()}
                  />
                  <Typography sx={{ fontSize: 16, color: '#283e48' }}>GST Tax 10%</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <RightPanel subtotal={subtotal} gstAmount={gstAmount} total={total} />
        </Box>
      </Box>
    </Box>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const PageFooter = ({
  step,
  canContinue,
  onContinue,
  onBack,
}: {
  step: number;
  canContinue: boolean;
  onContinue: () => void;
  onBack: () => void;
}) => (
  <Box sx={{ flexShrink: 0, borderTop: '1px solid #e0e0e0', px: 4, py: 2.5, bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5 }}>
    <Button
      variant="outlined"
      onClick={step > 0 ? onBack : undefined}
      sx={{ textTransform: 'none', fontWeight: 700, fontSize: 16, borderRadius: '6px', borderColor: '#b7c9f0', color: '#3866b0', px: 3, py: 1, '&:hover': { borderColor: '#3866b0', bgcolor: '#f5f9ff' } }}
    >
      {step > 0 ? 'Back' : 'Cancel'}
    </Button>
    <Button
      variant="contained"
      disabled={!canContinue}
      onClick={onContinue}
      sx={{ textTransform: 'none', fontWeight: 700, fontSize: 16, borderRadius: '6px', bgcolor: '#3866b0', px: 3, py: 1, boxShadow: 'none', '&:hover': { bgcolor: '#2d56a0', boxShadow: 'none' }, '&.Mui-disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' } }}
    >
      {step === 1 ? 'Send invoice' : 'Continue'}
    </Button>
  </Box>
);

// ─── Main export ──────────────────────────────────────────────────────────────

export const InvoiceCreate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [customerData, setCustomerData] = useState<CustomerData>({
    email: '',
    contactName: '',
    customerId: '',
    customerType: '',
  });

  const [notes, setNotes] = useState('');

  const [detailsData, setDetailsData] = useState<DetailsData>({
    invoiceNumber: 'PAY-006',
    dueDate: calcDueIso(30),
    lineItems: [{ id: 1, description: '', quantity: 1, rate: 0 }],
    gstEnabled: true,
    reference: '',
  });

  const subtotal = detailsData.lineItems.reduce((s, li) => s + li.quantity * li.rate, 0);
  const gstAmount = detailsData.gstEnabled ? subtotal * 0.1 : 0;
  const total = subtotal + gstAmount;

  const canContinue =
    step === 0 ? total > 0 :
    true;

  const handleContinue = () => {
    if (step < 1) { setStep(s => s + 1); return; }

    const customer = INVOICE_CUSTOMERS.find(c => c.id === customerData.customerId) ?? {
      id: 'manual',
      name: customerData.contactName || customerData.email,
      email: customerData.email,
      abn: '',
    };
    sessionStorage.setItem('draftInvoice', JSON.stringify({
      id: 'inv-new',
      number: detailsData.invoiceNumber,
      customer,
      issueDate: ISSUE_DATE,
      dueDate: detailsData.dueDate,
      lineItems: detailsData.lineItems.map(li => ({ ...li, gst: detailsData.gstEnabled })),
      subtotal,
      gst: gstAmount,
      total,
      notes,
      status: 'sent',
    }));
    navigate('/account/invoices/inv-new/sent');
  };

  const stepperIndex = step;

  return (
    <Box component="main" sx={{ height: 'calc(100vh - 66px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', bgcolor: '#fcfcfc' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', px: 4, py: 5 }}>
        <Box sx={{ maxWidth: 1152, mx: 'auto' }}>

          {/* Breadcrumb */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 4 }}>
            <Typography component="span" onClick={() => navigate('/account/invoices')} sx={{ fontSize: 16, color: '#526973', cursor: 'pointer', '&:hover': { color: '#283e48' } }}>
              ← Get Paid
            </Typography>
            <Typography sx={{ fontSize: 16, color: '#526973', mx: 0.25 }}>/</Typography>
            <Typography sx={{ fontSize: 16, color: '#283e48' }}>Invoice</Typography>
          </Box>

          {/* Stepper */}
          <Box sx={{ mb: 5 }}>
            <InvoiceStepper stepperIndex={stepperIndex} />
          </Box>

          {step === 0 && (
            <DetailsStep
              data={detailsData}
              onChange={patch => setDetailsData(prev => ({ ...prev, ...patch }))}
              subtotal={subtotal}
              gstAmount={gstAmount}
              total={total}
            />
          )}
          {step === 1 && (
            <ReviewStep
              customerData={customerData}
              detailsData={detailsData}
              subtotal={subtotal}
              gstAmount={gstAmount}
              total={total}
              notes={notes}
              onNotesChange={setNotes}
              onCustomerChange={patch => setCustomerData(prev => ({ ...prev, ...patch }))}
            />
          )}
        </Box>
      </Box>

      <PageFooter step={step} canContinue={canContinue} onContinue={handleContinue} onBack={() => setStep(s => s - 1)} />
    </Box>
  );
};
