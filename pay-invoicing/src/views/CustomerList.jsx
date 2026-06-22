import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import GetPaidLayout from '../components/GetPaidLayout'
import SendPaymentLinkModal from '../components/SendPaymentLinkModal'
import { getCustomers } from '../customerStore'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 }).format(n)

function TypeBadge({ type }) {
  const styles = {
    business: { background: '#EEF4FF', color: '#1A56DB', label: 'Business' },
    individual: { background: '#F1F5F9', color: '#475569', label: 'Individual' },
    aggregated: { background: '#FFFBEB', color: '#92400E', label: 'Aggregated' },
  }
  const s = styles[type] || styles.individual
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: s.background, color: s.color }}>
      {s.label}
    </span>
  )
}

function Tooltip({ text, children }) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute z-50 bottom-full left-0 mb-2 w-64 px-3 py-2 rounded-lg text-xs leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl"
        style={{ background: '#1E293B', color: '#F1F5F9' }}>
        {text}
        <div className="absolute top-full left-5 border-4 border-transparent" style={{ borderTopColor: '#1E293B' }}></div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-xl p-5 border" style={{ borderColor: '#E2E8F0' }}>
      <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: '#94A3B8' }}>{label}</p>
      <p className="text-2xl font-bold tabular-nums" style={{ color: '#1E293B' }}>{value}</p>
      {sub && <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{sub}</p>}
    </div>
  )
}

export default function CustomerList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [modalCustomer, setModalCustomer] = useState(null)
  const [showNotification, setShowNotification] = useState(
    sessionStorage.getItem('notifDismissed') !== 'true'
  )
  const [actionMenuId, setActionMenuId] = useState(null)
  const menuRef = useRef(null)

  const customers = getCustomers()

  const filtered = customers.filter((c) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      (c.abn && c.abn.includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q))
    )
  })

  const totalReceived = customers.reduce((s, c) => s + c.totalReceived, 0)
  const paymentsThisMonth = 7 // mock

  const dismissNotification = () => {
    sessionStorage.setItem('notifDismissed', 'true')
    setShowNotification(false)
  }

  return (
    <GetPaidLayout>
      {/* Notification banner */}
      {showNotification && (
        <div className="flex items-center justify-between px-6 py-3 border-b" style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}>
          <div className="flex items-center gap-3">
            <span className="text-base">💰</span>
            <p className="text-sm" style={{ color: '#78350F' }}>
              New payment received —{' '}
              <strong>$1,200 from Northside Plumbing.</strong>{' '}
              Save them as a customer to invoice next time.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <button
              onClick={() => navigate('/customers/save-from-payment')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ background: '#D97706' }}
            >
              Save as customer
            </button>
            <button
              onClick={dismissNotification}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-amber-200 transition-colors text-lg leading-none"
              style={{ color: '#92400E' }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="px-8 py-7 max-w-[1200px]">
        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#1E293B' }}>Customers</h1>
            <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>
              People and businesses who pay you through Pay
            </p>
          </div>
          <button
            onClick={() => navigate('/customers/new')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 active:scale-[0.99] transition-all"
            style={{ background: '#1A56DB' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add customer
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Total customers" value={customers.length} sub="on Pay" />
          <StatCard label="Total received" value={fmt(totalReceived)} sub="all time via Pay" />
          <StatCard label="Payments this month" value={paymentsThisMonth} sub="June 2026" />
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="14" height="14" viewBox="0 0 14 14" fill="none"
            >
              <circle cx="6" cy="6" r="4.5" stroke="#94A3B8" strokeWidth="1.3"/>
              <path d="M9.5 9.5L12 12" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ABN, or email"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition-shadow"
              style={{ borderColor: '#E2E8F0', color: '#1E293B' }}
              onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
              onBlur={(e) => (e.target.style.boxShadow = '')}
            />
          </div>
        </div>

        {/* Table */}
        {filtered.length > 0 ? (
          <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#E2E8F0' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['Name', 'Type', 'ABN', 'Email', 'Payments', 'Total received', 'Last payment', ''].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: '#94A3B8' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => {
                  const isAggregated = customer.type === 'aggregated'
                  const noEmail = !customer.email && !isAggregated
                  return (
                    <tr
                      key={customer.id}
                      className="group border-b last:border-0 transition-colors"
                      style={{
                        borderColor: '#F1F5F9',
                        opacity: isAggregated ? 0.65 : 1,
                        background: 'white',
                      }}
                      onMouseEnter={(e) => !isAggregated && (e.currentTarget.style.background = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                    >
                      {/* Name */}
                      <td className="px-4 py-3.5">
                        {isAggregated ? (
                          <Tooltip text="This payment came from an aggregated source. Individual payers couldn't be identified.">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium italic" style={{ color: '#94A3B8' }}>{customer.name}</span>
                              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
                                <circle cx="6.5" cy="6.5" r="5" stroke="#CBD5E1" strokeWidth="1"/>
                                <path d="M6.5 5.5v4M6.5 4.5v-.5" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Tooltip>
                        ) : (
                          <button
                            onClick={() => navigate(`/customers/${customer.id}`)}
                            className="font-medium text-left hover:underline"
                            style={{ color: '#1A56DB' }}
                          >
                            {customer.name}
                          </button>
                        )}
                      </td>

                      {/* Type */}
                      <td className="px-4 py-3.5">
                        <TypeBadge type={customer.type} />
                      </td>

                      {/* ABN */}
                      <td className="px-4 py-3.5">
                        {customer.abn ? (
                          <span className="font-mono text-xs" style={{ color: '#475569' }}>{customer.abn}</span>
                        ) : (
                          <span style={{ color: '#CBD5E1' }}>—</span>
                        )}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3.5">
                        {customer.email ? (
                          <span style={{ color: '#475569' }}>{customer.email}</span>
                        ) : noEmail ? (
                          <button
                            onClick={() => navigate(`/customers/${customer.id}`)}
                            className="text-xs italic hover:underline"
                            style={{ color: '#D97706' }}
                          >
                            Add email to invoice
                          </button>
                        ) : (
                          <span style={{ color: '#CBD5E1' }}>—</span>
                        )}
                      </td>

                      {/* Payments */}
                      <td className="px-4 py-3.5 tabular-nums" style={{ color: '#1E293B' }}>
                        {customer.payments} {customer.payments === 1 ? 'payment' : 'payments'}
                      </td>

                      {/* Total received */}
                      <td className="px-4 py-3.5 font-semibold tabular-nums" style={{ color: '#1E293B' }}>
                        {fmt(customer.totalReceived)}
                      </td>

                      {/* Last payment */}
                      <td className="px-4 py-3.5" style={{ color: '#64748B' }}>
                        {customer.lastPayment}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5">
                        {!isAggregated && (
                          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => navigate(`/customers/${customer.id}`)}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium border hover:bg-slate-50 transition-colors"
                              style={{ borderColor: '#E2E8F0', color: '#475569' }}
                            >
                              View
                            </button>
                            <button
                              onClick={() => setModalCustomer(customer)}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium border hover:bg-blue-50 transition-colors"
                              style={{ borderColor: '#C7D7F5', color: '#1A56DB' }}
                            >
                              Send link
                            </button>
                            <button
                              className="w-6 h-6 rounded-lg flex items-center justify-center border hover:bg-slate-50 transition-colors"
                              style={{ borderColor: '#E2E8F0', color: '#94A3B8' }}
                            >
                              …
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-2xl border py-16 flex flex-col items-center text-center" style={{ borderColor: '#E2E8F0' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: '#F1F5F9' }}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <circle cx="10" cy="9" r="4.5" stroke="#CBD5E1" strokeWidth="1.5"/>
                <path d="M3 22c0-4 3-6.5 7-6.5s7 2.5 7 6.5" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="19" cy="8.5" r="3.5" stroke="#CBD5E1" strokeWidth="1.5"/>
                <path d="M22 20.5c0-3-1.5-4.8-3-5.5" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-1.5" style={{ color: '#1E293B' }}>No customers found</h3>
            {search ? (
              <>
                <p className="text-sm mb-4" style={{ color: '#64748B' }}>
                  No results for "<strong>{search}</strong>"
                </p>
                <button onClick={() => setSearch('')} className="text-sm font-medium" style={{ color: '#1A56DB' }}>
                  Clear search
                </button>
              </>
            ) : (
              <>
                <p className="text-sm max-w-xs mb-5 leading-relaxed" style={{ color: '#64748B' }}>
                  Customers are added automatically when someone pays you through Pay, or you can add them manually.
                </p>
                <button
                  onClick={() => navigate('/customers/new')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: '#1A56DB' }}
                >
                  <span>+</span> Add customer
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {modalCustomer && (
        <SendPaymentLinkModal
          customer={modalCustomer}
          onClose={() => setModalCustomer(null)}
        />
      )}
    </GetPaidLayout>
  )
}
