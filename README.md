# Break The Code

"Break their code. Save the fleet."

Break The Code is a fast-paced, naval intelligence-themed puzzle game where players must intercept and decrypt enemy signals to protect the fleet before time runs out.

## 🚀 Key Features

*   **Naval Intelligence Command Experience:** Immerse yourself in a high-stakes mission environment.
*   **Decryption Puzzles:** Engaging, logic-based puzzles representing intercepted enemy transmissions.
*   **Dynamic Game Engine:** Built with HTML5 Canvas, featuring a fleet visualization engine.
*   **Intense Gameplay:** Manage your fleet's integrity while racing against the clock.
*   **Responsive Design:** Optimized for both desktop and mobile devices, ensuring critical data is always visible.

## 🛠️ Tech Stack

*   **Framework:** Angular (v21+) with Signals for reactive state management.
*   **Language:** TypeScript (Strict Mode).
*   **Visuals & Styling:** Tailwind CSS 4+ for a clean, technical, high-contrast UI.
*   **Graphics:** HTML5 Canvas API for real-time game engine rendering.

## 🏗️ Project Architecture

The project follows a feature-driven, scalable directory structure:
*   `/src/app/canvas/`: Contains the game engine, ship entities (flagship, enemy ships), and renderers.
*   `/src/app/features/`: Contains specific game modules:
    *   `game`: Core gameplay container.
    *   `puzzle`: Decryption logic and UI.
    *   `intelligence`: Radio panel for mission dialogues.
    *   `timer`: Mission countdown UI.
    *   `victory`: Post-mission success screen.

## 🚀 Getting Started

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run in development:**
    ```bash
    npm run dev
    ```

## 📸 Screenshots

| Gameplay Interface | Mission Puzzle |
| :--- | :--- |
| ![Desktop View](https://via.placeholder.com/600x400.png?text=Gameplay+Desktop) | ![Puzzle UI](https://via.placeholder.com/600x400.png?text=Puzzle+UI) |

*Replace the placeholder images with actual screenshots.*

## 🎨 Design Philosophy

Built with a technical, high-contrast aesthetic—utilizing modern typography (Inter/JetBrains Mono), tactical color palettes (slate grays and vibrant emerald green alerts), and fluid animations to ensure the interface feels precise and mission-ready.
