import os
import json
from PIL import Image
import numpy as np
import rembg

raw_dir = r"C:\Users\kando\Downloads\gif"
manifest_path = r"C:\Users\kando\.gemini\antigravity\scratch\zyph-motion-engine\public\zyph\manifest.json"
out_dir = r"C:\Users\kando\.gemini\antigravity\scratch\zyph-motion-engine\public\zyph"

with open(manifest_path, "r", encoding="utf-8") as f:
    manifest = json.load(f)

print(f"Loaded manifest with {len(manifest)} items. Starting neural background removal...")

session = rembg.new_session()

for item in manifest:
    orig_name = item["original"]
    target_name = item["target"]
    orig_path = os.path.join(raw_dir, orig_name)
    target_path = os.path.join(out_dir, target_name)

    if not os.path.exists(orig_path):
        print(f"Skipping {orig_name}: not found")
        continue

    img = Image.open(orig_path)
    w, h = img.size

    # Check if image is already a transparent cutout (e.g. photoroom)
    is_already_transparent = False
    if img.mode == "RGBA":
        arr = np.array(img)
        if np.sum(arr[:, :, 3] == 0) > 5000:
            is_already_transparent = True

    if is_already_transparent:
        print(f"[{item['index']}/21] {target_name}: Already transparent cutout ({orig_name})")
        cutout = img
    else:
        print(f"[{item['index']}/21] {target_name}: Extracting alpha with RMBG 2.0 ({orig_name})...")
        cutout = rembg.remove(img, session=session)

    # Save as RGBA
    cutout.save(target_path, "PNG")
    print(f"  -> Saved {target_name} ({cutout.size}, mode={cutout.mode})")

print("All 21 Zyph assets converted to true transparent cutouts!")
