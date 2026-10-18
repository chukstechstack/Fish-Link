<div align="center">

# Fish Link — Modern Link Management Workspace

### *Centralize, organize, and track your scattered web resources with sub-millisecond telemetry.*

![Production Ready](https://img.shields.io/badge/PRODUCTION-READY-amber?style=for-the-badge&logo=react&logoColor=black)
![License](https://img.shields.io/badge/LICENSE-MIT-020617?style=for-the-badge)
![System Status](https://img.shields.io/badge/SYSTEMS-OPERATIONAL-emerald?style=for-the-badge)

<br />

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a>
</p>

---

</div>

## Overview

**Fish Link** is a high-performance, Framer-grade SaaS platform designed to eliminate tab clutter and fragmented bookmarks. It provides a unified workspace to shorten links, group them into tag-based collections, and monitor real-time click analytics.

┌────────────────────────────────────────────────────────────────────────┐
│                        THE PROBLEM: SCATTERED WEB                      │
├────────────────────────────────────────────────────────────────────────┤
│  [Open Tabs] ──> [Unorganized Bookmarks] ──> [Lost Slack/Chat Links]   │
│                                                                        │
│                        THE FISH LINK SOLUTION                          │
├────────────────────────────────────────────────────────────────────────┤
│  [Shorten URL] ──> [Smart Collections] ──> [TiDB Cloud] ──> [Telemetry]│
└────────────────────────────────────────────────────────────────────────┘


---

## Tech Stack

The application is powered by a modern, type-safe full-stack architecture:

<br />

<table align="center">
  <tr>
    <td align="center" width="150">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original-wordmark.svg" width="48" height="48" alt="dotnet" />
      <br /><strong>.NET 8 API</strong>
      <br /><sub>Backend Engine</sub>
    </td>
    <td align="center" width="150">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="48" height="48" alt="react" />
      <br /><strong>React 18</strong>
      <br /><sub>Frontend UI</sub>
    </td>
    <td align="center" width="150">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="48" height="48" alt="ts" />
      <br /><strong>TypeScript</strong>
      <br /><sub>Type Safety</sub>
    </td>
    <td align="center" width="150">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="tailwind" />
      <br /><strong>Tailwind CSS</strong>
      <br /><sub>Styling & Glassmorphism</sub>
    </td>
    <td align="center" width="150">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" width="48" height="48" alt="tidb" />
      <br /><strong>TiDB Cloud</strong>
      <br /><sub>Distributed Database</sub>
    </td>
  </tr>
</table>

<br />

---

## Architecture

High-level request flow from the frontend client through the API down to the database:

           +-----------------------------------+
           |        Fish Link React UI         |
           | (Tailwind / Glassmorphism / Vite) |
           +-----------------+-----------------+
                             |
                             | REST / HTTPS
                             v
           +-----------------+-----------------+
           |        .NET 8 Web API Core      |
           | (Routing / Telemetry / Auth)    |
           +-----------------+-----------------+
                             |
             +---------------+---------------+
             |                               |
             v                               v
+------------+------------+    +-------------+-------------+
|    TiDB Distributed DB  |    |    Click Telemetry Engine |
|  (Persisted Resources)  |    |  (Real-time Analytics)    |
+-------------------------+    +---------------------------+

---

## Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/chukstechstack/Fish-Link.git](https://github.com/chukstechstack/Fish-Link.git)
cd Fish-Link
2. Run the Frontend Client
Bash
npm install
npm run dev
3. Run the .NET 8 Backend API
Bash
cd backend
dotnet restore
dotnet run
Project Status
Fish Link is built with clean component structures, high-contrast layouts, and amber-yellow design accents.