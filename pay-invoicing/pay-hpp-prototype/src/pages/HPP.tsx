import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInvoiceByToken } from '../data/invoices'
import { PayLogo, PayIconOnly } from '../components/PayLogo'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n)

// Read-only field: label on top, value below, divider line under
const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
  <div style={{ paddingBottom: 12, borderBottom: '1px solid #E2E8F0' }}>
    <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 14, fontWeight: 600, color: '#1E293B' }}>{value}</div>
  </div>
)

// Outline copy button (blue border, blue text, white bg)
const OutlineBtn = ({ label, onClick }: { label: string; onClick: () => void }) => {
  const [copied, setCopied] = useState(false)
  const handle = () => { onClick(); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button
      onClick={handle}
      style={{
        width: '100%',
        padding: '11px',
        background: 'white',
        border: '1.5px solid #1A56DB',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        color: copied ? '#16A34A' : '#1A56DB',
        borderColor: copied ? '#16A34A' : '#1A56DB',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {copied ? '✓ Copied!' : label}
    </button>
  )
}

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return words[0][0].toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export const HPP = () => {
  const { invoiceToken } = useParams<{ invoiceToken: string }>()
  const navigate = useNavigate()
  const invoice = getInvoiceByToken(invoiceToken ?? '')

  const [confirming, setConfirming] = useState(false)

  if (!invoice) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ color: '#64748B' }}>Payment link not found or expired.</p>
      </div>
    )
  }

  const bankDetails = `Account name: pay.com.au\nBSB: 633-123\nAccount number: 123123897\nReference: ${invoice.from.reference}`

  const copyPayId = () => navigator.clipboard.writeText(invoice.from.payId)
  const copyBankDetails = () => navigator.clipboard.writeText(bankDetails)

  const handleBankPaid = () => navigate(`/pay/${invoiceToken}/paid`)

  const isOverdue = invoice.status === 'overdue'

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #E2E8F0',
        height: 63,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        <PayLogo size={32} />
        <button
          onClick={() => navigate(`/pay/${invoiceToken}/paid`)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            color: '#1A56DB',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          Sign up to earn points
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#1A56DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      {/* Main content */}
      <div style={{
        maxWidth: 968,
        margin: '48px auto',
        padding: '0 24px',
        display: 'flex',
        gap: 0,
        alignItems: 'stretch',
      }}>

        {/* Left panel — business + invoice summary */}
        <div style={{
          width: 345,
          flexShrink: 0,
          background: 'white',
          border: '1px solid #E2E8F0',
          borderRadius: 10,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>
          {/* "Pay to this" label */}
          <div style={{ fontSize: 14, fontWeight: 500, color: '#64748B', marginBottom: 16 }}>
            Pay to this
          </div>

          {/* Business row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Avatar — Pay blue bg, white initials */}
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#1A56DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 14,
              fontWeight: 700,
              flexShrink: 0,
              letterSpacing: '0.5px',
            }}>
              {getInitials(invoice.from.businessName)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', lineHeight: 1.3 }}>
                {invoice.from.businessName}
              </div>
              <div style={{ fontSize: 14, color: '#64748B', marginTop: 2 }}>
                ABN {invoice.from.abn}
              </div>
            </div>
            {/* Chevron */}
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{ flexShrink: 0 }}>
              <path d="M1 1l6 6-6 6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#E2E8F0', margin: '20px 0' }} />

          {/* Invoice summary */}
          <div>
            <div style={{ fontSize: 14, color: '#64748B', fontWeight: 500, marginBottom: 14 }}>
              Invoice summary
            </div>

            {/* Line items — clean, no borders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {invoice.lineItems.map((li, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ fontSize: 13, color: '#1E293B', flex: 1 }}>{li.description}</span>
                  <span style={{ fontSize: 13, color: '#1E293B', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(li.qty * li.rate)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals separator */}
            <div style={{ height: 1, background: '#E2E8F0', margin: '14px 0' }} />

            {/* Subtotal + GST */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748B' }}>
                <span>Subtotal</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(invoice.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748B' }}>
                <span>GST (10%)</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(invoice.gst)}</span>
              </div>
            </div>

            {/* Total due */}
            <div style={{ height: 1, background: '#E2E8F0', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1E293B' }}>Total due</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#1E293B', fontVariantNumeric: 'tabular-nums' }}>
                {fmt(invoice.total)}
              </span>
            </div>

            {/* Due date badge */}
            <div style={{ marginTop: 12 }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
                fontWeight: 500,
                padding: '3px 10px',
                borderRadius: 20,
                background: isOverdue ? '#FFFBEB' : '#F1F5F9',
                color: isOverdue ? '#D97706' : '#64748B',
                border: `1px solid ${isOverdue ? '#FDE68A' : '#E2E8F0'}`,
              }}>
                {isOverdue ? '⚠ ' : ''}Due {invoice.dueDate}
              </span>
            </div>
          </div>
        </div>

        {/* Vertical divider — full height */}
        <div style={{ width: 1, background: '#E2E8F0', flexShrink: 0, margin: '0 32px', alignSelf: 'stretch' }} />

        {/* Right panel — payment details */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Section heading */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
              Choose how to pay
            </div>
            <div style={{ fontSize: 14, color: '#64748B' }}>
              These are unique account details to pay {invoice.from.businessName}.
            </div>
          </div>

          {/* PayID section */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            padding: '24px',
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1E293B' }}>PayID email</div>
            <ReadOnlyField label="Email" value={invoice.from.payId} />
            <OutlineBtn label="Copy PayID" onClick={copyPayId} />
          </div>

          {/* Bank details section */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            padding: '24px',
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1E293B' }}>Bank details</div>
            <ReadOnlyField label="Account name" value="pay.com.au" />
            <ReadOnlyField label="BSB" value="633-123" />
            <ReadOnlyField label="Account number" value="123123897" />
            <ReadOnlyField label="Reference" value={invoice.from.reference} />
            <OutlineBtn label="Copy all details" onClick={copyBankDetails} />
          </div>

          {/* PayRewards acquisition block */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            padding: '24px',
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <PayIconOnly size={48} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>
                  Be rewarded for your business payments
                </div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>
                  Join 70,000+ businesses and earn PayRewards Points on your payments
                </div>
              </div>
            </div>
            <button
              onClick={() => setConfirming(true)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#1A56DB',
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              Sign up &amp; earn points
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Confirmation modal */}
      {confirming && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        }}>
          <div style={{
            background: 'white', borderRadius: 12, padding: 28, maxWidth: 380, width: '90%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
          }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
              Confirm payment
            </div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 20, lineHeight: 1.6 }}>
              Confirming lets {invoice.from.businessName} know you've sent{' '}
              <strong style={{ color: '#1E293B' }}>{fmt(invoice.total)}</strong> via bank transfer.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setConfirming(false)}
                style={{ flex: 1, padding: '10px', background: 'white', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, fontWeight: 500, color: '#1E293B', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleBankPaid}
                style={{ flex: 1, padding: '10px', background: '#1A56DB', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: 'white', cursor: 'pointer' }}
              >
                I've paid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
