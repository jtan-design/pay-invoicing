# Pay Invoicing Prototype — Claude Code Context

## What this is
A Vite + React prototype for pay.com.au's Get Paid invoicing tool.
The goal is 1:1 visual fidelity with the production environment
by importing real design system components.

## Design system import path
import { ComponentName } from '@paycomau/design-system'
OR: import ComponentName from '@ds/components/ComponentName'
(Check which is correct for this repo)

## Layout system
Every page uses the AppShell component:
<AppShell>
  <SideNav /> (left, 220px, dark navy)
  <PageContent /> (right, white, padding 32px)
</AppShell>

The SideNav includes:
- Company avatar (initials + company name, top)
- Nav items: Dashboard, Make a payment, Get paid, Payments,
  Payees, Wallet, Settings, Activity log
- Active state: Pay blue #1A56DB left border + blue text

## Design tokens
--color-primary: #1A56DB (Pay blue)
--color-nav-bg: #1E1E3F (dark sidebar)
--color-text: #1E293B
--color-text-muted: #64748B
--color-bg: #F8FAFC
--color-border: #E2E8F0
--color-success: #16A34A
--color-warning: #D97706
--color-danger: #DC2626

Typography: Inter, 14px base, line-height 1.5

## Key components available
Button — variants: primary, secondary, ghost, danger
  Props: variant, size (sm/md/lg), onClick, disabled
Badge — variants: success, warning, danger, neutral, blue
  Props: variant, label
Avatar — initials from name prop, colour auto-derived
Input — with label, placeholder, helpText, error
Checkbox — controlled, with label
StepIndicator — steps array, currentStep prop
Card — with optional header and footer slots
DataTable — columns, rows, onRowClick
Modal — title, children, onClose, actions

## URL structure (match production)
/account/invoices          → Invoice list
/account/invoices/new      → Create invoice
/account/invoices/:id      → Invoice detail
/account/invoices/:id/sent → Sent confirmation

## Prototype-specific: Future state toggle
Add this to every screen (bottom-left, fixed):
<FutureStateToggle state={futureState} onChange={setFutureState} />
This lets reviewers switch between current and proposed states
in the same session without navigation.

## Mock data location
Mock data lives in src/mockData.js (single file, not src/mocks/).
Contains: CUSTOMERS_DATA, and invoice/payment records.

## What NOT to do
- Do not use arbitrary Tailwind classes when a component exists
- Do not use inline styles
- Do not invent new components — use existing ones
- Do not hardcode hex colours — use CSS variables or tokens
