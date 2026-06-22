import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Button, Chip,
  Table, TableHead, TableBody, TableRow, TableCell,
  Divider, IconButton, Tooltip,
} from '@mui/material';
import { ContentCopyRounded, CheckRounded } from '@mui/icons-material';
import { INVOICES_DATA, PAYEE, type InvoiceStatus } from '../data/invoices';
import { FutureStateToggle } from '../components/FutureStateToggle';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n);

const fmtDate = (iso: string) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [y, m, d] = iso.split('-');
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
};

const STATUS_CHIP: Record<InvoiceStatus, { label: string; color: 'success' | 'primary' | 'error' | 'default' }> = {
  paid: { label: 'Paid', color: 'success' },
  sent: { label: 'Sent', color: 'primary' },
  overdue: { label: 'Overdue', color: 'error' },
  draft: { label: 'Draft', color: 'default' },
};

const cardSx = {
  borderRadius: '6px',
  border: '1px solid #f5f5f5',
  boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.05)',
};

const CopyField = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5 }}>
      <Typography sx={{ fontSize: 12, color: '#526973' }}>{label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#283e48' }}>{value}</Typography>
        <Tooltip title={copied ? 'Copied!' : 'Copy'} placement="top">
          <IconButton size="small" onClick={handleCopy} sx={{ p: 0.25, color: '#94a3b8', '&:hover': { color: '#3866b0' } }}>
            {copied ? <CheckRounded sx={{ fontSize: 14, color: '#43a047' }} /> : <ContentCopyRounded sx={{ fontSize: 14 }} />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [futureState, setFutureState] = useState<'current' | 'future'>('current');

  const invoice = INVOICES_DATA.find(i => i.id === id);

  if (!invoice) {
    return (
      <Box component="main" sx={{ height: 'calc(100vh - 66px)', overflowY: 'auto', bgcolor: '#fcfcfc', px: 4, py: 4 }}>
        <Typography sx={{ color: '#526973', mb: 2 }}>Invoice not found.</Typography>
        <Link to="/account/invoices" style={{ color: '#3866b0', fontSize: 13 }}>← Back to invoices</Link>
      </Box>
    );
  }

  const chip = STATUS_CHIP[invoice.status];

  const timeline = [
    { label: 'Created', date: invoice.issueDate, done: true },
    { label: 'Sent', date: invoice.status !== 'draft' ? invoice.issueDate : null, done: invoice.status !== 'draft' },
    { label: 'Paid', date: invoice.paidDate ?? null, done: invoice.status === 'paid' },
  ];

  return (
    <Box
      component="main"
      sx={{ height: 'calc(100vh - 66px)', overflowY: 'auto', bgcolor: '#fcfcfc', px: { xs: 2, sm: 4 }, py: 4, pb: 10 }}
    >
      <Box sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Breadcrumb */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link to="/account/invoices" style={{ fontSize: 12, color: '#526973', textDecoration: 'none' }}>Invoices</Link>
          <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>/</Typography>
          <Typography sx={{ fontSize: 12, color: '#283e48' }}>{invoice.number}</Typography>
        </Box>

        {/* Dark header */}
        <Box sx={{ bgcolor: '#283e48', borderRadius: '8px', p: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', mb: 0.5 }}>Invoice</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'white', mb: 1 }}>{invoice.number}</Typography>
            <Chip label={chip.label} color={chip.color} size="small" sx={{ fontSize: 12, fontWeight: 500, height: 24 }} />
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', mb: 0.25 }}>Total amount</Typography>
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: 'white', fontVariantNumeric: 'tabular-nums' }}>{fmt(invoice.total)}</Typography>
            <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              {invoice.status === 'paid' ? `Paid ${fmtDate(invoice.paidDate!)}` : `Due ${fmtDate(invoice.dueDate)}`}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          {/* Left: invoice content */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* From / To */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                  <Box>
                    <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#526973', textTransform: 'uppercase', letterSpacing: '0.5px', mb: 1 }}>From</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48' }}>{PAYEE.name}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#526973' }}>ABN: {PAYEE.abn}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#526973' }}>{PAYEE.email}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#526973', textTransform: 'uppercase', letterSpacing: '0.5px', mb: 1 }}>To</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48' }}>{invoice.customer.name}</Typography>
                    {invoice.customer.abn && <Typography sx={{ fontSize: 12, color: '#526973' }}>ABN: {invoice.customer.abn}</Typography>}
                    <Typography sx={{ fontSize: 12, color: '#526973' }}>{invoice.customer.email}</Typography>
                  </Box>
                </Box>

                {/* Meta row */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, bgcolor: '#fafafa', borderRadius: '6px', p: 1.5, mt: 2 }}>
                  {[
                    { label: 'Issue date', value: fmtDate(invoice.issueDate) },
                    { label: 'Due date', value: fmtDate(invoice.dueDate) },
                    { label: invoice.paymentRef ? 'Payment ref' : 'Status', value: invoice.paymentRef ?? chip.label },
                  ].map(({ label, value }) => (
                    <Box key={label}>
                      <Typography sx={{ fontSize: 11, color: '#94a3b8', mb: 0.25 }}>{label}</Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#283e48' }}>{value}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Line items */}
            <Card sx={cardSx}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#fafafa' }}>
                    {['Description', 'Qty', 'Rate', 'GST', 'Amount'].map((h, i) => (
                      <TableCell key={i} align={i >= 1 ? 'right' : 'left'} sx={{ fontSize: 11, fontWeight: 500, color: '#526973', py: 1.25, borderBottom: '1px solid #f5f5f5' }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.lineItems.map(li => (
                    <TableRow key={li.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCell sx={{ fontSize: 13, color: '#283e48', borderBottom: '1px solid #f5f5f5' }}>{li.description}</TableCell>
                      <TableCell align="right" sx={{ fontSize: 13, color: '#526973', borderBottom: '1px solid #f5f5f5' }}>{li.quantity}</TableCell>
                      <TableCell align="right" sx={{ fontSize: 13, color: '#526973', borderBottom: '1px solid #f5f5f5', fontVariantNumeric: 'tabular-nums' }}>{fmt(li.rate)}</TableCell>
                      <TableCell align="right" sx={{ fontSize: 13, color: '#526973', borderBottom: '1px solid #f5f5f5' }}>{li.gst ? '10%' : '—'}</TableCell>
                      <TableCell align="right" sx={{ fontSize: 13, fontWeight: 500, color: '#283e48', borderBottom: '1px solid #f5f5f5', fontVariantNumeric: 'tabular-nums' }}>{fmt(li.quantity * li.rate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Totals */}
              <Box sx={{ p: 2.5, bgcolor: '#fafafa' }}>
                {[
                  { label: 'Subtotal', value: fmt(invoice.subtotal) },
                  { label: 'GST (10%)', value: fmt(invoice.gst) },
                ].map(({ label, value }) => (
                  <Box key={label} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 8, mb: 0.75 }}>
                    <Typography sx={{ fontSize: 12, color: '#526973' }}>{label}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#283e48', fontVariantNumeric: 'tabular-nums', minWidth: 80, textAlign: 'right' }}>{value}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#283e48' }}>Total (AUD)</Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#3866b0', fontVariantNumeric: 'tabular-nums', minWidth: 80, textAlign: 'right' }}>{fmt(invoice.total)}</Typography>
                </Box>
              </Box>
            </Card>

            {invoice.notes ? (
              <Card sx={cardSx}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: 12, color: '#526973', mb: 0.5 }}>Notes</Typography>
                  <Typography sx={{ fontSize: 13, color: '#283e48' }}>{invoice.notes}</Typography>
                </CardContent>
              </Card>
            ) : null}

            {/* Future state: reconciliation */}
            {futureState === 'future' && invoice.status === 'paid' && (
              <Card sx={{ ...cardSx, border: '1px solid #A5D6A7', bgcolor: '#F1F8F1' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <CheckRounded sx={{ color: '#43a047', mt: 0.25 }} />
                    <Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#2e7d32', mb: 0.5 }}>Automatically reconciled</Typography>
                      <Typography sx={{ fontSize: 12, color: '#526973' }}>
                        This invoice was matched to a PayID payment from {invoice.customer.name} on {fmtDate(invoice.paidDate!)}.
                        Reference: {invoice.paymentRef}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* Right sidebar */}
          <Box sx={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Payment details */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', mb: 1.5 }}>Payment details</Typography>
                <CopyField label="PayID" value={PAYEE.payId} />
                <CopyField label="BSB" value={PAYEE.bsb} />
                <CopyField label="Account" value={PAYEE.account} />
              </CardContent>
            </Card>

            {/* Status timeline */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', mb: 2 }}>Status</Typography>
                {timeline.map((step, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: i < timeline.length - 1 ? 2 : 0 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box sx={{
                        width: 20, height: 20, borderRadius: '50%',
                        bgcolor: step.done ? '#3866b0' : '#e2e8f0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {step.done && <CheckRounded sx={{ fontSize: 12, color: 'white' }} />}
                      </Box>
                      {i < timeline.length - 1 && (
                        <Box sx={{ width: 2, flex: 1, bgcolor: '#e2e8f0', my: 0.5, minHeight: 16 }} />
                      )}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: 12, fontWeight: 500, color: step.done ? '#283e48' : '#94a3b8' }}>{step.label}</Typography>
                      {step.date && <Typography sx={{ fontSize: 11, color: '#526973' }}>{fmtDate(step.date)}</Typography>}
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card sx={cardSx}>
              <CardContent sx={{ p: 2 }}>
                {invoice.status === 'sent' && (
                  <Button fullWidth variant="outlined" sx={{ mb: 1, textTransform: 'none', fontSize: 12, borderRadius: '6px', borderColor: '#e2e8f0', color: '#526973' }}>
                    Send reminder
                  </Button>
                )}
                {invoice.status === 'overdue' && (
                  <Button fullWidth variant="contained" sx={{ mb: 1, bgcolor: '#e53935', textTransform: 'none', fontSize: 12, borderRadius: '6px', '&:hover': { bgcolor: '#c62828' } }}>
                    Send overdue reminder
                  </Button>
                )}
                {(invoice.status === 'sent' || invoice.status === 'overdue') && (
                  <Button fullWidth variant="contained" sx={{ mb: 1, bgcolor: '#3866b0', textTransform: 'none', fontSize: 12, borderRadius: '6px', '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' } }}>
                    Mark as paid
                  </Button>
                )}
                <Button fullWidth variant="outlined" sx={{ textTransform: 'none', fontSize: 12, borderRadius: '6px', borderColor: '#e2e8f0', color: '#526973' }}>
                  Download PDF
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
