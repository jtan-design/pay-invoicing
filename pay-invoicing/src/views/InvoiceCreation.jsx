import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PAYEE, CUSTOMERS, DEFAULT_LINE_ITEMS } from '../mockData'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 }).format(n)

const fmtDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

const addDays = (isoDate, days) => {
  const d = new Date(isoDate + 'T00:00:00')
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

function PayLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#1A56DB' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 4h6a3 3 0 0 1 0 6H5v3H3V4Z" fill="white" />
          <path d="M5 6v2h4a1 1 0 0 0 0-2H5Z" fill="#1A56DB" />
        </svg>
      </div>
      <span className="font-bold text-xl tracking-tight" style={{ color: '#1E293B' }}>pay</span>
    </div>
  )
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button
      onClick={handleCopy}
      className="text-xs px-2 py-0.5 rounded text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function FormCard({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}

function Label({ children, required }) {
  return (
    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )
}

function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${className}`}
      style={{ '--tw-ring-color': '#1A56DB' }}
      onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
      onBlur={(e) => (e.target.style.boxShadow = '')}
      {...props}
    />
  )
}

export default function InvoiceCreation() {
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]

  // Customer state
  const [customer, setCustomer] = useState(CUSTOMERS[0])
  const [customerSearch, setCustomerSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)
  const [newCust, setNewCust] = useState({ name: '', type: 'business', abn: '', email: '' })
  const dropdownRef = useRef(null)

  // Invoice details
  const [invoiceNumber, setInvoiceNumber] = useState('INV-0042')
  const [issueDate, setIssueDate] = useState(today)
  const [paymentTerms, setPaymentTerms] = useState('30')
  const [dueDate, setDueDate] = useState(addDays(today, 30))

  // Line items
  const [lineItems, setLineItems] = useState(
    DEFAULT_LINE_ITEMS.map((i) => ({ ...i }))
  )
  const [notes, setNotes] = useState('')

  // Computed totals
  const subtotal = lineItems.reduce((s, i) => s + (parseFloat(i.quantity) || 0) * (parseFloat(i.rate) || 0), 0)
  const totalGST = lineItems.reduce(
    (s, i) => s + (i.gst ? (parseFloat(i.quantity) || 0) * (parseFloat(i.rate) || 0) * 0.1 : 0),
    0
  )
  const total = subtotal + totalGST
  const prpPoints = Math.round(total)
  const qantasPoints = Math.round(prpPoints / 2)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handlePaymentTermsChange = (terms) => {
    setPaymentTerms(terms)
    const map = { '7': 7, '14': 14, '30': 30 }
    if (map[terms]) setDueDate(addDays(issueDate, map[terms]))
  }

  const handleIssueDateChange = (val) => {
    setIssueDate(val)
    const map = { '7': 7, '14': 14, '30': 30 }
    if (map[paymentTerms]) setDueDate(addDays(val, map[paymentTerms]))
  }

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), description: '', quantity: 1, rate: 0, gst: true }])
  }

  const updateLineItem = (id, field, value) => {
    setLineItems(lineItems.map((i) => (i.id === id ? { ...i, [field]: value } : i)))
  }

  const removeLineItem = (id) => {
    setLineItems(lineItems.filter((i) => i.id !== id))
  }

  const selectCustomer = (c) => {
    setCustomer(c)
    setCustomerSearch('')
    setShowDropdown(false)
  }

  const filteredCustomers = CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase())
  )

  const saveNewCustomer = () => {
    const c = {
      id: Date.now(),
      name: newCust.name,
      type: newCust.type,
      abn: newCust.type === 'business' ? newCust.abn : null,
      email: newCust.email,
    }
    setCustomer(c)
    setShowNewForm(false)
    setNewCust({ name: '', type: 'business', abn: '', email: '' })
  }

  const handleSend = () => {
    const data = {
      customer,
      invoiceNumber,
      issueDate,
      dueDate,
      lineItems,
      notes,
      subtotal,
      totalGST,
      total,
      prpPoints,
      qantasPoints,
      payee: PAYEE,
    }
    sessionStorage.setItem('invoiceData', JSON.stringify(data))
    navigate('/preview/invoice-email')
  }

  const handlePreview = () => {
    const data = {
      customer,
      invoiceNumber,
      issueDate,
      dueDate,
      lineItems,
      notes,
      subtotal,
      totalGST,
      total,
      prpPoints,
      qantasPoints,
      payee: PAYEE,
    }
    sessionStorage.setItem('invoiceData', JSON.stringify(data))
    navigate('/pay/inv-001')
  }

  return (
    <div className="min-h-screen" style={{ background: '#F1F5F9' }}>
      {/* Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PayLogo />
            <span className="text-slate-300 text-lg">/</span>
            <span className="text-sm text-slate-500">Invoices</span>
            <span className="text-slate-300 text-lg">/</span>
            <span className="text-sm font-medium text-slate-800">New Invoice</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Draft
            </span>
            <span className="text-xs text-slate-400">Autosaved</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-7 items-start">

          {/* ── Left column: form ── */}
          <div className="flex-1 space-y-5">

            {/* Customer */}
            <FormCard title="Bill to">
              {customer && !showDropdown && !showNewForm ? (
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{customer.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {customer.type === 'business' ? `ABN ${customer.abn} · ` : ''}
                      {customer.email}
                    </p>
                  </div>
                  <button
                    onClick={() => { setShowDropdown(true); setCustomerSearch('') }}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 ml-4 shrink-0"
                    style={{ color: '#1A56DB' }}
                  >
                    Change
                  </button>
                </div>
              ) : (
                !showNewForm && (
                  <div className="relative" ref={dropdownRef}>
                    <Label required>Customer</Label>
                    <Input
                      value={customerSearch}
                      onChange={(e) => { setCustomerSearch(e.target.value); setShowDropdown(true) }}
                      onFocus={() => setShowDropdown(true)}
                      placeholder="Search customers…"
                      autoFocus
                    />
                    {showDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => selectCustomer(c)}
                              className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                            >
                              <p className="text-sm font-medium text-slate-800">{c.name}</p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {c.type === 'business' ? `ABN ${c.abn}` : 'Consumer'} · {c.email}
                              </p>
                            </button>
                          ))
                        ) : (
                          <p className="px-4 py-3 text-sm text-slate-500">No matches</p>
                        )}
                        <button
                          onClick={() => { setShowDropdown(false); setShowNewForm(true) }}
                          className="w-full text-left px-4 py-3 flex items-center gap-2 text-sm font-medium border-t border-slate-100 hover:bg-blue-50 transition-colors"
                          style={{ color: '#1A56DB' }}
                        >
                          <span className="text-lg leading-none">+</span> Add new customer
                        </button>
                      </div>
                    )}
                  </div>
                )
              )}

              {showNewForm && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-slate-700">New customer</p>
                  <div>
                    <Label required>Business / person name</Label>
                    <Input
                      value={newCust.name}
                      onChange={(e) => setNewCust({ ...newCust, name: e.target.value })}
                      placeholder="e.g. Bluestone Industries Pty Ltd"
                      autoFocus
                    />
                  </div>
                  <div>
                    <Label required>Type</Label>
                    <div className="flex gap-3">
                      {['business', 'consumer'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setNewCust({ ...newCust, type: t })}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                            newCust.type === t
                              ? 'border-blue-500 text-blue-700 bg-blue-50'
                              : 'border-slate-200 text-slate-600 bg-white hover:border-slate-300'
                          }`}
                          style={newCust.type === t ? { borderColor: '#1A56DB', color: '#1A56DB' } : {}}
                        >
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  {newCust.type === 'business' && (
                    <div>
                      <Label>ABN</Label>
                      <Input
                        value={newCust.abn}
                        onChange={(e) => setNewCust({ ...newCust, abn: e.target.value })}
                        placeholder="XX XXX XXX XXX"
                      />
                    </div>
                  )}
                  <div>
                    <Label>Email <span className="text-slate-400 normal-case font-normal">(required to send)</span></Label>
                    <Input
                      type="email"
                      value={newCust.email}
                      onChange={(e) => setNewCust({ ...newCust, email: e.target.value })}
                      placeholder="accounts@company.com.au"
                    />
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={saveNewCustomer}
                      disabled={!newCust.name}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-40"
                      style={{ background: '#1A56DB' }}
                    >
                      Save customer
                    </button>
                    <button
                      onClick={() => setShowNewForm(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:border-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </FormCard>

            {/* Invoice details */}
            <FormCard title="Invoice details">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label required>Invoice number</Label>
                  <Input
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label required>Issue date</Label>
                  <Input
                    type="date"
                    value={issueDate}
                    onChange={(e) => handleIssueDateChange(e.target.value)}
                  />
                </div>
                <div>
                  <Label required>Payment terms</Label>
                  <div className="flex gap-1.5 mb-2">
                    {['7', '14', '30'].map((d) => (
                      <button
                        key={d}
                        onClick={() => handlePaymentTermsChange(d)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                          paymentTerms === d
                            ? 'text-white border-transparent'
                            : 'text-slate-600 border-slate-200 bg-white hover:border-slate-300'
                        }`}
                        style={paymentTerms === d ? { background: '#1A56DB', borderColor: '#1A56DB' } : {}}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    Due {fmtDate(dueDate)}
                  </p>
                </div>
              </div>
            </FormCard>

            {/* Line items */}
            <FormCard title="Line items">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left text-xs font-medium text-slate-400 pb-2 pr-3 w-[45%]">Description</th>
                      <th className="text-right text-xs font-medium text-slate-400 pb-2 px-2 w-16">Qty</th>
                      <th className="text-right text-xs font-medium text-slate-400 pb-2 px-2 w-24">Rate</th>
                      <th className="text-center text-xs font-medium text-slate-400 pb-2 px-2 w-14">GST</th>
                      <th className="text-right text-xs font-medium text-slate-400 pb-2 pl-2 w-24">Amount</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {lineItems.map((item) => (
                      <tr key={item.id} className="group">
                        <td className="py-2.5 pr-3">
                          <input
                            value={item.description}
                            onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                            placeholder="Description of service or product"
                            className="w-full text-slate-800 placeholder-slate-400 text-sm focus:outline-none bg-transparent border-b border-transparent focus:border-slate-300 py-0.5 transition-colors"
                          />
                        </td>
                        <td className="py-2.5 px-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(item.id, 'quantity', e.target.value)}
                            min="0"
                            className="w-full text-right text-slate-800 text-sm focus:outline-none bg-transparent border-b border-transparent focus:border-slate-300 py-0.5 transition-colors tabular-nums"
                          />
                        </td>
                        <td className="py-2.5 px-2">
                          <div className="relative">
                            <span className="absolute left-0 top-0.5 text-slate-400 text-sm">$</span>
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => updateLineItem(item.id, 'rate', e.target.value)}
                              min="0"
                              step="0.01"
                              className="w-full text-right text-slate-800 text-sm focus:outline-none bg-transparent border-b border-transparent focus:border-slate-300 py-0.5 pl-3 transition-colors tabular-nums"
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <input
                            type="checkbox"
                            checked={item.gst}
                            onChange={(e) => updateLineItem(item.id, 'gst', e.target.checked)}
                            className="w-4 h-4 rounded cursor-pointer"
                            style={{ accentColor: '#1A56DB' }}
                          />
                        </td>
                        <td className="py-2.5 pl-2 text-right">
                          <span className="text-slate-800 font-medium tabular-nums">
                            {fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0))}
                          </span>
                        </td>
                        <td className="py-2.5 pl-2">
                          {lineItems.length > 1 && (
                            <button
                              onClick={() => removeLineItem(item.id)}
                              className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all text-lg leading-none w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={addLineItem}
                  className="flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ color: '#1A56DB' }}
                >
                  <span className="text-base">+</span> Add line item
                </button>

                <div className="text-right space-y-1 min-w-[180px]">
                  <div className="flex justify-between gap-8 text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-slate-700 tabular-nums">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between gap-8 text-sm">
                    <span className="text-slate-500">GST (10%)</span>
                    <span className="text-slate-700 tabular-nums">{fmt(totalGST)}</span>
                  </div>
                  <div className="flex justify-between gap-8 text-sm font-semibold border-t border-slate-200 pt-1.5 mt-1.5">
                    <span className="text-slate-800">Total (AUD)</span>
                    <span className="tabular-nums" style={{ color: '#1A56DB' }}>{fmt(total)}</span>
                  </div>
                </div>
              </div>
            </FormCard>

            {/* Notes */}
            <FormCard title="Notes (optional)">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Payment instructions, thank-you note, or project reference"
                rows={3}
                className="w-full text-sm text-slate-800 placeholder-slate-400 border border-slate-300 rounded-lg px-3 py-2 resize-none focus:outline-none transition-shadow"
                onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
                onBlur={(e) => (e.target.style.boxShadow = '')}
              />
            </FormCard>
          </div>

          {/* ── Right sidebar ── */}
          <div className="w-80 shrink-0 space-y-4 sticky top-20">

            {/* Payment details (pre-attached) */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">How your customer pays</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 font-medium flex items-center gap-1">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="3" fill="#16A34A"/></svg>
                  Pre-attached by Pay
                </span>
              </div>
              <div className="px-5 py-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-400 mb-1">PayID</p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs text-slate-700 font-mono bg-slate-50 px-2 py-1 rounded truncate flex-1">
                      {PAYEE.payId}
                    </code>
                    <CopyButton value={PAYEE.payId} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">BSB</p>
                    <div className="flex items-center justify-between gap-1">
                      <code className="text-xs text-slate-700 font-mono bg-slate-50 px-2 py-1 rounded flex-1">
                        {PAYEE.bsb}
                      </code>
                      <CopyButton value={PAYEE.bsb} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Account</p>
                    <div className="flex items-center justify-between gap-1">
                      <code className="text-xs text-slate-700 font-mono bg-slate-50 px-2 py-1 rounded flex-1">
                        {PAYEE.account}
                      </code>
                      <CopyButton value={PAYEE.account.replace(/\s/g, '')} />
                    </div>
                  </div>
                </div>
                <div className="pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect width="14" height="14" rx="3" fill="#1A56DB"/>
                      <path d="M3 5h8M3 7h5M3 9h6" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    Card payment via Pay — also included
                  </div>
                </div>
              </div>
            </div>

            {/* PRP earnings preview */}
            <div className="rounded-xl border overflow-hidden" style={{ background: 'linear-gradient(135deg, #EEF4FF 0%, #F0F0FF 100%)', borderColor: '#C7D7F5' }}>
              <div className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#1A56DB' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2l1.5 3 3.5.5-2.5 2.5.6 3.5L8 10l-3.1 1.5.6-3.5L3 5.5 6.5 5 8 2Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      You'll earn{' '}
                      <span style={{ color: '#1A56DB' }}>~{prpPoints.toLocaleString('en-AU')} PayRewards Points</span>
                      {' '}when this invoice is paid
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      ≈ {qantasPoints.toLocaleString('en-AU')} Qantas Business Rewards points
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <button
                onClick={handleSend}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 active:scale-[0.99] transition-all"
                style={{ background: '#1A56DB' }}
              >
                Send invoice
              </button>
              <button className="w-full py-3 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                Save as draft
              </button>
              <button
                onClick={handlePreview}
                className="w-full py-2 text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ color: '#1A56DB' }}
              >
                Preview payer view →
              </button>
            </div>

            {/* Proto nav helper */}
            <div className="rounded-lg border border-dashed border-slate-300 px-4 py-3 text-xs text-slate-400">
              <p className="font-medium text-slate-500 mb-1.5">Prototype navigation</p>
              <button onClick={() => navigate('/preview/invoice-email')} className="block hover:text-slate-600 mb-1">
                → Invoice email (payer view)
              </button>
              <button onClick={() => navigate('/pay/inv-001')} className="block hover:text-slate-600">
                → Hosted payment page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
