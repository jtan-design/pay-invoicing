import { useParams, useNavigate } from 'react-router-dom'
import { getInvoiceByToken } from '../data/invoices'
import { PayLogo } from '../components/PayLogo'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n)

export const PaymentConfirmation = () => {
  const { invoiceToken } = useParams<{ invoiceToken: string }>()
  const navigate = useNavigate()
  const invoice = getInvoiceByToken(invoiceToken ?? '')

  if (!invoice) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ color: 'var(--pay-mid)' }}>Invoice not found.</p>
      </div>
    )
  }

  const estimatedPoints = Math.round(invoice.total)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--pay-light)', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--pay-border)',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
      }}>
        <PayLogo size={26} />
      </header>

      <div style={{ maxWidth: 560, margin: '60px auto', padding: '0 24px' }}>

        {/* Success card */}
        <div style={{
          background: 'white',
          border: '1px solid var(--pay-border)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          marginBottom: 20,
        }}>
          {/* Green top band */}
          <div style={{ background: 'var(--pay-green)', padding: '28px 28px', textAlign: 'center' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              margin: '0 auto 12px',
            }}>
              ✓
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 4 }}>
              Payment confirmed
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
              Your payment of {fmt(invoice.total)} has been sent to {invoice.from.businessName}.
            </div>
          </div>

          <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['Invoice', invoice.number],
              ['Amount paid', fmt(invoice.total)],
              ['Paid to', invoice.from.businessName],
              ['Reference', invoice.from.reference],
              ['Date', new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: 'var(--pay-mid)' }}>{label}</span>
                <span style={{ fontWeight: 500, color: 'var(--pay-dark)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PayRewards acquisition CTA */}
        <div style={{
          background: 'white',
          border: '1px solid var(--pay-border)',
          borderRadius: 12,
          padding: '24px 28px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <PayLogo size={22} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--pay-dark)' }}>
                You could've earned {estimatedPoints.toLocaleString()} points
              </div>
              <div style={{ fontSize: 12, color: 'var(--pay-mid)' }}>
                on this payment with a free Pay account
              </div>
            </div>
          </div>

          <div style={{ fontSize: 13, color: 'var(--pay-mid)', lineHeight: 1.7 }}>
            Pay business invoices through pay.com.au and earn <strong style={{ color: 'var(--pay-dark)' }}>1 PayReward point per $1</strong> spent.
            Redeem for cashback, gift cards, travel rewards and more — completely free.
          </div>

          {/* Points perks */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { icon: '✈️', label: 'Travel rewards' },
              { icon: '💵', label: 'Cashback' },
              { icon: '🎁', label: 'Gift cards' },
            ].map(perk => (
              <div key={perk.label} style={{
                flex: 1,
                padding: '10px 12px',
                background: '#EBF1FD',
                borderRadius: 8,
                textAlign: 'center',
                fontSize: 12,
                color: 'var(--pay-blue)',
                fontWeight: 500,
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{perk.icon}</div>
                {perk.label}
              </div>
            ))}
          </div>

          <button
            style={{
              width: '100%',
              padding: '13px',
              background: 'var(--pay-blue)',
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Create a free Pay account — it's free →
          </button>

          <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--pay-muted)' }}>
            No credit card required. Takes 2 minutes.
          </div>
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            onClick={() => navigate(`/email/${invoice.id}`)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 13,
              color: 'var(--pay-mid)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            ← Back to invoice
          </button>
        </div>
      </div>
    </div>
  )
}
