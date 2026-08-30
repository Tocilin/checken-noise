"""
One-off cleanup: some scene PNGs were exported with the "this is transparent"
checkerboard pattern baked into the pixels as real color, instead of an
actual alpha channel. This detects the near-white/light-gray checker cells
that are CONNECTED TO THE IMAGE BORDER (so isolated white highlights inside
the artwork, like snow or cloud fluff, are left alone) and makes them
transparent.
"""
import sys
import numpy as np
from PIL import Image
from scipy.ndimage import label

def strip(path, out_path):
    im = Image.open(path).convert("RGBA")
    arr = np.array(im)
    rgb = arr[:, :, :3].astype(int)

    # "Background-like": all channels high and close to each other (low saturation, light).
    mx = rgb.max(axis=2)
    mn = rgb.min(axis=2)
    bg_like = (mn >= 225) & (mx - mn <= 12)

    labels, n = label(bg_like)
    h, w = bg_like.shape
    border_labels = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
    border_labels.discard(0)

    mask = np.isin(labels, list(border_labels))
    arr[:, :, 3] = np.where(mask, 0, arr[:, :, 3])

    Image.fromarray(arr, "RGBA").save(out_path)
    removed_pct = 100 * mask.sum() / mask.size
    print(f"{path}: removed {removed_pct:.1f}% as background -> {out_path}")

if __name__ == "__main__":
    for path in sys.argv[1:]:
        strip(path, path)
