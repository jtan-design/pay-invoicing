import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Button, TextField,
  Select, MenuItem, FormControl, InputLabel, Table, TableHead,
  TableBody, TableRow, TableCell, IconButton, Divider, Checkbox,
} from '@mui/material';
import { AddRounded, DeleteOutlineRounded, AutoAwesomeRounded } from '@mui/icons-material';
import { INVOICE_CUSTOMERS, PAYEE, type InvoiceLineItem } from '../data/invoices';
import { FutureStateToggle } from '../components/FutureStateToggle';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n);

const cardSx = {
  borderRadius: '6px',
  border: '1px solid #f5f5f5',
  boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.05)',
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
    fontSize: 13,
    '& fieldset': { borderColor: '#e2e8f0' },
    '&:hover fieldset': { borderColor: '#94a3b8' },
    '&.Mui-focused fieldset': { borderColor: '#3866b0' },
  },
  '& .MuiInputLabel-root': { fontSize: 13 },
};

export const InvoiceNew = () => {
  const navigate = useNavigate();
  const [futureState, setFutureState] = useState<'current' | 'future'>('current');
  const [customerId, setCustomerId] = useState('');
  const [invoiceNumber] = useState('INV-2026-006');
  const [issueDate] = useState('2026-06-16');
  const [terms, setTerms] = useState(30);
  const [notes, setNotes] = useState('');
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    { id: 1, description: '', quantity: 1, rate: 0, gst: true },
  ]);

  const dueDate = (() => {
    const d = new Date(issueDate);
    d.setDate(d.getDate() + terms);
    return d.toISOString().split('T')[0];
  })();

  const subtotal = lineItems.reduce((s, li) => s + li.quantity * li.rate, 0);
  const gst = lineItems.filter(li => li.gst).reduce((s, li) => s + li.quantity * li.rate * 0.1, 0);
  const total = subtotal + gst;

  const addLine = () =>
    setLineItems(prev => [...prev, { id: Date.now(), description: '', quantity: 1, rate: 0, gst: true }]);

  const removeLine = (id: number) =>
    setLineItems(prev => prev.filter(li => li.id !== id));

  const updateLine = (id: number, field: keyof InvoiceLineItem, value: string | number | boolean) =>
    setLineItems(prev => prev.map(li => li.id === id ? { ...li, [field]: value } : li));

  const handleSend = () => {
    const customer = INVOICE_CUSTOMERS.find(c => c.id === customerId);
    const draft = { id: 'inv-new', number: invoiceNumber, customer, issueDate, dueDate, lineItems, subtotal, gst, total, notes, status: 'sent' };
    sessionStorage.setItem('draftInvoice', JSON.stringify(draft));
    navigate('/account/invoices/inv-new/sent');
  };

  return (
    <Box
      component="main"
      sx={{ height: 'calc(100vh - 66px)', overflowY: 'auto', bgcolor: '#fcfcfc', px: { xs: 2, sm: 4 }, py: 4, pb: 10 }}
    >
      <Box sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Header */}
        <Box>
          <Typography sx={{ fontSize: 12, color: '#526973', mb: 0.5 }}>Get paid</Typography>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#283e48', letterSpacing: '0.2px' }}>New invoice</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          {/* Left: form */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Bill to */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', mb: 2 }}>Bill to</Typography>
                <FormControl fullWidth sx={fieldSx}>
                  <InputLabel sx={{ fontSize: 13 }}>Select customer</InputLabel>
                  <Select
                    value={customerId}
                    onChange={e => setCustomerId(e.target.value)}
                    label="Select customer"
                    sx={{ fontSize: 13 }}
                  >
                    {INVOICE_CUSTOMERS.map(c => (
                      <MenuItem key={c.id} value={c.id} sx={{ fontSize: 13 }}>{c.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {customerId && (() => {
                  const c = INVOICE_CUSTOMERS.find(cu => cu.id === customerId);
                  return c ? (
                    <Box sx={{ mt: 1.5, p: 1.5, bgcolor: '#fafafa', borderRadius: '6px' }}>
                      <Typography sx={{ fontSize: 12, color: '#526973' }}>{c.email}</Typography>
                      {c.abn && <Typography sx={{ fontSize: 12, color: '#526973' }}>ABN: {c.abn}</Typography>}
                    </Box>
                  ) : null;
                })()}
              </CardContent>
            </Card>

            {/* Invoice details */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', mb: 2 }}>Invoice details</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                  <TextField label="Invoice number" value={invoiceNumber} size="small" sx={fieldSx} InputProps={{ readOnly: true }} />
                  <TextField label="Issue date" value={issueDate} size="small" sx={fieldSx} InputProps={{ readOnly: true }} />
                  <FormControl size="small" sx={fieldSx}>
                    <InputLabel>Payment terms</InputLabel>
                    <Select value={terms} onChange={e => setTerms(Number(e.target.value))} label="Payment terms" sx={{ fontSize: 13 }}>
                      <MenuItem value={7}>7 days (due {dueDate})</MenuItem>
                      <MenuItem value={14}>14 days</MenuItem>
                      <MenuItem value={30}>30 days</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>

            {/* Future state: AI suggestions */}
            {futureState === 'future' && customerId && (
              <Box sx={{ bgcolor: '#EEF4FF', border: '1px solid #C7D7F8', borderRadius: '8px', p: 2, display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <AutoAwesomeRounded sx={{ color: '#3866b0', fontSize: 18, mt: 0.25 }} />
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#3866b0', mb: 0.5 }}>Suggested items based on customer history</Typography>
                  <Typography sx={{ fontSize: 12, color: '#526973', mb: 1 }}>Based on your last 3 invoices to this customer:</Typography>
                  {['Strategy consulting — monthly retainer', 'Workshop facilitation'].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setLineItems(prev => [...prev, { id: Date.now() + i, description: item, quantity: 1, rate: i === 0 ? 5000 : 800, gst: true }])}
                        sx={{ fontSize: 11, py: 0.25, px: 1, textTransform: 'none', borderColor: '#C7D7F8', color: '#3866b0', borderRadius: '4px' }}
                      >
                        + Add
                      </Button>
                      <Typography sx={{ fontSize: 12, color: '#283e48' }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Line items */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', mb: 2 }}>Line items</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#fafafa' }}>
                      {['Description', 'Qty', 'Rate', 'GST', 'Amount', ''].map((h, i) => (
                        <TableCell key={i} sx={{ fontSize: 11, fontWeight: 500, color: '#526973', py: 1, borderBottom: '1px solid #f5f5f5' }}>{h}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lineItems.map(li => (
                      <TableRow key={li.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ borderBottom: '1px solid #f5f5f5', py: 1, width: '40%' }}>
                          <TextField
                            value={li.description}
                            onChange={e => updateLine(li.id, 'description', e.target.value)}
                            placeholder="Description"
                            size="small"
                            fullWidth
                            sx={fieldSx}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f5f5f5', py: 1, width: '10%' }}>
                          <TextField
                            value={li.quantity}
                            onChange={e => updateLine(li.id, 'quantity', parseFloat(e.target.value) || 0)}
                            type="number"
                            size="small"
                            sx={{ ...fieldSx, width: 60 }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f5f5f5', py: 1, width: '15%' }}>
                          <TextField
                            value={li.rate}
                            onChange={e => updateLine(li.id, 'rate', parseFloat(e.target.value) || 0)}
                            type="number"
                            size="small"
                            sx={{ ...fieldSx, width: 90 }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f5f5f5', py: 1 }}>
                          <Checkbox
                            checked={li.gst}
                            onChange={e => updateLine(li.id, 'gst', e.target.checked)}
                            size="small"
                            sx={{ p: 0, color: '#94a3b8', '&.Mui-checked': { color: '#3866b0' } }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f5f5f5', py: 1, fontWeight: 500, fontSize: 13, color: '#283e48', fontVariantNumeric: 'tabular-nums' }}>
                          {fmt(li.quantity * li.rate)}
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #f5f5f5', py: 1 }}>
                          <IconButton size="small" onClick={() => removeLine(li.id)} sx={{ color: '#94a3b8', '&:hover': { color: '#e53935' } }}>
                            <DeleteOutlineRounded fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  startIcon={<AddRounded />}
                  onClick={addLine}
                  size="small"
                  sx={{ mt: 1.5, textTransform: 'none', color: '#3866b0', fontSize: 12, fontWeight: 500 }}
                >
                  Add line item
                </Button>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', mb: 1.5 }}>Notes</Typography>
                <TextField
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add a note for your customer (optional)"
                  multiline
                  rows={3}
                  fullWidth
                  sx={fieldSx}
                />
              </CardContent>
            </Card>
          </Box>

          {/* Right sidebar */}
          <Box sx={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Payment details */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', mb: 1.5 }}>Your payment details</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[
                    { label: 'PayID', value: PAYEE.payId },
                    { label: 'BSB', value: PAYEE.bsb },
                    { label: 'Account', value: PAYEE.account },
                  ].map(({ label, value }) => (
                    <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: 12, color: '#526973' }}>{label}</Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#283e48' }}>{value}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', mb: 1.5 }}>Summary</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 12, color: '#526973' }}>Subtotal</Typography>
                    <Typography sx={{ fontSize: 12, color: '#283e48', fontVariantNumeric: 'tabular-nums' }}>{fmt(subtotal)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 12, color: '#526973' }}>GST (10%)</Typography>
                    <Typography sx={{ fontSize: 12, color: '#283e48', fontVariantNumeric: 'tabular-nums' }}>{fmt(gst)}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#283e48' }}>Total (AUD)</Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#3866b0', fontVariantNumeric: 'tabular-nums' }}>{fmt(total)}</Typography>
                </Box>

                {/* PRP callout */}
                <Box sx={{ bgcolor: '#EEF4FF', borderRadius: '6px', p: 1.5, mb: 2 }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#3866b0', mb: 0.25 }}>Pay by PayID, get paid faster</Typography>
                  <Typography sx={{ fontSize: 11, color: '#526973' }}>PayID payments typically clear within seconds via NPP.</Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSend}
                  disabled={!customerId || total === 0}
                  sx={{ bgcolor: '#3866b0', textTransform: 'none', fontWeight: 600, fontSize: 13, borderRadius: '6px', mb: 1, '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' }, '&.Mui-disabled': { bgcolor: '#e2e8f0' } }}
                >
                  Send invoice
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  disabled={!customerId}
                  sx={{ borderColor: '#e2e8f0', color: '#526973', textTransform: 'none', fontSize: 13, borderRadius: '6px', '&:hover': { borderColor: '#94a3b8' } }}
                >
                  Save as draft
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
      <FutureStateToggle state={futureState} onChange={setFutureState} />
    </Box>
  );
};
