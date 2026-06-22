import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import FutureStateToggle from '../components/FutureStateToggle'
import { INVOICES_DATA } from '../mockData'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

const fmtDate = (iso) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [, m, d] = iso.split('-')
  return `${parseInt(d)} ${months[parseInt(m) - 1]}`
}

const STATUS = {
  paid:    { label: 'Paid',    bg: '#F0FDF4', color: '#16A34A' },
  sent:    { label: 'Sent',    bg: '#EEF4FF', color: '#1A56DB' },
  overdue: { label: 'Overdue', bg: '#FEF2F2', color: '#DC2626' },
  draft:   { label: 'Draft',   bg: '#F1F5F9', color: '#64748B' },
}

const TABS = ['all', 'draft', 'sent', 'paid', 'overdue']

export default function InvoiceList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [futureState, setFutureState] = useState('current')

  const counts = Object.fromEntries(
    TABS.map(t => [t, t === 'all' ? INVOICES_DATA.length : INVOICES_DATA.filter(i => i.status === t).length])
  )
  const invoices = filter === 'all' ? INVOICES_DATA : INVOICES_DATA.filter(i => i.status === filter)
  const outstanding = INVOICES_DATA.filter(i => i.status === 'sent').reduce((s, i) => s + i.total, 0)
  const overdueAmt = INVOICES_DATA.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0)
  const paidAmt = INVOICES_DATA.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0)

  return (
    <AppShell>
      <div style={{ padding: '32px 32px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Get paid</div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1E293B', margin: 0 }}>Invoices</h1>
          </div>
          <Link
            to="/account/invoices/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: '#1A56DB',
              color: '#fff',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            + New invoice
          </Link>
        </div>

        {/* Future state: insight banner */}
        {futureState === 'future' && (
          <div
            style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: 8,
              padding: '12px 16px',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span style={{ fontSize: 13, color: '#92400E', fontWeight: 500 }}>
                {counts.overdue} invoice{counts.overdue !== 1 ? 's are' : ' is'} overdue — {fmt(overdueAmt)} outstanding. Send a reminder?
              </span>
            </div>
            <button
              style={{
                padding: '6px 14px',
                background: '#D97706',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Send reminders
            </button>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Awaiting payment', value: fmt(outstanding), sub: `${counts.sent} invoice${counts.sent !== 1 ? 's' : ''}`, color: '#1A56DB' },
            { label: 'Overdue', value: fmt(overdueAmt), sub: `${counts.overdue} invoice${counts.overdue !== 1 ? 's' : ''}`, color: '#DC2626' },
            { label: 'Paid (all time)', value: fmt(paidAmt), sub: `${counts.paid} invoice${counts.paid !== 1 ? 's' : ''}`, color: '#16A34A' },
          ].map(stat => (
            <div
              key={stat.label}
              style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '16px 20px' }}
            >
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6 }}>{stat.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: stat.color, marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 0, borderBottom: '1px solid #E2E8F0' }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '8px 14px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: filter === tab ? 600 : 400,
                color: filter === tab ? '#1A56DB' : '#64748B',
                borderBottom: `2px solid ${filter === tab ? '#1A56DB' : 'transparent'}`,
                marginBottom: -1,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span
                style={{
                  background: filter === tab ? '#EEF4FF' : '#F1F5F9',
                  color: filter === tab ? '#1A56DB' : '#94A3B8',
                  borderRadius: 10,
                  padding: '1px 6px',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Invoice', 'Customer', 'Amount', 'Issued', 'Due', 'Status', ''].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: '10px 16px',
                      textAlign: h === 'Amount' ? 'right' : 'left',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#64748B',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => {
                const s = STATUS[inv.status]
                return (
                  <tr
                    key={inv.id}
                    onClick={() => navigate(`/account/invoices/${inv.id}`)}
                    style={{ borderBottom: i < invoices.length - 1 ? '1px solid #F1F5F9' : 'none', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 500, color: '#1E293B' }}>{inv.number}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#1E293B' }}>{inv.customer.name}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: '#1E293B', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                      {fmt(inv.total)}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#64748B' }}>{fmtDate(inv.issueDate)}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: inv.status === 'overdue' ? '#DC2626' : '#64748B', fontWeight: inv.status === 'overdue' ? 500 : 400 }}>
                      {fmtDate(inv.dueDate)}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500, background: s.bg, color: s.color }}>
                        {s.label}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <Link
                        to={`/account/invoices/${inv.id}`}
                        onClick={e => e.stopPropagation()}
                        style={{ fontSize: 12, color: '#1A56DB', textDecoration: 'none', fontWeight: 500 }}
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '48px 16px', textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>
                    No {filter !== 'all' ? filter : ''} invoices yet.{' '}
                    {filter === 'all' && <Link to="/account/invoices/new" style={{ color: '#1A56DB' }}>Create your first invoice →</Link>}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <FutureStateToggle state={futureState} onChange={setFutureState} />
    </AppShell>
  )
}
