import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import GetPaidLayout from '../components/GetPaidLayout'
import { addCustomer } from '../customerStore'

// Pre-filled payment context from the notification banner
const PAYMENT_CONTEXT = {
  amount: 1200,
  from: 'Northside Plumbing',
  bsb: '062-000',
  account: '12345678',
  date: '10 Jun 2026',
}

function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-shadow ${className}`}
      style={{ borderColor: '#CBD5E1', color: '#1E293B' }}
      onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
      onBlur={(e) => (e.target.style.boxShadow = '')}
      {...props}
    />
  )
}

function InfoTooltip({ text }) {
  return (
    <div className="relative group inline-block ml-1 align-middle">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="cursor-help">
        <circle cx="6.5" cy="6.5" r="5.5" stroke="#CBD5E1" strokeWidth="1"/>
        <path d="M6.5 5.5v4M6.5 4.5v-.5" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
      <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 px-3 py-2 rounded-lg text-xs leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl"
        style={{ background: '#1E293B', color: '#F1F5F9' }}>
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: '#1E293B' }}></div>
      </div>
    </div>
  )
}

export default function SaveFromPayment() {
  const navigate = useNavigate()
  const emailRef = useRef(null)

  const [businessName, setBusinessName] = useState(PAYMENT_CONTEXT.from)
  const [abn, setAbn] = useState('')
  const [address, setAddress] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [showEmailWarning, setShowEmailWarning] = useState(false)

  const canSave = businessName.trim().length > 0

  const handleSave = (forceNoEmail = false) => {
    if (!email.trim() && !forceNoEmail) {
      setShowEmailWarning(true)
      return
    }
    const newCustomer = {
      id: `cust-${Date.now()}`,
      name: businessName.trim(),
      type: 'business',
      abn: abn.trim() || null,
      email: email.trim() || null,
      address: address.trim(),
      contactName: contactName.trim(),
      notes: notes.trim(),
      payments: 1,
      totalReceived: PAYMENT_CONTEXT.amount,
      lastPayment: 'Today',
      paymentHistory: [
        {
          id: 'p-imported',
          date: PAYMENT_CONTEXT.date,
          amount: PAYMENT_CONTEXT.amount,
          reference: 'BSB import',
          method: 'Bank transfer',
          status: 'Paid',
        },
      ],
    }
    addCustomer(newCustomer)
    navigate(`/customers/${newCustomer.id}`)
  }

  return (
    <GetPaidLayout>
      <div className="px-8 py-7 max-w-[680px]">

        {/* Back */}
        <button
          onClick={() => navigate('/customers')}
          className="flex items-center gap-1.5 text-sm mb-5 hover:opacity-75 transition-opacity"
          style={{ color: '#64748B' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Customers
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: '#1E293B' }}>Save as customer</h1>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>
            This payment came from{' '}
            <span className="font-semibold" style={{ color: '#1E293B' }}>{PAYMENT_CONTEXT.from}</span>.
            Confirm their details.
          </p>
        </div>

        {/* Payment context card */}
        <div className="rounded-xl px-4 py-4 mb-6 flex items-start gap-3" style={{ background: '#F0FDF4', border: '1px solid #86EFAC' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#DCFCE7' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1.5 8.5l3.5 3.5 9.5-9.5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-sm">
            <p className="font-semibold mb-0.5" style={{ color: '#15803D' }}>
              ${PAYMENT_CONTEXT.amount.toLocaleString('en-AU')} received {PAYMENT_CONTEXT.date}
            </p>
            <p style={{ color: '#166534' }}>
              We've matched this to a bank transfer from BSB{' '}
              <code className="font-mono">{PAYMENT_CONTEXT.bsb}</code>, acc{' '}
              <code className="font-mono">{PAYMENT_CONTEXT.account}</code>.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: '#E2E8F0' }}>

          {/* Business name (pre-filled) */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: '#64748B' }}>
              Business name <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <Input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Business name"
              autoFocus
            />
          </div>

          {/* ABN */}
          <div>
            <div className="mb-1.5 flex items-center">
              <label className="text-xs font-medium uppercase tracking-wide" style={{ color: '#64748B' }}>
                ABN
              </label>
              <InfoTooltip text="Required for AU tax invoices. You can save without ABN but you'll need it before sending an invoice." />
            </div>
            <Input
              value={abn}
              onChange={(e) => setAbn(e.target.value)}
              placeholder="XX XXX XXX XXX — add if known"
            />
          </div>

          {/* Address */}
          <div>
            <div className="mb-1.5 flex items-center">
              <label className="text-xs font-medium uppercase tracking-wide" style={{ color: '#64748B' }}>
                Business address
              </label>
              <InfoTooltip text="Required for AU tax invoices." />
            </div>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, suburb, state and postcode"
            />
          </div>

          {/* Contact name */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: '#64748B' }}>
              Contact name <span className="normal-case font-normal" style={{ color: '#94A3B8' }}>(optional)</span>
            </label>
            <Input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. Tony Garelli"
            />
          </div>

          {/* Email */}
          <div>
            <div className="mb-1.5">
              <label className="text-xs font-medium uppercase tracking-wide" style={{ color: '#64748B' }}>
                Email
              </label>
              <span className="ml-1 text-xs font-normal" style={{ color: '#94A3B8' }}>
                — you'll need this to send invoices
              </span>
            </div>
            <Input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setShowEmailWarning(false) }}
              placeholder="accounts@business.com.au"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: '#64748B' }}>
              Notes <span className="normal-case font-normal" style={{ color: '#94A3B8' }}>(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes about this customer…"
              rows={2}
              className="w-full border rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none transition-shadow"
              style={{ borderColor: '#CBD5E1' }}
              onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
              onBlur={(e) => (e.target.style.boxShadow = '')}
            />
          </div>

          {/* No-email soft warning */}
          {showEmailWarning && (
            <div className="rounded-xl px-4 py-4 border" style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}>
              <p className="text-sm font-medium mb-0.5" style={{ color: '#92400E' }}>No email added</p>
              <p className="text-sm mb-3" style={{ color: '#78350F' }}>
                You'll need an email address to send invoices to this customer.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSave(true)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border hover:bg-amber-100 transition-colors"
                  style={{ borderColor: '#D97706', color: '#92400E' }}
                >
                  Save anyway
                </button>
                <button
                  onClick={() => {
                    setShowEmailWarning(false)
                    setTimeout(() => emailRef.current?.focus(), 50)
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ background: '#D97706' }}
                >
                  Add email
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={() => handleSave(false)}
            disabled={!canSave}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 hover:opacity-90 transition-all"
            style={{ background: '#1A56DB' }}
          >
            Save customer
          </button>
          <button
            onClick={() => navigate('/customers')}
            className="px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors"
            style={{ color: '#64748B' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </GetPaidLayout>
  )
}
