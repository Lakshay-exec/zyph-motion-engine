import os
import glob
import numpy as np
from PIL import Image

zyph_dir = r"C:\Users\kando\.gemini\antigravity\scratch\zyph-motion-engine\public\zyph"
images = sorted(glob.glob(os.path.join(zyph_dir, "zyph_*.png")), key=lambda x: int(os.path.basename(x).split('_')[1].split('.')[0]))

print(f"Found {len(images)} images to preprocess in {zyph_dir}")

for img_path in images:
    filename = os.path.basename(img_path)
    try:
        with Image.open(img_path) as img:
            img = img.convert("RGBA")
            w, h = img.size
            
            # 1. Trim 6% from bottom and right
            trim_right = int(round(w * 0.06))
            trim_bottom = int(round(h * 0.06))
            cropped_w = w - trim_right
            cropped_h = h - trim_bottom
            
            cropped = img.crop((0, 0, cropped_w, cropped_h))
            
            # Re-center on original w, h canvas with pure #FFFFFF background
            pad_x = trim_right // 2
            pad_y = trim_bottom // 2
            
            centered = Image.new("RGBA", (w, h), (255, 255, 255, 255))
            centered.paste(cropped, (pad_x, pad_y))
            
            # 2. Normalize near-white pixels (RGB > 245) to pure #FFFFFF
            arr = np.array(centered)
            # Check RGB channels
            r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
            near_white_mask = (r > 245) & (g > 245) & (b > 245)
            
            arr[near_white_mask, 0] = 255
            arr[near_white_mask, 1] = 255
            arr[near_white_mask, 2] = 255
            arr[near_white_mask, 3] = 255
            
            result = Image.fromarray(arr, "RGBA")
            result.save(img_path, "PNG", optimize=True)
            print(f"[Prep] Processed & normalized {filename} ({w}x{h})")
    except Exception as e:
        print(f"Error processing {filename}: {e}")

print("All Zyph character assets successfully preprocessed!")
