export interface LineItem {
  description: string
  qty: number
  rate: number
  gst: boolean
}

export interface Invoice {
  id: string
  token: string
  number: string
  issueDate: string
  dueDate: string
  status: 'sent' | 'paid' | 'overdue'
  from: {
    businessName: string
    abn: string
    email: string
    payId: string
    bsb: string
    account: string
    reference: string
  }
  to: {
    businessName: string
    abn: string
    email: string
    contactName: string
  }
  lineItems: LineItem[]
  subtotal: number
  gst: number
  total: number
  notes: string
}

export const invoices: Invoice[] = [
  {
    id: 'inv-0042',
    token: 'hpp-a3f8b2c1d4e9',
    number: 'PAY-0042',
    issueDate: '15 Jun 2026',
    dueDate: '29 Jun 2026',
    status: 'sent',
    from: {
      businessName: 'Creative Direction Management',
      abn: '12 345 678 901',
      email: 'studio@creativedirection.com.au',
      payId: 'creativedirectionmanagement@invoice.pay.com.au',
      bsb: '062-000',
      account: '1234 5678',
      reference: 'PAY-0042',
    },
    to: {
      businessName: 'Graham Plumbers',
      abn: '55 444 333 221',
      email: 'accounts@grahamplumbers.com.au',
      contactName: 'Steve Graham',
    },
    lineItems: [
      { description: 'Brand identity design', qty: 1, rate: 3200, gst: true },
      { description: 'Monthly retainer — June 2026', qty: 1, rate: 800, gst: true },
      { description: 'Rush delivery fee', qty: 1, rate: 200, gst: false },
    ],
    subtotal: 4200,
    gst: 400,
    total: 4600,
    notes: 'Thank you for your business.',
  },
  {
    id: 'inv-0041',
    token: 'hpp-z9y8x7w6v5u4',
    number: 'INV-0041',
    issueDate: '1 Jun 2026',
    dueDate: '15 Jun 2026',
    status: 'overdue',
    from: {
      businessName: 'Creative Direction Management',
      abn: '12 345 678 901',
      email: 'studio@creativedirection.com.au',
      payId: 'creativedirectionmanagement@invoice.pay.com.au',
      bsb: '062-000',
      account: '1234 5678',
      reference: 'INV-0041',
    },
    to: {
      businessName: 'Acme Office Supplies Pty Ltd',
      abn: '77 888 999 111',
      email: 'accounts@acmeoffice.com.au',
      contactName: 'Linda Chen',
    },
    lineItems: [
      { description: 'Website redesign', qty: 1, rate: 8500, gst: true },
      { description: 'Copywriting', qty: 3, rate: 400, gst: true },
    ],
    subtotal: 9700,
    gst: 970,
    total: 10670,
    notes: 'Payment terms: Net 14. Please pay at your earliest convenience.',
  },
]

export const getInvoiceByToken = (token: string) =>
  invoices.find(inv => inv.token === token)

export const getInvoiceById = (id: string) =>
  invoices.find(inv => inv.id === id)
