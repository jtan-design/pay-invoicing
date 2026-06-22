export interface ExploreCustomer {
  id: number;
  name: string;
  type: 'Business' | 'Individual';
  abn: string | null;
  email: string;
  lastInvoiced: string;
  totalInvoiced: string;
}

export const EXPLORE_CUSTOMERS: ExploreCustomer[] = [
  {
    id: 1,
    name: 'Graham Plumbers',
    type: 'Business',
    abn: '12 345 678 901',
    email: 'admin@grahamplumbers.com.au',
    lastInvoiced: '3 days ago',
    totalInvoiced: '$14,200',
  },
  {
    id: 2,
    name: 'Acme Office Supplies Pty Ltd',
    type: 'Business',
    abn: '98 765 432 100',
    email: 'accounts@acme.com.au',
    lastInvoiced: '2 weeks ago',
    totalInvoiced: '$6,840',
  },
  {
    id: 3,
    name: 'Sarah Mitchell',
    type: 'Individual',
    abn: null,
    email: 'sarah@mitchell.com.au',
    lastInvoiced: '1 month ago',
    totalInvoiced: '$2,400',
  },
];
