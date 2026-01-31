# Ideation: Web Interface Design (Premium Aesthetic)

## 1. Design Philosophy
**"Arsenal"** implies power, precision, and toolchains. The design should reflect:
*   **Theme**: Dark Mode First (Cyberpunk/Developer aesthetic or Clean SaaS).
*   **Vibe**: Technical, Fast, "Editor-like".
*   **Inspiration**: Linear, Vercel, Raycast.

## 2. Design System Proposal

### A. Color Palette (Tailwind v4)
*   **Background**: `zinc-950` (Deep, almost black) instead of pure black.
*   **Surface**: `zinc-900` (Cards, Sidebars).
*   **Primary/Accent**: `indigo-500` to `purple-500` gradient (For "Magical" buttons).
*   **Text**: `zinc-100` (Headings), `zinc-400` (Muted).
*   **Borders**: `zinc-800` (Subtle separation).

### B. Typography
*   **Headings**: **Inter** or **Plus Jakarta Sans** (Clean, geometric).
*   **Code/Monospace**: **JetBrains Mono** or **Fira Code** (Crucial for displaying Prompts).

### C. Layout Structure
1.  **Sidebar (Left)**:
    *   Logo (Arsenal).
    *   Navigation: "My Library", "Marketplace", "Settings".
    *   User Profile (Bottom).
2.  **Main Content (Right)**:
    *   **Header**: Breadcrumbs + Action Buttons ("New Prompt").
    *   **View**: Grid of Cards (Prompts) or Editor View.

### D. Key Components (Shadcn UI)
We will install these Shadcn components:
*   `Button`, `Card`, `Input`, `Badge`.
*   `Sidebar` (Custom or Resizable).
*   `Command` (Cmd+K palette for "Power User" feel).
*   `Textarea` (For simple implementations).

## 3. "Wow" Factors ✨
1.  **Glassmorphism**: Subtle blur on the Sidebar and Header.
2.  **Micro-interactions**:
    *   Hovering a prompt card "glows" the border.
    *   Copying a prompt shows a "Copied!" toast with a confetti effect.
3.  **View Transitions**: Smooth cross-fades when navigating.

## 4. Technology Strategy
*   **CSS**: Tailwind v4 (Variables based).
*   **Icons**: Lucide React.
*   **State**: React Query (for fetching), Zustand (for local UI state).

## 5. Next Steps
1.  Install `lucide-react`.
2.  Configure `index.css` with the Base Colors (Zinc).
3.  Implement the **AppLayout** shell.
