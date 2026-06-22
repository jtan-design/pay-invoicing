import { NavLink, useNavigate } from 'react-router-dom'

/* TODO: Customer list nav placement TBD — may move to sit under
   Invoices once invoice flow is finalised. Keep as top-level tab for now. */

function PayLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#1A56DB' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 4h6a3 3 0 0 1 0 6H5v3H3V4Z" fill="white" />
          <path d="M5 6v2h4a1 1 0 0 0 0-2H5Z" fill="#1A56DB" />
        </svg>
      </div>
      <span className="font-bold text-lg tracking-tight" style={{ color: '#1E293B' }}>pay</span>
    </div>
  )
}

const NAV_ITEMS = [
  {
    label: 'Overview',
    path: '/overview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="9" y="9" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    label: 'Customers',
    path: '/customers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M1.5 13c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="12" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M14.5 12.5c0-2-1.2-3.2-2.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Payments',
    path: '/payments',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="4" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M1.5 7h13" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M4 10h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M8 1.5v1.2M8 13.3v1.2M13 8h1.2M1.5 8H2.7M11.4 4.6l.9-.9M3.7 11.3l.9-.9M11.4 11.4l.9.9M3.7 4.7l.9.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function GetPaidLayout({ children }) {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F1F5F9' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r flex flex-col" style={{ borderColor: '#E2E8F0' }}>
        {/* Logo */}
        <div className="px-5 py-4 border-b" style={{ borderColor: '#E2E8F0' }}>
          <PayLogo />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wider px-2 mb-2" style={{ color: '#94A3B8' }}>
            Get Paid
          </p>
          {NAV_ITEMS.map(({ label, path, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm mb-0.5 transition-all ${
                  isActive
                    ? 'font-medium'
                    : 'hover:bg-slate-50'
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { background: '#EEF4FF', color: '#1A56DB' }
                  : { color: '#64748B' }
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Prototype nav footer */}
        <div className="px-4 py-4 border-t space-y-1" style={{ borderColor: '#E2E8F0' }}>
          <p className="text-xs font-medium mb-2" style={{ color: '#94A3B8' }}>
            Prototype links
          </p>
          <button
            onClick={() => navigate('/invoices/new')}
            className="flex items-center gap-1.5 w-full text-left text-xs hover:opacity-80 transition-opacity"
            style={{ color: '#64748B' }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M5.5 2H10v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Invoice creation
          </button>
          <button
            onClick={() => navigate('/preview/invoice-email')}
            className="flex items-center gap-1.5 w-full text-left text-xs hover:opacity-80 transition-opacity"
            style={{ color: '#64748B' }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M5.5 2H10v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Invoice email
          </button>
          <button
            onClick={() => navigate('/wireframes')}
            className="flex items-center gap-1.5 w-full text-left text-xs hover:opacity-80 transition-opacity"
            style={{ color: '#1A56DB' }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M5.5 2H10v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Wireframes doc
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
