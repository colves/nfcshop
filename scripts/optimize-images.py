"""Create proportional delivery copies. Originals and print assets are never modified.
Usage: python scripts/optimize-images.py public/images/.../approved-photo.webp
Requires Pillow only when preparing new photography; committed copies need no Python at build time.
"""
import sys
from pathlib import Path
from PIL import Image

for filename in sys.argv[1:]:
    source = Path(filename)
    with Image.open(source) as image:
        for width in (160, 320, 640, 960):
            if width >= image.width:
                continue
            height = round(image.height * width / image.width)
            image.resize((width, height), Image.Resampling.LANCZOS).save(
                source.with_name(f'{source.stem}-w{width}.webp'), quality=88, method=6)
