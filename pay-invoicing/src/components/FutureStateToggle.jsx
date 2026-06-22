export default function FutureStateToggle({ state, onChange }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: 240,
        zIndex: 100,
        background: '#fff',
        borderRadius: 24,
        padding: 4,
        boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        userSelect: 'none',
      }}
    >
      <span style={{ fontSize: 11, color: '#94A3B8', padding: '2px 8px', fontWeight: 500 }}>
        View:
      </span>
      {['current', 'future'].map(s => (
        <button
          key={s}
          onClick={() => onChange(s)}
          style={{
            padding: '4px 14px',
            borderRadius: 20,
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 500,
            background: state === s ? '#1A56DB' : 'transparent',
            color: state === s ? '#fff' : '#64748B',
            transition: 'background 0.15s, color 0.15s',
          }}
        >
          {s === 'current' ? 'Current' : 'Future state'}
        </button>
      ))}
    </div>
  )
}
