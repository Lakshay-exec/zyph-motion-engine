# Zyph Automated Motion-Graphics Engine (GitHub Cloud-Render Edition)

A high-retention, editorial motion-graphics engine powered by **Remotion v4**, designed for the **Zyph** character (realistic 3D matte-black mannequin in streetwear on pure `#FFFFFF` background).

---

## 🌟 Architecture & Features

1. **Character Spec ("Zyph"):**
   - Matte-black 3D mannequin in modern streetwear.
   - Stark black-and-white minimalism with high-contrast UI cards and single red geometric accent.
   - Preprocessed with **Sharp/PIL** (trimmed 6% from bottom/right watermark zones, re-centered, and near-white pixels `>245` normalized to `#FFFFFF`).
   - Grounded in 3D space with an elliptical radial ground shadow and blended seamlessly using CSS `mix-blend-mode: multiply`.

2. **Compositions:**
   - **`PokerFaceShort` (1080x1920, 30fps, 9:16):**
     - Hook title slam with sub-bass thump.
     - Word-by-word kinetic captions at the lower third synchronized to exact audio timestamps.
     - Floating psychological callout cards (*"PERCEPTION GAP"*, *"THE NEUTRAL TRAP"*, *"THE 3-SECOND PAUSE"*).
     - Animated progress bar and camera push-ins.
   - **`PokerFaceLong` (1920x1080, 30fps, 16:9):**
     - Editorial widescreen split-screen layout.
     - Left: Animated kinetic diagrams, metrics, and chapter breakdowns.
     - Right: Cinematic Zyph character stage with slow zoom.
   - **`PokerFaceThumb` (1280x720, `<Still>`):**
     - High-CTR thumbnail: Dramatic close-up crop of Zyph against negative space, bold 3-word headline (`"NEVER SHOW FEAR."`), and a stark red accent.

3. **Audio & Sound Design:**
   - Pre-analyzed voiceover (`Elevix.mp3` / `voiceover.mp3`) with word-level timestamps.
   - Procedural sound effects in `public/sfx/`: `thump.wav`, `whoosh.wav`, `pop.wav`, and `click.wav`.

4. **Cloud-Render Pipeline (Zero Local CPU/RAM Load):**
   - `.github/workflows/render-test.yml` runs on GitHub's cloud runners (`ubuntu-latest`).
   - Automatically renders all compositions and uploads them as downloadable artifacts (`zyph-poker-face-renders`).

5. **Future 5-Step Daily Automation Scripts (`scripts/`):**
   - `scripts/1_fetch_youtube_ideas.ts` (Topic generation)
   - `scripts/2_generate_script.ts` (Structured retention pacing)
   - `scripts/3_generate_zyph_images.ts` (AI character synthesis)
   - `scripts/4_generate_tts.py` (Zero-cost `edge-tts` voiceover generation)
   - `scripts/5_publish_and_cleanup.ts` (Auto-publish to YouTube & Instagram)

---

## 🚀 How to Run Cloud Render via GitHub

1. **Commit and Push to GitHub:**
   ```bash
   git add .
   git commit -m "feat: Zyph Motion Graphics Engine with cloud rendering"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```

2. **Watch GitHub Actions Render:**
   - Go to your repository on GitHub.
   - Click on the **Actions** tab.
   - Click on the running workflow: **Zyph Cloud Render & Verification Pipeline**.
   - You can also manually trigger it anytime via the **Run workflow** button (`workflow_dispatch`).

3. **Download Renders:**
   - Once completed (~2-3 minutes), scroll to the **Artifacts** section at the bottom of the workflow run.
   - Download **`zyph-poker-face-renders.zip`** to get:
     - `out/poker-face-short.mp4` (9:16 vertical short)
     - `out/poker-face-long.mp4` (16:9 widescreen masterclass)
     - `out/poker-face-thumb.png` (1280x720 high-CTR thumbnail)
