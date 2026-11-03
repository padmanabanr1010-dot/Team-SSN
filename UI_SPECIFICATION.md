# ZEROTH | UI Design System & Architecture Specification

## 1. Design Philosophy & Aesthetic
* **Theme:** **"Weightless Minimalist" (Elevated Light Mode)** – A stark contrast to heavy, dark financial terminals. The focus is on friction-free navigation, pure data clarity, and deterministic user control.
* **Atmosphere:** An expansive, breathable canvas relying heavily on negative space (whitespace) rather than dividing lines. The interface feels light, responsive, and completely devoid of "black box" algorithmic heaviness.
* **Component Surface:** **Floating Elevations** (`background: #ffffff`). Structural hierarchy is achieved through Z-axis elevation using ultra-soft, diffused drop shadows (`box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.05)`). No glassmorphism; surfaces are solid and crisp.

---

## 2. Design Tokens & Color Palette

| Token / Role | Hex / RGBA | Purpose & Usage |
| :--- | :--- | :--- |
| **Canvas Background** | `#F8FAFC` | Airy slate-white to ground the floating white components. |
| **Card / Surface BG** | `#FFFFFF` | Pure white for all primary interaction zones, tables, and metric cards. |
| **Primary Accent** | `#3B82F6` (Sky Blue) | Primary actions, active navigation states, and focus rings. |
| **Success / Positive** | `#10B981` (Mint) | Completed tasks, positive deterministic metrics, active connections. |
| **Error / Critical** | `#EF4444` (Crisp Red) | Hard system errors, disconnected APIs, critical rule failures. |
| **Warning / Alert** | `#F59E0B` (Amber) | Nearing thresholds, missing manual inputs. |
| **Typography (Main)** | `#0F172A` (Deep Slate) | High-contrast primary reading text; softer on the eyes than pure black. |
| **Typography (Muted)** | `#64748B` (Cool Gray) | Helper text, table headers, inactive tabs, and timestamps. |

---

## 3. Typography & Formatting
* **Interface Font:** `Inter` or `SF Pro Text` for UI labels, navigation, and explanatory copy. Weights are strictly controlled (Regular for body, Semibold for headers).
* **Tabular & Metric Font:** `SF Mono` or `Roboto Mono` exclusively for data tables, rule IDs, and system metrics to ensure perfect vertical alignment.
* **Micro-Formatting:** Zero use of AI jargon (no "confidence scores," "predictions," or "smart insights"). Metrics are presented exactly as calculated (e.g., `Status: Triggered`, `Rule: Active`).

---

## 4. Layout & Structural Anatomy

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│    [ Logo: ZEROTH ]      [Dashboard] [Workflows] [Data] [Settings]           │ <- Floating Island Nav
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│    ACTIVE CONTENT AREA (1200px max-width, centrally aligned, unconstrained)  │
│                                                                              │
│    ┌─────────────────────────┐  ┌─────────────────────────────────────────┐  │
│    │ Manual Inputs & Filters │  │ Deterministic Analytics & Charts        │  │
│    │ (Dropdowns, Toggles)    │  │ (Bar charts, Line graphs, Raw data)     │  │
│    └─────────────────────────┘  └─────────────────────────────────────────┘  │
│                                                                              │
│    ┌──────────────────────────────────────────────────────────────────────┐  │
│    │ Rule-Based Execution Ledger / Audit Trail                            │  │
│    └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Floating Header Navigation
* **Architecture:** Pill-shaped "floating island" navigation bar situated 24px from the top of the viewport.
* **Global Controls:** Manual sync triggers, explicit timeframe selectors, and direct environment toggle (Test vs. Live). No automated "smart refresh" unless explicitly configured via a cron-style schedule.

---

## 5. Detailed Tab-by-Tab UI Modules (Strictly Non-AI)

1. **Deterministic Dashboard (`DashboardTab.jsx`):**
   * High-level KPI cards with raw, uninterpreted data (e.g., Total Executions, Error Rates, Uptime).
   * Simple time-series line charts with standard axes. No predictive trendlines or extrapolated forecasts.

2. **Rule-Based Engine (`WorkflowsTab.jsx`):**
   * **Visual Logic Builder:** Drag-and-drop IF/THEN/ELSE boolean logic creator.
   * **Explicit Triggers:** Manually defined exact thresholds (e.g., `IF variable_X > 50 AND variable_Y == 'active' THEN trigger_webhook`).
   * No machine learning clustering, no fuzzy matching, and no automated feature selection.

3. **Raw Data Explorer (`DataTab.jsx`):**
   * High-performance, paginated data grid (clean spreadsheet interface).
   * Multi-column sorting, regex filtering, and manual CSV/JSON export capabilities.

4. **Audit & Ledger (`AuditTab.jsx`):**
   * Immutable, chronological log of every system action and user input.
   * Highlights exact timestamps, specific rule triggering the event, and literal payloads.

5. **Direct Integrations (`SettingsTab.jsx`):**
   * Straightforward API key management, webhook URL inputs, and explicit mapping configurations.

---

## 6. Micro-Interactions & UX Details
* **Hover Physics:** Interacting with a card increases drop shadow spread and subtly scales it (`transform: scale(1.01)`), reinforcing the floating / weightless minimalist feel without heavy borders.
* **Instant Snappiness:** Rapid linear easing transitions (`transition: all 0.15s ease-out`). Zero artificial delays, skeleton loaders, or "thinking" spinners.
* **Explicit Feedback:** Bottom-center crisp toast notifications (e.g., `Workflow 'Alpha' saved successfully.`) with absolute deterministic confirmation.

