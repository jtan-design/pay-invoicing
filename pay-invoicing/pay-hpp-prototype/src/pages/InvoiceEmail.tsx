import { useParams, useNavigate } from 'react-router-dom'
import { getInvoiceById } from '../data/invoices'
import { PayLogo } from '../components/PayLogo'
import { generatePDF } from '../utils/pdf'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n)

const EMAILS = [
  { from: 'accounts@grahamplumbers.com.au', label: 'Graham Plumbers' },
  { from: 'steve.graham@grahamplumbers.com.au', label: 'Steve' },
  { from: 'noreply@pay.com.au', label: 'Pay' },
]

export const InvoiceEmail = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>()
  const navigate = useNavigate()
  const invoice = getInvoiceById(invoiceId ?? '')

  if (!invoice) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ color: 'var(--pay-mid)' }}>Invoice not found.</p>
      </div>
    )
  }

  const handleDownload = () => generatePDF(invoice)
  const handlePay = () => navigate(`/pay/${invoice.token}`)

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif', background: '#f0f2f5' }}>
      {/* Sidebar */}
      <div style={{
        width: 240,
        background: '#f8f9fa',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        {/* Gmail-style header */}
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
          {['Inbox (3)', 'Starred', 'Sent', 'Drafts', 'More'].map((item, i) => (
            <div key={item} style={{
              padding: '8px 16px',
              fontSize: 13,
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
            from: `pay.com.au via ${invoice.from.businessName}`,
            subject: `Invoice ${invoice.number} — ${fmt(invoice.total)} due ${invoice.dueDate}`,
            preview: 'You have a new invoice waiting for payment. Click to view and pay securely.',
            time: invoice.issueDate,
            unread: true,
            active: true,
          },
          {
            from: 'Commonwealth Bank',
            subject: 'Your June 2026 statement is ready',
            preview: 'Hi Steve, your monthly statement is now available.',
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

          {/* Email meta */}
          <div style={{ padding: '20px 28px', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#202124', marginBottom: 12 }}>
              Invoice {invoice.number} — {fmt(invoice.total)} due {invoice.dueDate}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1A56DB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 600, flexShrink: 0 }}>
                {invoice.from.businessName[0]}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#202124' }}>
                  {invoice.from.businessName} <span style={{ color: '#777', fontWeight: 400 }}>&lt;{invoice.from.email}&gt;</span>
                </div>
                <div style={{ fontSize: 12, color: '#777' }}>
                  to {EMAILS[0].from} · {invoice.issueDate}
                </div>
              </div>
            </div>
          </div>

          {/* Email body */}
          <div style={{ padding: '28px 28px' }}>
            <p style={{ fontSize: 14, color: '#333', marginBottom: 16 }}>
              Hi {invoice.to.contactName.split(' ')[0]},
            </p>
            <p style={{ fontSize: 14, color: '#333', marginBottom: 24, lineHeight: 1.6 }}>
              {invoice.from.businessName} has sent you an invoice for <strong>{fmt(invoice.total)}</strong>,
              due <strong>{invoice.dueDate}</strong>.
            </p>

            {/* Invoice card */}
            <div style={{
              border: '1px solid #E2E8F0',
              borderRadius: 10,
              overflow: 'hidden',
              marginBottom: 24,
            }}>
              {/* Invoice card header */}
              <div style={{ background: '#1A56DB', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginBottom: 4 }}>INVOICE</div>
                  <div style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>{invoice.number}</div>
                </div>
                <PayLogo size={24} />
              </div>

              {/* Invoice details */}
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--pay-mid)', fontWeight: 500, marginBottom: 2 }}>FROM</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pay-dark)' }}>{invoice.from.businessName}</div>
                    <div style={{ fontSize: 12, color: 'var(--pay-mid)' }}>ABN {invoice.from.abn}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'var(--pay-mid)', fontWeight: 500, marginBottom: 2 }}>ISSUED</div>
                    <div style={{ fontSize: 13, color: 'var(--pay-dark)' }}>{invoice.issueDate}</div>
                    <div style={{ fontSize: 11, color: 'var(--pay-mid)', marginTop: 8, fontWeight: 500 }}>DUE DATE</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: invoice.status === 'overdue' ? 'var(--pay-red)' : 'var(--pay-dark)' }}>{invoice.dueDate}</div>
                  </div>
                </div>

                {/* Line items */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      {['Description', 'Qty', 'Rate', 'Amount'].map((h, i) => (
                        <th key={h} style={{ padding: '8px 10px', fontSize: 11, fontWeight: 600, color: 'var(--pay-mid)', textAlign: i === 0 ? 'left' : 'right' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.lineItems.map((li, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '9px 10px', fontSize: 13, color: 'var(--pay-dark)' }}>
                          {li.description}{li.gst && <span style={{ fontSize: 11, color: 'var(--pay-mid)', marginLeft: 4 }}>+GST</span>}
                        </td>
                        <td style={{ padding: '9px 10px', fontSize: 13, textAlign: 'right', color: 'var(--pay-mid)' }}>{li.qty}</td>
                        <td style={{ padding: '9px 10px', fontSize: 13, textAlign: 'right', color: 'var(--pay-mid)' }}>{fmt(li.rate)}</td>
                        <td style={{ padding: '9px 10px', fontSize: 13, fontWeight: 500, textAlign: 'right', color: 'var(--pay-dark)' }}>{fmt(li.qty * li.rate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', gap: 32, fontSize: 13, color: 'var(--pay-mid)' }}>
                    <span>Subtotal</span><span style={{ minWidth: 80, textAlign: 'right' }}>{fmt(invoice.subtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 32, fontSize: 13, color: 'var(--pay-mid)' }}>
                    <span>GST (10%)</span><span style={{ minWidth: 80, textAlign: 'right' }}>{fmt(invoice.gst)}</span>
                  </div>
                  <div style={{ width: '100%', maxWidth: 220, height: 1, background: '#E2E8F0', margin: '4px 0' }} />
                  <div style={{ display: 'flex', gap: 32, fontSize: 16, fontWeight: 700, color: 'var(--pay-dark)' }}>
                    <span>Total</span><span style={{ minWidth: 80, textAlign: 'right' }}>{fmt(invoice.total)}</span>
                  </div>
                </div>

                {invoice.notes && (
                  <div style={{ marginTop: 16, padding: '10px 12px', background: '#F8FAFC', borderRadius: 6, fontSize: 12, color: 'var(--pay-mid)' }}>
                    {invoice.notes}
                  </div>
                )}
              </div>

              {/* CTA footer */}
              <div style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <button
                  onClick={handlePay}
                  style={{
                    background: 'var(--pay-blue)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    padding: '10px 24px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Pay {fmt(invoice.total)} →
                </button>
                <button
                  onClick={handleDownload}
                  style={{
                    background: 'white',
                    color: 'var(--pay-dark)',
                    fontSize: 13,
                    fontWeight: 500,
                    padding: '9px 18px',
                    borderRadius: 8,
                    border: '1px solid var(--pay-border)',
                    cursor: 'pointer',
                  }}
                >
                  Download PDF
                </button>
              </div>
            </div>

            <p style={{ fontSize: 12, color: '#999', lineHeight: 1.6 }}>
              This invoice was sent securely via pay.com.au.
              If you didn't expect this invoice, you can safely ignore this email.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
