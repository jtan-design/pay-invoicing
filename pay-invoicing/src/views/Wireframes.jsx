import { useNavigate } from 'react-router-dom'

function Section({ title, color = '#1A56DB', children }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded-full" style={{ background: color }} />
        <h2 className="text-lg font-bold tracking-tight" style={{ color: '#1E293B' }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function AnnotationPill({ type, children }) {
  const styles = {
    research: { bg: '#EEF4FF', border: '#C7D7F5', color: '#1A56DB', label: 'Research Q' },
    decision: { bg: '#FFFBEB', border: '#FDE68A', color: '#92400E', label: 'Design decision' },
    signal: { bg: '#F0FDF4', border: '#86EFAC', color: '#15803D', label: 'Acquisition signal' },
    v1: { bg: '#FEF2F2', border: '#FCA5A5', color: '#991B1B', label: 'NOT V1' },
  }
  const s = styles[type]
  return (
    <div className="flex gap-2 items-start text-xs leading-relaxed px-3 py-2 rounded-lg border" style={{ background: s.bg, borderColor: s.border }}>
      <span className="font-semibold shrink-0 mt-0.5" style={{ color: s.color }}>[{s.label}]</span>
      <span style={{ color: s.color }}>{children}</span>
    </div>
  )
}

function WireBox({ h = 8, label, className = '', style = {} }) {
  return (
    <div
      className={`rounded flex items-center justify-center text-xs font-medium ${className}`}
      style={{ height: h * 4, background: '#E2E8F0', color: '#94A3B8', border: '1px dashed #CBD5E1', ...style }}
    >
      {label}
    </div>
  )
}

function WireScreen({ title, badge, link, linkLabel, annotations, children }) {
  const navigate = useNavigate()
  return (
    <div className="flex-1 min-w-0">
      {/* Screen label */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: '#1E293B' }}>{title}</span>
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#F1F5F9', color: '#64748B' }}>
              {badge}
            </span>
          )}
        </div>
        {link && (
          <button
            onClick={() => navigate(link)}
            className="text-xs font-medium hover:underline"
            style={{ color: '#1A56DB' }}
          >
            {linkLabel || 'View in prototype →'}
          </button>
        )}
      </div>

      {/* Wireframe box */}
      <div className="rounded-xl border-2 p-3 mb-3 overflow-hidden" style={{ borderColor: '#CBD5E1', background: '#F8FAFC' }}>
        {children}
      </div>

      {/* Annotations */}
      {annotations && (
        <div className="space-y-1.5">
          {annotations.map((a, i) => (
            <AnnotationPill key={i} type={a.type}>{a.text}</AnnotationPill>
          ))}
        </div>
      )}
    </div>
  )
}

function AcquisitionLoop() {
  const steps = [
    { n: 1, label: 'Payee creates invoice', sub: 'in Pay', color: '#1A56DB', bg: '#EEF4FF' },
    { n: 2, label: 'Invoice email lands', sub: "payer's inbox", color: '#7C3AED', bg: '#F5F3FF' },
    { n: 3, label: 'Hosted payment page', sub: 'highest-intent moment', color: '#0891B2', bg: '#ECFEFF' },
    { n: 4, label: 'Sign-up CTA shown', sub: 'post-payment only', color: '#059669', bg: '#ECFDF5' },
    { n: 5, label: 'New Pay customer', sub: '≈ zero acq. cost', color: '#D97706', bg: '#FFFBEB' },
  ]
  return (
    <div className="rounded-2xl border p-6 mb-10" style={{ background: 'white', borderColor: '#E2E8F0' }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#94A3B8' }}>The 5-step acquisition loop</p>
      <div className="flex items-center gap-0">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center flex-1">
            <div className="flex-1">
              <div className="rounded-xl px-3 py-3 text-center" style={{ background: s.bg }}>
                <div className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center mx-auto mb-1.5" style={{ background: s.color }}>
                  {s.n}
                </div>
                <p className="text-xs font-semibold leading-tight" style={{ color: s.color }}>{s.label}</p>
                <p className="text-xs mt-0.5 leading-tight" style={{ color: s.color, opacity: 0.7 }}>{s.sub}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="shrink-0 mx-1">
                <path d="M1 6h15M12 2l4 4-4 4" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Payee wireframes ─────────────────────────────────────────────────────────

function OverviewWireframe() {
  return (
    <WireScreen
      title="Get Paid — Overview"
      badge="NEW"
      annotations={[
        { type: 'research', text: 'Does the payee understand their "Get Paid" overview at a glance? Can they distinguish Pay-processed receipts from direct bank transfers?' },
        { type: 'decision', text: 'Summary tiles show lifetime received, payments this month, and pending invoices. Kept minimal so payees don\'t feel overwhelmed on first use.' },
        { type: 'signal', text: 'Quick-action "Create invoice" button is primary CTA — measures how many payees attempt invoice creation from day 0.' },
        { type: 'v1', text: 'Revenue chart / trend line. Pending invoice list (invoices not shipped yet).' },
      ]}
    >
      {/* Nav bar */}
      <div className="flex items-center gap-2 mb-2 pb-2 border-b" style={{ borderColor: '#E2E8F0' }}>
        <WireBox h={5} label="Pay logo" style={{ width: 60 }} />
        <div className="flex-1" />
        <WireBox h={5} label="Get Paid nav" style={{ width: 80 }} />
        <WireBox h={5} label="Settings" style={{ width: 60 }} />
      </div>
      {/* Hero stats */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {['Total received', 'This month', 'Customers'].map((l) => (
          <WireBox key={l} h={14} label={l} />
        ))}
      </div>
      {/* Quick actions */}
      <div className="flex gap-2 mb-2">
        <WireBox h={8} label="+ Create invoice (primary)" style={{ flex: 2, background: '#DBEAFE', borderColor: '#93C5FD', color: '#1A56DB' }} />
        <WireBox h={8} label="Send payment link" style={{ flex: 1 }} />
      </div>
      {/* Recent activity */}
      <WireBox h={6} label="Section: Recent activity" style={{ marginBottom: 6 }} />
      {[1, 2, 3].map((i) => (
        <WireBox key={i} h={7} label={`Activity row ${i}`} style={{ marginBottom: 4 }} />
      ))}
    </WireScreen>
  )
}

function InvoiceListWireframe() {
  return (
    <WireScreen
      title="Invoice List"
      badge="NEW"
      annotations={[
        { type: 'research', text: 'Do payees return to check invoice status? What status labels make sense — Sent, Viewed, Paid, Overdue?' },
        { type: 'research', text: 'Does the invoice number format (INV-0042) match payees\' existing systems, or do they need to customise it?' },
        { type: 'decision', text: 'Status chip colours: Paid = green, Overdue = red, Sent = blue, Draft = grey. "Viewed" intentionally omitted from V1 — adds complexity without clear payee value yet.' },
        { type: 'v1', text: 'Bulk actions, export to CSV, Xero sync status column.' },
      ]}
    >
      {/* Header */}
      <div className="flex gap-2 mb-2">
        <WireBox h={7} label="H1: Invoices" style={{ flex: 1 }} />
        <WireBox h={7} label="+ New invoice" style={{ width: 90, background: '#DBEAFE', borderColor: '#93C5FD', color: '#1A56DB' }} />
      </div>
      {/* Filters */}
      <div className="flex gap-2 mb-2">
        {['All', 'Paid', 'Sent', 'Overdue'].map((f) => (
          <WireBox key={f} h={6} label={f} style={{ width: 50 }} />
        ))}
        <div className="flex-1" />
        <WireBox h={6} label="Search" style={{ width: 80 }} />
      </div>
      {/* Table header */}
      <WireBox h={6} label="Table headers: #  Customer  Amount  Status  Date  Due" style={{ marginBottom: 4, background: '#F1F5F9' }} />
      {/* Rows */}
      {[
        { label: 'INV-0042 · Acme Constructions · $5,500 · Sent', status: '#DBEAFE' },
        { label: 'INV-0041 · Blue Sky Design · $1,200 · Paid', status: '#DCFCE7' },
        { label: 'INV-0040 · Northside Plumbing · $800 · Overdue', status: '#FEE2E2' },
      ].map((r, i) => (
        <WireBox key={i} h={7} label={r.label} style={{ marginBottom: 4, background: r.status, borderColor: 'transparent' }} />
      ))}
    </WireScreen>
  )
}

function InvoiceCreationWireframe() {
  const navigate = useNavigate()
  return (
    <WireScreen
      title="Invoice Creation"
      badge="EXISTS"
      link="/invoices/new"
      annotations={[
        { type: 'research', text: 'Do payees understand that payment details are pre-attached? Do they trust the pre-filled BSB/PayID?' },
        { type: 'research', text: 'Is the GST checkbox per line item the right interaction, or do payees expect a single GST toggle at invoice level?' },
        { type: 'decision', text: 'Payment details sidebar is read-only with green "pre-attached" badge. Payees can\'t change it — framing is "Pay handles delivery" not "you configure this."' },
        { type: 'signal', text: 'Tracks whether payee completes or abandons invoice creation, and which action they choose: Send vs Preview payer view.' },
      ]}
    >
      <div className="flex gap-2">
        {/* Left form */}
        <div style={{ flex: 2 }} className="space-y-2">
          <WireBox h={6} label="Customer combobox" />
          <div className="flex gap-2">
            <WireBox h={6} label="Invoice #" style={{ flex: 1 }} />
            <WireBox h={6} label="Date" style={{ flex: 1 }} />
            <WireBox h={6} label="Due" style={{ flex: 1 }} />
          </div>
          <WireBox h={6} label="Line items table header" style={{ background: '#F1F5F9' }} />
          {[1, 2].map((i) => <WireBox key={i} h={7} label={`Line item ${i} · qty · rate · GST ☑`} />)}
          <WireBox h={6} label="+ Add line item" style={{ borderStyle: 'dashed' }} />
          <WireBox h={8} label="Subtotal / GST / Total" style={{ background: '#F8FAFC' }} />
        </div>
        {/* Right sidebar */}
        <div style={{ flex: 1 }} className="space-y-2">
          <WireBox h={16} label="Payment details (pre-attached) ✓" style={{ background: '#F0FDF4', borderColor: '#86EFAC', color: '#15803D' }} />
          <WireBox h={10} label="PRP earnings preview" style={{ background: '#DBEAFE', borderColor: '#93C5FD', color: '#1A56DB' }} />
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <WireBox h={8} label="Send invoice →" style={{ flex: 1, background: '#DBEAFE', borderColor: '#93C5FD', color: '#1A56DB' }} />
        <WireBox h={8} label="Preview payer view" style={{ flex: 1 }} />
      </div>
    </WireScreen>
  )
}

// ─── Payer / acquisition wireframes ───────────────────────────────────────────

function InvoiceEmailWireframe() {
  return (
    <WireScreen
      title="Invoice Email"
      badge="EXISTS"
      link="/preview/invoice-email"
      annotations={[
        { type: 'research', text: 'Does the payer trust an email from a business using "Pay" branding? Do they understand who sent the invoice?' },
        { type: 'research', text: 'Does showing bank details inline (vs click to reveal) increase BSB/PayID payment completion, or does it distract from the card CTA?' },
        { type: 'decision', text: 'Payee name leads in email subject and body; Pay logo is secondary. Framing: "invoice from [Payee]", not "Pay invoice."' },
        { type: 'signal', text: '"Pay by card — earn rewards" CTA click is the primary acquisition funnel entry signal. Track click-through rate from email to HPP.' },
      ]}
    >
      {/* Browser chrome */}
      <div className="rounded-t-lg flex items-center gap-1.5 px-3 py-2 mb-0" style={{ background: '#E2E8F0' }}>
        {['#F87171','#FBBF24','#34D399'].map((c) => (
          <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
        <WireBox h={5} label="Gmail chrome" style={{ flex: 1, marginLeft: 6 }} />
      </div>
      <div className="border-x border-b rounded-b-lg p-3 space-y-2" style={{ borderColor: '#CBD5E1' }}>
        <WireBox h={6} label="Email from: Acme Consulting (via Pay)" />
        <WireBox h={6} label="Subject: Invoice INV-0042 — $5,500 from Acme Consulting" />
        <div className="border rounded-lg p-2 space-y-1.5" style={{ borderColor: '#E2E8F0', background: 'white' }}>
          <WireBox h={6} label="Payee logo + name" />
          <WireBox h={8} label="Invoice summary: $5,500 · Due 17 Jun 2026" />
          <WireBox h={10} label="Bank transfer details (BSB / PayID inline)" />
          <WireBox h={10} label="Pay by card — earn rewards →" style={{ background: '#DBEAFE', borderColor: '#93C5FD', color: '#1A56DB' }} />
          <WireBox h={6} label="Trust footer: ABN · Powered by Pay" />
        </div>
      </div>
    </WireScreen>
  )
}

function HostedPaymentWireframe() {
  return (
    <WireScreen
      title="Hosted Payment Page"
      badge="EXISTS"
      link="/pay/inv-001"
      annotations={[
        { type: 'research', text: 'Does the payer understand the 1.8% card fee before entering card details? Does the fee disclosure cause abandonment?' },
        { type: 'research', text: 'Does showing PRP earning potential on the card tab ("earn 5,000 PayRewards Points") meaningfully increase card selection over bank transfer?' },
        { type: 'decision', text: 'Card and bank tabs are peer options — no default selected. Forces active choice, surfaces both paths. Card tab shows earn callout above card fields.' },
        { type: 'signal', text: 'This is the highest-intent moment. Tab selection (card vs bank) and payment completion are the key acquisition and conversion metrics.' },
        { type: 'v1', text: 'BPAY, PayPal, Apple Pay / Google Pay.' },
      ]}
    >
      <div className="flex gap-2">
        <div style={{ flex: 2 }} className="space-y-2">
          <WireBox h={7} label="Invoice header: Acme Consulting · INV-0042" />
          <div className="flex gap-0 border rounded overflow-hidden" style={{ borderColor: '#CBD5E1' }}>
            <WireBox h={7} label="Card (earn rewards)" style={{ flex: 1, borderRadius: 0, border: 'none', background: '#DBEAFE', color: '#1A56DB' }} />
            <WireBox h={7} label="Bank transfer" style={{ flex: 1, borderRadius: 0, border: 'none' }} />
          </div>
          <WireBox h={8} label="PRP earn callout (card tab)" style={{ background: '#EEF4FF', borderColor: '#C7D7F5', color: '#1A56DB' }} />
          <WireBox h={7} label="Card number" />
          <div className="flex gap-2">
            <WireBox h={7} label="Expiry" style={{ flex: 1 }} />
            <WireBox h={7} label="CVC" style={{ flex: 1 }} />
          </div>
          <WireBox h={6} label="1.8% fee disclosure" style={{ background: '#FFFBEB', borderColor: '#FDE68A', color: '#92400E' }} />
          <WireBox h={10} label="Confirm payment →" style={{ background: '#DBEAFE', borderColor: '#93C5FD', color: '#1A56DB' }} />
        </div>
        <div style={{ flex: 1 }} className="space-y-2">
          <WireBox h={20} label="Order summary sidebar" style={{ background: '#F8FAFC' }} />
          <WireBox h={10} label='"New to Pay?" value prop strip' style={{ background: '#EEF4FF', borderColor: '#C7D7F5', color: '#1A56DB' }} />
        </div>
      </div>
    </WireScreen>
  )
}

function PostPaymentWireframe() {
  return (
    <WireScreen
      title="Post-payment Confirmation + Sign-up CTA"
      badge="EXISTS"
      link="/pay/inv-001/confirmed"
      annotations={[
        { type: 'research', text: 'Does the payer read the sign-up CTA after payment? Does "you just paid [Payee]" framing create enough context to motivate sign-up?' },
        { type: 'decision', text: 'CTA appears ONLY post-payment, never blocking. "Not now" dismisses persistently. Framing: earn on YOUR bills, not "sign up for Pay."' },
        { type: 'signal', text: '"Create a free Pay account" click is the acquisition conversion event. This is step 5 of the loop — near-zero cost customer acquisition.' },
      ]}
    >
      <div className="space-y-2">
        <div className="flex flex-col items-center py-4 border rounded-xl space-y-2" style={{ borderColor: '#E2E8F0', background: 'white' }}>
          <WireBox h={12} label="✓ Payment confirmed" style={{ width: '80%', background: '#DCFCE7', borderColor: '#86EFAC', color: '#15803D' }} />
          <WireBox h={8} label="Payment details: $5,500 · 10 Jun 2026 · Ref: INV-0042" style={{ width: '80%' }} />
        </div>
        <div className="rounded-xl border-2 p-3 space-y-2" style={{ borderColor: '#C7D7F5', background: '#EEF4FF' }}>
          <WireBox h={6} label="You just paid Acme Consulting. Earn on your own bills." style={{ background: 'transparent', border: 'none', color: '#1E293B' }} />
          <WireBox h={10} label="Create a free Pay account →" style={{ background: '#1A56DB', borderColor: '#1A56DB', color: 'white' }} />
          <WireBox h={6} label='"Not now" dismiss link' style={{ background: 'transparent', border: 'none', color: '#64748B' }} />
        </div>
        <WireBox h={7} label="Payee PRP earnings (contextual, small)" style={{ background: '#F8FAFC' }} />
      </div>
    </WireScreen>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Wireframes() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: '#F1F5F9' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b px-8 py-3 flex items-center gap-3" style={{ background: 'white', borderColor: '#E2E8F0' }}>
        <button
          onClick={() => navigate('/customers')}
          className="text-sm flex items-center gap-1.5 hover:opacity-75 transition-opacity"
          style={{ color: '#64748B' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Prototype
        </button>
        <span style={{ color: '#CBD5E1' }}>/</span>
        <span className="text-sm font-semibold" style={{ color: '#1E293B' }}>Invoicing Wireframes</span>
        <div className="flex-1" />
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded inline-block" style={{ background: '#EEF4FF', border: '1px solid #C7D7F5' }} /> Research Q</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded inline-block" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }} /> Design decision</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded inline-block" style={{ background: '#F0FDF4', border: '1px solid #86EFAC' }} /> Acquisition signal</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded inline-block" style={{ background: '#FEF2F2', border: '1px solid #FCA5A5' }} /> NOT V1</span>
        </div>
      </div>

      <div className="px-8 py-8 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>Get Paid · Invoicing · Discovery wireframes</div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#1E293B' }}>Receivables — Annotated wireframes</h1>
          <div className="rounded-xl border p-5 space-y-3" style={{ background: 'white', borderColor: '#E2E8F0' }}>
            <div className="flex items-start gap-3">
              <div className="w-1 h-4 rounded-full shrink-0 mt-0.5" style={{ background: '#1A56DB' }} />
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: '#1E293B' }}>North star (FY27)</p>
                <p className="text-sm" style={{ color: '#475569' }}>
                  Payers acquisition. If payers don't convert, the metric doesn't move regardless of payee adoption.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-4 rounded-full shrink-0 mt-0.5" style={{ background: '#7C3AED' }} />
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: '#1E293B' }}>Hypotheses</p>
                <p className="text-sm" style={{ color: '#475569' }}>
                  H1: ≥10% of Get Paid customers create at least 1 invoice in Pay within 30 days of launch.
                  &nbsp;·&nbsp;
                  H2: ≥60% of those invoices are paid via Pay (not direct bank transfer).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-4 rounded-full shrink-0 mt-0.5" style={{ background: '#D97706' }} />
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: '#1E293B' }}>Core problem</p>
                <p className="text-sm" style={{ color: '#475569' }}>
                  Pay is a manual step today — payees copy-paste BSB/PayID onto every invoice. 17% of surveyed users said "send directly from Pay" is their #1 need. Reconciliation (Xero sync) was #1 at 33%, but is out of scope for V1.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Acquisition loop */}
        <AcquisitionLoop />

        {/* Payee section */}
        <Section title="Payee flow — Get Paid screens" color="#1A56DB">
          <div className="flex gap-6 items-start">
            <OverviewWireframe />
            <div className="flex flex-col items-center justify-center pt-16 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 6l6 6-6 6" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <InvoiceListWireframe />
            <div className="flex flex-col items-center justify-center pt-16 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 6l6 6-6 6" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <InvoiceCreationWireframe />
          </div>
        </Section>

        {/* Payer section */}
        <Section title="Payer / acquisition funnel — external screens" color="#7C3AED">
          <div className="mb-3 px-3 py-2 rounded-lg text-xs inline-flex items-center gap-2" style={{ background: '#F5F3FF', color: '#7C3AED', border: '1px solid #DDD6FE' }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1"/>
              <path d="M6.5 5.5v4M6.5 4.5v-.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            These screens are publicly accessible (no login). The payer may never have heard of Pay before clicking the invoice email.
          </div>
          <div className="flex gap-6 items-start">
            <InvoiceEmailWireframe />
            <div className="flex flex-col items-center justify-center pt-16 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 6l6 6-6 6" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <HostedPaymentWireframe />
            <div className="flex flex-col items-center justify-center pt-16 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 6l6 6-6 6" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <PostPaymentWireframe />
          </div>
        </Section>

        {/* Research questions summary */}
        <Section title="Research questions by area" color="#0891B2">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                area: 'Payee workflow adoption',
                color: '#1A56DB',
                bg: '#EEF4FF',
                questions: [
                  'Does the payee understand that payment details are pre-attached to every invoice?',
                  'Can payees complete invoice creation without help (no tooltips / guidance needed)?',
                  'Do payees return to view invoice status after sending?',
                  'Does the GST-per-line-item interaction match their mental model?',
                ],
              },
              {
                area: 'Payer experience & trust',
                color: '#7C3AED',
                bg: '#F5F3FF',
                questions: [
                  'Does the payer trust an invoice email that arrives from a business but uses "Pay" branding?',
                  'Does the 1.8% card fee disclosure cause meaningful abandonment?',
                  'Does the PRP earn callout influence tab selection (card vs bank)?',
                  'Does the post-payment CTA feel intrusive or natural?',
                ],
              },
              {
                area: 'Reconciliation confidence',
                color: '#059669',
                bg: '#ECFDF5',
                questions: [
                  'Does the payee know which invoices have been paid vs pending without Xero sync?',
                  'Is the invoice reference number (INV-0042) enough to reconcile manually in early V1?',
                  'Would the lack of Xero sync cause payees to abandon Pay invoicing for their existing tool?',
                ],
              },
            ].map((group) => (
              <div key={group.area} className="rounded-xl border p-4" style={{ background: group.bg, borderColor: group.bg === '#EEF4FF' ? '#C7D7F5' : group.bg === '#F5F3FF' ? '#DDD6FE' : '#86EFAC' }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: group.color }}>{group.area}</p>
                <ol className="space-y-2">
                  {group.questions.map((q, i) => (
                    <li key={i} className="text-xs leading-relaxed flex gap-2" style={{ color: group.color }}>
                      <span className="font-semibold shrink-0">Q{i + 1}.</span>
                      <span style={{ opacity: 0.85 }}>{q}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Section>

        {/* Out of scope */}
        <div className="rounded-2xl border p-6" style={{ background: 'white', borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full" style={{ background: '#EF4444' }} />
            <h2 className="text-base font-bold" style={{ color: '#1E293B' }}>Out of scope — V1</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { item: 'Xero / MYOB sync', reason: '#1 survey request (33%) — high value but high complexity. Slated for V2.' },
              { item: 'ABR lookup (auto-fill ABN details)', reason: 'Nice-to-have UX polish. Manual entry acceptable for V1.' },
              { item: 'Recurring invoices / schedules', reason: 'Niche use case for V1 cohort. Revisit based on retention data.' },
              { item: 'PDF download / print', reason: 'Payees can screenshot. Defer until reconciliation need is validated.' },
              { item: 'Invoice templates / branding', reason: 'Logo upload and colour customisation deferred. Default Pay template ships.' },
              { item: 'BPAY / PayPal / Apple Pay on HPP', reason: 'Card + bank covers the validated majority. Expand post-launch.' },
              { item: 'Bulk invoice send', reason: 'Single-invoice flow must be validated before bulk operations.' },
              { item: '"Viewed" status on invoice list', reason: 'Email open-tracking adds complexity without clear payee action value.' },
            ].map((row) => (
              <div key={row.item} className="flex items-start gap-2 px-3 py-2.5 rounded-lg" style={{ background: '#FEF2F2', border: '1px solid #FCA5A5' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="7" cy="7" r="5.5" stroke="#EF4444" strokeWidth="1"/>
                  <path d="M5 5l4 4M9 5L5 9" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#991B1B' }}>{row.item}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#B91C1C', opacity: 0.8 }}>{row.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-xs pb-8" style={{ color: '#94A3B8' }}>
          Receivables Discovery · pay.com.au · Get Paid invoicing · June 2026
        </div>
      </div>
    </div>
  )
}
