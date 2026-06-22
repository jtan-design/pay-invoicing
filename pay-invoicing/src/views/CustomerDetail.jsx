import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import GetPaidLayout from '../components/GetPaidLayout'
import SendPaymentLinkModal from '../components/SendPaymentLinkModal'
import { getCustomerById } from '../customerStore'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 }).format(n)

const fmtFull = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 }).format(n)

function TypeBadge({ type }) {
  const styles = {
    business: { background: '#EEF4FF', color: '#1A56DB', label: 'Business' },
    individual: { background: '#F1F5F9', color: '#475569', label: 'Individual' },
    aggregated: { background: '#FFFBEB', color: '#92400E', label: 'Aggregated' },
  }
  const s = styles[type] || styles.individual
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: s.background, color: s.color }}>
      {s.label}
    </span>
  )
}

function MethodBadge({ method }) {
  const isPayId = method === 'PayID'
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={
        isPayId
          ? { background: '#EEF4FF', color: '#1A56DB' }
          : { background: '#F1F5F9', color: '#475569' }
      }
    >
      {method}
    </span>
  )
}

function StatusBadge({ status }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: '#DCFCE7', color: '#15803D' }}
    >
      <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
        <circle cx="3.5" cy="3.5" r="3" fill="#16A34A"/>
      </svg>
      {status}
    </span>
  )
}

export default function CustomerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  // Default to cust-001 if no id or not found
  const customer = getCustomerById(id) || getCustomerById('cust-001')

  if (!customer) {
    return (
      <GetPaidLayout>
        <div className="px-8 py-16 text-center">
          <p className="text-slate-500">Customer not found.</p>
          <button onClick={() => navigate('/customers')} className="mt-4 text-sm font-medium" style={{ color: '#1A56DB' }}>
            ← Back to customers
          </button>
        </div>
      </GetPaidLayout>
    )
  }

  const prpPoints = customer.totalReceived // 1pt per $1

  return (
    <GetPaidLayout>
      <div className="px-8 py-7 max-w-[1100px]">

        {/* Back link */}
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
        <div className="bg-white rounded-2xl border p-6 mb-5" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex items-start justify-between">
            {/* Left: identity */}
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ background: '#1A56DB' }}
              >
                {customer.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <h1 className="text-xl font-bold" style={{ color: '#1E293B' }}>{customer.name}</h1>
                  <TypeBadge type={customer.type} />
                </div>
                <div className="space-y-1 text-sm" style={{ color: '#64748B' }}>
                  {customer.abn && (
                    <p>ABN <span className="font-mono ml-1" style={{ color: '#1E293B' }}>{customer.abn}</span></p>
                  )}
                  {customer.email && (
                    <p>
                      <span className="font-medium" style={{ color: '#1E293B' }}>{customer.email}</span>
                    </p>
                  )}
                  {!customer.email && (
                    <p className="text-xs italic" style={{ color: '#D97706' }}>
                      No email on file — you'll need one to send an invoice
                    </p>
                  )}
                  {customer.address && <p>{customer.address}</p>}
                  {customer.contactName && <p>Contact: {customer.contactName}</p>}
                </div>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2.5 shrink-0 ml-4">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 active:scale-[0.99] transition-all"
                style={{ background: '#1A56DB' }}
              >
                Send payment link
              </button>
              <button
                className="px-4 py-2.5 rounded-xl text-sm font-medium border hover:bg-slate-50 transition-colors"
                style={{ borderColor: '#E2E8F0', color: '#475569' }}
              >
                Edit
              </button>
              <button
                className="w-9 h-9 rounded-xl flex items-center justify-center border hover:bg-slate-50 transition-colors"
                style={{ borderColor: '#E2E8F0', color: '#94A3B8' }}
              >
                …
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-5 pt-5 border-t flex items-center gap-8 flex-wrap" style={{ borderColor: '#F1F5F9' }}>
            {[
              { label: 'Total payments', value: `${customer.payments} payment${customer.payments !== 1 ? 's' : ''}` },
              { label: 'Total received', value: fmt(customer.totalReceived) },
              { label: 'Last payment', value: customer.lastPayment },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-wide mb-0.5" style={{ color: '#94A3B8' }}>{label}</p>
                <p className="text-base font-semibold tabular-nums" style={{ color: '#1E293B' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* PRP context — subtle, not dominant */}
          <div className="mt-4 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M8 2l1.5 3 3.5.5-2.5 2.5.6 3.5L8 10l-3.1 1.5.6-3.5L3 5.5 6.5 5 8 2Z" fill="#1A56DB" opacity="0.5"/>
            </svg>
            <p className="text-xs" style={{ color: '#94A3B8' }}>
              ~{prpPoints.toLocaleString('en-AU')} PayRewards Points earned from {customer.name.split(' ')[0]} payments
            </p>
          </div>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-[1fr_340px] gap-5">

          {/* Payment history */}
          <div>
            <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E2E8F0' }}>
              <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F1F5F9' }}>
                <h2 className="text-sm font-semibold" style={{ color: '#1E293B' }}>Payment history</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#F1F5F9', color: '#64748B' }}>
                  {customer.payments} total
                </span>
              </div>

              {customer.paymentHistory.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      {['Date', 'Amount', 'Reference', 'Method', 'Status'].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {customer.paymentHistory.map((p) => (
                      <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors" style={{ borderColor: '#F1F5F9' }}>
                        <td className="px-5 py-3.5" style={{ color: '#64748B' }}>{p.date}</td>
                        <td className="px-5 py-3.5 font-semibold tabular-nums" style={{ color: '#1E293B' }}>{fmtFull(p.amount)}</td>
                        <td className="px-5 py-3.5 font-mono text-xs" style={{ color: '#64748B' }}>{p.reference}</td>
                        <td className="px-5 py-3.5"><MethodBadge method={p.method} /></td>
                        <td className="px-5 py-3.5"><StatusBadge status={p.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="px-6 py-10 text-center">
                  <p className="text-sm" style={{ color: '#94A3B8' }}>No payment history available for this customer.</p>
                </div>
              )}
            </div>

            {/* Invoice history — connective tissue for the Friday demo */}
            <div className="mt-5 bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E2E8F0' }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: '#F1F5F9' }}>
                <h2 className="text-sm font-semibold" style={{ color: '#1E293B' }}>Invoice history</h2>
              </div>
              <div className="px-6 py-10 flex flex-col items-center text-center">
                {/* Empty state illustration */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: '#F1F5F9' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="3" y="2" width="16" height="18" rx="2" stroke="#CBD5E1" strokeWidth="1.5"/>
                    <path d="M7 7h8M7 11h8M7 15h5" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: '#1E293B' }}>No invoices sent yet</h3>
                <p className="text-sm max-w-xs mb-5 leading-relaxed" style={{ color: '#64748B' }}>
                  When invoicing is available, invoices sent to{' '}
                  <span className="font-medium">{customer.name.split(' ')[0]}</span> will appear here.
                </p>

                <div className="flex flex-col items-center gap-2.5">
                  <button
                    className="text-sm font-medium transition-opacity hover:opacity-75"
                    style={{ color: '#64748B', border: '1px solid #E2E8F0', padding: '7px 16px', borderRadius: '10px' }}
                    onClick={() => {}}
                  >
                    Get notified when invoicing launches →
                  </button>

                  {/* Demo connection — explicitly shows where this is going */}
                  <button
                    onClick={() => navigate('/invoices/new')}
                    className="text-xs font-medium hover:opacity-80 transition-opacity flex items-center gap-1"
                    style={{ color: '#1A56DB' }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M5.5 2H10v4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Preview the invoice creation flow (prototype)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Customer details card */}
            <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#E2E8F0' }}>
              <h3 className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: '#94A3B8' }}>Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#94A3B8' }}>Type</p>
                  <TypeBadge type={customer.type} />
                </div>
                {customer.abn && (
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: '#94A3B8' }}>ABN</p>
                    <p className="font-mono" style={{ color: '#1E293B' }}>{customer.abn}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#94A3B8' }}>Email</p>
                  {customer.email ? (
                    <p style={{ color: '#1E293B' }}>{customer.email}</p>
                  ) : (
                    <p className="text-xs italic" style={{ color: '#D97706' }}>
                      No email — required for invoicing
                    </p>
                  )}
                </div>
                {customer.address && (
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: '#94A3B8' }}>Address</p>
                    <p style={{ color: '#1E293B' }}>{customer.address}</p>
                  </div>
                )}
                {customer.contactName && (
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: '#94A3B8' }}>Contact</p>
                    <p style={{ color: '#1E293B' }}>{customer.contactName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* PRP summary card */}
            <div className="rounded-2xl border p-5" style={{ background: 'linear-gradient(135deg, #EEF4FF 0%, #F0F0FF 100%)', borderColor: '#C7D7F5' }}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#1A56DB' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2l1.5 3 3.5.5-2.5 2.5.6 3.5L8 10l-3.1 1.5.6-3.5L3 5.5 6.5 5 8 2Z" fill="white"/>
                  </svg>
                </div>
                <p className="text-xs font-semibold" style={{ color: '#1E293B' }}>PayRewards earned</p>
              </div>
              <p className="text-2xl font-bold tabular-nums mb-0.5" style={{ color: '#1A56DB' }}>
                ~{prpPoints.toLocaleString('en-AU')}
              </p>
              <p className="text-xs" style={{ color: '#64748B' }}>
                ≈ {Math.round(prpPoints / 2).toLocaleString('en-AU')} Qantas Business Rewards pts
              </p>
              <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
                1 PRP per $1 received — all time
              </p>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#E2E8F0' }}>
              <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#94A3B8' }}>Quick actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full text-left text-sm px-3 py-2.5 rounded-xl border font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
                  style={{ borderColor: '#C7D7F5', color: '#1A56DB' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 9V4.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1V9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Z" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M2 5l5 4 5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Send payment link
                </button>
                <button
                  className="w-full text-left text-sm px-3 py-2.5 rounded-xl border font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
                  style={{ borderColor: '#E2E8F0', color: '#64748B' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Create invoice (coming soon)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <SendPaymentLinkModal
          customer={customer}
          onClose={() => setShowModal(false)}
        />
      )}
    </GetPaidLayout>
  )
}
