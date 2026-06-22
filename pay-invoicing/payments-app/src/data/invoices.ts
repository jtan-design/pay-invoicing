export interface InvoiceCustomer {
  id: string;
  name: string;
  email: string;
  abn: string;
}

export interface InvoiceLineItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  gst: boolean;
}

export type InvoiceStatus = 'sent' | 'paid' | 'overdue';

export interface Invoice {
  id: string;
  number: string;
  customer: InvoiceCustomer;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  paymentRef?: string;
  paymentMethod?: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  gst: number;
  total: number;
  notes: string;
}

export const PAYEE = {
  name: 'PAY.COM.AU LIMITED',
  abn: '12 345 678 901',
  payId: 'pay@pay.com.au',
  bsb: '062-000',
  account: '12 345 678',
  email: 'billing@pay.com.au',
};

export const DEFAULT_LINE_ITEMS: InvoiceLineItem[] = [
  { id: 1, description: 'Strategy consulting — June 2026', quantity: 10, rate: 250, gst: true },
  { id: 2, description: 'Workshop facilitation', quantity: 1, rate: 800, gst: true },
];

export const INVOICE_CUSTOMERS: InvoiceCustomer[] = [
  { id: 'c-001', name: 'Acme Constructions Pty Ltd', email: 'accounts@acme.com.au', abn: '12 345 678 901' },
  { id: 'c-002', name: 'Blue Sky Design', email: 'james@bluesky.com', abn: '98 765 432 100' },
  { id: 'c-003', name: 'TechFlow Solutions', email: 'billing@techflow.com', abn: '77 123 456 789' },
  { id: 'c-004', name: 'Northside Plumbing', email: 'admin@northside.com.au', abn: '55 444 333 221' },
  { id: 'c-005', name: 'Sarah Mitchell', email: 'sarah@mitchell.com', abn: '' },
];

export const INVOICES_DATA: Invoice[] = [
  {
    id: 'inv-001',
    number: 'PAY-001',
    customer: { id: 'c-001', name: 'Acme Constructions Pty Ltd', email: 'accounts@acme.com.au', abn: '12 345 678 901' },
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
    number: 'PAY-002',
    customer: { id: 'c-002', name: 'Blue Sky Design', email: 'james@bluesky.com', abn: '98 765 432 100' },
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
    number: 'PAY-003',
    customer: { id: 'c-003', name: 'TechFlow Solutions', email: 'billing@techflow.com', abn: '77 123 456 789' },
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
    number: 'PAY-004',
    customer: { id: 'c-001', name: 'Acme Constructions Pty Ltd', email: 'accounts@acme.com.au', abn: '12 345 678 901' },
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
];
