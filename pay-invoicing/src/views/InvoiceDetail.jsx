import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../components/AppShell'
import FutureStateToggle from '../components/FutureStateToggle'
import { INVOICES_DATA, PAYEE } from '../mockData'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 }).format(n)

const fmtDate = (iso) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [y, m, d] = iso.split('-')
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`
}

const STATUS = {
  paid:    { label: 'Paid',    bg: '#F0FDF4', color: '#16A34A' },
  sent:    { label: 'Sent',    bg: '#EEF4FF', color: '#1A56DB' },
  overdue: { label: 'Overdue', bg: '#FEF2F2', color: '#DC2626' },
  draft:   { label: 'Draft',   bg: '#F1F5F9', color: '#64748B' },
}

const copyToClipboard = (text) => navigator.clipboard.writeText(text)

export default function InvoiceDetail() {
  const { id } = useParams()
  const [futureState, setFutureState] = useState('current')
  const [copied, setCopied] = useState(null)

  const invoice = INVOICES_DATA.find(i => i.id === id)

  const handleCopy = (label, value) => {
    copyToClipboard(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  if (!invoice) {
    return (
      <AppShell>
        <div style={{ padding: 32, color: '#64748B', fontSize: 14 }}>
          Invoice not found. <Link to="/account/invoices" style={{ color: '#1A56DB' }}>← Back to invoices</Link>
        </div>
      </AppShell>
    )
  }

  const s = STATUS[invoice.status]

  const timelineSteps = [
    { label: 'Created', date: fmtDate(invoice.issueDate), done: true },
    {
      label: 'Sent',
      date: invoice.status !== 'draft' ? fmtDate(invoice.issueDate) : null,
      done: invoice.status !== 'draft',
    },
    {
      label: invoice.status === 'overdue' ? 'Overdue' : 'Paid',
      date: invoice.status === 'paid' ? fmtDate(invoice.paidDate) : invoice.status === 'overdue' ? `Due ${fmtDate(invoice.dueDate)}` : null,
      done: invoice.status === 'paid',
      overdue: invoice.status === 'overdue',
    },
  ]

  return (
    <AppShell>
      <div style={{ padding: '32px 32px 80px' }}>
        {/* Breadcrumb + header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>
            <Link to="/account/invoices" style={{ color: '#1A56DB', textDecoration: 'none' }}>Invoices</Link>
            {' / '}{invoice.number}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1E293B', margin: 0 }}>{invoice.number}</h1>
            <span style={{ padding: '4px 12px', borderRadius: 12, fontSize: 13, fontWeight: 500, background: s.bg, color: s.color }}>
              {s.label}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {/* Left: invoice document */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
              {/* Invoice header */}
              <div style={{ background: '#1E293B', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Tax Invoice</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{invoice.number}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{fmt(invoice.total)}</div>
                  <div style={{ fontSize: 12, color: invoice.status === 'overdue' ? '#FCA5A5' : '#94A3B8', marginTop: 2 }}>
                    {invoice.status === 'paid' ? `Paid ${fmtDate(invoice.paidDate)}` : `Due ${fmtDate(invoice.dueDate)}`}
                  </div>
                </div>
              </div>

              {/* From / To */}
              <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, borderBottom: '1px solid #E2E8F0' }}>
                {[
                  { label: 'From', name: PAYEE.name, abn: PAYEE.abn, email: PAYEE.email },
                  { label: 'To', name: invoice.customer.name, abn: invoice.customer.abn, email: invoice.customer.email },
                ].map(party => (
                  <div key={party.label}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{party.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', marginBottom: 4 }}>{party.name}</div>
                    {party.abn && <div style={{ fontSize: 12, color: '#64748B' }}>ABN {party.abn}</div>}
                    {party.email && <div style={{ fontSize: 12, color: '#64748B' }}>{party.email}</div>}
                  </div>
                ))}
              </div>

              {/* Meta */}
              <div style={{ padding: '16px 28px', display: 'flex', gap: 32, borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                {[['Issue date', fmtDate(invoice.issueDate)], ['Due date', fmtDate(invoice.dueDate)], ['Invoice #', invoice.number]].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 13, color: '#1E293B', fontWeight: 500 }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Line items */}
              <div style={{ padding: '20px 28px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      {[['Description', 'left'], ['Qty', 'right'], ['Rate', 'right'], ['GST', 'right'], ['Amount', 'right']].map(([h, align]) => (
                        <th key={h} style={{ padding: '6px 8px', paddingLeft: h === 'Description' ? 0 : 8, textAlign: align, fontSize: 11, fontWeight: 500, color: '#94A3B8', paddingBottom: 10 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.lineItems.map((item, i) => {
                      const amount = item.quantity * item.rate
                      return (
                        <tr key={item.id} style={{ borderBottom: i < invoice.lineItems.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                          <td style={{ padding: '10px 8px 10px 0', fontSize: 13, color: '#1E293B' }}>{item.description}</td>
                          <td style={{ padding: '10px 8px', fontSize: 13, color: '#64748B', textAlign: 'right' }}>{item.quantity}</td>
                          <td style={{ padding: '10px 8px', fontSize: 13, color: '#64748B', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt(item.rate)}</td>
                          <td style={{ padding: '10px 8px', fontSize: 12, color: '#64748B', textAlign: 'right' }}>{item.gst ? '10%' : '—'}</td>
                          <td style={{ padding: '10px 8px', fontSize: 13, fontWeight: 500, color: '#1E293B', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt(amount)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                {/* Totals */}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #E2E8F0' }}>
                  {[['Subtotal', fmt(invoice.subtotal)], ['GST (10%)', fmt(invoice.gst)]].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'flex-end', gap: 48, padding: '4px 8px', fontSize: 13, color: '#64748B' }}>
                      <span>{label}</span>
                      <span style={{ minWidth: 100, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 48, padding: '10px 8px 0', marginTop: 8, borderTop: '1px solid #E2E8F0', fontSize: 15, fontWeight: 700, color: '#1E293B' }}>
                    <span>Total</span>
                    <span style={{ minWidth: 100, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt(invoice.total)}</span>
                  </div>
                </div>

                {invoice.notes && (
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Notes</div>
                    <div style={{ fontSize: 13, color: '#64748B' }}>{invoice.notes}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Payment details */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 14 }}>Payment details</div>
              {[['PayID', PAYEE.payId], ['BSB', PAYEE.bsb], ['Account', PAYEE.account], ['Reference', invoice.number]].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, color: '#1E293B', fontFamily: 'monospace' }}>{value}</span>
                    <button
                      onClick={() => handleCopy(label, value)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied === label ? '#16A34A' : '#94A3B8', fontSize: 11, padding: 2 }}
                    >
                      {copied === label ? '✓' : '⎘'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Status timeline */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 16 }}>Timeline</div>
              {timelineSteps.map((step, i) => (
                <div key={step.label} style={{ display: 'flex', gap: 12, marginBottom: i < timelineSteps.length - 1 ? 0 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: step.done ? '#16A34A' : step.overdue ? '#DC2626' : '#E2E8F0',
                      border: `2px solid ${step.done ? '#16A34A' : step.overdue ? '#DC2626' : '#E2E8F0'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {step.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    {i < timelineSteps.length - 1 && (
                      <div style={{ width: 2, height: 28, background: step.done ? '#16A34A' : '#E2E8F0', margin: '2px 0' }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < timelineSteps.length - 1 ? 0 : 0, paddingTop: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: step.overdue ? '#DC2626' : step.done ? '#1E293B' : '#94A3B8', marginBottom: 2 }}>
                      {step.label}
                    </div>
                    {step.date && <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 12 }}>{step.date}</div>}
                    {!step.date && <div style={{ marginBottom: 12 }} />}
                  </div>
                </div>
              ))}
            </div>

            {/* Future state: reconciliation */}
            {futureState === 'future' && invoice.status === 'paid' && (
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#15803D', marginBottom: 10 }}>✓ Payment matched</div>
                <div style={{ fontSize: 12, color: '#16A34A', marginBottom: 8 }}>
                  Matched to incoming payment on {fmtDate(invoice.paidDate)}
                </div>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  Ref: {invoice.paymentRef} · via {invoice.paymentMethod}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {invoice.status === 'sent' && (
                <button style={{ width: '100%', padding: '10px', background: '#1A56DB', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                  Send reminder
                </button>
              )}
              {invoice.status === 'overdue' && (
                <button style={{ width: '100%', padding: '10px', background: '#DC2626', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                  Send overdue reminder
                </button>
              )}
              {invoice.status !== 'paid' && (
                <button style={{ width: '100%', padding: '10px', background: '#fff', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                  Mark as paid
                </button>
              )}
              <button style={{ width: '100%', padding: '10px', background: '#fff', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      <FutureStateToggle state={futureState} onChange={setFutureState} />
    </AppShell>
  )
}
