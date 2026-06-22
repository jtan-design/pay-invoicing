import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDefaultInvoice } from '../mockData'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 }).format(n)

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

export default function PaymentConfirmation() {
  const navigate = useNavigate()
  const [dismissed, setDismissed] = useState(false)

  let inv
  try {
    inv = JSON.parse(sessionStorage.getItem('invoiceData')) || getDefaultInvoice()
  } catch {
    inv = getDefaultInvoice()
  }
  if (!inv) inv = getDefaultInvoice()

  const reference = `PAY-${Date.now().toString().slice(-8)}`
  const prpPoints = inv.prpPoints
  const qantasPoints = inv.qantasPoints

  return (
    <div className="min-h-screen" style={{ background: '#F1F5F9' }}>

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <PayLogo />
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L2 4v5c0 2.8 2.1 4.8 5 5 2.9-.2 5-2.2 5-5V4L7 1Z" fill="#16A34A" opacity="0.15" stroke="#16A34A" strokeWidth="1"/>
              <path d="M5 7l1.5 1.5L9 5.5" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs font-medium text-green-700">Secure payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Success card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

          {/* Success header */}
          <div className="px-8 pt-10 pb-8 text-center" style={{ background: 'linear-gradient(180deg, #F0FDF4 0%, white 100%)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: '#DCFCE7', border: '3px solid #86EFAC' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M7 14l5 5L21 10" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Payment confirmed</h1>
            <p className="text-slate-500 text-sm">
              Your payment to <span className="font-medium text-slate-700">{inv.payee.name}</span> was successful.
            </p>
          </div>

          {/* Payment details */}
          <div className="px-8 py-6 border-t border-slate-100">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Payment details</p>
            <div className="space-y-3">
              {[
                { label: 'Amount paid', value: fmt(inv.total), bold: true },
                { label: 'Invoice', value: inv.invoiceNumber },
                { label: 'Paid to', value: inv.payee.name },
                { label: 'Reference', value: reference, mono: true },
              ].map(({ label, value, bold, mono }) => (
                <div key={label} className="flex justify-between items-baseline">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span
                    className={`text-sm ${bold ? 'font-bold' : 'font-medium'} ${mono ? 'font-mono' : ''} text-slate-800`}
                    style={bold ? { color: '#1A56DB', fontSize: '1rem' } : {}}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#94A3B8" strokeWidth="1"/>
                <path d="M7 5v4M7 4v.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <p className="text-xs text-slate-400">A receipt has been sent to {inv.customer.email}</p>
            </div>
          </div>

          {/* ── Sign-up CTA — appears POST-payment, never before ── */}
          {!dismissed && (
            <div
              className="mx-6 mb-6 rounded-xl p-6"
              style={{ background: 'linear-gradient(135deg, #EEF4FF 0%, #F0F0FF 100%)', border: '1px solid #C7D7F5' }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#1A56DB' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3l2 4 4.5.5-3.3 3.2.8 4.5L10 13l-4 2.2.8-4.5L3.5 7.5 8 7 10 3Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 mb-1">
                    You just paid {inv.payee.name}.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Businesses using Pay earn PayRewards Points on every payment they make — Qantas Business Rewards, Velocity, hotel stays, or redeem against invoices. Start earning on your bills too.
                  </p>
                </div>
              </div>

              {/* Reward examples */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { icon: '✈️', label: 'Qantas', sub: 'Business Rewards' },
                  { icon: '🚀', label: 'Velocity', sub: 'Frequent Flyer' },
                  { icon: '🏨', label: 'Hotels', sub: 'Marriott & more' },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="bg-white rounded-lg px-3 py-2.5 text-center border border-blue-100">
                    <div className="text-lg mb-0.5">{icon}</div>
                    <p className="text-xs font-semibold text-slate-700">{label}</p>
                    <p className="text-xs text-slate-400">{sub}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => {}}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 active:scale-[0.99] transition-all"
                  style={{ background: '#1A56DB' }}
                >
                  Create a free Pay account
                </button>
                <button
                  onClick={() => setDismissed(true)}
                  className="w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>
          )}

          {dismissed && (
            <div className="px-8 pb-8 text-center">
              <p className="text-sm text-slate-400">
                Thanks for your payment.{' '}
                <button
                  onClick={() => setDismissed(false)}
                  className="underline hover:text-slate-600 transition-colors"
                >
                  Learn about Pay
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Payee PRP earnings (contextual, post-confirmation) */}
        <div className="mt-4 rounded-xl border px-5 py-4 flex items-center gap-3" style={{ background: '#F8FAFF', borderColor: '#C7D7F5' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#1A56DB' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 2l1.5 3 3.5.5-2.5 2.5.6 3.5L8 10l-3.1 1.5.6-3.5L3 5.5 6.5 5 8 2Z" fill="white"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">
              {inv.payee.name} earned{' '}
              <span style={{ color: '#1A56DB' }}>{prpPoints.toLocaleString('en-AU')} PayRewards Points</span>
              {' '}on this invoice
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              ≈ {qantasPoints.toLocaleString('en-AU')} Qantas Business Rewards points
            </p>
          </div>
        </div>

        {/* Proto nav helper */}
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 px-4 py-3 text-xs text-slate-400">
          <p className="font-medium text-slate-500 mb-1.5">Prototype navigation</p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/invoices/new')} className="hover:text-slate-600">
              → Invoice creation
            </button>
            <button onClick={() => navigate('/preview/invoice-email')} className="hover:text-slate-600">
              → Invoice email
            </button>
            <button onClick={() => navigate('/pay/inv-001')} className="hover:text-slate-600">
              → Payment page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
