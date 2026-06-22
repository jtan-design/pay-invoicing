export const PayLogo = ({ size = 28 }: { size?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    {/* Square P icon */}
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill="#1A56DB" />
      <text x="9" y="22" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="18" fill="white">P</text>
    </svg>
    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: size * 0.57, color: '#1E293B', letterSpacing: '-0.3px' }}>
      pay.com.au
    </span>
  </div>
)

export const PayIconOnly = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#1A56DB" />
    <text x="9" y="22" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="18" fill="white">P</text>
  </svg>
)
