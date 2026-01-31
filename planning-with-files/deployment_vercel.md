# Deployment Guide: Vercel (Monorepo)

Since **Arsenal** is a monorepo (containing both `/cli` and `/web`), you must explicitly tell Vercel where the frontend application lives.

## 1. Push your Code (Critical)
Vercel only sees what is on GitHub. We just pushed the new `/web` folder, so it should now be visible.

## 2. Configure Vercel Project
1.  Go to the **Import Project** screen in Vercel.
2.  Import `WinsonBaring/arsenal`.
3.  **Framework Preset**: Vercel should auto-detect **Vite** once you set the root directory. If not, select **Vite**.
4.  **Root Directory**:
    *   Click **Edit** next to Root Directory.
    *   You should now see root `/` and `web`.
    *   Select **`web`**.
    *   (If you don't see `web`, wait a moment for GitHub to sync, or manually type `web`).

## 3. Build Settings (Verified)
Once `web` is the root, the defaults should work:
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Install Command**: `npm install`

## 4. Environment Variables
No specific env vars are needed for the static dashboard yet.
