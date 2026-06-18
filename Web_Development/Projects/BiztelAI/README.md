# Machine Shop AI Workflow Automation System

A production-style MVP web application to digitize, correct, validate, and review handwritten machine shop operational records. The system utilizes local OCR engines combined with LLMs (GPT-4o-mini) to structure legibility-compromised data, running it through a 9-rule validation engine before presenting it to supervisors in a human-in-the-loop queue.

---

## Architecture Diagram

```mermaid
flowchart TD
    A[Handwritten Log Image/PDF] --> B[Upload Page: /dashboard/upload]
    B --> C[Local uploads/ Storage]
    C --> D[OCR Engine: Tesseract.js]
    D -->|Raw Legibility Text| E[AI Engine: GPT-4o-mini / Fallback Mock]
    E -->|Structured JSON & Confidences| F[Validation Engine: 9 Business Rules]
    F -->|VALID / INVALID Status & Warnings| G[PostgreSQL Database: Prisma ORM]
    G --> H[Review Queue Workspace: /dashboard/review]
    H -->|Human Edits & Approval| G
    G --> I[Analytics Dashboard: /dashboard]
    G --> J[Historical Logs & CSV Exports: /dashboard/history]
    H -->|Modifications logged| K[Audit Log Table]
```

---

## Features

1. **AI-Native Ingestion Pipeline**: Ingests files, runs Tesseract.js OCR, and channels noisy text through an LLM layer that fixes legibility errors.
2. **Confidence-Scoring Form**: Color-codes fields using red/yellow/green badges based on legibility confidence metrics.
3. **9-Rule Validation Engine**: Runs active checks (Shift validation, Employee ID format, duplicate work order lookups, and quantity outliers).
4. **Human-in-the-Loop Workspace**: Interactive side-by-side viewer displaying original documents alongside editable form fields and error lists.
5. **Modification Auditing**: Automatically logs old and new values whenever a supervisor updates field data.
6. **Analytics Dashboards**: Renders productivity trends (Qty / Hour) and shift summaries via Recharts.
7. **CSV Exports**: Allows downloading filtered historical operational datasets directly in-browser.

---

## File Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── config-status/     # API Key diagnostics
│   │   ├── dashboard/         # Aggregated Recharts metrics
│   │   ├── records/           # Search, update, and approve records
│   │   ├── seed/              # Reset and mock database seeder
│   │   └── upload/            # Ingestion pipeline (OCR + AI + Validations)
│   ├── dashboard/
│   │   ├── history/           # Log search, modal viewer, and CSV exporter
│   │   ├── layout.tsx         # Responsive sidebar & system monitor
│   │   ├── page.tsx           # Operational charts & KPI cards
│   │   ├── review/            # Side-by-side workstation & edit form
│   │   └── settings/          # System configuration, API keys, and seed controls
│   ├── globals.css            # HSL themes, custom scrollbars, and dark mode class
│   ├── layout.tsx             # Root layout and Toast renderer
│   └── page.tsx               # Entrance portal screen
├── components/
│   └── Toasts.tsx             # Global floating alerts
├── hooks/
│   └── use-store.ts           # Zustand global state (toasts, upload queue, theme)
├── lib/
│   ├── ai.ts                  # OpenAI GPT-4o-mini client & heuristic mock fallback
│   ├── db.ts                  # Singleton Prisma Client exporter
│   ├── ocr.ts                 # Tesseract.js engine wrapper
│   └── validation.ts          # 9-rule operational validation evaluator
├── prisma/
│   └── schema.prisma          # Database layout (Document, MachineRecord, AuditLog)
└── prisma.config.ts           # Prisma 7 configuration file
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Database connection (PostgreSQL / Neon compatible)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# OpenAI API Key (Optional: fallbacks to local mock handwriting corrector if missing)
OPENAI_API_KEY="your-openai-api-key-here"
```

---

## Database Setup

This project uses **Prisma 7**. Under Prisma 7, connection URLs are defined in `prisma.config.ts` rather than `schema.prisma`. 

1. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

2. Run database migrations to provision your schema:
   ```bash
   npx prisma db push
   ```

3. To populate test datasets immediately, enter the workstation, navigate to the **Settings** tab, and click **Seed Database**.

---

## Local Development

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Spin up Next.js dev server:
   ```bash
   npm run dev
   ```

3. Open your browser to: `http://localhost:3000`

---

## Key Technical Decisions & Tradeoffs

* **OCR Engine Selection**: Used `Tesseract.js` running locally in WebAssembly (WASM). This keeps execution serverless and removes external API fees, but requires slightly legible scans. To mitigate Tesseract's limits, we feed output into the LLM correction layer.
* **LLM Mock Fallback**: If `OPENAI_API_KEY` is not present, the system runs an offline regex and heuristic parser in `src/lib/ai.ts`. This parser corrects typical handwriting OCR errors (such as swapping 'O' for '0' in machine IDs or correcting 'SHIFT II1' to 'III') so the app is immediately testable and functional out-of-the-box.
* **Synchronous API Pipeline**: The upload endpoint executes OCR and LLM processing inline. This simplifies local hosting without requiring redis-based background queues, returning the result to the client instantly. For large multi-page PDFs, this is shifted to a background worker in future expansions.
