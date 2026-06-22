import { useState } from 'react'

interface Props {
  label: string
  value: string
  mono?: boolean
}

export const CopyField = ({ label, value, mono }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 12, color: 'var(--pay-mid)', fontWeight: 500 }}>{label}</span>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        background: 'var(--pay-light)',
        border: '1px solid var(--pay-border)',
        borderRadius: 6,
        padding: '8px 12px',
      }}>
        <span style={{
          fontSize: 13,
          color: 'var(--pay-dark)',
          fontFamily: mono ? 'monospace' : 'inherit',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
        }}>
          {value}
        </span>
        <button
          onClick={handleCopy}
          style={{
            flexShrink: 0,
            fontSize: 12,
            fontWeight: 500,
            color: copied ? 'var(--pay-green)' : 'var(--pay-blue)',
            background: 'none',
            padding: '2px 8px',
            borderRadius: 4,
            border: '1px solid',
            borderColor: copied ? 'var(--pay-green)' : 'var(--pay-border)',
            transition: 'all 0.15s',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
