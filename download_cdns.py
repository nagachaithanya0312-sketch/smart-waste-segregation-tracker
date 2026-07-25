import os
import urllib.request

vendor_dir = os.path.join("static", "vendor")
os.makedirs(os.path.join(vendor_dir, "css"), exist_ok=True)
os.makedirs(os.path.join(vendor_dir, "js"), exist_ok=True)
os.makedirs(os.path.join("vendor", "css"), exist_ok=True)
os.makedirs(os.path.join("vendor", "js"), exist_ok=True)

cdns = [
    ("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", "bootstrap.min.css", "css"),
    ("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js", "bootstrap.bundle.min.js", "js"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css", "all.min.css", "css"),
    ("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", "animate.min.css", "css"),
]

headers = {'User-Agent': 'Mozilla/5.0'}

for url, filename, folder in cdns:
    print(f"Downloading {filename}...")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = response.read()
            
            # Save to static/vendor/
            path1 = os.path.join(vendor_dir, folder, filename)
            with open(path1, "wb") as f:
                f.write(data)
                
            # Save to vendor/
            path2 = os.path.join("vendor", folder, filename)
            with open(path2, "wb") as f:
                f.write(data)
                
            print(f"Successfully saved {filename} ({len(data)} bytes)")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")

print("Done downloading vendor assets!")
