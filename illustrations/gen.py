DEFS = '''<defs>
<linearGradient id="silver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f8fa"/><stop offset=".35" stop-color="#c3c8cf"/><stop offset=".6" stop-color="#eef0f3"/><stop offset="1" stop-color="#9ba1ab"/></linearGradient>
<linearGradient id="silverDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9aa0a9"/><stop offset="1" stop-color="#6f7681"/></linearGradient>
<linearGradient id="blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7db6ff"/><stop offset=".35" stop-color="#1a63ff"/><stop offset=".7" stop-color="#0a3fd0"/><stop offset="1" stop-color="#4c93ff"/></linearGradient>
<linearGradient id="blueDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a3fd0"/><stop offset="1" stop-color="#061f7a"/></linearGradient>
<linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#e9edf2"/><stop offset="1" stop-color="#cdd3db"/></linearGradient>
<linearGradient id="bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8c93a0"/><stop offset="1" stop-color="#c4c9d1"/></linearGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#3b86ff" stop-opacity=".35"/><stop offset="1" stop-color="#3b86ff" stop-opacity="0"/></radialGradient>
<filter id="sh" filterUnits="userSpaceOnUse" x="-150" y="-150" width="700" height="700"><feGaussianBlur in="SourceAlpha" stdDeviation="9"/><feOffset dy="14"/><feComponentTransfer><feFuncA type="linear" slope=".28"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="soft" x="-50%" y="-300%" width="200%" height="700%"><feGaussianBlur stdDeviation="14"/></filter>
</defs>'''

def sheet(x, y, rot=-8, scale=1, paid=False):
    # floating invoice: thickness layers + face
    lines = ''.join(f'<rect x="28" y="{118+i*30}" width="{w}" height="9" rx="4.5" fill="url(#bar)"/><rect x="{196-a}" y="{118+i*30}" width="{a}" height="9" rx="4.5" fill="url(#bar)" opacity=".8"/>' for i,(w,a) in enumerate([(92,34),(70,34),(106,34)]))
    badge = ('<g transform="translate(196 252)"><circle r="26" fill="url(#blue)"/><circle r="26" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><path d="M-11 0 L-3 9 L12 -9" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>' if paid else '')
    return f'''<g transform="translate({x} {y}) rotate({rot}) scale({scale})" filter="url(#sh)">
<rect x="6" y="10" width="224" height="300" rx="20" fill="url(#silverDark)"/>
<rect x="3" y="5" width="224" height="300" rx="20" fill="#a9afb8"/>
<rect x="0" y="0" width="224" height="300" rx="20" fill="url(#paper)"/>
<rect x="0" y="0" width="224" height="300" rx="20" fill="none" stroke="#fff" stroke-width="2" opacity=".9"/>
<text x="28" y="48" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="20" letter-spacing="1.5" fill="#5b6472">INVOICE</text>
<text x="28" y="70" font-family="Inter,Arial,sans-serif" font-size="11" fill="#8a919c">#PAY-000001</text>
<rect x="28" y="84" width="168" height="2" rx="1" fill="#c3c8cf"/>
{lines}
<rect x="28" y="224" width="168" height="2" rx="1" fill="#c3c8cf"/>
<rect x="28" y="244" width="60" height="12" rx="6" fill="url(#blue)"/>
<rect x="96" y="244" width="40" height="12" rx="6" fill="url(#blue)" opacity=".5"/>
{badge}
<path d="M0 0 H224 V60 Q150 40 110 14 Q60 -4 0 0Z" fill="#fff" opacity=".35"/>
</g>'''

def coin(x, y, r=46, color='silver', label='$', tilt=-18, depth=9):
    face = 'blue' if color=='blue' else 'silver'
    side = 'blueDark' if color=='blue' else 'silverDark'
    txt = '#fff' if color=='blue' else '#f3f4f6'
    layers = ''.join(f'<ellipse cx="{d*0.9}" cy="{d*0.5}" rx="{r*0.82}" ry="{r}" fill="url(#{side})"/>' for d in range(depth,0,-1))
    return f'''<g transform="translate({x} {y}) rotate({tilt})" filter="url(#sh)">{layers}
<ellipse rx="{r*0.82}" ry="{r}" fill="url(#{face})"/>
<ellipse rx="{r*0.82-5}" ry="{r-5}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5"/>
<text y="{r*0.3}" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="{r*0.95}" fill="{txt}" stroke="#000" stroke-opacity=".12" stroke-width="1">{label}</text>
</g>'''

def plane(x, y, rot=-12, s=1):
    return f'''<g transform="translate({x} {y}) rotate({rot}) scale({s})" filter="url(#sh)">
<path d="M0 40 L170 0 L70 110 L58 62Z" fill="url(#blue)"/>
<path d="M58 62 L170 0 L70 110Z" fill="url(#blueDark)" opacity=".85"/>
<path d="M58 62 L70 110 L96 78Z" fill="#061f7a"/>
<path d="M0 40 L170 0 L58 62Z" fill="#fff" opacity=".22"/>
</g>'''

def chip(x, y, t, fg='#0a52ff', rot=0):
    w = 44 + len(t)*9
    return f'''<g transform="translate({x} {y}) rotate({rot})" filter="url(#sh)"><rect width="{w}" height="32" rx="16" fill="#fff"/><rect width="{w}" height="32" rx="16" fill="none" stroke="#c9d9ff" stroke-width="1.5"/><circle cx="16" cy="16" r="4.5" fill="{fg}"/><text x="28" y="21.5" font-family="Inter,Arial,sans-serif" font-weight="600" font-size="14" fill="{fg}">{t}</text></g>'''

def envelope(x, y, rot=10, s=1):
    return f'''<g transform="translate({x} {y}) rotate({rot}) scale({s})" filter="url(#sh)"><rect width="150" height="100" rx="8" fill="url(#silver)"/><path d="M0 8 Q0 0 8 0 H142 Q150 0 150 8 L75 62Z" fill="#dfe3e8"/><path d="M0 100 L56 48 M150 100 L94 48" stroke="#9ba1ab" stroke-width="1.5" fill="none"/><circle cx="75" cy="62" r="9" fill="url(#blue)"/></g>'''

def wrap(body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 440" width="1200" height="880">{DEFS}<ellipse cx="300" cy="400" rx="190" ry="22" fill="#0a3fd0" opacity=".12" filter="url(#soft)"/>{body}</svg>'

A = wrap(plane(40,60,-10,1.25) + sheet(205,70,-7,1) + chip(80,300,'Sent') + coin(470,150,34,'blue','$',-16,7))
B = wrap(sheet(150,60,-6,1,paid=True) + coin(430,270,50,'silver','$',-16,10) + coin(500,170,32,'blue','$',-16,7) + chip(40,150,'Sent','#5b6472') + chip(395,70,'Paid','#0a8a4a',6))
C = wrap(envelope(60,250,-8,1.05) + sheet(240,45,-9,1.0) + plane(60,70,-14,0.95) + chip(420,330,'Scheduled','#0a52ff') + coin(110,200,0,'silver','',0,0))
C = C.replace(coin(110,200,0,'silver','',0,0),'')
import os
for n,s in (('A_send',A),('B_paid',B),('C_dispatch',C)):
    open(f'{n}.svg','w').write(s)
