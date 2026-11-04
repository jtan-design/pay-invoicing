import math
F = "Inter,Helvetica,Arial,sans-serif"

DEFS = f'''<defs>
<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfcfd"/><stop offset=".18" stop-color="#cfd4da"/><stop offset=".34" stop-color="#8f96a1"/><stop offset=".5" stop-color="#e4e7eb"/><stop offset=".72" stop-color="#b3b9c2"/><stop offset="1" stop-color="#7d848f"/></linearGradient>
<linearGradient id="metalH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7d848f"/><stop offset=".15" stop-color="#e9ecef"/><stop offset=".4" stop-color="#b0b6bf"/><stop offset=".62" stop-color="#f6f7f9"/><stop offset=".85" stop-color="#a2a9b3"/><stop offset="1" stop-color="#6c737e"/></linearGradient>
<linearGradient id="metalV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8f9fb"/><stop offset=".45" stop-color="#c2c7ce"/><stop offset="1" stop-color="#868d98"/></linearGradient>
<linearGradient id="metalDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9aa1ab"/><stop offset="1" stop-color="#5f6670"/></linearGradient>
<linearGradient id="blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9cc8ff"/><stop offset=".3" stop-color="#2a6dff"/><stop offset=".7" stop-color="#0a3fd0"/><stop offset="1" stop-color="#5a9cff"/></linearGradient>
<linearGradient id="blueDeep" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a3fd0"/><stop offset="1" stop-color="#051a66"/></linearGradient>
<linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#eef1f6"/><stop offset="1" stop-color="#d5dbe5"/></linearGradient>
<linearGradient id="paperEdge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9cfd9"/><stop offset="1" stop-color="#8e97a6"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".85"/><stop offset=".5" stop-color="#cfe0ff" stop-opacity=".45"/><stop offset="1" stop-color="#7aa8ff" stop-opacity=".55"/></linearGradient>
<linearGradient id="ring" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset=".35" stop-color="#9ec3ff" stop-opacity=".55"/><stop offset=".65" stop-color="#e9eef6" stop-opacity=".85"/><stop offset="1" stop-color="#4f8cff" stop-opacity=".6"/></linearGradient>
<linearGradient id="bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9aa2af"/><stop offset="1" stop-color="#cfd4dc"/></linearGradient>
<radialGradient id="glowB" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#4b8bff" stop-opacity=".9"/><stop offset="1" stop-color="#4b8bff" stop-opacity="0"/></radialGradient>
<filter id="sh" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1400" height="1400"><feGaussianBlur in="SourceAlpha" stdDeviation="10"/><feOffset dy="16"/><feComponentTransfer><feFuncA type="linear" slope=".3"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="shS" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1400" height="1400"><feGaussianBlur in="SourceAlpha" stdDeviation="4"/><feOffset dy="5"/><feComponentTransfer><feFuncA type="linear" slope=".3"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="soft" x="-50%" y="-300%" width="200%" height="700%"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="brush" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1400" height="1400"><feTurbulence type="fractalNoise" baseFrequency="0.004 1.4" numOctaves="1" seed="9"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.2 -.4"/><feComposite operator="in" in2="SourceGraphic"/></filter>
</defs>'''

def brushed(shape_d, op=.35, tf=''):
    return f'<path d="{shape_d}" fill="#000" filter="url(#brush)" opacity="{op}" {("transform="+chr(34)+tf+chr(34)) if tf else ""}/>'

def docicon(x, y, s=1, col='#2a3550'):
    return f'<g transform="translate({x} {y}) scale({s})"><path d="M0 4 Q0 0 4 0 H16 L26 10 V32 Q26 36 22 36 H4 Q0 36 0 32Z" fill="none" stroke="{col}" stroke-width="2.6" stroke-linejoin="round"/><path d="M16 0 V8 Q16 10 18 10 H26" fill="none" stroke="{col}" stroke-width="2.6" stroke-linejoin="round"/><path d="M7 19 H19 M7 26 H19" stroke="{col}" stroke-width="2.6" stroke-linecap="round"/></g>'

def paid_chip(x, y, s=1, rot=0):
    return f'''<g transform="translate({x} {y}) rotate({rot}) scale({s})" filter="url(#shS)"><rect width="86" height="32" rx="16" fill="url(#blue)"/><rect x="2" y="2" width="82" height="14" rx="7" fill="#fff" opacity=".28"/><rect width="86" height="32" rx="16" fill="none" stroke="#fff" stroke-opacity=".6"/><text x="16" y="21.5" font-family="{F}" font-weight="700" font-size="14" fill="#fff">Paid</text><path d="M56 16.5 l5 5 l9 -10" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g>'''

def lines(x, y, widths, gap=17, h=7):
    return ''.join(f'<rect x="{x}" y="{y+i*gap}" width="{w}" height="{h}" rx="{h/2}" fill="url(#bar)" opacity="{.9 - i*.1}"/>' for i, w in enumerate(widths))

def coin(x, y, r, kind='silver', rot=-16, depth=12, label='$'):
    rx = r*0.80
    face = 'metal' if kind == 'silver' else 'blue'
    sideg = 'metalH' if kind == 'silver' else 'blueDeep'
    ring = '#ffffff' if kind == 'silver' else '#cfe2ff'
    # edge: stacked offset ellipses + reeding ticks
    edge = ''.join(f'<ellipse cx="{d*0.95}" cy="{d*0.55}" rx="{rx}" ry="{r}" fill="url(#{sideg})"/>' for d in range(depth, 0, -1))
    ticks = ''
    for i in range(-18, 19):
        a = math.radians(i*4.2 + 18)
        px, py = rx*math.cos(a)+depth*0.95*0.5, r*math.sin(a)+depth*0.55*0.5
    tickline = ''.join(
        f'<path d="M{rx*math.cos(a):.1f} {r*math.sin(a):.1f} l{depth*0.95:.1f} {depth*0.55:.1f}" stroke="#000" stroke-opacity=".14" stroke-width="1"/>'
        for a in [math.radians(k*5) for k in range(-14, 22)])
    txtcol = '#f2f4f7' if kind == 'silver' else '#ffffff'
    return f'''<g transform="translate({x} {y}) rotate({rot})" filter="url(#sh)">{edge}{tickline}
<ellipse rx="{rx}" ry="{r}" fill="url(#{face})"/>
<ellipse rx="{rx-r*.1}" ry="{r-r*.1}" fill="none" stroke="{ring}" stroke-opacity=".75" stroke-width="2"/>
<ellipse rx="{rx-r*.17}" ry="{r-r*.17}" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="1.5"/>
<text y="{r*.36+2}" x="2" text-anchor="middle" font-family="{F}" font-weight="900" font-size="{r*1.15}" fill="#000" fill-opacity=".22">{label}</text>
<text y="{r*.36}" text-anchor="middle" font-family="{F}" font-weight="900" font-size="{r*1.15}" fill="{txtcol}" stroke="#fff" stroke-opacity=".5" stroke-width=".8">{label}</text>
<path d="M{-rx*.8} {-r*.45} A{rx} {r} 0 0 1 {rx*.15} {-r*.98}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>
</g>'''

def glass_tile(x, y, s, content, rot=0):
    return f'''<g transform="translate({x} {y}) rotate({rot})" filter="url(#sh)">
<rect x="4" y="8" width="{s}" height="{s}" rx="{s*.22}" fill="#6f95e8" opacity=".55"/>
<rect width="{s}" height="{s}" rx="{s*.22}" fill="url(#glass)"/>
<rect width="{s}" height="{s}" rx="{s*.22}" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="2"/>
<rect x="3" y="3" width="{s-6}" height="{s*.4}" rx="{s*.18}" fill="#fff" opacity=".35"/>
{content}</g>'''

def wrap(body, w=560, h=480):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w*2}" height="{h*2}">{DEFS}<ellipse cx="{w/2}" cy="{h-34}" rx="{w*.32}" ry="20" fill="#0a3fd0" opacity=".16" filter="url(#soft)"/>{body}</svg>'

# ---------- 1. Scroll with orbiting glass ring ----------
def asset_scroll():
    ring_back = '<path d="M60 300 C60 230 190 190 330 205 C440 217 500 250 490 285" fill="none" stroke="url(#ring)" stroke-width="16" stroke-linecap="round" opacity=".7"/>'
    ring_front = '<path d="M60 300 C70 345 190 372 330 358 C430 348 495 318 490 285" fill="none" stroke="url(#ring)" stroke-width="18" stroke-linecap="round"/><path d="M80 312 C120 345 210 362 330 350" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>'
    sheet = f'''<g filter="url(#sh)">
<path d="M160 104 L338 96 C352 190 352 252 336 322 C275 334 215 326 160 302 C147 232 147 168 160 104Z" fill="url(#paper)"/>
<path d="M336 322 C380 316 440 334 474 376 C425 362 372 374 332 396 C265 414 195 384 160 302 C215 326 275 334 336 322Z" fill="url(#paper)"/>
<path d="M336 322 C380 316 440 334 474 376 C425 362 372 374 332 396 C300 405 270 405 244 396 C300 380 330 360 336 322Z" fill="url(#paperEdge)" opacity=".45"/>
<path d="M148 112 C220 96 290 90 346 94" fill="none" stroke="#9aa3b3" stroke-width="44" stroke-linecap="round"/>
<path d="M148 108 C220 92 290 86 346 90" fill="none" stroke="url(#paper)" stroke-width="36" stroke-linecap="round"/>
<path d="M156 94 C224 80 290 74 340 78" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".9"/>
<ellipse cx="146" cy="110" rx="15" ry="22" fill="#aab2c1"/><ellipse cx="146" cy="110" rx="8" ry="13" fill="#7d8798"/>
</g>
<g transform="translate(176 130)">{docicon(0,0,1.1)}<text y="76" font-family="{F}" font-weight="700" font-size="26" fill="#27304a">Invoice</text>
{lines(0, 96, [124, 96, 138, 80])}
</g>
{paid_chip(240, 214, 1, 2)}
'''
    bar = '<g transform="translate(26 70)"><rect x="0" y="34" width="10" height="16" rx="3" fill="url(#blue)"/><rect x="17" y="20" width="10" height="30" rx="3" fill="url(#blue)"/><rect x="34" y="4" width="10" height="46" rx="3" fill="url(#blue)"/></g>'
    check = '<path d="M22 44 l13 13 l26 -28" transform="translate(0 -2)" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 44 l13 13 l26 -28" transform="translate(0 2)" fill="none" stroke="#1a4fd0" stroke-opacity=".35" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>'
    body = (ring_back + sheet + ring_front +
            coin(70, 150, 44, 'silver', -18, 12) +
            coin(440, 330, 46, 'blue', -14, 12) +
            glass_tile(380, 38, 82, bar, 8) +
            glass_tile(62, 346, 84, check, -8))
    return wrap(body)

# ---------- 2. Folder of invoices ----------
def asset_folder():
    back = f'''<g filter="url(#sh)"><path d="M70 120 Q70 100 90 100 H200 Q215 100 224 112 L236 128 H460 Q480 128 480 148 V380 Q480 398 462 398 H88 Q70 398 70 380Z" fill="url(#metalV)"/></g>
{brushed("M70 120 Q70 100 90 100 H200 Q215 100 224 112 L236 128 H460 Q480 128 480 148 V380 Q480 398 462 398 H88 Q70 398 70 380Z", .25)}'''
    sheets = ''
    for i, (dx, dy, r) in enumerate([(0, 0, -3), (28, 18, 0), (58, 40, 3)]):
        sheets += f'<g transform="translate({120+dx} {70+dy}) rotate({r})" filter="url(#shS)"><rect width="270" height="240" rx="16" fill="url(#paper)"/><rect width="270" height="240" rx="16" fill="none" stroke="#fff" stroke-width="2"/></g>'
    top = f'''<g transform="translate(178 110)">{docicon(0,0,1.2)}<text y="82" font-family="{F}" font-weight="700" font-size="30" fill="#27304a">Invoice</text>{lines(0, 104, [190, 150, 110], 20, 8)}</g>'''
    front_d = "M60 235 Q60 215 82 213 L206 205 Q226 204 238 216 L256 233 Q268 244 286 244 H462 Q490 244 488 270 L474 390 Q472 410 452 410 H84 Q62 410 60 388Z"
    front = f'''<ellipse cx="270" cy="236" rx="190" ry="26" fill="url(#glowB)" opacity=".55"/>
<g filter="url(#sh)"><path d="{front_d}" fill="url(#metal)"/></g>
{brushed(front_d, .3)}
<path d="M70 222 Q72 217 84 216 L206 208 Q224 207 235 218 L252 234" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>
<path d="M262 246 H460" stroke="#fff" stroke-opacity=".8" stroke-width="2.5" stroke-linecap="round"/>
<path d="M62 392 Q64 410 84 410 H452" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>'''
    check = '<path d="M20 44 l15 15 l28 -30" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>'
    tile = f'''<g transform="translate(396 288) rotate(6)" filter="url(#sh)"><rect width="92" height="92" rx="22" fill="url(#blueDeep)" transform="translate(5 9)"/><rect width="92" height="92" rx="22" fill="url(#blue)"/><rect x="3" y="3" width="86" height="38" rx="19" fill="#fff" opacity=".3"/><rect width="92" height="92" rx="22" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>{check}</g>'''
    body = back + sheets + top + front + tile + coin(180, 372, 46, 'silver', -16, 12) + coin(262, 392, 42, 'blue', -16, 11)
    return wrap(body)

# ---------- 3. Receipt printer ----------
def asset_printer():
    outer = "M118 270 V170 Q118 78 214 78 H386 Q482 78 482 170 V270 H416 V178 Q416 138 376 138 H224 Q184 138 184 178 V270Z"
    inner_glow = '<rect x="184" y="138" width="232" height="140" fill="url(#blueDeep)"/><ellipse cx="300" cy="150" rx="120" ry="40" fill="url(#glowB)"/>'
    zig = ''.join(f' l9 -9 l9 9' for _ in range(13))
    receipt = f'''<g transform="translate(215 150) rotate(5)" filter="url(#sh)">
<path d="M0 0 H208 V270 {''.join(' l-8.7 11 l-8.7 -11' for _ in range(12))} H0Z" fill="url(#paper)"/>
<path d="M0 0 H208 V270" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/>
<g transform="translate(34 40)">{docicon(0,0,1.15)}<text y="78" font-family="{F}" font-weight="700" font-size="28" fill="#27304a">Invoice</text>{lines(0, 98, [140, 112, 128], 19, 7)}</g>
</g>'''
    chip = paid_chip(330, 330, 1.1, 4)
    housing = f'''<g filter="url(#sh)"><path d="{outer}" fill="url(#metalDark)" transform="translate(10 -9)"/><path d="{outer}" fill="url(#metalH)" fill-rule="evenodd"/></g>

{brushed(outer, .3)}
<path d="M130 266 V172 Q130 92 214 92 H386 Q470 92 470 172 V266" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="3" stroke-linecap="round"/>
<path d="M184 270 V178 Q184 138 224 138 H376 Q416 138 416 178 V270" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="3"/>
<path d="M118 270 H184 M416 270 H482" stroke="#5f6670" stroke-width="5"/>'''
    body = inner_glow + receipt + housing + chip + coin(120, 332, 54, 'silver', -16, 14)
    return wrap(body)

assets = {'E_scroll': asset_scroll(), 'F_folder': asset_folder(), 'G_receipt': asset_printer()}
for n, s in assets.items():
    open(f'{n}.svg', 'w').write(s)
