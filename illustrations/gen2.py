import re
from gen import DEFS
EXTRA = '''<linearGradient id="cyl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8dbcff"/><stop offset=".3" stop-color="#2a6bff"/><stop offset=".75" stop-color="#0a3fd0"/><stop offset="1" stop-color="#061f7a"/></linearGradient>
<linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4b8bff"/><stop offset=".5" stop-color="#1a5cff"/><stop offset="1" stop-color="#0b3bc4"/></linearGradient>
<linearGradient id="under" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0a2f9e"/><stop offset="1" stop-color="#1a4fe0"/></linearGradient>
<linearGradient id="navy" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0a2f9e"/><stop offset="1" stop-color="#1b46c8"/></linearGradient>
<linearGradient id="coinSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8e949e"/><stop offset=".4" stop-color="#eef0f3"/><stop offset="1" stop-color="#7c828c"/></linearGradient>
<linearGradient id="coinSideB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0a3fd0"/><stop offset=".4" stop-color="#5a9bff"/><stop offset="1" stop-color="#061f7a"/></linearGradient>
<filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>'''
D = DEFS.replace('</defs>', EXTRA + '</defs>').replace('x="-150" y="-150" width="700" height="700"','x="-300" y="-300" width="1400" height="1400"')

def stack(cx, cy, n, rx=62, ry=22, h=15):
    out = ''
    for i in range(n):
        y = cy - i*h
        side = 'coinSideB' if i % 3 == 1 else 'coinSide'
        out += f'<path d="M{cx-rx} {y} v{h} A{rx} {ry} 0 0 0 {cx+rx} {y+h} v{-h}Z" fill="url(#{side})"/>'
        out += f'<path d="M{cx-rx} {y+h*0.5} A{rx} {ry} 0 0 0 {cx+rx} {y+h*0.5}" fill="none" stroke="#000" stroke-opacity=".12"/>'
        out += f'<ellipse cx="{cx}" cy="{y}" rx="{rx}" ry="{ry}" fill="url(#silver)"/>'
    top = cy - (n-1)*h
    out += f'<ellipse cx="{cx}" cy="{top}" rx="{rx-9}" ry="{ry-4}" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="1.5"/>'
    out += f'<text x="{cx}" y="{top+9}" text-anchor="middle" transform="scale(1 .55)" transform-origin="{cx} {top}" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="34" fill="#aab0b9" stroke="#fff" stroke-opacity=".6">$</text>'
    return f'<g filter="url(#sh)">{out}</g>'

def coin(x, y, r, face, rot=-15, label='$', depth=9):
    side = 'silverDark' if face=='silver' else 'blueDark'
    layers = ''.join(f'<ellipse cx="{d*0.9}" cy="{d*0.5}" rx="{r*0.82}" ry="{r}" fill="url(#{side})"/>' for d in range(depth,0,-1))
    return f'''<g transform="translate({x} {y}) rotate({rot})" filter="url(#sh)">{layers}<ellipse rx="{r*0.82}" ry="{r}" fill="url(#{face})"/><ellipse rx="{r*0.82-5}" ry="{r-5}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/><text y="{r*0.32}" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="{r}" fill="#fff" fill-opacity=".92">{label}</text></g>'''

def cube(x, y, s, rot=0, blur=False):
    f = ' filter="url(#blur)" opacity=".7"' if blur else ' filter="url(#sh)"'
    return f'''<g transform="translate({x} {y}) rotate({rot})"{f}><path d="M0 {s*.3} L{s*.5} 0 L{s} {s*.3} L{s*.5} {s*.6}Z" fill="#f4f6f8"/><path d="M0 {s*.3} L{s*.5} {s*.6} V{s*1.1} L0 {s*.8}Z" fill="url(#silver)"/><path d="M{s} {s*.3} L{s*.5} {s*.6} V{s*1.1} L{s} {s*.8}Z" fill="url(#silverDark)"/></g>'''

scroll = '''
<g filter="url(#sh)">
  <path d="M150 185 C250 172 330 162 410 150 L410 468 C330 482 240 502 150 522Z" fill="url(#body)"/>
  <path d="M150 185 C250 172 330 162 410 150 L410 215 C330 228 250 232 150 250Z" fill="#fff" opacity=".16"/>
  <!-- top roll curling back over the top-right -->
  <path d="M150 185 C250 172 330 162 410 150 C470 141 498 176 484 232" fill="none" stroke="#061f7a" stroke-width="46" stroke-linecap="round"/>
  <path d="M150 185 C250 172 330 162 410 150 C470 141 498 176 484 232" fill="none" stroke="url(#cyl)" stroke-width="38" stroke-linecap="round" transform="translate(0 -2)"/>
  <path d="M158 175 C255 162 335 152 410 140 C452 134 474 150 478 175" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="8" stroke-linecap="round"/>
  <path d="M484 232 l0 -6" stroke="#0a2f9e" stroke-width="30" stroke-linecap="round"/>
  <!-- bottom roll curling forward -->
  <path d="M150 522 C240 502 330 482 410 468" fill="none" stroke="#061f7a" stroke-width="54" stroke-linecap="round"/>
  <path d="M150 518 C240 498 330 478 410 464" fill="none" stroke="url(#cyl)" stroke-width="44" stroke-linecap="round"/>
  <path d="M156 504 C245 484 332 464 404 450" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="8" stroke-linecap="round"/>
  <ellipse cx="146" cy="520" rx="18" ry="27" fill="#0a2f9e"/><ellipse cx="146" cy="520" rx="9" ry="15" fill="#061f7a"/>
</g>
<g transform="rotate(-4 280 340)">
<rect x="180" y="238" width="104" height="86" rx="10" fill="#fff" fill-opacity=".14" stroke="#fff" stroke-opacity=".45"/>
<g filter="url(#sh)"><text x="278" y="362" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="150" fill="url(#silver)" stroke="#fff" stroke-width="2">$</text></g>
<rect x="180" y="384" width="190" height="28" rx="14" fill="url(#navy)"/><rect x="180" y="384" width="190" height="9" rx="4.5" fill="#fff" opacity=".15"/>
<rect x="180" y="424" width="130" height="22" rx="11" fill="url(#navy)" opacity=".85"/>
</g>
'''

body = (cube(60,70,70,-12,True) + cube(430,300,70,10,False) +
        coin(78,300,40,'blueDark',-12,'$',8) +
        scroll +
        stack(272,168,5) +
        coin(440,520,34,'silver',-14,'$',7) +
        cube(40,500,50,8,True))

svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 55 540 555" width="1080" height="1110">{D}<ellipse cx="270" cy="565" rx="170" ry="18" fill="#0a3fd0" opacity=".14" filter="url(#blur)"/>{body}</svg>'
open('D_scroll.svg','w').write(svg)
