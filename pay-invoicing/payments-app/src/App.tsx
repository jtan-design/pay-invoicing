import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { PaydUiThemeProvider } from '@packages/ui';
import { UserModelProvider } from '@packages/user-model';
import { AppLayout } from './layout/AppLayout';
import { Box, Typography } from '@mui/material';
import { Dashboard } from './pages/Dashboard';
import { SupplierPayment } from './pages/SupplierPayment';
import { UploadInvoice } from './pages/UploadInvoice';
import { GetPaid } from './pages/GetPaid';
import { InvoiceList } from './pages/InvoiceList';
import { InvoiceCreate } from './pages/InvoiceCreate';
import { InvoiceDetail } from './pages/InvoiceDetail';
import { InvoiceSent } from './pages/InvoiceSent';
import { CustomerExplore } from './pages/CustomerExplore';
import { IncomingTransactions } from './pages/IncomingTransactions';
const ReviewAuthorise = () => <Box p={3}><Typography variant="h4">Review & Authorise</Typography></Box>;
const Scheduled = () => <Box p={3}><Typography variant="h4">Scheduled Payments</Typography></Box>;
const Transactions = () => <Box p={3}><Typography variant="h4">Transaction History</Typography></Box>;
const Payees = () => <Box p={3}><Typography variant="h4">Payees</Typography></Box>;
const Wallet = () => <Box p={3}><Typography variant="h4">Wallet</Typography></Box>;
const Settings = () => <Box p={3}><Typography variant="h4">Settings</Typography></Box>;
const ActivityLog = () => <Box p={3}><Typography variant="h4">Activity Log</Typography></Box>;
const ReferEarn = () => <Box p={3}><Typography variant="h4">Refer and Earn</Typography></Box>;


function App() {
  return (
    <PaydUiThemeProvider>
      <UserModelProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/account" replace />} />

            <Route path="/account" element={<AppLayout><Outlet /></AppLayout>}>
              <Route index element={<Dashboard />} />
              <Route path="new-payment" element={<SupplierPayment />} />
              <Route path="new-payment/upload-invoice" element={<UploadInvoice />} />
              <Route path="payments/authorise" element={<ReviewAuthorise />} />
              <Route path="payments/scheduled" element={<Scheduled />} />
              <Route path="payments/history" element={<Transactions />} />
              <Route path="payees" element={<Payees />} />
              <Route path="payment-methods" element={<Wallet />} />
              <Route path="settings" element={<Settings />} />
              <Route path="activity-log" element={<ActivityLog />} />
              <Route path="invoices" element={<InvoiceList />} />
              <Route path="invoices/overview" element={<GetPaid />} />
              <Route path="invoices/incoming" element={<IncomingTransactions />} />
              <Route path="invoices/new" element={<InvoiceCreate />} />
              <Route path="invoices/:id/sent" element={<InvoiceSent />} />
              <Route path="invoices/:id" element={<InvoiceDetail />} />
            </Route>

            <Route path="/account/invoices/explore" element={<CustomerExplore />} />

            <Route path="/refer" element={<AppLayout><ReferEarn /></AppLayout>} />

          </Routes>
        </BrowserRouter>
      </UserModelProvider>
    </PaydUiThemeProvider>
  );
}

export default App;
