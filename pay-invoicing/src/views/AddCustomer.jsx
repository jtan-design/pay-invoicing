import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import GetPaidLayout from '../components/GetPaidLayout'
import { addCustomer } from '../customerStore'

function Label({ children, required, hint }) {
  return (
    <div className="mb-1.5">
      <label className="text-xs font-medium uppercase tracking-wide" style={{ color: '#64748B' }}>
        {children}
        {required && <span style={{ color: '#EF4444' }} className="ml-0.5">*</span>}
        {hint && (
          <span className="ml-1 normal-case font-normal" style={{ color: '#94A3B8' }}>
            {hint}
          </span>
        )}
      </label>
    </div>
  )
}

function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full border rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-shadow ${className}`}
      style={{ borderColor: '#CBD5E1' }}
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

export default function AddCustomer() {
  const navigate = useNavigate()
  const emailRef = useRef(null)

  const [type, setType] = useState('business')
  const [businessName, setBusinessName] = useState('')
  const [abn, setAbn] = useState('')
  const [address, setAddress] = useState('')
  const [contactName, setContactName] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [showEmailWarning, setShowEmailWarning] = useState(false)
  const [errors, setErrors] = useState({})

  const name = type === 'business' ? businessName : fullName
  const canSave = name.trim().length > 0

  const handleSave = (forceNoEmail = false) => {
    const errs = {}
    if (!name.trim()) {
      errs.name = type === 'business' ? 'Business name is required.' : 'Full name is required.'
    }
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    if (!email.trim() && !forceNoEmail) {
      setShowEmailWarning(true)
      return
    }

    const newCustomer = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      type,
      abn: type === 'business' ? abn.trim() || null : null,
      email: email.trim() || null,
      address: address.trim(),
      contactName: contactName.trim(),
      notes: notes.trim(),
      payments: 0,
      totalReceived: 0,
      lastPayment: 'Never',
      paymentHistory: [],
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
          <h1 className="text-2xl font-bold" style={{ color: '#1E293B' }}>Add a customer</h1>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>
            Add the details of someone you invoice or get paid by.
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: '#E2E8F0' }}>

          {/* Type toggle */}
          <div>
            <Label>Customer type <span style={{ color: '#EF4444' }}>*</span></Label>
            <div className="flex gap-1 p-1 rounded-xl inline-flex mt-1" style={{ background: '#F1F5F9' }}>
              {['business', 'individual'].map((t) => (
                <button
                  key={t}
                  onClick={() => { setType(t); setErrors({}); setShowEmailWarning(false) }}
                  className="px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize"
                  style={
                    type === t
                      ? { background: 'white', color: '#1E293B', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
                      : { color: '#64748B' }
                  }
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {type === 'business' ? (
            <>
              {/* Business name */}
              <div>
                <Label required>Business name</Label>
                <Input
                  value={businessName}
                  onChange={(e) => { setBusinessName(e.target.value); setErrors({ ...errors, name: '' }) }}
                  placeholder="e.g. Northside Plumbing Pty Ltd"
                  autoFocus
                />
                {errors.name && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.name}</p>}
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
                  placeholder="XX XXX XXX XXX"
                />
                <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                  Required for tax invoices — you can add it later.
                </p>
              </div>

              {/* Address */}
              <div>
                <div className="mb-1.5 flex items-center">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: '#64748B' }}>
                    Business address
                  </label>
                  <InfoTooltip text="Required for AU tax invoices. You can save without it but you'll need it before sending an invoice." />
                </div>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 42 George Street, Sydney NSW 2000"
                />
              </div>

              {/* Contact name */}
              <div>
                <Label hint="(optional)">Contact name</Label>
                <Input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. James Chen"
                />
              </div>

              {/* Email */}
              <div>
                <div className="mb-1.5">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: '#64748B' }}>
                    Email
                  </label>
                  <span className="ml-1 text-xs font-normal normal-case" style={{ color: '#94A3B8' }}>
                    — you'll need this to send an invoice
                  </span>
                </div>
                <Input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setShowEmailWarning(false) }}
                  placeholder="accounts@company.com.au"
                />
              </div>
            </>
          ) : (
            <>
              {/* Full name */}
              <div>
                <Label required>Full name</Label>
                <Input
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setErrors({ ...errors, name: '' }) }}
                  placeholder="e.g. Sarah Mitchell"
                  autoFocus
                />
                {errors.name && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <div className="mb-1.5">
                  <label className="text-xs font-medium uppercase tracking-wide" style={{ color: '#64748B' }}>
                    Email
                  </label>
                  <span className="ml-1 text-xs font-normal normal-case" style={{ color: '#94A3B8' }}>
                    — you'll need this to send an invoice
                  </span>
                </div>
                <Input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setShowEmailWarning(false) }}
                  placeholder="e.g. sarah@email.com"
                />
              </div>
            </>
          )}

          {/* Notes */}
          <div>
            <Label hint="(optional)">Notes</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Preferred payment terms, project context…"
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
