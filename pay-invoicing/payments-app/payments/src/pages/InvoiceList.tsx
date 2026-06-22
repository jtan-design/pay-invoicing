import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button,
  Table, TableHead, TableBody, TableRow, TableCell,
  Chip, TableContainer, IconButton, Menu, MenuItem,
  TextField, InputAdornment, Select, FormControl,
} from '@mui/material';
import {
  AddRounded, MoreVertRounded, SearchRounded,
  FilterListRounded, CloseRounded,
} from '@mui/icons-material';
import { INVOICES_DATA, type Invoice, type InvoiceStatus } from '../data/invoices';
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
  paid:    { label: 'Paid',    chipSx: { bgcolor: '#F0FDF4', border: '1px solid #86EFAC', color: '#16A34A' } },
  sent:    { label: 'Sent',    chipSx: { bgcolor: '#EEF4FF', border: '1px solid #93C5FD', color: '#1A56DB' } },
  overdue: { label: 'Overdue', chipSx: { bgcolor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626' } },
};

type StatusFilter = 'all' | InvoiceStatus;

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    fontSize: 14,
    bgcolor: 'white',
    '& fieldset': { borderColor: '#E2E8F0' },
    '&:hover fieldset': { borderColor: '#94A3B8' },
    '&.Mui-focused fieldset': { borderColor: '#1A56DB' },
  },
};

// ─── Row action menu ──────────────────────────────────────────────────────────

const RowActions = ({ inv, onOpenChange }: { inv: Invoice; onOpenChange: (id: string | null) => void }) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const open = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchor(e.currentTarget);
    onOpenChange(inv.id);
  };
  const close = () => { setAnchor(null); onOpenChange(null); };

  const items = [
    ...(inv.status !== 'paid' ? [{ label: 'Mark as paid', onClick: close }] : []),
    { label: 'Download PDF', onClick: close },
  ];

  return (
    <>
      <IconButton size="small" onClick={open}
        sx={{ color: '#94A3B8', '&:hover': { color: '#1A56DB', bgcolor: 'rgba(26,86,219,0.08)' }, borderRadius: '999px' }}>
        <MoreVertRounded fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={close} onClick={e => e.stopPropagation()}
        PaperProps={{ sx: { borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', border: '1px solid #E2E8F0', minWidth: 176, py: '4px' } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {items.map(item => (
          <MenuItem key={item.label} onClick={item.onClick}
            sx={{ fontSize: 14, py: 1.25, color: item.danger ? '#DC2626' : '#1E293B', '&:hover': { bgcolor: item.danger ? '#FEF2F2' : '#F3F6FD' } }}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// ─── Main export ──────────────────────────────────────────────────────────────

export const InvoiceList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [futureState, setFutureState] = useState<'current' | 'future'>('current');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const invoices = INVOICES_DATA
    .filter(i => statusFilter === 'all' || i.status === statusFilter)
    .filter(i => {
      const q = search.toLowerCase();
      return !q || i.number.toLowerCase().includes(q) || i.customer.name.toLowerCase().includes(q);
    });

  const hasFilters = search.length > 0 || statusFilter !== 'all';

  const clearFilters = () => { setSearch(''); setStatusFilter('all'); };

  return (
    <Box
      component="main"
      sx={{ height: 'calc(100vh - 66px)', overflowY: 'auto', bgcolor: '#fcfcfc', px: { xs: 2, sm: 4 }, py: 4, pb: 10 }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontSize: 12, color: '#64748B', mb: 0.5 }}>Get paid</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#1E293B' }}>Invoices</Typography>
          </Box>
          <Button
            component={Link}
            to="/account/invoices/new"
            variant="contained"
            startIcon={<AddRounded />}
            sx={{ bgcolor: '#1A56DB', textTransform: 'none', fontWeight: 500, fontSize: 14, borderRadius: '8px', '&:hover': { bgcolor: '#1447C0' } }}
          >
            New invoice
          </Button>
        </Box>

        {/* Table with search + filter toolbar */}
        <Box sx={{ bgcolor: 'white', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>

          {/* Toolbar */}
          <Box sx={{ px: 2, py: 1.75, borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Search */}
            <TextField
              placeholder="Search by invoice or customer…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="small"
              sx={{ flex: 1, maxWidth: 400, ...fieldSx }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded sx={{ fontSize: 18, color: '#94A3B8' }} />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearch('')} sx={{ p: 0.25, color: '#94A3B8' }}>
                      <CloseRounded sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />

            {/* Status filter */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <FilterListRounded sx={{ fontSize: 18, color: '#64748B' }} />
              <FormControl size="small" sx={{ minWidth: 140, ...fieldSx }}>
                <Select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as StatusFilter)}
                  displayEmpty
                  sx={{ fontSize: 14 }}
                >
                  <MenuItem value="all" sx={{ fontSize: 14 }}>All statuses</MenuItem>
                  <MenuItem value="sent"    sx={{ fontSize: 14 }}>Sent</MenuItem>
                  <MenuItem value="paid"    sx={{ fontSize: 14 }}>Paid</MenuItem>
                  <MenuItem value="overdue" sx={{ fontSize: 14 }}>Overdue</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Clear filters */}
            {hasFilters && (
              <Button
                size="small"
                onClick={clearFilters}
                sx={{ textTransform: 'none', fontSize: 13, color: '#64748B', fontWeight: 400, px: 1, '&:hover': { bgcolor: '#F1F5F9' } }}
              >
                Clear
              </Button>
            )}

            {/* Result count */}
            <Typography sx={{ fontSize: 13, color: '#94A3B8', ml: 'auto', whiteSpace: 'nowrap' }}>
              {invoices.length} of {INVOICES_DATA.length}
            </Typography>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                  {['Invoice', 'Customer', 'Amount', 'Issued', 'Due', 'Status', ''].map((h, i) => (
                    <TableCell key={i} align={h === 'Amount' ? 'right' : 'left'}
                      sx={{ fontSize: 12, fontWeight: 500, color: '#64748B', py: 1.25, borderBottom: '1px solid #E2E8F0', whiteSpace: 'nowrap' }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((inv, i) => {
                  const chip = STATUS_CHIP[inv.status];
                  return (
                    <TableRow key={inv.id}
                      onClick={() => navigate(`/account/invoices/${inv.id}`)}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: openMenuId === inv.id ? '#F8FAFC' : undefined,
                        '&:hover': { bgcolor: '#F8FAFC' },
                        '&:last-child td': { borderBottom: 0 },
                      }}>
                      <TableCell sx={{ fontSize: 13, fontWeight: 500, color: '#1E293B', borderBottom: `1px solid ${i < invoices.length - 1 ? '#F1F5F9' : 'transparent'}` }}>
                        {inv.number}
                      </TableCell>
                      <TableCell sx={{ fontSize: 13, color: '#1E293B', borderBottom: `1px solid ${i < invoices.length - 1 ? '#F1F5F9' : 'transparent'}` }}>
                        {inv.customer.name}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: 13, fontWeight: 600, color: '#1E293B', borderBottom: `1px solid ${i < invoices.length - 1 ? '#F1F5F9' : 'transparent'}`, fontVariantNumeric: 'tabular-nums' }}>
                        {fmt(inv.total)}
                      </TableCell>
                      <TableCell sx={{ fontSize: 13, color: '#64748B', borderBottom: `1px solid ${i < invoices.length - 1 ? '#F1F5F9' : 'transparent'}` }}>
                        {fmtDate(inv.issueDate)}
                      </TableCell>
                      <TableCell sx={{ fontSize: 13, color: inv.status === 'overdue' ? '#DC2626' : '#64748B', fontWeight: inv.status === 'overdue' ? 500 : 400, borderBottom: `1px solid ${i < invoices.length - 1 ? '#F1F5F9' : 'transparent'}` }}>
                        {fmtDate(inv.dueDate)}
                      </TableCell>
                      <TableCell sx={{ borderBottom: `1px solid ${i < invoices.length - 1 ? '#F1F5F9' : 'transparent'}` }}>
                        <Chip label={chip.label} size="small"
                          sx={{ fontSize: 12, fontWeight: 500, height: 24, borderRadius: '12px', ...chip.chipSx }} />
                      </TableCell>
                      <TableCell sx={{ borderBottom: `1px solid ${i < invoices.length - 1 ? '#F1F5F9' : 'transparent'}`, width: 48 }}
                        onClick={e => e.stopPropagation()}>
                        <RowActions inv={inv} onOpenChange={setOpenMenuId} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {invoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center', py: 6 }}>
                      <Typography sx={{ fontSize: 14, color: '#94A3B8', mb: 1 }}>
                        {hasFilters ? 'No invoices match your search.' : 'No invoices yet.'}
                      </Typography>
                      {hasFilters ? (
                        <Button size="small" onClick={clearFilters}
                          sx={{ textTransform: 'none', fontSize: 13, color: '#1A56DB', fontWeight: 500 }}>
                          Clear filters
                        </Button>
                      ) : (
                        <Link to="/account/invoices/new" style={{ color: '#1A56DB', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                          Create your first invoice →
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

      </Box>
      <FutureStateToggle state={futureState} onChange={setFutureState} />
    </Box>
  );
};
