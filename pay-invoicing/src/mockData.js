// ─── Customer List mock data ───────────────────────────────────────────────

export const CUSTOMERS_DATA = [
  {
    id: 'cust-001',
    name: 'Acme Constructions Pty Ltd',
    type: 'business',
    abn: '12 345 678 901',
    email: 'accounts@acme.com.au',
    address: '42 George Street, Sydney NSW 2000',
    contactName: 'James Chen',
    notes: '',
    payments: 14,
    totalReceived: 18400,
    lastPayment: '3 days ago',
    paymentHistory: [
      { id: 'p1', date: '7 Jun 2026', amount: 2400, reference: 'NPP-8841', method: 'PayID', status: 'Paid' },
      { id: 'p2', date: '22 May 2026', amount: 3200, reference: 'BSB-7723', method: 'Bank transfer', status: 'Paid' },
      { id: 'p3', date: '5 May 2026', amount: 1800, reference: 'NPP-6612', method: 'PayID', status: 'Paid' },
      { id: 'p4', date: '18 Apr 2026', amount: 4200, reference: 'BSB-5509', method: 'Bank transfer', status: 'Paid' },
      { id: 'p5', date: '2 Apr 2026', amount: 6800, reference: 'NPP-4401', method: 'PayID', status: 'Paid' },
    ],
  },
  {
    id: 'cust-002',
    name: 'Blue Sky Design',
    type: 'business',
    abn: '98 765 432 100',
    email: 'james@bluesky.com',
    address: '18 Flinders Lane, Melbourne VIC 3000',
    contactName: 'James Hartley',
    notes: '',
    payments: 3,
    totalReceived: 4200,
    lastPayment: '2 weeks ago',
    paymentHistory: [],
  },
  {
    id: 'cust-003',
    name: 'Sarah Mitchell',
    type: 'individual',
    abn: null,
    email: 'sarah@mitchell.com',
    address: '',
    contactName: '',
    notes: '',
    payments: 8,
    totalReceived: 9600,
    lastPayment: '1 week ago',
    paymentHistory: [],
  },
  {
    id: 'cust-004',
    name: 'Northside Plumbing',
    type: 'business',
    abn: '55 444 333 221',
    email: 'admin@northside.com.au',
    address: '7 Trade Street, Brisbane QLD 4000',
    contactName: 'Tony Garelli',
    notes: '',
    payments: 2,
    totalReceived: 3100,
    lastPayment: '1 month ago',
    paymentHistory: [],
  },
  {
    id: 'cust-005',
    name: 'TechFlow Solutions',
    type: 'business',
    abn: '77 123 456 789',
    email: 'billing@techflow.com',
    address: '101 Collins Street, Melbourne VIC 3000',
    contactName: 'Priya Sharma',
    notes: '',
    payments: 6,
    totalReceived: 7800,
    lastPayment: '5 days ago',
    paymentHistory: [],
  },
  {
    id: 'cust-006',
    name: 'Marcus Wong',
    type: 'individual',
    abn: null,
    email: 'marcus.wong@email.com',
    address: '',
    contactName: '',
    notes: '',
    payments: 1,
    totalReceived: 950,
    lastPayment: '3 weeks ago',
    paymentHistory: [],
  },
  {
    id: 'cust-007',
    name: 'Greenfield Events',
    type: 'business',
    abn: '34 567 890 123',
    email: null,
    address: '55 Park Road, Adelaide SA 5000',
    contactName: 'Lisa Park',
    notes: '',
    payments: 4,
    totalReceived: 3470,
    lastPayment: '2 days ago',
    paymentHistory: [],
  },
  {
    id: 'cust-008',
    name: 'Unknown (eBay settlement)',
    type: 'aggregated',
    abn: null,
    email: null,
    address: '',
    contactName: '',
    notes: '',
    payments: 1,
    totalReceived: 800,
    lastPayment: '1 week ago',
    paymentHistory: [],
  },
]

// ─── Invoice mock data (existing) ─────────────────────────────────────────

export const PAYEE = {
  name: 'Acme Consulting Pty Ltd',
  abn: '12 345 678 901',
  payId: 'acme@acmeconsulting.pay.com.au',
  bsb: '062-000',
  account: '12 345 678',
  email: 'billing@acmeconsulting.com.au',
}

export const CUSTOMERS = [
  {
    id: 1,
    name: 'Bluestone Industries Pty Ltd',
    type: 'business',
    abn: '98 765 432 109',
    email: 'accounts@bluestone.com.au',
  },
  {
    id: 2,
    name: 'Summit Solutions Pty Ltd',
    type: 'business',
    abn: '45 678 901 234',
    email: 'finance@summitsolutions.com.au',
  },
  {
    id: 3,
    name: 'Jane Nguyen',
    type: 'consumer',
    abn: null,
    email: 'jane.nguyen@email.com',
  },
]

export const DEFAULT_LINE_ITEMS = [
  {
    id: 1,
    description: 'Strategy consulting — June 2026',
    quantity: 10,
    rate: 250,
    gst: true,
  },
  {
    id: 2,
    description: 'Workshop facilitation',
    quantity: 1,
    rate: 800,
    gst: true,
  },
]

// ─── Invoices mock data ───────────────────────────────────────────────────────

export const INVOICES_DATA = [
  {
    id: 'inv-001',
    number: 'INV-2026-001',
    customer: { id: 'cust-001', name: 'Acme Constructions Pty Ltd', email: 'accounts@acme.com.au', abn: '12 345 678 901' },
    status: 'paid',
    issueDate: '2026-05-01',
    dueDate: '2026-05-31',
    paidDate: '2026-05-28',
    paymentRef: 'NPP-8841',
    paymentMethod: 'PayID',
    lineItems: [
      { id: 1, description: 'Strategy consulting — May 2026', quantity: 10, rate: 250, gst: true },
      { id: 2, description: 'Workshop facilitation', quantity: 1, rate: 800, gst: true },
    ],
    subtotal: 3300,
    gst: 330,
    total: 3630,
    notes: 'Thank you for your business.',
  },
  {
    id: 'inv-002',
    number: 'INV-2026-002',
    customer: { id: 'cust-002', name: 'Blue Sky Design', email: 'james@bluesky.com', abn: '98 765 432 100' },
    status: 'sent',
    issueDate: '2026-06-01',
    dueDate: '2026-06-22',
    lineItems: [
      { id: 1, description: 'Brand identity package', quantity: 1, rate: 4500, gst: true },
    ],
    subtotal: 4500,
    gst: 450,
    total: 4950,
    notes: '',
  },
  {
    id: 'inv-003',
    number: 'INV-2026-003',
    customer: { id: 'cust-005', name: 'TechFlow Solutions', email: 'billing@techflow.com', abn: '77 123 456 789' },
    status: 'overdue',
    issueDate: '2026-05-10',
    dueDate: '2026-05-24',
    lineItems: [
      { id: 1, description: 'IT infrastructure audit', quantity: 1, rate: 2200, gst: true },
      { id: 2, description: 'Security assessment report', quantity: 1, rate: 1800, gst: true },
    ],
    subtotal: 4000,
    gst: 400,
    total: 4400,
    notes: '',
  },
  {
    id: 'inv-004',
    number: 'INV-2026-004',
    customer: { id: 'cust-001', name: 'Acme Constructions Pty Ltd', email: 'accounts@acme.com.au', abn: '12 345 678 901' },
    status: 'sent',
    issueDate: '2026-06-10',
    dueDate: '2026-06-24',
    lineItems: [
      { id: 1, description: 'Monthly retainer — June 2026', quantity: 1, rate: 5000, gst: true },
    ],
    subtotal: 5000,
    gst: 500,
    total: 5500,
    notes: 'Monthly retainer as per our agreement.',
  },
  {
    id: 'inv-005',
    number: 'INV-2026-005',
    customer: { id: 'cust-004', name: 'Northside Plumbing', email: 'admin@northside.com.au', abn: '55 444 333 221' },
    status: 'draft',
    issueDate: '2026-06-15',
    dueDate: '2026-06-29',
    lineItems: [
      { id: 1, description: 'Project management — Q3', quantity: 1, rate: 3200, gst: true },
    ],
    subtotal: 3200,
    gst: 320,
    total: 3520,
    notes: '',
  },
]

export const getDefaultInvoice = () => {
  const today = new Date()
  const dueDate = new Date(today)
  dueDate.setDate(dueDate.getDate() + 30)

  const subtotal = DEFAULT_LINE_ITEMS.reduce((s, i) => s + i.quantity * i.rate, 0)
  const totalGST = DEFAULT_LINE_ITEMS.reduce((s, i) => s + (i.gst ? i.quantity * i.rate * 0.1 : 0), 0)
  const total = subtotal + totalGST

  return {
    customer: CUSTOMERS[0],
    invoiceNumber: 'INV-0042',
    issueDate: today.toISOString().split('T')[0],
    dueDate: dueDate.toISOString().split('T')[0],
    lineItems: DEFAULT_LINE_ITEMS,
    notes: '',
    subtotal,
    totalGST,
    total,
    prpPoints: Math.round(total),
    qantasPoints: Math.round(total / 2),
    payee: PAYEE,
  }
}
