import { useParams } from 'react-router-dom'
import { getInvoiceById } from '../data/invoices'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n)

const PAY_ORANGE = '#E07B00'

const SocialIcon = ({ children, bg }: { children: React.ReactNode; bg: string }) => (
  <div style={{
    width: 34, height: 34, borderRadius: '50%',
    background: bg,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }}>
    {children}
  </div>
)

export const PayeeNotificationEmail = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>()
  const invoice = getInvoiceById(invoiceId ?? '')

  if (!invoice) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ color: '#526973' }}>Invoice not found.</p>
      </div>
    )
  }

  const RECEIVED_DATE = '22 Jun 2026'

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif', background: '#f0f2f5' }}>

      {/* Gmail sidebar */}
      <div style={{ width: 240, background: '#f8f9fa', borderRight: '1px solid #e0e0e0', flexShrink: 0 }}>
        <div style={{ padding: '16px 12px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="32" height="32" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="4" fill="#EA4335" />
              <text x="6" y="22" fontSize="14" fontWeight="700" fill="white" fontFamily="sans-serif">M</text>
            </svg>
            <span style={{ fontWeight: 600, fontSize: 15, color: '#202124' }}>Gmail</span>
          </div>
        </div>
        <div style={{ padding: '8px 0' }}>
          {['Inbox (1)', 'Starred', 'Sent', 'Drafts', 'More'].map((item, i) => (
            <div key={item} style={{
              padding: '8px 16px', fontSize: 13,
              color: i === 0 ? '#1A56DB' : '#444',
              fontWeight: i === 0 ? 600 : 400,
              background: i === 0 ? '#e8f0fe' : 'none',
              borderRadius: i === 0 ? '0 20px 20px 0' : 0,
              cursor: 'pointer',
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Email list */}
      <div style={{ width: 300, background: 'white', borderRight: '1px solid #e0e0e0', overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', fontSize: 14, fontWeight: 600, color: '#202124' }}>
          Inbox
        </div>
        {[
          {
            from: 'pay.com.au',
            subject: 'Good news — payment received through pay.com.au',
            preview: `${fmt(invoice.total)} received for ${invoice.number}. Settlement pending.`,
            time: RECEIVED_DATE,
            unread: true,
            active: true,
          },
          {
            from: 'Commonwealth Bank',
            subject: 'Your June 2026 statement is ready',
            preview: 'Your monthly statement is now available to view.',
            time: '14 Jun',
            unread: false,
            active: false,
          },
          {
            from: 'ATO Online',
            subject: 'Activity statement reminder',
            preview: 'Your BAS for Q4 2025–26 is due on 28 July 2026.',
            time: '12 Jun',
            unread: false,
            active: false,
          },
        ].map((email, i) => (
          <div key={i} style={{
            padding: '12px 16px',
            borderBottom: '1px solid #f0f0f0',
            cursor: 'pointer',
            background: email.active ? '#e8f0fe' : 'white',
            borderLeft: email.active ? '3px solid #1A56DB' : '3px solid transparent',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 13, fontWeight: email.unread ? 700 : 400, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
                {email.from}
              </span>
              <span style={{ fontSize: 11, color: '#777', whiteSpace: 'nowrap' }}>{email.time}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: email.unread ? 600 : 400, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {email.subject}
            </div>
            <div style={{ fontSize: 11, color: '#777', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>
              {email.preview}
            </div>
          </div>
        ))}
      </div>

      {/* Email body */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#f0f2f5', padding: '24px 32px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', background: 'white', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

          {/* Email meta header */}
          <div style={{ padding: '20px 28px', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#202124', marginBottom: 12 }}>
              Good news - a payment has been received through pay.com.au
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: PAY_ORANGE,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 15, fontWeight: 700, flexShrink: 0,
              }}>
                P
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#202124' }}>
                  pay.com.au{' '}
                  <span style={{ color: '#777', fontWeight: 400 }}>&lt;noreply@pay.com.au&gt;</span>
                </div>
                <div style={{ fontSize: 12, color: '#777' }}>
                  to {invoice.from.email} · {RECEIVED_DATE}
                </div>
              </div>
            </div>
          </div>

          {/* pay.com.au branded email body */}
          <div>
            {/* Brand nav bar */}
            <div style={{
              padding: '14px 28px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="6" fill={PAY_ORANGE} />
                  <text x="8" y="22" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="18" fill="white">P</text>
                </svg>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#1A293B' }}>pay.com.au</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 13, color: PAY_ORANGE, fontWeight: 600 }}>PayRewards</span>
                <div style={{
                  border: '1px solid #d0d0d0', borderRadius: 20,
                  padding: '4px 16px', fontSize: 12, fontWeight: 600, color: '#333',
                }}>
                  Log in
                </div>
              </div>
            </div>

            {/* Body content */}
            <div style={{ padding: '32px 28px 36px' }}>

              <h2 style={{ fontSize: 22, fontWeight: 700, color: PAY_ORANGE, marginBottom: 20, lineHeight: 1.3 }}>
                Payment received - settlement pending
              </h2>

              <p style={{ fontSize: 14, color: '#333', marginBottom: 14, lineHeight: 1.7 }}>
                Hi {invoice.from.businessName.split(' ')[0]},
              </p>
              <p style={{ fontSize: 14, color: '#333', marginBottom: 24, lineHeight: 1.7 }}>
                Good news - a payment has been received through pay.com.au.
              </p>

              {/* Payment details */}
              <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {([
                  ['Amount Received', fmt(invoice.total)],
                  ['Payer Name', invoice.to.contactName],
                  ['Reference', invoice.number],
                  ['Received At', RECEIVED_DATE],
                ] as const).map(([label, value]) => (
                  <p key={label} style={{ fontSize: 14, color: '#333', margin: 0, lineHeight: 1.6 }}>
                    <strong style={{ color: PAY_ORANGE }}>{label}:</strong>{' '}{value}
                  </p>
                ))}
              </div>

              <p style={{ fontSize: 14, color: '#333', marginBottom: 14, lineHeight: 1.7 }}>
                The funds have been received by pay.com.au, and will be included in the next settlement to your nominated account.
              </p>
              <p style={{ fontSize: 14, color: '#333', marginBottom: 14, lineHeight: 1.7 }}>
                You'll receive a settlement summary once funds have been settled.
              </p>
              <p style={{ fontSize: 14, color: '#333', marginBottom: 36, lineHeight: 1.7 }}>
                If you have any questions, please contact us at{' '}
                <a href="mailto:support@pay.com.au" style={{ color: '#1A56DB' }}>support@pay.com.au</a>{' '}
                or call <strong>1300 241 723.</strong>
              </p>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                {/* Facebook */}
                <SocialIcon bg="#1877F2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </SocialIcon>
                {/* Instagram */}
                <SocialIcon bg="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                  </svg>
                </SocialIcon>
                {/* LinkedIn */}
                <SocialIcon bg="#0A66C2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </SocialIcon>
                {/* TikTok */}
                <SocialIcon bg="#010101">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.54V6.79a4.85 4.85 0 0 1-1.02-.1z" />
                  </svg>
                </SocialIcon>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
