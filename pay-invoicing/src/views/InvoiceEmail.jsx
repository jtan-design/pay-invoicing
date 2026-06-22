import { useNavigate } from 'react-router-dom'
import { getDefaultInvoice } from '../mockData'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 }).format(n)

const fmtDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function PayLogo({ white }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: white ? 'white' : '#1A56DB' }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M3 4h6a3 3 0 0 1 0 6H5v3H3V4Z" fill={white ? '#1A56DB' : 'white'} />
          <path d="M5 6v2h4a1 1 0 0 0 0-2H5Z" fill={white ? 'white' : '#1A56DB'} />
        </svg>
      </div>
      <span className={`font-bold text-base tracking-tight ${white ? 'text-white' : 'text-slate-800'}`}>pay</span>
    </div>
  )
}

export default function InvoiceEmail() {
  const navigate = useNavigate()

  let inv
  try {
    inv = JSON.parse(sessionStorage.getItem('invoiceData')) || getDefaultInvoice()
  } catch {
    inv = getDefaultInvoice()
  }
  if (!inv) inv = getDefaultInvoice()

  const topLineItems = inv.lineItems.slice(0, 2)
  const hasMore = inv.lineItems.length > 2

  return (
    <div className="min-h-screen" style={{ background: '#2D2D2D' }}>

      {/* Prototype context banner */}
      <div className="px-6 py-2.5 flex items-center justify-between" style={{ background: '#1A56DB' }}>
        <div className="flex items-center gap-3">
          <PayLogo white />
          <span className="text-white text-xs opacity-75">·</span>
          <span className="text-white text-xs font-medium opacity-90">Prototype: Payer email view</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/invoices/new')}
            className="text-xs text-white opacity-75 hover:opacity-100 transition-opacity"
          >
            ← Back to invoice creation
          </button>
          <button
            onClick={() => navigate('/pay/inv-001')}
            className="text-xs bg-white font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
            style={{ color: '#1A56DB' }}
          >
            Skip to payment page →
          </button>
        </div>
      </div>

      {/* Browser chrome */}
      <div className="mx-auto max-w-5xl">
        <div className="rounded-t-xl mt-4 overflow-hidden shadow-2xl">

          {/* Browser toolbar */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#3C3C3C' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white bg-opacity-10 rounded-md px-4 py-1 text-xs text-slate-300 font-mono min-w-[300px] text-center">
                mail.google.com
              </div>
            </div>
            <div className="w-16"></div>
          </div>

          {/* Gmail interface */}
          <div className="flex" style={{ background: '#F6F8FC', minHeight: '680px' }}>

            {/* Gmail sidebar */}
            <div className="w-56 shrink-0 border-r border-slate-200 py-4" style={{ background: 'white' }}>
              {/* Compose */}
              <div className="px-4 mb-4">
                <div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-3 shadow-sm cursor-default">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="#5f6368" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm font-medium text-slate-600">Compose</span>
                </div>
              </div>
              {/* Nav items */}
              {[
                { icon: '📥', label: 'Inbox', count: 3, active: true },
                { icon: '⭐', label: 'Starred' },
                { icon: '🕐', label: 'Snoozed' },
                { icon: '📤', label: 'Sent' },
                { icon: '📄', label: 'Drafts', count: 2 },
              ].map(({ icon, label, count, active }) => (
                <div
                  key={label}
                  className={`flex items-center justify-between mx-2 px-3 py-1.5 rounded-r-2xl cursor-default mb-0.5 ${
                    active ? 'bg-blue-100 font-semibold' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{icon}</span>
                    <span className="text-sm text-slate-700">{label}</span>
                  </div>
                  {count && <span className="text-xs font-semibold text-slate-600">{count}</span>}
                </div>
              ))}
            </div>

            {/* Email list + viewer */}
            <div className="flex-1 flex flex-col">

              {/* Toolbar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-200 bg-white">
                <div className="flex-1 flex items-center gap-3">
                  <div className="bg-slate-100 rounded-full px-4 py-1.5 flex-1 max-w-md flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="6" cy="6" r="4.5" stroke="#5f6368" strokeWidth="1.2"/>
                      <path d="M9.5 9.5L12 12" stroke="#5f6368" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm text-slate-400">Search mail</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">J</div>
              </div>

              {/* Email list + open email */}
              <div className="flex flex-1 overflow-hidden">

                {/* Email list */}
                <div className="w-64 shrink-0 border-r border-slate-200 overflow-y-auto bg-white">
                  {[
                    {
                      from: 'Acme Consulting via Pay',
                      subject: `Invoice INV-0042 — ${fmt(inv.total)} due`,
                      preview: 'Please find your invoice attached...',
                      time: 'Just now',
                      unread: true,
                      active: true,
                    },
                    {
                      from: 'ATO',
                      subject: 'Your BAS is due soon',
                      preview: 'A reminder that your quarterly...',
                      time: '9:42 AM',
                    },
                    {
                      from: 'Xero',
                      subject: 'Your January summary is ready',
                      preview: '12 transactions this month...',
                      time: 'Yesterday',
                    },
                  ].map((email, i) => (
                    <div
                      key={i}
                      className={`px-3 py-3 border-b border-slate-100 cursor-default ${
                        email.active ? 'bg-blue-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-0.5">
                        <p className={`text-xs truncate ${email.unread ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                          {email.from}
                        </p>
                        <span className="text-xs text-slate-400 shrink-0 ml-1">{email.time}</span>
                      </div>
                      <p className={`text-xs truncate ${email.unread ? 'font-medium text-slate-700' : 'text-slate-500'}`}>
                        {email.subject}
                      </p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{email.preview}</p>
                    </div>
                  ))}
                </div>

                {/* Email content */}
                <div className="flex-1 overflow-y-auto p-6" style={{ background: '#F6F8FC' }}>
                  {/* Email header */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Subject */}
                    <div className="px-6 pt-5 pb-4 border-b border-slate-100">
                      <h2 className="text-base font-semibold text-slate-800">
                        Invoice {inv.invoiceNumber} from {inv.payee.name} — {fmt(inv.total)} due {fmtDate(inv.dueDate)}
                      </h2>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            A
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-700">
                              {inv.payee.name} via Pay{' '}
                              <span className="font-normal text-slate-400">&lt;invoices@pay.com.au&gt;</span>
                            </p>
                            <p className="text-xs text-slate-400">To: {inv.customer.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">Just now</span>
                      </div>
                    </div>

                    {/* Email body */}
                    <div className="p-6">
                      {/* Rendered email */}
                      <div className="max-w-[520px] mx-auto">

                        {/* Email header band */}
                        <div className="rounded-t-xl px-6 py-5 flex items-center justify-between" style={{ background: '#1E293B' }}>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Invoice from</p>
                            <p className="text-white font-semibold text-base">{inv.payee.name}</p>
                          </div>
                          <PayLogo white />
                        </div>

                        {/* Amount hero */}
                        <div className="border-x border-slate-200 px-6 py-6 text-center" style={{ background: '#F8FAFF' }}>
                          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Amount due</p>
                          <p className="text-3xl font-bold tabular-nums" style={{ color: '#1E293B' }}>{fmt(inv.total)}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            Invoice {inv.invoiceNumber} · Due {fmtDate(inv.dueDate)}
                          </p>
                        </div>

                        {/* Line items summary */}
                        <div className="border-x border-b border-slate-200 px-6 py-4" style={{ background: 'white' }}>
                          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Invoice summary</p>
                          <div className="space-y-2">
                            {topLineItems.map((item, i) => (
                              <div key={i} className="flex justify-between text-sm">
                                <span className="text-slate-600 truncate pr-4">{item.description}</span>
                                <span className="text-slate-800 font-medium tabular-nums shrink-0">
                                  {fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0))}
                                </span>
                              </div>
                            ))}
                            {hasMore && (
                              <p className="text-xs text-slate-400">
                                + {inv.lineItems.length - 2} more item{inv.lineItems.length - 2 > 1 ? 's' : ''}
                              </p>
                            )}
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-sm font-semibold">
                            <span className="text-slate-700">Total incl. GST</span>
                            <span style={{ color: '#1A56DB' }} className="tabular-nums">{fmt(inv.total)}</span>
                          </div>
                        </div>

                        {/* Payment CTAs */}
                        <div className="border-x border-b border-slate-200 px-6 py-5 space-y-3" style={{ background: 'white' }}>
                          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Pay this invoice</p>

                          {/* Bank transfer */}
                          <div className="border border-slate-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                              <span className="text-base">🏦</span> Pay by bank transfer
                            </p>
                            <div className="space-y-1.5 text-xs text-slate-600">
                              <div className="flex justify-between">
                                <span className="text-slate-400">PayID</span>
                                <code className="font-mono text-slate-700">{inv.payee.payId}</code>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">BSB</span>
                                <code className="font-mono text-slate-700">{inv.payee.bsb}</code>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Account</span>
                                <code className="font-mono text-slate-700">{inv.payee.account}</code>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Reference</span>
                                <code className="font-mono text-slate-700">{inv.invoiceNumber}</code>
                              </div>
                            </div>
                          </div>

                          {/* Card CTA — acquisition hook */}
                          <button
                            onClick={() => navigate('/pay/inv-001')}
                            className="w-full rounded-lg py-3.5 px-4 text-sm font-semibold text-white flex items-center justify-between group hover:opacity-95 active:scale-[0.99] transition-all shadow-md"
                            style={{ background: '#1A56DB' }}
                          >
                            <span>Pay by card — earn rewards</span>
                            <span className="text-blue-200 group-hover:translate-x-0.5 transition-transform">→</span>
                          </button>
                          <p className="text-xs text-slate-400 text-center">Visa · Mastercard · Amex · PayID accepted</p>
                        </div>

                        {/* Trust footer */}
                        <div className="rounded-b-xl px-6 py-4 flex items-center justify-center gap-3" style={{ background: '#F8FAFF', borderTop: '1px solid #E2E8F0', borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 1L2 3v4c0 2.2 1.7 3.8 4 4 2.3-.2 4-1.8 4-4V3L6 1Z" fill="#16A34A" opacity="0.3" stroke="#16A34A" strokeWidth="1"/>
                            <path d="M4 6l1.5 1.5L8 4.5" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className="text-xs text-slate-400">
                            Powered by <strong className="text-slate-500">pay.com.au</strong> · Secure payments · ABN {inv.payee.abn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
