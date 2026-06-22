import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { InvoiceEmail } from './pages/InvoiceEmail'
import { HPP } from './pages/HPP'
import { PaymentConfirmation } from './pages/PaymentConfirmation'
import { PayeeNotificationEmail } from './pages/PayeeNotificationEmail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/email/inv-0042" replace />} />
        <Route path="/email/:invoiceId" element={<InvoiceEmail />} />
        <Route path="/pay/:invoiceToken" element={<HPP />} />
        <Route path="/pay/:invoiceToken/paid" element={<PaymentConfirmation />} />
        <Route path="/email/:invoiceId/received" element={<PayeeNotificationEmail />} />
      </Routes>
    </BrowserRouter>
  )
}
