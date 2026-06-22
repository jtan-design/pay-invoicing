import { useState, Fragment } from 'react';
import {
  Box, Typography, TextField, InputAdornment, Select, MenuItem,
  FormControl, Button, Checkbox, Table, TableHead, TableBody,
  TableRow, TableCell, TableContainer, Chip, IconButton,
} from '@mui/material';
import {
  SearchRounded, KeyboardArrowDownRounded, KeyboardArrowUpRounded,
  MailOutlineRounded, OpenInNewRounded,
} from '@mui/icons-material';

const F_TEXT = '#283E48';
const F_MID = '#526973';
const F_BLUE = '#3866B0';

const STATUS_CHIP = {
  Processing: { bgcolor: '#FFFBF6', border: '1px solid #FFD08B', color: '#9C5E09' },
  Settled:    { bgcolor: '#E6FAF2', border: '1px solid #97EBC8', color: '#0D7E51' },
  Bounced:    { bgcolor: '#FDF7F7', border: '1px solid #E79BA1', color: '#D03643' },
  Reversed:   { bgcolor: '#F5F5F5', border: '1px solid #BDBDBD', color: '#616161' },
} as const;

type TxStatus = keyof typeof STATUS_CHIP;

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const fmtPts = (n: number) => n.toLocaleString('en-AU');

interface Transaction {
  id: string;
  paidBy: string;
  receivedDate: string;
  amountReceived: number;
  totalFees: number;
  youReceived: number;
  pointsEarned: number;
  status: TxStatus;
  description: string;
  reference: string;
  branchCode: string;
  payerLegalName: string;
  packageFee: number;
  gstOnFees: number;
  settlementAccount: string;
  settlementDate: string;
}

const TRANSACTIONS: Transaction[] = [
  {
    id: '1', paidBy: 'John P. Smith', receivedDate: '20/01/2026',
    amountReceived: 100, totalFees: 1.98, youReceived: 98.02, pointsEarned: 200, status: 'Processing',
    description: 'Accounting fees', reference: '1234567', branchCode: '123-456', payerLegalName: 'John Peter Smith',
    packageFee: 1.80, gstOnFees: 0.18, settlementAccount: 'Commbank 123***456', settlementDate: '20/01/2026',
  },
  {
    id: '2', paidBy: 'John P. Smith', receivedDate: '15/01/2026',
    amountReceived: 1000, totalFees: 19.08, youReceived: 980.92, pointsEarned: 2000, status: 'Settled',
    description: 'Accounting fees', reference: '1234567', branchCode: '123-456', payerLegalName: 'John Peter Smith',
    packageFee: 18.00, gstOnFees: 1.08, settlementAccount: 'Commbank 123***456', settlementDate: '20/01/2026',
  },
  {
    id: '3', paidBy: 'John P. Smith', receivedDate: '08/01/2026',
    amountReceived: 100, totalFees: 1.98, youReceived: 98.02, pointsEarned: 100, status: 'Bounced',
    description: 'Accounting fees', reference: '1234567', branchCode: '123-456', payerLegalName: 'John Peter Smith',
    packageFee: 1.80, gstOnFees: 0.18, settlementAccount: 'Commbank 123***456', settlementDate: '08/01/2026',
  },
  {
    id: '4', paidBy: 'John P. Smith', receivedDate: '08/01/2026',
    amountReceived: 10000, totalFees: 190.80, youReceived: 9809.20, pointsEarned: 10000, status: 'Settled',
    description: 'Accounting fees', reference: '1234567', branchCode: '123-456', payerLegalName: 'John Peter Smith',
    packageFee: 180.00, gstOnFees: 10.80, settlementAccount: 'Commbank 123***456', settlementDate: '08/01/2026',
  },
];

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    fontSize: 14,
    bgcolor: 'white',
    '& fieldset': { borderColor: '#E0E0E0' },
    '&:hover fieldset': { borderColor: '#94A3B8' },
    '&.Mui-focused fieldset': { borderColor: F_BLUE },
  },
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75, gap: 1 }}>
    <Typography sx={{ fontSize: 12, color: F_MID, flexShrink: 0 }}>{label}</Typography>
    <Typography sx={{ fontSize: 12, color: F_TEXT, fontWeight: 500, textAlign: 'right' }}>{value}</Typography>
  </Box>
);

const ExpandedRow = ({ tx }: { tx: Transaction }) => (
  <Box
    sx={{
      bgcolor: '#F3F6FD',
      borderTop: '1px solid #D3DFF6',
      px: 3,
      py: 2.5,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 2,
    }}
  >
    {/* Card 1 — Payment details */}
    <Box sx={{ bgcolor: '#F9FBFE', border: '1px solid #EEF2FC', borderRadius: '8px', p: 2 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: F_TEXT, mb: 1.5 }}>Payment details</Typography>
      <DetailRow label="Description" value={tx.description} />
      <DetailRow label="Reference" value={tx.reference} />
      <DetailRow label="Branch code" value={tx.branchCode} />
      <DetailRow label="Paid by" value={tx.paidBy} />
      <DetailRow label="Payer legal name" value={tx.payerLegalName} />
    </Box>

    {/* Card 2 — Payment summary */}
    <Box sx={{ bgcolor: '#F9FBFE', border: '1px solid #EEF2FC', borderRadius: '8px', p: 2 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: F_TEXT, mb: 1.5 }}>Payment summary</Typography>
      <DetailRow label="Amount received" value={fmt(tx.amountReceived)} />
      <DetailRow label="Package fee" value={fmt(tx.packageFee)} />
      <DetailRow label="GST on fees" value={fmt(tx.gstOnFees)} />
      <DetailRow label="You received" value={fmt(tx.youReceived)} />
      <DetailRow label="PayRewards Points" value={fmtPts(tx.pointsEarned)} />
    </Box>

    {/* Card 3 — Settlement + actions */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ bgcolor: '#F9FBFE', border: '1px solid #EEF2FC', borderRadius: '8px', p: 2 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: F_TEXT, mb: 1.5 }}>Settlement details</Typography>
        <DetailRow label="Settlement account" value={tx.settlementAccount} />
        <DetailRow label="Settlement date" value={tx.settlementDate} />
      </Box>
      <Box
        sx={{
          bgcolor: '#F9FBFE', border: '1px solid #EEF2FC', borderRadius: '8px',
          p: 1.5, display: 'flex', alignItems: 'center', gap: 1,
          cursor: 'pointer', '&:hover': { bgcolor: '#EEF2FC' },
        }}
      >
        <MailOutlineRounded sx={{ fontSize: 16, color: F_BLUE }} />
        <Typography sx={{ fontSize: 12, color: F_BLUE, fontWeight: 500 }}>Send payment receipt</Typography>
      </Box>
      <Box
        sx={{
          bgcolor: '#F9FBFE', border: '1px solid #EEF2FC', borderRadius: '8px',
          p: 1.5, display: 'flex', alignItems: 'center', gap: 1,
          cursor: 'pointer', '&:hover': { bgcolor: '#EEF2FC' },
        }}
      >
        <OpenInNewRounded sx={{ fontSize: 14, color: F_BLUE }} />
        <Typography sx={{ fontSize: 12, color: F_BLUE, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', textDecoration: 'underline' }}>
          Open invoice
        </Typography>
      </Box>
    </Box>
  </Box>
);

export const IncomingTransactions = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>('2');
  const [viewFilter, setViewFilter] = useState('all');

  const allSelected = selected.size === TRANSACTIONS.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(TRANSACTIONS.map(t => t.id)));
  };

  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const headerCellSx = {
    fontSize: 12, fontWeight: 500, color: '#64748B',
    py: 1.25, borderBottom: '1px solid #E0E0E0', whiteSpace: 'nowrap' as const,
  };

  return (
    <Box
      component="main"
      sx={{ height: 'calc(100vh - 66px)', overflowY: 'auto', bgcolor: '#FCFCFC', px: { xs: 2, sm: 4 }, py: 4, pb: 10 }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* Header */}
        <Box>
          <Typography sx={{ fontSize: 12, color: '#64748B', mb: 0.5 }}>Get paid</Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#1E293B' }}>Incoming transactions</Typography>
        </Box>

        {/* Filter bar */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Payee, amount"
            size="small"
            sx={{ minWidth: 200, ...fieldSx }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded sx={{ fontSize: 18, color: '#94A3B8' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="DD/MM/YYYY"
            size="small"
            label="Date from"
            sx={{ width: 160, ...fieldSx }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            placeholder="DD/MM/YYYY"
            size="small"
            label="Date to"
            sx={{ width: 160, ...fieldSx }}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl size="small" sx={{ minWidth: 160, ...fieldSx }}>
            <Select
              value={viewFilter}
              onChange={e => setViewFilter(e.target.value)}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="all" sx={{ fontSize: 14 }}>All payments</MenuItem>
              <MenuItem value="settled" sx={{ fontSize: 14 }}>Settled</MenuItem>
              <MenuItem value="processing" sx={{ fontSize: 14 }}>Processing</MenuItem>
              <MenuItem value="bounced" sx={{ fontSize: 14 }}>Bounced</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: 'none', fontSize: 14, fontWeight: 500,
              color: F_BLUE, borderColor: '#B7C9F0', borderRadius: '8px',
              height: 40, px: 2.5,
              '&:hover': { borderColor: F_BLUE, bgcolor: '#F0F5FF' },
            }}
          >
            Apply
          </Button>
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: 'none', fontSize: 14, color: F_BLUE, height: 40, '&:hover': { bgcolor: '#F0F5FF' } }}
          >
            Reset
          </Button>
        </Box>

        {/* Table card */}
        <Box sx={{ bgcolor: 'white', border: '1px solid #E0E0E0', borderRadius: '10px', overflow: 'hidden' }}>

          {/* Selection bar */}
          <Box sx={{ bgcolor: '#F5F5F5', px: 2, py: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E0E0E0' }}>
            <Typography sx={{ fontSize: 13, color: F_MID }}>
              {selected.size} of {TRANSACTIONS.length} payments selected
            </Typography>
            <Button
              variant="outlined"
              size="small"
              disabled={selected.size === 0}
              sx={{
                textTransform: 'none', fontSize: 13, fontWeight: 500,
                borderRadius: '6px', px: 2,
                borderColor: selected.size > 0 ? '#94A3B8' : '#E0E0E0',
                color: selected.size > 0 ? F_TEXT : '#BDBDBD',
                '&:hover': { borderColor: '#64748B', bgcolor: '#F0F0F0' },
                '&.Mui-disabled': { borderColor: '#E0E0E0', color: '#BDBDBD' },
              }}
            >
              Export CSV
            </Button>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#FCFCFC' }}>
                  <TableCell padding="checkbox" sx={{ ...headerCellSx, pl: 1.5 }}>
                    <Checkbox
                      size="small"
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={toggleAll}
                      sx={{ color: '#94A3B8', '&.Mui-checked': { color: F_BLUE }, '&.MuiCheckbox-indeterminate': { color: F_BLUE } }}
                    />
                  </TableCell>
                  <TableCell sx={{ ...headerCellSx, width: 40 }} />
                  <TableCell sx={headerCellSx}>Paid by</TableCell>
                  <TableCell sx={headerCellSx}>Received date</TableCell>
                  <TableCell align="right" sx={headerCellSx}>Amount received</TableCell>
                  <TableCell align="right" sx={headerCellSx}>Total fees</TableCell>
                  <TableCell align="right" sx={headerCellSx}>You received</TableCell>
                  <TableCell align="right" sx={headerCellSx}>Points earned</TableCell>
                  <TableCell sx={headerCellSx}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {TRANSACTIONS.map((tx, i) => {
                  const isExpanded = expandedId === tx.id;
                  const isLast = i === TRANSACTIONS.length - 1;
                  const borderColor = isLast && !isExpanded ? 'transparent' : '#F1F5F9';
                  const chipSx = STATUS_CHIP[tx.status];
                  return (
                    <Fragment key={tx.id}>
                      <TableRow
                        sx={{
                          bgcolor: isExpanded ? '#F3F6FD' : undefined,
                          '&:hover': { bgcolor: isExpanded ? '#F3F6FD' : '#F8FAFC' },
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleExpand(tx.id)}
                      >
                        <TableCell
                          padding="checkbox"
                          sx={{ borderBottom: `1px solid ${borderColor}`, pl: 1.5 }}
                          onClick={e => e.stopPropagation()}
                        >
                          <Checkbox
                            size="small"
                            checked={selected.has(tx.id)}
                            onChange={() => toggleOne(tx.id)}
                            sx={{ color: '#94A3B8', '&.Mui-checked': { color: F_BLUE } }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: `1px solid ${borderColor}`, width: 40, py: 1 }}>
                          <IconButton size="small" sx={{ color: '#94A3B8' }}>
                            {isExpanded
                              ? <KeyboardArrowUpRounded fontSize="small" />
                              : <KeyboardArrowDownRounded fontSize="small" />}
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: F_TEXT, borderBottom: `1px solid ${borderColor}` }}>
                          {tx.paidBy}
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: F_MID, borderBottom: `1px solid ${borderColor}` }}>
                          {tx.receivedDate}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 13, fontWeight: 600, color: F_TEXT, borderBottom: `1px solid ${borderColor}`, fontVariantNumeric: 'tabular-nums' }}>
                          {fmt(tx.amountReceived)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 13, color: F_MID, borderBottom: `1px solid ${borderColor}`, fontVariantNumeric: 'tabular-nums' }}>
                          {fmt(tx.totalFees)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 13, fontWeight: 600, color: F_TEXT, borderBottom: `1px solid ${borderColor}`, fontVariantNumeric: 'tabular-nums' }}>
                          {fmt(tx.youReceived)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 13, color: F_MID, borderBottom: `1px solid ${borderColor}`, fontVariantNumeric: 'tabular-nums' }}>
                          {fmtPts(tx.pointsEarned)}
                        </TableCell>
                        <TableCell sx={{ borderBottom: `1px solid ${borderColor}` }}>
                          <Chip
                            label={tx.status}
                            size="small"
                            sx={{ fontSize: 12, fontWeight: 500, height: 24, borderRadius: '12px', ...chipSx }}
                          />
                        </TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow>
                          <TableCell
                            colSpan={9}
                            sx={{ p: 0, borderBottom: isLast ? 'none' : '1px solid #D3DFF6' }}
                          >
                            <ExpandedRow tx={tx} />
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 13, color: F_MID }}>
              Showing {TRANSACTIONS.length} of {TRANSACTIONS.length} transactions
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined" size="small" disabled
                sx={{ textTransform: 'none', fontSize: 13, borderRadius: '6px', '&.Mui-disabled': { borderColor: '#E0E0E0', color: '#BDBDBD' } }}
              >
                Previous
              </Button>
              <Button
                variant="outlined" size="small" disabled
                sx={{ textTransform: 'none', fontSize: 13, borderRadius: '6px', '&.Mui-disabled': { borderColor: '#E0E0E0', color: '#BDBDBD' } }}
              >
                Next
              </Button>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};
