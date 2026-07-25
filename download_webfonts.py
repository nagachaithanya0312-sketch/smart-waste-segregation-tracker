import os
import urllib.request

dirs = [os.path.join("static", "vendor", "webfonts"), os.path.join("vendor", "webfonts")]
for d in dirs:
    os.makedirs(d, exist_ok=True)

base_url = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/webfonts/"
fonts = [
    "fa-solid-900.woff2",
    "fa-solid-900.ttf",
    "fa-brands-400.woff2",
    "fa-brands-400.ttf",
    "fa-regular-400.woff2",
    "fa-regular-400.ttf",
    "fa-v4-font-face.woff2"
]

headers = {'User-Agent': 'Mozilla/5.0'}

for font in fonts:
    url = base_url + font
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = response.read()
            for d in dirs:
                with open(os.path.join(d, font), "wb") as f:
                    f.write(data)
            print(f"Downloaded webfont: {font} ({len(data)} bytes)")
    except Exception as e:
        print(f"Skipped {font}: {e}")

print("FontAwesome webfonts downloaded successfully!")
