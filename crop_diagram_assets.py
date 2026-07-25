from PIL import Image
import os

img = Image.open('static/images/arc.png')
width, height = img.size

# Coordinates based on 1921 x 1025 image
# Bounding boxes (left, upper, right, lower) normalized to image dimensions

crops = {
    # Sensors (from bottom block diagram for high detail)
    'moisture_sensor.png': (105, 660, 260, 770),
    'ultrasonic_sensor.png': (110, 805, 260, 925),

    # Controller (Arduino UNO)
    'arduino_uno.png': (620, 705, 930, 875),

    # Actuators & Output Devices
    'servo_motor.png': (1080, 660, 1220, 740),
    'lcd_display.png': (1060, 770, 1240, 840),
    'buzzer.png': (1090, 870, 1210, 945),

    # Dustbins (Wet & Dry Bins)
    'wet_dry_bins.png': (1555, 690, 1785, 840),
    
    # Input Icon
    'user_input_icon.png': (90, 225, 215, 360),
    
    # Full System Architecture Diagram
    'full_system_arch.png': (0, 0, 1921, 520),
    'full_block_diagram.png': (0, 520, 1921, 1025),
}

out_dir = 'static/images/assets'
os.makedirs(out_dir, exist_ok=True)

for name, box in crops.items():
    cropped = img.crop(box)
    cropped.save(os.path.join(out_dir, name))

print("Assets extracted successfully!")
