import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../components/AppShell'
import FutureStateToggle from '../components/FutureStateToggle'
import { INVOICES_DATA } from '../mockData'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 }).format(n)

const fmtDate = (iso) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [y, m, d] = iso.split('-')
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`
}

export default function InvoiceSent() {
  const { id } = useParams()
  const [futureState, setFutureState] = useState('current')
  const [trackingEnabled, setTrackingEnabled] = useState(false)

  const fromStorage = (() => {
    try { return JSON.parse(sessionStorage.getItem('draftInvoice')) } catch { return null }
  })()

  const invoice = fromStorage || INVOICES_DATA.find(i => i.id === id) || INVOICES_DATA[1]
  const prpPoints = Math.round(invoice.total)

  return (
    <AppShell>
      <div style={{ padding: '64px 32px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: 560, width: '100%' }}>
          {/* Success icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: '#F0FDF4',
              border: '2px solid #BBF7D0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1E293B', margin: '0 0 8px' }}>Invoice sent!</h1>
            <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
              {invoice.number} has been sent to{' '}
              <span style={{ color: '#1E293B', fontWeight: 500 }}>{invoice.customer?.email || invoice.customer?.name}</span>
            </p>
          </div>

          {/* Invoice summary card */}
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Invoice number</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1E293B' }}>{invoice.number}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Amount due</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1A56DB' }}>{fmt(invoice.total)}</div>
              </div>
            </div>

            {[
              ['Billed to', invoice.customer?.name],
              ['Due date', fmtDate(invoice.dueDate)],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #F1F5F9', fontSize: 13 }}>
                <span style={{ color: '#64748B' }}>{label}</span>
                <span style={{ color: '#1E293B', fontWeight: 500 }}>{value}</span>
              </div>
            ))}

            {/* PRP callout */}
            <div style={{ marginTop: 16, padding: '12px 14px', background: 'linear-gradient(135deg, #EEF4FF, #F0F0FF)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>💎</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1A56DB', marginBottom: 2 }}>
                  Earn ~{prpPoints.toLocaleString()} PayRewards Points
                </div>
                <div style={{ fontSize: 11, color: '#64748B' }}>
                  Credited when {invoice.customer?.name?.split(' ')[0]} pays this invoice
                </div>
              </div>
            </div>
          </div>

          {/* Future state: view tracking */}
          {futureState === 'future' && (
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 4 }}>Track when this invoice is opened</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>
                    Get notified when {invoice.customer?.name?.split(' ')[0]} views this invoice
                  </div>
                </div>
                <button
                  onClick={() => setTrackingEnabled(t => !t)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    background: trackingEnabled ? '#1A56DB' : '#E2E8F0',
                    position: 'relative',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute',
                    top: 3,
                    left: trackingEnabled ? 23 : 3,
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  }} />
                </button>
              </div>
              {trackingEnabled && (
                <div style={{ marginTop: 12, padding: '8px 12px', background: '#F0FDF4', borderRadius: 6, fontSize: 12, color: '#16A34A' }}>
                  ✓ You'll get an email when {invoice.customer?.name?.split(' ')[0]} opens this invoice
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              to={`/account/invoices/${id === 'inv-new' ? 'inv-002' : id}`}
              style={{
                flex: 1,
                padding: '12px',
                background: '#1A56DB',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              View invoice
            </Link>
            <Link
              to="/account/invoices/new"
              style={{
                flex: 1,
                padding: '12px',
                background: '#fff',
                color: '#64748B',
                border: '1px solid #E2E8F0',
                borderRadius: 8,
                fontSize: 14,
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Create another
            </Link>
          </div>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link to="/account/invoices" style={{ fontSize: 13, color: '#94A3B8', textDecoration: 'none' }}>
              ← Back to all invoices
            </Link>
          </div>
        </div>
      </div>
      <FutureStateToggle state={futureState} onChange={setFutureState} />
    </AppShell>
  )
}
