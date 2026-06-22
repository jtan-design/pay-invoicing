import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import InvoiceCreation from './views/InvoiceCreation'
import InvoiceEmail from './views/InvoiceEmail'
import HostedPaymentPage from './views/HostedPaymentPage'
import PaymentConfirmation from './views/PaymentConfirmation'
import CustomerList from './views/CustomerList'
import CustomerDetail from './views/CustomerDetail'
import AddCustomer from './views/AddCustomer'
import SaveFromPayment from './views/SaveFromPayment'
import Wireframes from './views/Wireframes'
import InvoiceList from './views/InvoiceList'
import InvoiceNew from './views/InvoiceNew'
import InvoiceDetail from './views/InvoiceDetail'
import InvoiceSent from './views/InvoiceSent'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default: invoice list */}
        <Route path="/" element={<Navigate to="/account/invoices" replace />} />

        {/* Invoicing tool — primary prototype */}
        <Route path="/account/invoices" element={<InvoiceList />} />
        <Route path="/account/invoices/new" element={<InvoiceNew />} />
        <Route path="/account/invoices/:id/sent" element={<InvoiceSent />} />
        <Route path="/account/invoices/:id" element={<InvoiceDetail />} />

        {/* Get Paid — Customer List (previous sprint) */}
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/new" element={<AddCustomer />} />
        <Route path="/customers/save-from-payment" element={<SaveFromPayment />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />

        {/* Payer-side prototype flows */}
        <Route path="/invoices/new" element={<InvoiceCreation />} />
        <Route path="/preview/invoice-email" element={<InvoiceEmail />} />
        <Route path="/pay/inv-001" element={<HostedPaymentPage />} />
        <Route path="/pay/inv-001/confirmed" element={<PaymentConfirmation />} />
        <Route path="/wireframes" element={<Wireframes />} />
      </Routes>
    </BrowserRouter>
  )
}
