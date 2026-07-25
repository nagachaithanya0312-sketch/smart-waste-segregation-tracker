import os

out_dir = 'static/images/assets'
os.makedirs(out_dir, exist_ok=True)

# 1. Waste Inlet SVG
waste_inlet_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="inletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="url(#inletGrad)" />
  <!-- Person tossing trash icon -->
  <circle cx="40" cy="30" r="8" fill="#ffffff" />
  <path d="M40 40 L40 65 M40 50 L25 45 M40 50 L55 42 L65 50" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <path d="M40 65 L30 85 M40 65 L50 85" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" />
  <!-- Trash Can -->
  <path d="M68 55 L77 55 L75 80 L70 80 Z" fill="#ffffff" opacity="0.9" />
  <rect x="66" y="52" width="13" height="3" rx="1" fill="#ffffff" />
  <!-- Falling Waste Item -->
  <circle cx="60" cy="48" r="3" fill="#fbbf24" />
</svg>'''

# 2. Moisture Sensor (YL-69) SVG
moisture_sensor_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <!-- PCB Base -->
  <rect x="25" y="10" width="50" height="35" rx="4" fill="#1e3a8a" />
  <circle cx="32" cy="17" r="2.5" fill="#f59e0b" />
  <circle cx="32" cy="27" r="2.5" fill="#ef4444" />
  <!-- Potentiometer -->
  <rect x="45" y="16" width="14" height="14" rx="2" fill="#3b82f6" />
  <circle cx="52" cy="23" r="4" fill="#ffffff" />
  <!-- Pins -->
  <rect x="68" y="18" width="12" height="3" fill="#d1d5db" />
  <rect x="68" y="24" width="12" height="3" fill="#d1d5db" />
  <rect x="68" y="30" width="12" height="3" fill="#d1d5db" />
  <!-- Probe Prongs -->
  <rect x="33" y="45" width="8" height="48" rx="2" fill="#9ca3af" />
  <rect x="59" y="45" width="8" height="48" rx="2" fill="#9ca3af" />
  <!-- Gold Traces on Probe -->
  <line x1="37" y1="48" x2="37" y2="88" stroke="#fbbf24" stroke-width="2" />
  <line x1="63" y1="48" x2="63" y2="88" stroke="#fbbf24" stroke-width="2" />
  <!-- Moisture Droplets -->
  <path d="M50 60 Q50 52 46 63 Q50 70 54 63 Z" fill="#38bdf8" />
</svg>'''

# 3. Ultrasonic Sensor (HC-SR04) SVG
ultrasonic_sensor_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80">
  <!-- Blue PCB -->
  <rect x="10" y="15" width="100" height="50" rx="6" fill="#1d4ed8" stroke="#1e40af" stroke-width="2" />
  <circle cx="16" cy="21" r="3" fill="#ffffff" />
  <circle cx="104" cy="21" r="3" fill="#ffffff" />
  <circle cx="16" cy="59" r="3" fill="#ffffff" />
  <circle cx="104" cy="59" r="3" fill="#ffffff" />
  <!-- Transmitter (T) Cylinder -->
  <circle cx="38" cy="40" r="18" fill="#94a3b8" stroke="#475569" stroke-width="2" />
  <circle cx="38" cy="40" r="13" fill="#cbd5e1" />
  <text x="38" y="44" font-family="Arial" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">T</text>
  <!-- Receiver (R) Cylinder -->
  <circle cx="82" cy="40" r="18" fill="#94a3b8" stroke="#475569" stroke-width="2" />
  <circle cx="82" cy="40" r="13" fill="#cbd5e1" />
  <text x="82" y="44" font-family="Arial" font-size="10" font-weight="bold" fill="#334155" text-anchor="middle">R</text>
  <!-- Crystal Oscillator -->
  <rect x="56" y="22" width="8" height="14" rx="2" fill="#cbd5e1" stroke="#64748b" />
  <!-- 4 Header Pins -->
  <rect x="48" y="65" width="3" height="10" fill="#f59e0b" />
  <rect x="53" y="65" width="3" height="10" fill="#f59e0b" />
  <rect x="58" y="65" width="3" height="10" fill="#f59e0b" />
  <rect x="63" y="65" width="3" height="10" fill="#f59e0b" />
</svg>'''

# 4. Arduino UNO SVG
arduino_uno_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90" width="120" height="90">
  <!-- Teal PCB -->
  <rect x="5" y="5" width="110" height="80" rx="6" fill="#00838f" stroke="#006064" stroke-width="2" />
  <!-- USB Port -->
  <rect x="2" y="15" width="18" height="22" fill="#d1d5db" stroke="#9ca3af" stroke-width="1.5" />
  <rect x="4" y="20" width="14" height="12" fill="#475569" />
  <!-- Power Jack -->
  <rect x="2" y="52" width="22" height="18" rx="2" fill="#1e293b" />
  <circle cx="13" cy="61" r="4" fill="#64748b" />
  <!-- Main ATmega IC Chip -->
  <rect x="45" y="45" width="45" height="14" rx="1" fill="#0f172a" />
  <line x1="45" y1="48" x2="90" y2="48" stroke="#475569" stroke-width="1" stroke-dasharray="2,2" />
  <!-- Digital Pin Header (Top) -->
  <rect x="35" y="8" width="70" height="8" fill="#1e293b" />
  <!-- Analog Pin Header (Bottom) -->
  <rect x="45" y="74" width="50" height="8" fill="#1e293b" />
  <!-- Reset Button -->
  <rect x="25" y="10" width="8" height="8" fill="#ef4444" rx="1" />
  <!-- Arduino Logo Text -->
  <text x="75" y="32" font-family="Arial" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">UNO</text>
  <circle cx="56" cy="28" r="4" stroke="#ffffff" stroke-width="1.5" fill="none" />
  <text x="56" y="31" font-family="Arial" font-size="7" font-weight="bold" fill="#ffffff" text-anchor="middle">+</text>
</svg>'''

# 5. Servo Motor (SG90) SVG
servo_motor_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 90" width="100" height="90">
  <!-- Blue Plastic Body -->
  <rect x="20" y="25" width="60" height="45" rx="4" fill="#2563eb" stroke="#1d4ed8" stroke-width="2" />
  <!-- Mounting Flanges -->
  <rect x="10" y="35" width="80" height="8" rx="2" fill="#1e40af" />
  <circle cx="14" cy="39" r="2.5" fill="#ffffff" />
  <circle cx="86" cy="39" r="2.5" fill="#ffffff" />
  <!-- Top Gear Shaft Cylinder -->
  <circle cx="40" cy="25" r="12" fill="#1d4ed8" />
  <circle cx="40" cy="25" r="7" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
  <!-- Servo Horn / Arm -->
  <path d="M40 25 L75 15 A 5 5 0 0 1 78 22 L44 30 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
  <circle cx="68" cy="19" r="1.5" fill="#64748b" />
  <!-- Cable -->
  <path d="M50 70 Q50 85 30 85" stroke="#f59e0b" stroke-width="3" fill="none" />
  <path d="M53 70 Q53 85 33 85" stroke="#ef4444" stroke-width="3" fill="none" />
  <path d="M47 70 Q47 85 27 85" stroke="#1e293b" stroke-width="3" fill="none" />
</svg>'''

# 6. LCD Display (16x2) SVG
lcd_display_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70" width="120" height="70">
  <!-- Green PCB -->
  <rect x="5" y="5" width="110" height="60" rx="4" fill="#15803d" stroke="#166534" stroke-width="2" />
  <circle cx="10" cy="10" r="2.5" fill="#d1d5db" />
  <circle cx="110" cy="10" r="2.5" fill="#d1d5db" />
  <circle cx="10" cy="60" r="2.5" fill="#d1d5db" />
  <circle cx="110" cy="60" r="2.5" fill="#d1d5db" />
  <!-- LCD Screen Frame -->
  <rect x="18" y="12" width="84" height="42" fill="#0f172a" rx="2" />
  <!-- Bright Yellow/Green LCD Backlight Screen -->
  <rect x="22" y="16" width="76" height="34" fill="#84cc16" />
  <!-- Text Lines on LCD -->
  <text x="26" y="30" font-family="monospace" font-size="9" font-weight="bold" fill="#0f172a">WASTE: ORGANIC</text>
  <text x="26" y="44" font-family="monospace" font-size="9" font-weight="bold" fill="#0f172a">BIN: GREEN BIN</text>
</svg>'''

# 7. Wet & Dry Dustbins SVG
wet_dry_bins_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 100" width="130" height="100">
  <!-- Green WET WASTE Dustbin -->
  <g transform="translate(10, 10)">
    <!-- Wheels -->
    <circle cx="8" cy="78" r="6" fill="#334155" />
    <circle cx="34" cy="78" r="6" fill="#334155" />
    <!-- Bin Body -->
    <path d="M6 18 L36 18 L32 75 L10 75 Z" fill="#16a34a" stroke="#15803d" stroke-width="2" />
    <!-- Lid -->
    <rect x="3" y="12" width="36" height="7" rx="3" fill="#15803d" />
    <rect x="15" y="8" width="12" height="5" rx="2" fill="#15803d" />
    <!-- Recycle Symbol -->
    <path d="M21 35 L26 43 L16 43 Z" fill="#ffffff" opacity="0.9" />
    <text x="21" y="58" font-family="Arial" font-size="7" font-weight="bold" fill="#ffffff" text-anchor="middle">WET</text>
  </g>

  <!-- Blue DRY WASTE Dustbin -->
  <g transform="translate(70, 10)">
    <!-- Wheels -->
    <circle cx="8" cy="78" r="6" fill="#334155" />
    <circle cx="34" cy="78" r="6" fill="#334155" />
    <!-- Bin Body -->
    <path d="M6 18 L36 18 L32 75 L10 75 Z" fill="#2563eb" stroke="#1d4ed8" stroke-width="2" />
    <!-- Lid -->
    <rect x="3" y="12" width="36" height="7" rx="3" fill="#1d4ed8" />
    <rect x="15" y="8" width="12" height="5" rx="2" fill="#1d4ed8" />
    <!-- Recycle Symbol -->
    <path d="M21 35 L26 43 L16 43 Z" fill="#ffffff" opacity="0.9" />
    <text x="21" y="58" font-family="Arial" font-size="7" font-weight="bold" fill="#ffffff" text-anchor="middle">DRY</text>
  </g>
</svg>'''

# 8. Buzzer SVG
buzzer_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <!-- Black Circular Buzzer Body -->
  <circle cx="40" cy="38" r="30" fill="#1e293b" stroke="#0f172a" stroke-width="3" />
  <circle cx="40" cy="38" r="24" fill="#334155" />
  <circle cx="40" cy="38" r="8" fill="#0f172a" />
  <!-- Plus (+) polarity sign -->
  <text x="20" y="24" font-family="Arial" font-size="12" font-weight="bold" fill="#ef4444">+</text>
  <!-- Pins -->
  <rect x="30" y="68" width="4" height="10" fill="#9ca3af" />
  <rect x="46" y="68" width="4" height="10" fill="#9ca3af" />
</svg>'''

svgs = {
    'waste_inlet.svg': waste_inlet_svg,
    'moisture_sensor.svg': moisture_sensor_svg,
    'ultrasonic_sensor.svg': ultrasonic_sensor_svg,
    'arduino_uno.svg': arduino_uno_svg,
    'servo_motor.svg': servo_motor_svg,
    'lcd_display.svg': lcd_display_svg,
    'wet_dry_bins.svg': wet_dry_bins_svg,
    'buzzer.svg': buzzer_svg,
}

for fname, content in svgs.items():
    path = os.path.join(out_dir, fname)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created {path}")

print("All high quality vector SVGs generated cleanly!")
