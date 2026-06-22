import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Button, Divider,
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
  Chip, TextField, InputAdornment, IconButton, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  RadioGroup, FormControlLabel, Radio, Tabs, Tab,
  Menu, MenuItem,
} from '@mui/material';
import {
  AddRounded, SearchRounded, ContentCopyRounded, CheckRounded,
  LinkRounded, ElectricBoltRounded, CalendarMonthRounded,
  MoreVertRounded,
} from '@mui/icons-material';
import { INVOICES_DATA, INVOICE_CUSTOMERS, type Invoice, type InvoiceStatus } from '../data/invoices';
import { FutureStateToggle } from '../components/FutureStateToggle';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

const fmtDate = (iso: string) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [, m, d] = iso.split('-');
  return `${parseInt(d)} ${months[parseInt(m) - 1]}`;
};

const STATUS_CHIP: Record<InvoiceStatus, { label: string; chipSx: object }> = {
  paid:    { label: 'Paid',    chipSx: { bgcolor: '#F7FDFB', border: '1px solid #97EBC8', color: '#0D7E51' } },
  sent:    { label: 'Sent',    chipSx: { bgcolor: '#F7FAFF', border: '1px solid #9CC0F9', color: '#285AAA' } },
  overdue: { label: 'Overdue', chipSx: { bgcolor: '#FDF7F7', border: '1px solid #E79BA1', color: '#D03643' } },
  draft:   { label: 'Draft',   chipSx: { bgcolor: '#f5f5f5', border: '1px solid #e0e0e0', color: '#526973' } },
};

type InvoiceFilter = 'all' | InvoiceStatus;
const INVOICE_FILTER_TABS: InvoiceFilter[] = ['all', 'draft', 'sent', 'paid', 'overdue'];

const cardSx = {
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  boxShadow: '0px 1px 8px 1px rgba(0,0,0,0.05), 0px 2px 3px 0px rgba(0,0,0,0.08)',
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
    fontSize: 14,
    '& fieldset': { borderColor: '#e2e8f0' },
    '&:hover fieldset': { borderColor: '#94a3b8' },
    '&.Mui-focused fieldset': { borderColor: '#3866b0' },
  },
};

// ─── Copy row ─────────────────────────────────────────────────────────────────

const CopyRow = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 1.25, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <Typography sx={{ fontSize: 14, color: '#526973', width: 180, flexShrink: 0 }}>{label}</Typography>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', flex: 1 }}>{value}</Typography>
      <Tooltip title={copied ? 'Copied!' : 'Copy'} placement="top">
        <IconButton size="small" onClick={copy} sx={{ p: 0.5, color: '#94a3b8', '&:hover': { color: '#3866b0' } }}>
          {copied
            ? <CheckRounded sx={{ fontSize: 14, color: '#43a047' }} />
            : <ContentCopyRounded sx={{ fontSize: 14 }} />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

// ─── Overview Tab ─────────────────────────────────────────────────────────────

const OverviewTab = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

    {/* Share your payment link */}
    <Card sx={{ ...cardSx, bgcolor: '#eef2fc', boxShadow: '0px 1px 8px 1px rgba(0,0,0,0.05), 0px 2px 3px 0px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Box sx={{ bgcolor: '#3a81f4', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <LinkRounded sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', mb: 0.5 }}>Share your payment link</Typography>
            <Typography sx={{ fontSize: 16, color: '#526973' }}>When your customers use pay.com.au, they earn points and so do you.</Typography>
          </Box>
          <Button variant="outlined" sx={{ textTransform: 'none', fontSize: 14, fontWeight: 700, borderRadius: '6px', borderColor: '#b7c9f0', color: '#3866b0', bgcolor: 'white', flexShrink: 0, '&:hover': { bgcolor: 'rgba(56,102,176,0.04)', borderColor: '#3866b0' } }}>
            Create payment link
          </Button>
        </Box>
      </CardContent>
    </Card>

    {/* Share details on invoices */}
    <Card sx={cardSx}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', mb: 0.5 }}>Share these details on invoices</Typography>
            <Typography sx={{ fontSize: 14, color: '#526973' }}>Two ways your customers can pay you. Both earn points.</Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<ContentCopyRounded />}
            onClick={() => navigator.clipboard.writeText(
              `To pay via bank transfer:\nPayID: creativedirectionmanagement@invoice.pay.com.au\nAccount name: pay.com.au\nBSB: 633-123\nAccount: 123456789780`
            )}
            sx={{ bgcolor: '#3866b0', textTransform: 'none', fontWeight: 700, fontSize: 14, borderRadius: '6px', flexShrink: 0, ml: 3, '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' } }}
          >
            Copy payment template
          </Button>
        </Box>

        {/* Info chips */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
          {[
            { icon: <ElectricBoltRounded sx={{ fontSize: 13 }} />, text: 'Same-day settlement if received by 2PM AET' },
            { icon: <CalendarMonthRounded sx={{ fontSize: 13 }} />, text: 'Daily settlement report · 6:30 PM AET' },
          ].map(({ icon, text }) => (
            <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#f7faff', border: '1px solid #9cc0f9', borderRadius: '999px', px: 1.5, py: 0.5 }}>
              <Box sx={{ color: '#285aaa', display: 'flex', alignItems: 'center' }}>{icon}</Box>
              <Typography sx={{ fontSize: 14, color: '#285aaa' }}>{text}</Typography>
            </Box>
          ))}
        </Box>

        {/* Payment details */}
        <Box sx={{ bgcolor: '#fafafa', borderRadius: '6px', p: 3 }}>
          <Typography sx={{ fontSize: 14, color: '#526973', mb: 1.5 }}>To pay via bank transfer, please use either of the below secured methods:</Typography>
          <CopyRow label="PayID email" value="creativedirectionmanagement@invoice.pay.com.au" />
          <CopyRow label="Account name" value="pay.com.au" />
          <CopyRow label="BSB" value="633-123" />
          <CopyRow label="Account number" value="123456789780" />
          <Divider sx={{ my: 2 }} />
          <Typography sx={{ fontSize: 12, color: '#526973', lineHeight: 1.6 }}>
            We pay our business expenses through{' '}
            <span style={{ color: '#3866b0' }}>pay.com.au</span>.
            <br />
            Join 70,000 other businesses and unlock bonus PayRewards Points when you get started:
            <br />
            <span style={{ color: '#3866b0' }}>https://pay.com.au/referred?referer=Business&refcode=98B166</span>
          </Typography>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 2, mb: 1.5 }}>
          <Typography sx={{ fontSize: 16, color: '#3866b0', borderBottom: '1px solid #3866b0', display: 'inline', cursor: 'pointer', lineHeight: 1.6 }}>
            How do I add this to my Xero template?
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ bgcolor: '#f7fdfb', border: '1px solid #97ebc8', borderRadius: '999px', px: 1.5, py: 0.5 }}>
            <Typography sx={{ fontSize: 14, color: '#0d7e51' }}>Active</Typography>
          </Box>
          <Typography sx={{ fontSize: 14, color: '#283e48' }}>Linked to settlement account - Commonwealth Bank 123**456</Typography>
        </Box>
      </CardContent>
    </Card>

    {/* Daily report */}
    <Card sx={cardSx}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48' }}>Daily report goes to</Typography>
          <Button sx={{ textTransform: 'none', fontSize: 14, fontWeight: 700, color: '#3866b0', p: 0, minWidth: 'auto' }}>Edit</Button>
        </Box>
        <Typography sx={{ fontSize: 14, color: '#526973', mb: 0.75 }}>A 6.30pm AET summary of every payment, sent to:</Typography>
        <Typography sx={{ fontSize: 16, color: '#283e48' }}>jtan@pay.com.au, atai@pay.com.au, iteh@pay.com.au</Typography>
      </CardContent>
    </Card>

    {/* Your setup */}
    <Card sx={cardSx}>
      <CardContent sx={{ p: 3 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#283e48', mb: 1 }}>Your setup</Typography>
        {[
          { label: 'Your rewards', value: 'Plus package - 2 points per $1 received' },
          { label: 'Funds land in', value: 'Commonwealth Bank 123456' },
        ].map(({ label, value }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <Box>
              <Typography sx={{ fontSize: 14, color: '#526973', mb: 0.25 }}>{label}</Typography>
              <Typography sx={{ fontSize: 16, color: '#283e48' }}>{value}</Typography>
            </Box>
            <Button sx={{ textTransform: 'none', fontSize: 14, fontWeight: 700, color: '#3866b0', p: 0, minWidth: 'auto', flexShrink: 0 }}>Update</Button>
          </Box>
        ))}
      </CardContent>
    </Card>
  </Box>
);

// ─── Invoice row actions ──────────────────────────────────────────────────────

const InvoiceActions = ({ inv, onOpenChange }: { inv: Invoice; onOpenChange: (id: string | null) => void }) => {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchor(e.currentTarget);
    onOpenChange(inv.id);
  };

  const handleClose = () => {
    setAnchor(null);
    onOpenChange(null);
  };

  const items = [
    { label: 'View invoice', onClick: () => { navigate(`/account/invoices/${inv.id}`); handleClose(); } },
    { label: 'Edit invoice', onClick: handleClose },
    ...(inv.status !== 'paid' ? [{ label: 'Send reminder', onClick: handleClose }] : []),
    ...(inv.status !== 'paid' ? [{ label: 'Mark as paid', onClick: handleClose }] : []),
    { label: 'Download PDF', onClick: handleClose },
    { label: 'Delete invoice', onClick: handleClose, danger: true },
  ];

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
        sx={{ color: '#94a3b8', '&:hover': { color: '#3866b0', bgcolor: 'rgba(56,102,176,0.08)' }, borderRadius: '999px' }}
      >
        <MoreVertRounded fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        onClick={e => e.stopPropagation()}
        PaperProps={{ sx: { borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', border: '1px solid #e2e8f0', minWidth: 176, py: '4px' } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {items.map(item => (
          <MenuItem
            key={item.label}
            onClick={item.onClick}
            sx={{ fontSize: 14, py: 1.25, color: item.danger ? '#D03643' : '#283e48', '&:hover': { bgcolor: item.danger ? '#FDF7F7' : '#F3F6FD' } }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// ─── Invoice Tab ──────────────────────────────────────────────────────────────

const InvoiceTab = ({ futureState }: { futureState: 'current' | 'future' }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<InvoiceFilter>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const counts = {
    all: INVOICES_DATA.length,
    draft: INVOICES_DATA.filter(i => i.status === 'draft').length,
    sent: INVOICES_DATA.filter(i => i.status === 'sent').length,
    paid: INVOICES_DATA.filter(i => i.status === 'paid').length,
    overdue: INVOICES_DATA.filter(i => i.status === 'overdue').length,
  } as Record<InvoiceFilter, number>;

  const invoices = filter === 'all' ? INVOICES_DATA : INVOICES_DATA.filter(i => i.status === filter);
  const outstanding = INVOICES_DATA.filter(i => i.status === 'sent').reduce((s, i) => s + i.total, 0);
  const overdueAmt = INVOICES_DATA.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0);
  const paidAmt = INVOICES_DATA.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);

  const stats = [
    { label: 'Awaiting payment', value: fmt(outstanding), sub: `${counts.sent} invoice${counts.sent !== 1 ? 's' : ''}`, color: '#3866b0' },
    { label: 'Overdue', value: fmt(overdueAmt), sub: `${counts.overdue} invoice${counts.overdue !== 1 ? 's' : ''}`, color: '#e53935' },
    { label: 'Paid (all time)', value: fmt(paidAmt), sub: `${counts.paid} invoice${counts.paid !== 1 ? 's' : ''}`, color: '#43a047' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {futureState === 'future' && counts.overdue > 0 && (
        <Box sx={{ bgcolor: '#FFF8E1', border: '1px solid #FFD54F', borderRadius: '8px', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 13, color: '#E65100', fontWeight: 500 }}>
            {counts.overdue} invoice{counts.overdue !== 1 ? 's are' : ' is'} overdue — {fmt(overdueAmt)} outstanding. Send a reminder?
          </Typography>
          <Button variant="contained" size="small" sx={{ bgcolor: '#FB8C00', textTransform: 'none', fontWeight: 600, fontSize: 12, borderRadius: '6px', ml: 2, flexShrink: 0, '&:hover': { bgcolor: '#F57C00' } }}>
            Send reminders
          </Button>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#283e48' }}>Invoices</Typography>
        <Button
          component={Link}
          to="/account/invoices/new"
          variant="contained"
          startIcon={<AddRounded />}
          sx={{ bgcolor: '#3866b0', textTransform: 'none', fontWeight: 700, fontSize: 14, borderRadius: '6px', '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' } }}
        >
          New invoice
        </Button>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {stats.map(stat => (
          <Card key={stat.label} sx={{ ...cardSx, boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: 12, color: '#526973', mb: 0.75 }}>{stat.label}</Typography>
              <Typography sx={{ fontSize: 22, fontWeight: 700, color: stat.color, mb: 0.25 }}>{stat.value}</Typography>
              <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>{stat.sub}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Filter tabs + table */}
      <Card sx={{ ...cardSx, boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', borderBottom: '1px solid #f5f5f5', px: 1 }}>
          {INVOICE_FILTER_TABS.map(t => (
            <Box
              key={t}
              component="button"
              onClick={() => setFilter(t)}
              sx={{
                px: 1.5, py: 1.25, border: 'none', bgcolor: 'transparent', cursor: 'pointer',
                fontSize: 13, fontWeight: filter === t ? 600 : 400,
                color: filter === t ? '#3866b0' : '#526973',
                borderBottom: `2px solid ${filter === t ? '#3866b0' : 'transparent'}`,
                mb: '-1px', display: 'flex', alignItems: 'center', gap: 0.75, fontFamily: 'inherit',
              }}
            >
              {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
              <Box component="span" sx={{ bgcolor: filter === t ? 'rgba(56,102,176,0.1)' : '#f5f5f5', color: filter === t ? '#3866b0' : '#94a3b8', borderRadius: '10px', px: '6px', py: '1px', fontSize: 11, fontWeight: 600 }}>
                {counts[t]}
              </Box>
            </Box>
          ))}
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#fafafa' }}>
                {['Invoice', 'Customer', 'Amount', 'Issued', 'Due', 'Status', ''].map((h, i) => (
                  <TableCell key={i} align={h === 'Amount' ? 'right' : 'left'}
                    sx={{ fontSize: 12, fontWeight: 500, color: '#526973', py: 1.25, borderBottom: '1px solid #f5f5f5' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map(inv => {
                const chip = STATUS_CHIP[inv.status];
                return (
                  <TableRow key={inv.id} onClick={() => navigate(`/account/invoices/${inv.id}`)}
                    sx={{ cursor: 'pointer', bgcolor: openMenuId === inv.id ? '#F3F6FD' : undefined, '&:hover': { bgcolor: '#F3F6FD' }, '&:last-child td': { borderBottom: 0 } }}>
                    <TableCell sx={{ fontSize: 13, fontWeight: 500, color: '#283e48', borderBottom: '1px solid #f5f5f5' }}>{inv.number}</TableCell>
                    <TableCell sx={{ fontSize: 13, color: '#283e48', borderBottom: '1px solid #f5f5f5' }}>{inv.customer.name}</TableCell>
                    <TableCell align="right" sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', borderBottom: '1px solid #f5f5f5', fontVariantNumeric: 'tabular-nums' }}>{fmt(inv.total)}</TableCell>
                    <TableCell sx={{ fontSize: 13, color: '#526973', borderBottom: '1px solid #f5f5f5' }}>{fmtDate(inv.issueDate)}</TableCell>
                    <TableCell sx={{ fontSize: 13, color: inv.status === 'overdue' ? '#e53935' : '#526973', fontWeight: inv.status === 'overdue' ? 500 : 400, borderBottom: '1px solid #f5f5f5' }}>{fmtDate(inv.dueDate)}</TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                      <Chip label={chip.label} size="small" sx={{ fontSize: 12, fontWeight: 500, height: 24, borderRadius: '999px', ...chip.chipSx }} />
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #f5f5f5', width: 54 }} onClick={e => e.stopPropagation()}>
                      <InvoiceActions inv={inv} onOpenChange={setOpenMenuId} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {invoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 6, color: '#94a3b8', fontSize: 14 }}>
                    No {filter !== 'all' ? filter : ''} invoices yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

// ─── Customers Tab ─────────────────────────────────────────────────────────────

interface CustomerStat {
  id: string;
  name: string;
  email: string;
  abn: string;
  invoiceCount: number;
  outstanding: number;
  lastInvoiceStatus?: InvoiceStatus;
}

const CUSTOMER_STATS: CustomerStat[] = INVOICE_CUSTOMERS.map(c => {
  const invs = INVOICES_DATA.filter(i => i.customer.id === c.id);
  const outstanding = invs.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + i.total, 0);
  const last = [...invs].sort((a, b) => b.issueDate.localeCompare(a.issueDate))[0];
  return { ...c, invoiceCount: invs.length, outstanding, lastInvoiceStatus: last?.status };
});

interface AddCustomerForm {
  name: string;
  email: string;
  abn: string;
  address: string;
  city: string;
  state: string;
}

const CustomersTab = () => {
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [customerType, setCustomerType] = useState<'individual' | 'business'>('business');
  const [form, setForm] = useState<AddCustomerForm>({ name: '', email: '', abn: '', address: '', city: '', state: '' });

  const filtered = search
    ? CUSTOMER_STATS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      )
    : CUSTOMER_STATS;

  const resetAndClose = () => {
    setAddOpen(false);
    setForm({ name: '', email: '', abn: '', address: '', city: '', state: '' });
    setCustomerType('business');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#283e48' }}>Customers</Typography>
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={() => setAddOpen(true)}
          sx={{ bgcolor: '#3866b0', textTransform: 'none', fontWeight: 700, fontSize: 14, borderRadius: '6px', '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' } }}
        >
          Add customer
        </Button>
      </Box>

      <Card sx={{ ...cardSx, boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.05)' }}>
        <Box sx={{ p: 2.5, borderBottom: '1px solid #f5f5f5' }}>
          <TextField
            placeholder="Search customers…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            size="small"
            sx={{ width: 300, ...fieldSx }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded sx={{ fontSize: 18, color: '#94a3b8' }} /></InputAdornment> }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#fafafa' }}>
                {['Customer', 'Email', 'ABN', 'Invoices', 'Outstanding', 'Last invoice', ''].map((h, i) => (
                  <TableCell key={i} align={h === 'Outstanding' ? 'right' : 'left'}
                    sx={{ fontSize: 12, fontWeight: 500, color: '#526973', py: 1.25, borderBottom: '1px solid #f5f5f5' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id} sx={{ '&:hover': { bgcolor: '#fafafa' }, '&:last-child td': { borderBottom: 0 } }}>
                  <TableCell sx={{ fontSize: 13, fontWeight: 600, color: '#283e48', borderBottom: '1px solid #f5f5f5' }}>{c.name}</TableCell>
                  <TableCell sx={{ fontSize: 13, color: '#526973', borderBottom: '1px solid #f5f5f5' }}>{c.email}</TableCell>
                  <TableCell sx={{ fontSize: 13, color: '#526973', borderBottom: '1px solid #f5f5f5' }}>{c.abn || '—'}</TableCell>
                  <TableCell sx={{ fontSize: 13, color: '#526973', borderBottom: '1px solid #f5f5f5' }}>{c.invoiceCount || '—'}</TableCell>
                  <TableCell align="right" sx={{ fontSize: 13, fontWeight: c.outstanding > 0 ? 600 : 400, color: c.outstanding > 0 ? '#e53935' : '#526973', borderBottom: '1px solid #f5f5f5', fontVariantNumeric: 'tabular-nums' }}>
                    {c.outstanding > 0 ? fmt(c.outstanding) : '—'}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    {c.lastInvoiceStatus
                      ? <Chip label={STATUS_CHIP[c.lastInvoiceStatus].label} size="small" sx={{ fontSize: 12, fontWeight: 500, height: 24, borderRadius: '999px', ...STATUS_CHIP[c.lastInvoiceStatus].chipSx }} />
                      : <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>—</Typography>
                    }
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #f5f5f5' }}>
                    <Typography sx={{ fontSize: 12, color: '#3866b0', fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                      View →
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 6, color: '#94a3b8', fontSize: 14 }}>
                    {search ? 'No customers match your search.' : 'No customers yet. Add your first customer to get started.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add customer dialog */}
      <Dialog open={addOpen} onClose={resetAndClose} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: '8px' } }}>
        <DialogTitle sx={{ fontSize: 18, fontWeight: 700, color: '#283e48', pb: 0.5 }}>
          Add customer
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography sx={{ fontSize: 14, color: '#526973', mb: 0.75 }}>Customer type</Typography>
              <RadioGroup row value={customerType} onChange={e => setCustomerType(e.target.value as 'individual' | 'business')}>
                <FormControlLabel value="individual"
                  control={<Radio size="small" sx={{ color: '#94a3b8', '&.Mui-checked': { color: '#3866b0' } }} />}
                  label={<Typography sx={{ fontSize: 14 }}>Individual</Typography>}
                />
                <FormControlLabel value="business"
                  control={<Radio size="small" sx={{ color: '#94a3b8', '&.Mui-checked': { color: '#3866b0' } }} />}
                  label={<Typography sx={{ fontSize: 14 }}>Business</Typography>}
                />
              </RadioGroup>
            </Box>

            <TextField
              label={customerType === 'business' ? 'Business name' : 'Full name'}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              size="small"
              fullWidth
              sx={fieldSx}
            />
            <TextField
              label="Email address"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              size="small"
              fullWidth
              sx={fieldSx}
            />

            {customerType === 'business' && (
              <>
                <TextField
                  label="ABN"
                  value={form.abn}
                  onChange={e => setForm(f => ({ ...f, abn: e.target.value }))}
                  size="small"
                  fullWidth
                  placeholder="XX XXX XXX XXX"
                  sx={fieldSx}
                />
                <TextField
                  label="Business address"
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  size="small"
                  fullWidth
                  sx={fieldSx}
                />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField label="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} size="small" sx={fieldSx} />
                  <TextField label="State / Territory" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} size="small" sx={fieldSx} />
                </Box>
              </>
            )}

            <Typography sx={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
              By adding this customer you confirm you have permission to store their details in line with our privacy policy.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={resetAndClose} sx={{ textTransform: 'none', color: '#526973', fontWeight: 500, borderRadius: '6px' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!form.name || !form.email}
            onClick={resetAndClose}
            sx={{ bgcolor: '#3866b0', textTransform: 'none', fontWeight: 600, borderRadius: '6px', '&:hover': { bgcolor: 'rgba(56,102,176,0.9)' }, '&.Mui-disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' } }}
          >
            Add customer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// ─── Main page ─────────────────────────────────────────────────────────────────

export const GetPaid = () => {
  const [tab, setTab] = useState<number>(0);
  const [futureState, setFutureState] = useState<'current' | 'future'>('current');

  return (
    <Box
      component="main"
      sx={{ height: 'calc(100vh - 66px)', overflowY: 'auto', bgcolor: '#fcfcfc', px: { xs: 2, sm: 4 }, py: 4, pb: 10 }}
    >
      <Box sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* Page header */}
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#283e48', letterSpacing: '0.2px', mb: 0.75 }}>Get paid</Typography>
          <Typography sx={{ fontSize: 16, color: '#283e48' }}>
            Get paid and earn PayRewards Points with every payment you receive.{' '}
            <Box component="span" sx={{ color: '#3866b0', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              Learn more
            </Box>
          </Typography>
        </Box>

        {/* Tab navigation */}
        <Tabs
          value={tab}
          onChange={(_, v: number) => setTab(v)}
          sx={{
            borderBottom: '1px solid #e0e0e0',
            minHeight: 'auto',
            '& .MuiTabs-indicator': { bgcolor: '#3866b0', height: 3, borderRadius: '2px 2px 0 0' },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: 18,
              fontWeight: 400,
              color: '#526973',
              px: 2,
              py: 1,
              minWidth: 'auto',
              minHeight: 'auto',
              letterSpacing: '0.2px',
            },
            '& .Mui-selected': { color: '#3866b0 !important', fontWeight: 700 },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Invoice" />
          <Tab label="Customers" />
        </Tabs>

        {/* Tab content */}
        {tab === 0 && <OverviewTab />}
        {tab === 1 && <InvoiceTab futureState={futureState} />}
        {tab === 2 && <CustomersTab />}
      </Box>

      <FutureStateToggle state={futureState} onChange={setFutureState} />
    </Box>
  );
};
