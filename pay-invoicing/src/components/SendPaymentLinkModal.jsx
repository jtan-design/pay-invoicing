import { useState } from 'react'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 }).format(n)

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }}
      className="text-xs px-2.5 py-1 rounded-lg border transition-all font-medium"
      style={
        copied
          ? { borderColor: '#16A34A', color: '#16A34A', background: '#F0FDF4' }
          : { borderColor: '#CBD5E1', color: '#64748B', background: 'white' }
      }
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

export default function SendPaymentLinkModal({ customer, onClose }) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState(customer?.email || '')
  const [acceptCard, setAcceptCard] = useState(true)
  const [acceptBank, setAcceptBank] = useState(true)
  const [sent, setSent] = useState(false)

  const mockToken = 'xK8mP2nQ'
  const paymentLink = `pay.com.au/pay/${mockToken}`
  const canSend = amount && parseFloat(amount) > 0

  const inputStyle = {
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    color: '#1E293B',
    width: '100%',
    outline: 'none',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(15,23,42,0.45)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[500px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {!sent ? (
          <>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: '#E2E8F0' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-semibold" style={{ color: '#1E293B' }}>
                    Send a payment link
                  </h2>
                  <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>
                    to <span className="font-medium" style={{ color: '#1E293B' }}>{customer?.name}</span>
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              {/* Amount */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: '#64748B' }}>
                  Amount (AUD) <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium" style={{ color: '#94A3B8' }}>$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    style={{ ...inputStyle, paddingLeft: '24px' }}
                    onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
                    onBlur={(e) => (e.target.style.boxShadow = '')}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: '#64748B' }}>
                  Description <span className="font-normal normal-case" style={{ color: '#94A3B8' }}>optional</span>
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this payment for?"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
                  onBlur={(e) => (e.target.style.boxShadow = '')}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: '#64748B' }}>
                  Send to
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@email.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #1A56DB33')}
                  onBlur={(e) => (e.target.style.boxShadow = '')}
                />
                {!customer?.email && (
                  <p className="text-xs mt-1" style={{ color: '#D97706' }}>
                    No email on file — add one above to send this link.
                  </p>
                )}
              </div>

              {/* Payment methods */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide mb-2" style={{ color: '#64748B' }}>
                  Accept payment via
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'bank', label: 'Bank transfer (PayID / BSB)', checked: acceptBank, onChange: setAcceptBank },
                    { key: 'card', label: 'Card (Visa / Mastercard / Amex)', checked: acceptCard, onChange: setAcceptCard },
                  ].map(({ key, label, checked, onChange }) => (
                    <label key={key} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded"
                        style={{ accentColor: '#1A56DB' }}
                      />
                      <span className="text-sm" style={{ color: '#374151' }}>{label}</span>
                    </label>
                  ))}
                </div>
                {acceptCard && (
                  <p className="text-xs mt-2 ml-7 px-3 py-1.5 rounded-lg" style={{ color: '#92400E', background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                    A 1.8% card processing fee will apply to your customer.
                  </p>
                )}
              </div>

              {/* V1 honesty note */}
              <div className="rounded-lg px-4 py-3 text-xs leading-relaxed" style={{ background: '#F8FAFF', border: '1px solid #C7D7F5', color: '#475569' }}>
                <strong className="text-slate-600">Note:</strong> Send payment link is a lightweight V1 action. Once invoicing is available, you'll be able to send a full tax invoice from this customer's profile instead.
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t flex gap-3 justify-end" style={{ borderColor: '#E2E8F0' }}>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium rounded-lg border hover:bg-slate-50 transition-colors"
                style={{ borderColor: '#E2E8F0', color: '#64748B' }}
              >
                Cancel
              </button>
              <button
                onClick={() => canSend && setSent(true)}
                disabled={!canSend}
                className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all disabled:opacity-40"
                style={{ background: canSend ? '#1A56DB' : '#94A3B8' }}
              >
                Send link
              </button>
            </div>
          </>
        ) : (
          // Success state
          <div className="px-6 py-8 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: '#DCFCE7', border: '3px solid #86EFAC' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L19 7" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-1" style={{ color: '#1E293B' }}>Payment link sent</h3>
            <p className="text-sm mb-5" style={{ color: '#64748B' }}>
              {email ? `Sent to ${email}` : 'Link created'}
              {amount && ` · ${fmt(parseFloat(amount))}`}
            </p>

            <div
              className="rounded-xl p-4 mb-5 text-left"
              style={{ background: '#F8FAFF', border: '1px solid #C7D7F5' }}
            >
              <p className="text-xs font-medium mb-2" style={{ color: '#64748B' }}>Payment link</p>
              <div className="flex items-center justify-between gap-3">
                <code className="text-sm font-mono flex-1 truncate" style={{ color: '#1E293B' }}>{paymentLink}</code>
                <CopyButton value={paymentLink} />
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-sm font-medium text-white rounded-xl"
              style={{ background: '#1A56DB' }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
