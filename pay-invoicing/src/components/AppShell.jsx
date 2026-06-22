import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: '/account/dashboard',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    label: 'Make a payment',
    path: '/account/payments/new',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
  },
  {
    label: 'Get paid',
    path: '/account/invoices',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    label: 'Payments',
    path: '/account/payments',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  },
  {
    label: 'Payees',
    path: '/account/payees',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  },
  {
    label: 'Wallet',
    path: '/account/wallet',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V22H4a2 2 0 01-2-2V6a2 2 0 012-2h16v4"/><path d="M20 12a2 2 0 000-4h-4a2 2 0 000 4h4z"/></svg>,
  },
  {
    label: 'Settings',
    path: '/account/settings',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  },
  {
    label: 'Activity log',
    path: '/account/activity',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
]

export default function AppShell({ children }) {
  const location = useLocation()

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          width: 220,
          minWidth: 220,
          background: '#1E1E3F',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '20px 16px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#1A56DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
              letterSpacing: 0.5,
            }}
          >
            AC
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: '#F1F5F9', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Acme Consulting
            </div>
            <div style={{ color: '#64748B', fontSize: 11, marginTop: 1 }}>Business</div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '0 16px 8px' }} />

        <nav style={{ flex: 1, padding: '4px 8px', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => {
            const active = location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 10px',
                  paddingLeft: active ? 7 : 10,
                  borderLeft: `3px solid ${active ? '#1A56DB' : 'transparent'}`,
                  borderRadius: '0 6px 6px 0',
                  marginBottom: 2,
                  textDecoration: 'none',
                  color: active ? '#93C5FD' : '#94A3B8',
                  background: active ? 'rgba(147,197,253,0.08)' : 'transparent',
                  fontSize: 13,
                  fontWeight: active ? 500 : 400,
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ color: '#334155', fontSize: 10, fontWeight: 500, letterSpacing: 0.8, textTransform: 'uppercase' }}>
            Powered by
          </div>
          <div style={{ color: '#475569', fontSize: 12, fontWeight: 700, marginTop: 1 }}>pay.com.au</div>
        </div>
      </div>

      <div style={{ flex: 1, background: '#fff', overflowY: 'auto', minWidth: 0 }}>
        {children}
      </div>
    </div>
  )
}
