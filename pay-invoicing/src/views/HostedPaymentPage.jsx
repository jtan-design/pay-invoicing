import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDefaultInvoice } from '../mockData'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 }).format(n)

const fmtDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }}
      className="text-xs px-2 py-0.5 rounded border transition-all"
      style={
        copied
          ? { borderColor: '#16A34A', color: '#16A34A', background: '#F0FDF4' }
          : { borderColor: '#CBD5E1', color: '#64748B' }
      }
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
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

export default function HostedPaymentPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('card')
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardName, setCardName] = useState('')

  let inv
  try {
    inv = JSON.parse(sessionStorage.getItem('invoiceData')) || getDefaultInvoice()
  } catch {
    inv = getDefaultInvoice()
  }
  if (!inv) inv = getDefaultInvoice()

  const cardFee = tab === 'card' ? inv.total * 0.018 : 0
  const totalWithFee = inv.total + cardFee

  const formatCardNum = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const handleConfirm = () => {
    navigate('/pay/inv-001/confirmed')
  }

  return (
    <div className="min-h-screen" style={{ background: '#F1F5F9' }}>

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <PayLogo />
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L2 4v5c0 2.8 2.1 4.8 5 5 2.9-.2 5-2.2 5-5V4L7 1Z" fill="#16A34A" opacity="0.15" stroke="#16A34A" strokeWidth="1"/>
              <path d="M5 7l1.5 1.5L9 5.5" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs font-medium text-green-700">Secure payment</span>
          </div>
        </div>
      </div>

      {/* From banner */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-2">
          <p className="text-xs text-slate-400">
            Invoice from <span className="font-medium text-slate-600">{inv.payee.name}</span>
            {inv.customer.abn && (
              <> · ABN <span className="font-mono">{inv.payee.abn}</span></>
            )}
          </p>
        </div>
      </div>

      {/* Back link */}
      <div className="max-w-4xl mx-auto px-6 pt-5 pb-1">
        <button
          onClick={() => navigate('/preview/invoice-email')}
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
        >
          ← Back to invoice email
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-5">
        <div className="flex gap-7 items-start">

          {/* Left: payment form */}
          <div className="flex-1 space-y-5">

            {/* Invoice summary card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Invoice summary</p>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-3xl font-bold tabular-nums" style={{ color: '#1E293B' }}>{fmt(inv.total)}</p>
                  <p className="text-sm text-slate-500 mt-1">AUD</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-700">{inv.invoiceNumber}</div>
                  <div className="text-xs text-slate-500">Due {fmtDate(inv.dueDate)}</div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  From <span className="font-medium text-slate-700">{inv.payee.name}</span>
                  {inv.payee.abn && <> · ABN {inv.payee.abn}</>}
                </p>
              </div>
            </div>

            {/* Payment method tabs */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-200">
                {[
                  { id: 'card', label: '💳 Pay by card' },
                  { id: 'bank', label: '🏦 Bank transfer' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`flex-1 py-3.5 text-sm font-medium transition-all ${
                      tab === id
                        ? 'text-blue-700 border-b-2'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                    style={tab === id ? { borderBottomColor: '#1A56DB', color: '#1A56DB' } : {}}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {tab === 'card' && (
                  <div className="space-y-4">
                    {/* Earn callout */}
                    <div className="rounded-lg px-4 py-3 flex items-start gap-3" style={{ background: '#EEF4FF', border: '1px solid #C7D7F5' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                        <path d="M8 2l1.5 3 3.5.5-2.5 2.5.6 3.5L8 10l-3.1 1.5.6-3.5L3 5.5 6.5 5 8 2Z" fill="#1A56DB"/>
                      </svg>
                      <p className="text-xs text-blue-800">
                        Pay by card and earn PayRewards Points on this payment when you join Pay →
                      </p>
                    </div>

                    {/* Card fields */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">Card number</label>
                      <div className="relative">
                        <input
                          value={cardNum}
                          onChange={(e) => setCardNum(formatCardNum(e.target.value))}
                          placeholder="0000 0000 0000 0000"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-mono tracking-wider pr-16"
                          onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
                          onBlur={(e) => (e.target.style.boxShadow = '')}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <div className="w-7 h-4 rounded-sm bg-blue-700 flex items-center justify-center">
                            <span className="text-white text-[7px] font-bold">VISA</span>
                          </div>
                          <div className="w-7 h-4 rounded-sm flex items-center justify-center overflow-hidden bg-slate-200">
                            <div className="w-3 h-3 rounded-full bg-red-500 -mr-1.5 opacity-90"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400 -ml-1.5 opacity-90"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">Expiry date</label>
                        <input
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-mono"
                          onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
                          onBlur={(e) => (e.target.style.boxShadow = '')}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">CVC</label>
                        <input
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-mono"
                          onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
                          onBlur={(e) => (e.target.style.boxShadow = '')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">Name on card</label>
                      <input
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Full name as on card"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                        onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
                        onBlur={(e) => (e.target.style.boxShadow = '')}
                      />
                    </div>

                    {/* Fee disclosure */}
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 flex items-start gap-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                        <circle cx="7" cy="7" r="5.5" stroke="#D97706" strokeWidth="1"/>
                        <path d="M7 5v3M7 9.5v.5" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      <p className="text-xs text-amber-800">
                        A <strong>1.8% card processing fee</strong> applies to card payments.
                        Total: <strong className="tabular-nums">{fmt(totalWithFee)}</strong>
                      </p>
                    </div>
                  </div>
                )}

                {tab === 'bank' && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                      Transfer to the following account and use <strong className="font-medium">{inv.invoiceNumber}</strong> as your reference.
                    </p>

                    <div className="rounded-lg border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                      {[
                        { label: 'PayID', value: inv.payee.payId, mono: true },
                        { label: 'BSB', value: inv.payee.bsb, mono: true },
                        { label: 'Account number', value: inv.payee.account, mono: true },
                        { label: 'Account name', value: inv.payee.name },
                        { label: 'Reference', value: inv.invoiceNumber, mono: true, highlight: true },
                      ].map(({ label, value, mono, highlight }) => (
                        <div key={label} className={`flex items-center justify-between px-4 py-3 ${highlight ? 'bg-yellow-50' : 'bg-white'}`}>
                          <div>
                            <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                            <p className={`text-sm text-slate-800 ${mono ? 'font-mono' : ''}`}>{value}</p>
                          </div>
                          <CopyButton value={value} />
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-slate-400 bg-slate-50 rounded-lg px-4 py-3">
                      Payments are processed within 1-2 business days via NPP (faster) or BSB/account.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pay value prop strip */}
            <div className="rounded-xl border p-5" style={{ background: 'linear-gradient(135deg, #F8FAFF 0%, #F0F4FF 100%)', borderColor: '#C7D7F5' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#1A56DB' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3l2 4 4.5.5-3.3 3.2.8 4.5L10 13l-4 2.2.8-4.5L3.5 7.5 8 7 10 3Z" fill="white"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800 mb-1">New to Pay?</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Business owners who pay through Pay earn PayRewards Points on every expense — redeem for Qantas, Velocity, hotel stays, or offset invoices.
                  </p>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: '#1A56DB' }}
                  >
                    Learn more about Pay →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: order summary + CTA */}
          <div className="w-72 shrink-0 space-y-4 sticky top-6">

            {/* Order summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Order summary</p>
              <div className="space-y-2.5">
                {inv.lineItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-600 pr-2 flex-1 truncate">{item.description}</span>
                    <span className="text-slate-800 tabular-nums shrink-0">
                      {fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0))}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{fmt(inv.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>GST (10%)</span>
                  <span className="tabular-nums">{fmt(inv.totalGST)}</span>
                </div>
                {tab === 'card' && (
                  <div className="flex justify-between text-sm text-amber-700">
                    <span>Card fee (1.8%)</span>
                    <span className="tabular-nums">{fmt(cardFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold pt-2 border-t border-slate-100">
                  <span className="text-slate-800">Total</span>
                  <span className="tabular-nums" style={{ color: '#1A56DB' }}>
                    {fmt(tab === 'card' ? totalWithFee : inv.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleConfirm}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 active:scale-[0.99] transition-all"
              style={{ background: '#1A56DB' }}
            >
              Confirm payment — {fmt(tab === 'card' ? totalWithFee : inv.total)}
            </button>

            {/* Trust badges */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1L1.5 3.5V7c0 2.5 2 4 4.5 4.5C8.5 11 10.5 9.5 10.5 7V3.5L6 1Z" fill="#16A34A" opacity="0.2" stroke="#16A34A" strokeWidth="0.8"/>
                    <path d="M4 6l1.5 1.5L8 4.5" stroke="#16A34A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  256-bit SSL
                </span>
                <span>·</span>
                <span>PCI DSS compliant</span>
              </div>
              <p className="text-xs text-slate-400">
                Powered by <span className="font-medium text-slate-500">pay.com.au</span>
              </p>
            </div>

            {/* Proto nav helper */}
            <div className="rounded-lg border border-dashed border-slate-300 px-4 py-3 text-xs text-slate-400">
              <p className="font-medium text-slate-500 mb-1.5">Prototype navigation</p>
              <button onClick={() => navigate('/invoices/new')} className="block hover:text-slate-600 mb-1">
                → Invoice creation
              </button>
              <button onClick={() => navigate('/preview/invoice-email')} className="block hover:text-slate-600 mb-1">
                → Invoice email
              </button>
              <button onClick={() => navigate('/pay/inv-001/confirmed')} className="block hover:text-slate-600">
                → Confirmation page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
