import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import FutureStateToggle from '../components/FutureStateToggle'
import { CUSTOMERS_DATA, PAYEE, DEFAULT_LINE_ITEMS } from '../mockData'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 }).format(n)

const fmtDate = (iso) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [y, m, d] = iso.split('-')
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`
}

const addDays = (iso, days) => {
  const d = new Date(iso)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid #E2E8F0',
  borderRadius: 6,
  fontSize: 13,
  color: '#1E293B',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontWeight: 500,
  color: '#64748B',
  marginBottom: 4,
}

export default function InvoiceNew() {
  const navigate = useNavigate()
  const [customerId, setCustomerId] = useState(CUSTOMERS_DATA[0].id)
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-006')
  const issueDate = '2026-06-15'
  const [terms, setTerms] = useState(30)
  const [lineItems, setLineItems] = useState(
    DEFAULT_LINE_ITEMS.map((item, i) => ({ ...item, id: i + 1 }))
  )
  const [notes, setNotes] = useState('')
  const [futureState, setFutureState] = useState('current')

  const customer = CUSTOMERS_DATA.find(c => c.id === customerId) || CUSTOMERS_DATA[0]
  const dueDate = addDays(issueDate, terms)
  const subtotal = lineItems.reduce((s, i) => s + (Number(i.quantity) || 0) * (Number(i.rate) || 0), 0)
  const gstTotal = lineItems.reduce((s, i) => i.gst ? s + (Number(i.quantity) || 0) * (Number(i.rate) || 0) * 0.1 : s, 0)
  const total = subtotal + gstTotal
  const prpPoints = Math.round(total)

  const updateItem = (id, field, value) =>
    setLineItems(items => items.map(i => i.id === id ? { ...i, [field]: value } : i))

  const addItem = () =>
    setLineItems(items => [...items, { id: Date.now(), description: '', quantity: 1, rate: 0, gst: true }])

  const handleSend = () => {
    sessionStorage.setItem('draftInvoice', JSON.stringify({
      id: 'inv-new', number: invoiceNumber, customer, issueDate, dueDate,
      lineItems, subtotal, gst: gstTotal, total, notes, payee: PAYEE,
    }))
    navigate('/account/invoices/inv-new/sent')
  }

  return (
    <AppShell>
      <div style={{ padding: '32px 32px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>
            <Link to="/account/invoices" style={{ color: '#1A56DB', textDecoration: 'none' }}>Invoices</Link>
            {' / '}New invoice
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1E293B', margin: 0 }}>New Invoice</h1>
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {/* Left: form */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Bill to */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 14 }}>Bill to</div>
              <label style={labelStyle}>Customer</label>
              <select value={customerId} onChange={e => setCustomerId(e.target.value)} style={inputStyle}>
                {CUSTOMERS_DATA.filter(c => c.type !== 'aggregated').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {customer.email
                ? <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>{customer.email}</div>
                : <div style={{ fontSize: 12, color: '#D97706', marginTop: 6 }}>⚠ No email on file — add one to send this invoice</div>
              }
            </div>

            {/* Invoice details */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 14 }}>Invoice details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Invoice number</label>
                  <input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Issue date</label>
                  <input value={fmtDate(issueDate)} readOnly style={{ ...inputStyle, background: '#F8FAFC', color: '#64748B' }} />
                </div>
              </div>
              <label style={labelStyle}>Payment terms</label>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                {[7, 14, 30].map(d => (
                  <button
                    key={d}
                    onClick={() => setTerms(d)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 6,
                      border: `1px solid ${terms === d ? '#1A56DB' : '#E2E8F0'}`,
                      background: terms === d ? '#EEF4FF' : '#fff',
                      color: terms === d ? '#1A56DB' : '#64748B',
                      fontSize: 13,
                      cursor: 'pointer',
                      fontWeight: terms === d ? 500 : 400,
                    }}
                  >
                    {d} days
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 12, color: '#64748B' }}>
                Due: <span style={{ color: '#1E293B', fontWeight: 500 }}>{fmtDate(dueDate)}</span>
              </div>
            </div>

            {/* Future state: AI suggestions */}
            {futureState === 'future' && (
              <div style={{ background: 'linear-gradient(135deg, #EEF4FF, #F0F0FF)', border: '1px solid #C7D7FD', borderRadius: 10, padding: 16, display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 18 }}>✨</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1E293B', marginBottom: 4 }}>
                    Suggested items based on {customer.name.split(' ')[0]}'s history
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 10 }}>
                    Last invoice included: Strategy consulting, Workshop facilitation
                  </div>
                  <button style={{ padding: '5px 12px', background: '#1A56DB', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
                    Use these items
                  </button>
                </div>
              </div>
            )}

            {/* Line items */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 14 }}>Line items</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    {[['Description', 'left'], ['Qty', 'right'], ['Rate ($)', 'right'], ['GST', 'center'], ['Amount', 'right'], ['', '']].map(([h, align], i) => (
                      <th key={i} style={{ padding: '6px 8px', paddingLeft: i === 0 ? 0 : 8, textAlign: align, fontSize: 11, fontWeight: 500, color: '#94A3B8', paddingBottom: 10 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, i) => {
                    const amount = (Number(item.quantity) || 0) * (Number(item.rate) || 0)
                    return (
                      <tr key={item.id} style={{ borderBottom: i < lineItems.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                        <td style={{ padding: '8px 8px 8px 0' }}>
                          <input value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} placeholder="Item description" style={inputStyle} />
                        </td>
                        <td style={{ padding: '8px', width: 64 }}>
                          <input type="number" value={item.quantity} onChange={e => updateItem(item.id, 'quantity', e.target.value)} style={{ ...inputStyle, textAlign: 'right' }} />
                        </td>
                        <td style={{ padding: '8px', width: 96 }}>
                          <input type="number" value={item.rate} onChange={e => updateItem(item.id, 'rate', e.target.value)} style={{ ...inputStyle, textAlign: 'right' }} />
                        </td>
                        <td style={{ padding: '8px', textAlign: 'center', width: 40 }}>
                          <input type="checkbox" checked={item.gst} onChange={e => updateItem(item.id, 'gst', e.target.checked)} style={{ cursor: 'pointer', width: 14, height: 14, accentColor: '#1A56DB' }} />
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right', fontSize: 13, fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                          {fmt(amount)}
                        </td>
                        <td style={{ padding: '8px 0 8px 8px', width: 24 }}>
                          {lineItems.length > 1 && (
                            <button onClick={() => setLineItems(items => items.filter(i => i.id !== item.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: 18, padding: 0, lineHeight: 1 }}>×</button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <button onClick={addItem} style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#1A56DB', fontSize: 13, fontWeight: 500, padding: '4px 0' }}>
                + Add line item
              </button>
            </div>

            {/* Notes */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: 20 }}>
              <label style={{ ...labelStyle, fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 10 }}>Notes (optional)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Thank you for your business. Payment due within the agreed terms."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
              />
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Payment details */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>Payment details</div>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#16A34A', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '2px 8px' }}>
                  ✓ Pre-attached
                </span>
              </div>
              {[['PayID', PAYEE.payId], ['BSB', PAYEE.bsb], ['Account', PAYEE.account]].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{label}</span>
                  <span style={{ fontSize: 12, color: '#1E293B', fontFamily: 'monospace' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 14 }}>Summary</div>
              {[['Subtotal', fmt(subtotal)], ['GST (10%)', fmt(gstTotal)]].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13, color: '#64748B' }}>
                  <span>{label}</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', marginTop: 8, borderTop: '1px solid #E2E8F0', fontSize: 15, fontWeight: 700, color: '#1E293B' }}>
                <span>Total</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(total)}</span>
              </div>
              <div style={{ marginTop: 14, padding: '10px 12px', background: 'linear-gradient(135deg, #EEF4FF, #F0F0FF)', borderRadius: 8, fontSize: 12, color: '#1A56DB' }}>
                💎 ~{prpPoints.toLocaleString()} PayRewards Points when paid
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={handleSend}
                style={{ width: '100%', padding: '12px', background: '#1A56DB', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                Send invoice
              </button>
              <button
                style={{ width: '100%', padding: '10px', background: '#fff', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}
              >
                Save as draft
              </button>
            </div>
          </div>
        </div>
      </div>
      <FutureStateToggle state={futureState} onChange={setFutureState} />
    </AppShell>
  )
}
