import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Switch } from '@mui/material';
import { CheckRounded } from '@mui/icons-material';
import { INVOICES_DATA } from '../data/invoices';
import { FutureStateToggle } from '../components/FutureStateToggle';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n);

const fmtPts = (n: number) => new Intl.NumberFormat('en-AU').format(n);

const fmtDate = (iso: string) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [y, m, d] = iso.split('-');
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
};

const cardSx = {
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  boxShadow: '0px 1px 8px 1px rgba(0,0,0,0.05)',
};

export const InvoiceSent = () => {
  const { id } = useParams<{ id: string }>();
  const [futureState, setFutureState] = useState<'current' | 'future'>('current');
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  const raw = sessionStorage.getItem('draftInvoice');
  const draft = raw ? JSON.parse(raw) : null;
  const invoice = draft && draft.id === id ? draft : INVOICES_DATA.find(i => i.id === id);

  if (!invoice) {
    return (
      <Box component="main" sx={{ height: 'calc(100vh - 66px)', overflowY: 'auto', bgcolor: '#fcfcfc', px: 4, py: 4 }}>
        <Typography sx={{ color: '#526973', mb: 2 }}>Invoice not found.</Typography>
        <Link to="/account/invoices" style={{ color: '#3866b0', fontSize: 13 }}>← Back to invoices</Link>
      </Box>
    );
  }

  const prpPoints = Math.round(invoice.total * 0.975);
  const paymentRef = `PAY-${invoice.id === 'inv-new' ? '36142168' : invoice.id.replace('inv-', '').padStart(8, '3')}`;

  return (
    <Box
      component="main"
      sx={{ height: 'calc(100vh - 66px)', overflowY: 'auto', bgcolor: '#fcfcfc', px: { xs: 2, sm: 4 }, py: 6, pb: 10 }}
    >
      <Box sx={{ maxWidth: 560, width: '100%', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>

        {/* Success icon */}
        <Box sx={{
          width: 64, height: 64, borderRadius: '50%',
          bgcolor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <CheckRounded sx={{ fontSize: 32, color: '#16a34a' }} />
        </Box>

        {/* Heading + subtitle */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: '#283e48', mb: 0.75 }}>
            Invoice sent!
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#526973' }}>
            {invoice.number} has been sent to {invoice.customer?.email ?? 'your customer'}
          </Typography>
        </Box>

        {/* Invoice summary card */}
        <Card sx={{ ...cardSx, width: '100%' }}>
          <CardContent sx={{ p: 3, pb: '24px !important' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              {/* Row 1 */}
              <Box sx={{ pb: 2.5, pr: 2.5, borderBottom: '1px solid #f5f5f5', borderRight: '1px solid #f5f5f5' }}>
                <Typography sx={{ fontSize: 12, color: '#94a3b8', mb: 0.5 }}>Invoice number</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#283e48' }}>{invoice.number}</Typography>
              </Box>
              <Box sx={{ pb: 2.5, pl: 2.5, borderBottom: '1px solid #f5f5f5' }}>
                <Typography sx={{ fontSize: 12, color: '#94a3b8', mb: 0.5 }}>Amount due</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#283e48', fontVariantNumeric: 'tabular-nums' }}>{fmt(invoice.total)}</Typography>
              </Box>
              {/* Row 2 */}
              <Box sx={{ py: 2.5, pr: 2.5, borderBottom: '1px solid #f5f5f5', borderRight: '1px solid #f5f5f5' }}>
                <Typography sx={{ fontSize: 12, color: '#94a3b8', mb: 0.5 }}>Payment date</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#283e48' }}>{fmtDate(invoice.issueDate)}</Typography>
              </Box>
              <Box sx={{ py: 2.5, pl: 2.5, borderBottom: '1px solid #f5f5f5' }}>
                <Typography sx={{ fontSize: 12, color: '#94a3b8', mb: 0.5 }}>Due date</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#283e48' }}>{fmtDate(invoice.dueDate)}</Typography>
              </Box>
              {/* Row 3: full width */}
              <Box sx={{ pt: 2.5, gridColumn: '1 / -1' }}>
                <Typography sx={{ fontSize: 12, color: '#94a3b8', mb: 0.5 }}>Payment reference</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#283e48' }}>{paymentRef}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* PayRewards banner */}
        <Card sx={{ ...cardSx, width: '100%', bgcolor: '#EEF4FF', border: '1px solid #d0e0ff', overflow: 'hidden' }}>
          <CardContent sx={{ p: 0, pb: '0 !important' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2.5 }}>
              <Box>
                <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#3866b0', lineHeight: 1.1, mb: 0.25 }}>
                  +{fmtPts(prpPoints)}
                </Typography>
                <Typography sx={{ fontSize: 13, color: '#3866b0', fontWeight: 500 }}>
                  PayRewards Points from this payment
                </Typography>
              </Box>
              {/* Confetti graphic placeholder */}
              <Box sx={{
                width: 72, height: 72, position: 'relative', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Box sx={{
                  width: 56, height: 56, borderRadius: '50%',
                  bgcolor: '#3866b0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(56,102,176,0.3)',
                }}>
                  <Typography sx={{ fontSize: 24, lineHeight: 1 }}>🏆</Typography>
                </Box>
                {[[-12,-10],[10,-14],[14,6],[-14,8]].map(([x, y], i) => (
                  <Box key={i} sx={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`,
                    width: 6, height: 6, borderRadius: '50%',
                    bgcolor: ['#FFD700', '#FF6B6B', '#4CAF50', '#FF9800'][i],
                    transform: 'translate(-50%, -50%)',
                  }} />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Future state: view tracking */}
        {futureState === 'future' && (
          <Card sx={{ ...cardSx, width: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', mb: 0.25 }}>
                    Invoice view tracking
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#526973' }}>
                    Get notified when {invoice.customer?.name} opens this invoice.
                  </Typography>
                </Box>
                <Switch
                  checked={trackingEnabled}
                  onChange={e => setTrackingEnabled(e.target.checked)}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#3866b0' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#3866b0' },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Button
            component={Link}
            to={`/account/invoices/${invoice.id === 'inv-new' ? '' : invoice.id}`}
            variant="outlined"
            fullWidth
            sx={{
              textTransform: 'none', fontWeight: 500, fontSize: 14,
              borderRadius: '6px', borderColor: '#e2e8f0', color: '#526973',
              py: 1.25,
              '&:hover': { borderColor: '#94a3b8' },
            }}
          >
            View invoice
          </Button>
          <Button
            component={Link}
            to="/account/invoices/new"
            variant="contained"
            fullWidth
            sx={{
              textTransform: 'none', fontWeight: 600, fontSize: 14,
              borderRadius: '6px', bgcolor: '#283e48', py: 1.25,
              '&:hover': { bgcolor: 'rgba(40,62,72,0.9)' },
            }}
          >
            + Create another
          </Button>
        </Box>

        <Link to="/account/invoices" style={{ fontSize: 12, color: '#94a3b8', textDecoration: 'none' }}>
          ← Back to all invoices
        </Link>
      </Box>

      <FutureStateToggle state={futureState} onChange={setFutureState} />
    </Box>
  );
};
