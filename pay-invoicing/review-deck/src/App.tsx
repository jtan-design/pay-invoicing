import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import loopFutureState from './assets/loop-future-state.png'

// ─── Types ──────────────────────────────────────────────────────────────────

type TabId = 'why' | 'loop' | 'scope' | 'prototypes' | 'invoice' | 'questions'

// ─── Design tokens ──────────────────────────────────────────────────────────

const BLUE = '#1A56DB'
const DARK = '#1E293B'
const MID = '#64748B'
const MUTED = '#94A3B8'
const BORDER = '#E2E8F0'
const BG = '#F8FAFC'
const GREEN = '#16A34A'
const AMBER = '#D97706'
const RED = '#DC2626'

const TABS: { id: TabId; label: string }[] = [
  { id: 'why', label: 'Why' },
  { id: 'loop', label: 'Loop' },
  { id: 'scope', label: 'Scope' },
  { id: 'invoice', label: 'Invoice' },
  { id: 'prototypes', label: 'Prototypes' },
  { id: 'questions', label: 'Q&A' },
]

// ─── Shared primitives ──────────────────────────────────────────────────────

const PayLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <svg width={28} height={28} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill={BLUE} />
      <text x="9" y="22" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="18" fill="white">P</text>
    </svg>
    <span style={{ fontWeight: 600, fontSize: 16, color: DARK, letterSpacing: '-0.3px' }}>
      pay.com.au
    </span>
  </div>
)

const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{
    background: 'white',
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    ...style,
  }}>
    {children}
  </div>
)

const Label = ({ children }: { children: ReactNode }) => (
  <div style={{
    fontSize: 11, fontWeight: 700, color: MUTED,
    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14,
  }}>
    {children}
  </div>
)

const Bullet = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
    <div style={{ width: 5, height: 5, borderRadius: '50%', background: BLUE, flexShrink: 0, marginTop: 7 }} />
    <div style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{children}</div>
  </div>
)

// ─── WHY TAB ────────────────────────────────────────────────────────────────

const WhyTab = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 40, maxWidth: 1100 }}>

    {/* Why we're here */}
    <Card>
      <Label>Why this session</Label>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: DARK, marginBottom: 14, lineHeight: 1.3 }}>
        Scope and direction — not a UI review
      </h2>
      <p style={{ fontSize: 13, color: MID, lineHeight: 1.75, marginBottom: 20 }}>
        We're here to answer one question:{' '}
        <strong style={{ color: DARK }}>is this scope defendable?</strong>{' '}
        What's in, what's out, and does the direction on the core functions make sense — before investing more time in fidelity.
      </p>

      <div style={{ fontWeight: 600, fontSize: 12, color: DARK, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Three things we need today
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        <Bullet><strong>Scope</strong> — push back on anything that feels wrong</Bullet>
        <Bullet><strong>Where it lives</strong> — does invoicing belong inside Get Paid? Affect anything upstream?</Bullet>
        <Bullet><strong>Direction</strong> — are the core functions pointing the right way?</Bullet>
      </div>

      <div style={{
        background: BG, border: `1px solid ${BORDER}`, borderRadius: 8,
        padding: '12px 16px', fontSize: 13, color: MID, lineHeight: 1.6,
      }}>
        Not asking for: pixel feedback, Xero sync opinions, or production-ready decisions.{' '}
        <strong style={{ color: DARK }}>Anything not confirmed today is post-V1 by default.</strong>
      </div>
    </Card>

    {/* Why invoicing */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Card>
        <Label>Why invoicing at all</Label>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: DARK, marginBottom: 12, lineHeight: 1.3 }}>
          Payer acquisition is the FY27 north star
        </h2>
        <p style={{ fontSize: 13, color: MID, lineHeight: 1.75, marginBottom: 12 }}>
          Right now, Get Paid is a passive footnote. Payees manually copy their BSB into every invoice they send.
          Pay is invisible at the payment moment.{' '}
          <strong style={{ color: DARK }}>The loop never closes.</strong>
        </p>
        <p style={{ fontSize: 13, color: MID, lineHeight: 1.75 }}>
          Invoicing removes the manual step. It brings Pay into the moment the payer actually decides to pay.
        </p>
      </Card>

      <div style={{
        background: '#EBF1FD', border: '1px solid #BFDBFE',
        borderRadius: 12, padding: 24,
      }}>
        <Label>Hypothesis</Label>
        <div style={{ fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 6, lineHeight: 1.4 }}>
          ≥10% of Get Paid customers create ≥1 invoice within 30 days
        </div>
        <div style={{ fontSize: 13, color: MID }}>
          and ≥60% of those invoices are paid via Pay
        </div>
      </div>

      <Card>
        <Label>Research backing — 123 responses · 3 user interviews</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {([
            ['39%', 'Currently on Xero / MYOB'],
            ['17%', 'Want to send directly from Pay'],
            ['12%', 'Want card payments'],
          ] as const).map(([num, lbl]) => (
            <div key={num} style={{
              textAlign: 'center', padding: '14px 8px',
              background: BG, borderRadius: 8, border: `1px solid ${BORDER}`,
            }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: BLUE, marginBottom: 6 }}>{num}</div>
              <div style={{ fontSize: 12, color: MID, lineHeight: 1.4 }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: MUTED, lineHeight: 1.5 }}>
          Robin, Raj, Claudia · 6 competitor platforms mapped · reconciliation is the gating factor
        </div>
      </Card>
    </div>
  </div>
)

// ─── LOOP TAB ───────────────────────────────────────────────────────────────

type LoopStep = {
  num: string
  label: string
  desc: string
  highlight: boolean
  deferred: boolean
}

const LOOP_STEPS: LoopStep[] = [
  { num: '01', label: 'Create invoice', desc: 'Payee creates invoice in Pay — line items, GST, due date', highlight: false, deferred: false },
  { num: '02', label: 'Email arrives', desc: 'Pay-branded invoice lands in payer\'s inbox', highlight: false, deferred: false },
  { num: '03', label: 'Click Pay now', desc: 'Payer clicks the link — routes to the HPP', highlight: false, deferred: false },
  { num: '04', label: 'Payer pays', desc: 'Max trust, zero friction — the acquisition moment', highlight: true, deferred: false },
  { num: '05', label: 'Notify payee', desc: 'Payment received, payee gets notified instantly', highlight: false, deferred: false },
  { num: '06', label: 'Reconciliation', desc: 'Auto-match payment to invoice in books', highlight: false, deferred: true },
]

const ChevronArrow = ({ faint }: { faint?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, padding: '0 2px' }}>
    <div style={{ width: 16, height: 1, background: faint ? '#F1F5F9' : BORDER }} />
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M1 1l5 5-5 5" stroke={faint ? '#F1F5F9' : BORDER} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

const LoopTab = () => (
  <div style={{ padding: 40 }}>
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 8 }}>The full loop — 6 steps</h2>
      <p style={{ fontSize: 13, color: MID, maxWidth: 640 }}>
        The HPP (step 04) is the pivot point. If it's generic, the loop breaks. If it matches the invoice, the loop closes.
        Step 06 is explicitly deferred — post-V1.
      </p>
    </div>

    {/* Flow diagram */}
    <div style={{ display: 'flex', alignItems: 'stretch', overflowX: 'auto', paddingBottom: 8 }}>
      {LOOP_STEPS.map((step, i) => (
        <div key={step.num} style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          {/* Step card */}
          <div style={{
            width: 158,
            flexShrink: 0,
            minHeight: 190,
            background: step.highlight ? BLUE : step.deferred ? '#FEF2F2' : 'white',
            border: `2px solid ${step.highlight ? BLUE : step.deferred ? '#FCA5A5' : BORDER}`,
            borderRadius: 12,
            padding: '18px 16px',
            position: 'relative',
            boxShadow: step.highlight
              ? '0 6px 20px rgba(26,86,219,0.28)'
              : '0 1px 3px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            {step.deferred && (
              <div style={{
                position: 'absolute', top: -11, right: 12,
                background: RED, color: 'white',
                fontSize: 10, fontWeight: 700,
                padding: '2px 8px', borderRadius: 20,
                letterSpacing: '0.04em',
              }}>
                Post-V1
              </div>
            )}
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
              color: step.highlight ? 'rgba(255,255,255,0.6)' : MUTED,
            }}>
              {step.num}
            </div>
            <div style={{
              fontSize: 14, fontWeight: 700, lineHeight: 1.3,
              color: step.highlight ? 'white' : step.deferred ? '#991B1B' : DARK,
            }}>
              {step.label}
            </div>
            <div style={{
              fontSize: 12, lineHeight: 1.55, flex: 1,
              color: step.highlight ? 'rgba(255,255,255,0.82)' : step.deferred ? '#B91C1C' : MID,
            }}>
              {step.desc}
            </div>
            {step.highlight && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: 'rgba(255,255,255,0.18)', borderRadius: 20,
                fontSize: 11, fontWeight: 700, color: 'white',
                padding: '3px 10px', alignSelf: 'flex-start',
              }}>
                ★ Acquisition moment
              </div>
            )}
          </div>
          {/* Arrow */}
          {i < LOOP_STEPS.length - 1 && <ChevronArrow faint={step.deferred} />}
        </div>
      ))}
    </div>

    {/* Callout cards */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 36, maxWidth: 860 }}>
      <Card style={{ borderColor: '#BFDBFE', background: '#EBF1FD' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: BLUE, marginBottom: 8 }}>Why the HPP matters</div>
        <p style={{ fontSize: 13, color: DARK, lineHeight: 1.7 }}>
          If payers land on a payment page that doesn't match the invoice they received,{' '}
          <strong>trust breaks.</strong>{' '}
          The HPP is the critical link — invoice-matched, Pay-branded, zero friction.
        </p>
      </Card>
      <Card style={{ borderColor: '#FDE68A', background: '#FFFBEB' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: AMBER, marginBottom: 8 }}>Future state</div>
        <p style={{ fontSize: 13, color: DARK, lineHeight: 1.7 }}>
          Invoice appears in the payer's Pay account automatically — auto-populates as a bill in Make a Payment.
          Converts every invoicing moment into a payable experience.
        </p>
        <img
          src={loopFutureState}
          alt="Future state reference"
          style={{ width: '100%', borderRadius: 8, marginTop: 16, display: 'block', border: '1px solid #FDE68A' }}
        />
      </Card>
    </div>
  </div>
)

// ─── SCOPE TAB ──────────────────────────────────────────────────────────────

type KanbanItem = string

type KanbanColProps = {
  title: string
  badge: string
  items: KanbanItem[]
  headerBg: string
  headerBorder: string
  headerColor: string
  dotColor: string
  rowBorder: string
}

const KanbanCol = ({ title, badge, items, headerBg, headerBorder, headerColor, dotColor, rowBorder }: KanbanColProps) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
    {/* Header */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 16px',
      background: headerBg,
      border: `1px solid ${headerBorder}`,
      borderBottom: 'none',
      borderRadius: '10px 10px 0 0',
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: headerColor, flex: 1 }}>{badge} {title}</span>
      <span style={{
        fontSize: 11, fontWeight: 700, color: headerColor,
        background: 'rgba(255,255,255,0.6)', borderRadius: 20,
        padding: '1px 8px',
      }}>
        {items.length}
      </span>
    </div>
    {/* Items */}
    <div style={{
      flex: 1,
      border: `1px solid ${headerBorder}`,
      borderTop: 'none',
      borderRadius: '0 0 10px 10px',
      overflow: 'hidden',
    }}>
      {items.map((item, i) => (
        <div key={item} style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          padding: '11px 16px',
          background: 'white',
          borderBottom: i < items.length - 1 ? `1px solid ${rowBorder}` : 'none',
          fontSize: 13, color: DARK, lineHeight: 1.5,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: dotColor, flexShrink: 0, marginTop: 6,
          }} />
          {item}
        </div>
      ))}
    </div>
  </div>
)

const MUST_HAVE = [
  'Customer list (name, type, ABN, email)',
  'Line items + GST (10%, AUD, checkbox)',
  'Due date picker',
  'Invoice # (auto-assign PAY-###)',
  'Invoice list (Draft / Sent / Paid / Overdue)',
  'PDF download + mark as paid',
  'Invoice preview — email + PDF',
  'Payment details (PayID + BSB)',
  'Logo + branding on invoice',
  'Notes / message field',
]

const SHOULD_HAVE: string[] = []

const OUT_OF_SCOPE = [
  'Filter + search on invoice list',
  'Payment term terminology',
  'Customer importing',
  'Catalogue / saved line items',
  'Discounts + file attachments',
  'Recurring invoices',
  'Multi-currency',
  'Credit card payments',
  'Xero / MYOB sync',
]

const ScopeTab = () => (
  <div style={{ padding: 40 }}>
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 8 }}>Scope: what's in vs out</h2>
      <p style={{ fontSize: 13, color: MID }}>
        Anything not confirmed today is post-V1 by default. Scope freeze after this session.
      </p>
    </div>

    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <KanbanCol
        title="Must have"
        badge="✅"
        items={MUST_HAVE}
        headerBg="#F0FDF4"
        headerBorder="#86EFAC"
        headerColor={GREEN}
        dotColor="#4ADE80"
        rowBorder="#F0FDF4"
      />
      <KanbanCol
        title="Should have"
        badge="🟡"
        items={SHOULD_HAVE}
        headerBg="#FFFBEB"
        headerBorder="#FDE68A"
        headerColor={AMBER}
        dotColor="#FCD34D"
        rowBorder="#FFFBEB"
      />
      <KanbanCol
        title="Out of scope"
        badge="❌"
        items={OUT_OF_SCOPE}
        headerBg="#FEF2F2"
        headerBorder="#FCA5A5"
        headerColor={RED}
        dotColor="#F87171"
        rowBorder="#FEF2F2"
      />
    </div>

  </div>
)

// ─── PROTOTYPES TAB ─────────────────────────────────────────────────────────

const BrowserChrome = ({ url }: { url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    title={`Open ${url}`}
    style={{ textDecoration: 'none', display: 'block' }}
  >
    <div style={{
      border: `1px solid ${BORDER}`,
      borderRadius: 10,
      overflow: 'hidden',
      transition: 'box-shadow 0.15s',
      cursor: 'pointer',
    }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(26,86,219,0.15)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      <div style={{
        background: '#F1F5F9', borderBottom: `1px solid ${BORDER}`,
        padding: '9px 12px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          {(['#F87171', '#FBBF24', '#4ADE80'] as const).map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: 'white', border: `1px solid ${BORDER}`,
          borderRadius: 5, padding: '4px 10px',
          fontSize: 11, color: MID, fontFamily: 'monospace', overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {url}
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: BLUE, flexShrink: 0 }}>Open ↗</span>
      </div>
      <div style={{
        height: 72, background: BG,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 12, color: MUTED }}>Click to open in new tab</span>
      </div>
    </div>
  </a>
)

const UrlChip = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 11, color: BLUE, fontFamily: 'monospace',
      background: '#EBF1FD', border: `1px solid #BFDBFE`,
      borderRadius: 4, padding: '3px 8px',
      textDecoration: 'none',
      transition: 'background 0.15s',
    }}
    onMouseEnter={e => (e.currentTarget.style.background = '#DBEAFE')}
    onMouseLeave={e => (e.currentTarget.style.background = '#EBF1FD')}
  >
    {label} ↗
  </a>
)

const Step = ({ n, text }: { n: number; text: string }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: 10,
    padding: '9px 0',
    borderBottom: `1px solid ${BORDER}`,
  }}>
    <div style={{
      width: 20, height: 20, borderRadius: '50%',
      background: '#EBF1FD', color: BLUE,
      fontSize: 10, fontWeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, marginTop: 1,
    }}>
      {n}
    </div>
    <div style={{ fontSize: 13, color: DARK, lineHeight: 1.5 }}>{text}</div>
  </div>
)

const PrototypesTab = () => (
  <div style={{ padding: 40 }}>
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 8 }}>Prototype walkthroughs</h2>
      <p style={{ fontSize: 13, color: MID }}>
        Click any URL or browser frame to open the live prototype in a new tab. Walk these live — don't screenshot.
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 24 }}>

      {/* Payee */}
      <Card>
        <div style={{ marginBottom: 18 }}>
          <Label>Payee side · localhost:5177</Label>
          <div style={{ fontSize: 17, fontWeight: 700, color: DARK, marginBottom: 4 }}>Merchant experience</div>
          <div style={{ fontSize: 12, color: MID }}>Turborepo monorepo · MUI 5 · React 19</div>
        </div>
        <BrowserChrome url="http://localhost:5177/account/invoices" />
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
          <Step n={1} text="Invoice list — search, status filter, PAY-### numbering, action menu per row" />
          <Step n={2} text="New invoice — lands directly on details (customer step removed)" />
          <Step n={3} text="Line items + GST toggle + live fee calc in right panel" />
          <Step n={4} text="Review step — confirm customer, live PDF preview, optional notes" />
          <Step n={5} text="Send invoice → sent confirmation page" />
        </div>
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <UrlChip href="http://localhost:5177/account/invoices" label=":5177/account/invoices" />
          <UrlChip href="http://localhost:5177/account/invoices/new" label=":5177/account/invoices/new" />
        </div>
      </Card>

      {/* Payer */}
      <Card>
        <div style={{ marginBottom: 18 }}>
          <Label>Payer side · localhost:5174</Label>
          <div style={{ fontSize: 17, fontWeight: 700, color: DARK, marginBottom: 4 }}>Payer experience</div>
          <div style={{ fontSize: 12, color: MID }}>Standalone Vite + React · jsPDF for PDF generation</div>
        </div>
        <BrowserChrome url="http://localhost:5174/email/inv-0042" />
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
          <Step n={1} text="Email — Pay-branded, line items, real PDF download (jsPDF), Pay CTA" />
          <Step n={2} text="HPP — left: invoice summary + due date badge · right: PayID + bank + PayRewards" />
          <Step n={3} text="'I've paid via bank transfer' → confirm modal (intentional friction)" />
          <Step n={4} text="Confirmation + acquisition — points teaser, Create a free Pay account CTA" />
        </div>
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <UrlChip href="http://localhost:5174/email/inv-0042" label=":5174/email/inv-0042" />
          <UrlChip href="http://localhost:5174/pay/hpp-a3f8b2c1d4e9" label=":5174 HPP (sent)" />
          <UrlChip href="http://localhost:5174/pay/hpp-a3f8b2c1d4e9/paid" label=":5174 confirmation" />
          <UrlChip href="http://localhost:5174/pay/hpp-z9y8x7w6v5u4" label=":5174 HPP (overdue)" />
        </div>
      </Card>
    </div>

    {/* Customer journeys */}
    <Card>
      <Label>Customer list — 4 user journeys</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {([
          ['Path A — Pre-create', 'Customers tab → Add → Fill form → Save → New Invoice → Select customer. Classic B2B workflow.'],
          ['Path B — Inline', 'Start invoice → type name, no match → "Add new customer" in dropdown → compact modal → saves and continues. No context switch.'],
          ['Path C — Post-payment', 'Payment arrives → Pay prompts "Add this payer as a customer?" → pre-filled from payment data. Zero effort for merchant.'],
          ['Path D — Payer side', 'Payer pays via HPP → confirmation page → PayRewards acquisition CTA → Pay account creation.'],
        ] as const).map(([title, desc]) => (
          <div key={title} style={{
            padding: '14px 16px', background: BG,
            borderRadius: 8, border: `1px solid ${BORDER}`,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: DARK, marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: 12, color: MID, lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 16, padding: '10px 14px',
        background: '#EBF1FD', borderRadius: 8, fontSize: 12, color: DARK,
      }}>
        <strong>Email rule confirmed:</strong> optional when saving a customer, required when sending an invoice.
        {' '}Three customer types: Individual · Business · Payment aggregator (aggregator deferred, not blocking V1).
      </div>
    </Card>
  </div>
)

// ─── INVOICE TAB ─────────────────────────────────────────────────────────────

// Figma colors for the production app recreation
const F_TEXT    = '#283E48'
const F_MID     = '#526973'
const F_BLUE    = '#3866B0'
const F_CHIP_BG = '#F7FAFF'
const F_CHIP_BD = '#9CC0F9'
const F_CHIP_TX = '#285AAA'
const F_SIDEBAR = 'linear-gradient(23.76deg, #2E3E7F 9.64%, #3369CB 113.28%)'

const SideNavItem = ({ label, active, isNew }: { label: string; active?: boolean; isNew?: boolean }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '7px 16px',
    background: active ? 'rgba(255,255,255,0.14)' : 'transparent',
    borderLeft: `2px solid ${active ? 'rgba(255,255,255,0.7)' : 'transparent'}`,
  }}>
    <div style={{
      width: 14, height: 14, borderRadius: 2,
      background: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
      flexShrink: 0,
    }} />
    <span style={{ fontSize: 12.5, color: 'white', opacity: active ? 1 : 0.78, flex: 1 }}>{label}</span>
    {isNew && (
      <span style={{
        fontSize: 9.5, fontWeight: 700, color: F_CHIP_TX,
        background: F_CHIP_BG, border: `1px solid ${F_CHIP_BD}`,
        borderRadius: 20, padding: '1px 6px',
      }}>
        New
      </span>
    )}
  </div>
)

const ReadField = ({ label, value }: { label: string; value: string }) => (
  <div style={{
    display: 'flex', alignItems: 'baseline', gap: 12,
    padding: '5px 0', borderBottom: '1px solid #F0F0F0',
    fontSize: 12,
  }}>
    <div style={{ width: 110, color: F_MID, flexShrink: 0 }}>{label}</div>
    <div style={{ color: F_TEXT, fontWeight: 600, wordBreak: 'break-all' }}>{value}</div>
  </div>
)

const InvoiceTab = () => (
  <div style={{ padding: 40 }}>
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 8 }}>
        Get Paid — where invoicing lives
      </h2>
      <p style={{ fontSize: 13, color: MID }}>
        'Invoice' is a new sub-tab within the existing 'Get Paid' page.
        Left: production design from Figma. Right: prototype at localhost:5177.
      </p>
    </div>

    <div style={{ maxWidth: 860 }}>

      {/* ── Figma app shell recreation ── */}
      <div style={{
        border: `1px solid ${BORDER}`, borderRadius: 12,
        overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      }}>

        {/* Global header */}
        <div style={{
          background: 'white', borderBottom: '1px solid #E0E0E0',
          height: 52, display: 'flex', alignItems: 'center',
          padding: '0 14px', gap: 8,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flexShrink: 0, width: 18 }}>
            {[0,1,2].map(i => <div key={i} style={{ height: 1.5, background: '#94A3B8', borderRadius: 1 }} />)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flex: 1 }}>
            <svg width={20} height={20} viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="5" fill={F_BLUE} />
              <text x="8" y="22" fontFamily="Inter" fontWeight="700" fontSize="17" fill="white">P</text>
            </svg>
            <span style={{ fontSize: 13, fontWeight: 700, color: F_BLUE, letterSpacing: '-0.2px' }}>pay.com.au</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ border: '1px solid #B7C9F0', borderRadius: 20, padding: '3px 10px', fontSize: 11, color: F_BLUE, fontWeight: 700 }}>
              Rewards →
            </div>
            <div style={{
              border: '1px solid #B7C9F0', borderRadius: '50%',
              width: 26, height: 26, display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="#94A3B8" strokeWidth="1.5"/>
                <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex' }}>

          {/* Sidebar */}
          <div style={{
            width: 196, flexShrink: 0,
            background: F_SIDEBAR,
            display: 'flex', flexDirection: 'column',
            padding: '8px 0', minHeight: 560,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px 14px' }}>
              <div style={{
                width: 28, height: 28, borderRadius: 4,
                background: '#D3DFF6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: '#003C80', flexShrink: 0,
              }}>
                MB
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>My Business</span>
              <svg style={{ marginLeft: 'auto', opacity: 0.5, flexShrink: 0 }} width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <SideNavItem label="Dashboard" />
            <SideNavItem label="Make a payment" />
            <SideNavItem label="Get paid" active isNew />
            <SideNavItem label="Payments" />
            <SideNavItem label="Payees" />
            <SideNavItem label="Wallet" />
            <SideNavItem label="Settings" />
            <SideNavItem label="Activity log" />
            <div style={{ marginTop: 'auto', padding: 8 }}>
              <div style={{
                background: 'rgba(255,255,255,0.07)', border: '1.4px solid #2E3E7F',
                borderRadius: 6, padding: '7px 10px',
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 12, color: 'white', fontWeight: 600,
              }}>
                🎁 Refer and earn
              </div>
            </div>
          </div>

          {/* Main content */}
          <div style={{ flex: 1, background: '#FCFCFC', padding: '24px 20px', minWidth: 0 }}>

            {/* Page heading */}
            <h3 style={{ fontSize: 22, fontWeight: 700, color: F_TEXT, marginBottom: 4 }}>Get paid</h3>
            <p style={{ fontSize: 13, color: F_MID, marginBottom: 16, lineHeight: 1.6 }}>
              Get paid and earn PayRewards Points with every payment you receive.{' '}
              <span style={{ color: F_BLUE }}>Learn more</span>
            </p>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #E0E0E0', marginBottom: 18 }}>
              {(['Overview', 'Invoice'] as const).map(t => {
                const active = t === 'Overview'
                return (
                  <div key={t} style={{
                    position: 'relative', padding: '8px 16px',
                    fontSize: 14, fontWeight: active ? 700 : 400,
                    color: active ? F_BLUE : F_MID,
                    display: 'flex', alignItems: 'center', gap: 6, cursor: 'default',
                  }}>
                    {t}
                    {t === 'Invoice' && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, color: 'white',
                        background: '#E57A00', borderRadius: 20, padding: '1px 6px',
                      }}>
                        NEW
                      </span>
                    )}
                    {active && (
                      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: F_BLUE }} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Share payment link card */}
            <div style={{
              background: '#EEF2FC', borderRadius: 6, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
              boxShadow: '0 2px 3px rgba(0,0,0,0.07)',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', background: '#3A81F4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 15,
              }}>
                🔗
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: F_TEXT, marginBottom: 3 }}>Share your payment link</div>
                <div style={{ fontSize: 12, color: F_MID, lineHeight: 1.5 }}>When your customers use pay.com.au, they earn points and so do you.</div>
              </div>
              <div style={{
                border: '1px solid #B7C9F0', borderRadius: 6, padding: '5px 12px',
                fontSize: 12, fontWeight: 700, color: F_BLUE, background: 'white', flexShrink: 0,
              }}>
                Create payment link
              </div>
            </div>

            {/* Payment details card */}
            <div style={{
              background: 'white', border: `1px solid ${BORDER}`,
              borderRadius: 6, padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: F_TEXT, marginBottom: 3 }}>Share these details on invoices</div>
                  <div style={{ fontSize: 12, color: F_MID }}>Two ways your customers can pay you. Both earn points.</div>
                </div>
                <div style={{
                  background: F_BLUE, borderRadius: 6, padding: '5px 10px',
                  fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0, whiteSpace: 'nowrap',
                }}>
                  Copy payment template
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                {[
                  '⚡ Same-day settlement if received by 2PM AET',
                  '📋 Daily settlement report · 6:30 PM AET',
                ].map(chip => (
                  <div key={chip} style={{
                    background: F_CHIP_BG, border: `1px solid ${F_CHIP_BD}`,
                    borderRadius: 20, padding: '3px 9px', fontSize: 11, color: F_CHIP_TX,
                  }}>
                    {chip}
                  </div>
                ))}
              </div>
              <div style={{ background: '#FAFAFA', borderRadius: 6, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, color: F_MID, marginBottom: 8 }}>
                  To pay via bank transfer, please use either of the below secured methods:
                </div>
                <ReadField label="PayID email" value="creativedirectionmanagement@invoice.pay.com.au" />
                <ReadField label="Account name" value="pay.com.au" />
                <ReadField label="BSB" value="633-123" />
                <ReadField label="Account number" value="123456789780" />
                <div style={{ marginTop: 10, fontSize: 11, color: F_MID, lineHeight: 1.6 }}>
                  We pay our business expenses through{' '}
                  <span style={{ color: F_BLUE }}>pay.com.au</span>.{' '}
                  Join 70,000 other businesses and unlock bonus PayRewards Points when you get started.
                </div>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: F_BLUE, borderBottom: `1px solid ${F_BLUE}`, display: 'inline-block' }}>
                How do I add this to my Xero template?
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                <div style={{
                  background: '#F7FDFB', border: '1px solid #97EBC8',
                  borderRadius: 20, padding: '3px 10px', fontSize: 11, color: '#0D7E51',
                }}>
                  Active
                </div>
                <div style={{ fontSize: 12, color: F_MID }}>Linked to settlement account - Commonwealth Bank 123**456</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
)

// ─── QUESTIONS TAB ──────────────────────────────────────────────────────────

const QuestionsTab = () => (
  <div style={{ padding: 40, maxWidth: 760 }}>
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 8 }}>Q&amp;A</h2>
      <p style={{ fontSize: 13, color: MID }}>Open floor.</p>
    </div>
  </div>
)

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState<TabId>('why')

  const renderTab = () => {
    switch (active) {
      case 'why':        return <WhyTab />
      case 'loop':       return <LoopTab />
      case 'scope':      return <ScopeTab />
      case 'prototypes': return <PrototypesTab />
      case 'invoice':    return <InvoiceTab />
      case 'questions':  return <QuestionsTab />
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Sticky header */}
      <header style={{
        background: 'white',
        borderBottom: `1px solid ${BORDER}`,
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'stretch',
        padding: '0 32px',
        boxShadow: '0 1px 0 #E2E8F0',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 40, paddingRight: 32, borderRight: `1px solid ${BORDER}` }}>
          <PayLogo />
        </div>

        {/* Tab bar */}
        <nav style={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                padding: '0 20px',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${active === tab.id ? BLUE : 'transparent'}`,
                fontSize: 14,
                fontWeight: active === tab.id ? 600 : 400,
                color: active === tab.id ? BLUE : MID,
                cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
                whiteSpace: 'nowrap',
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right label */}
        <div style={{
          display: 'flex', alignItems: 'center',
          paddingLeft: 32, borderLeft: `1px solid ${BORDER}`,
          fontSize: 12, color: MUTED,
        }}>
          Get Paid Invoicing V1 · Design Review
        </div>
      </header>

      {/* Page content */}
      <main style={{ flex: 1, background: BG }}>
        {renderTab()}
      </main>
    </div>
  )
}
