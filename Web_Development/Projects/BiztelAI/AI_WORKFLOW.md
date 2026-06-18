# AI & Ingestion Pipeline Workflow Documentation

This document explains the technical implementation of the AI-native workflow in the Machine Shop AI Workflow Automation System.

---

## 1. Pipeline Overview

The manufacturing logs digitization pipeline operates as follows:

```text
Document Upload 
  --> Saved to public/uploads/
  --> Ingested by OCR Engine (Tesseract.js WASM)
  --> Extracted as Legibility-Compromised Text
  --> Channeled to LLM Correction Engine (GPT-4o-mini / Fallback Heuristics)
  --> Outputted as Structured JSON & Field Confidences
  --> Evaluated by 9-Rule Validation Engine
  --> Saved to Postgres Database with REVIEW_PENDING status
```

---

## 2. OCR Layer (Tesseract.js)

OCR processing is handled locally using `tesseract.js` inside `src/lib/ocr.ts`.

* **Execution Context**: The engine loads an English language model (`eng`) running in local WebAssembly (WASM).
* **Output**: Tesseract returns the raw text block (`data.text`) and an overall recognition confidence rating (`data.confidence` from 0-100).
* **Limitations**: Handwritten characters are rarely recognized cleanly by standard OCR engines. Typical outputs contain noise, such as:
  * Numbers read as characters (e.g. `BT471O` instead of `BT4710`, `MC-73O` instead of `MC-730`).
  * Symbols in place of lines (e.g. `I11` or `II1` for Roman numerals `III`).
  * Extra whitespaces or carriage returns.

---

## 3. LLM Correction & Structuring Layer (OpenAI GPT-4o-mini)

Rather than feeding raw OCR output directly to database columns, we route it through `src/lib/ai.ts` using **OpenAI's GPT-4o-mini** with **JSON Mode** enabled.

### Prompt Structure
The system prompt establishes the context of a manufacturing supervisor correcting typos:

```text
You are an expert manufacturing operations data extraction assistant.
Extract machine shop operational records from OCR text.
Return valid JSON only.

Extract the following fields:
- date (string)
- shift (string, e.g. "I", "II", "III")
- employee_no (string)
- operation_code (string)
- machine_no (string)
- work_order_no (string)
- quantity_produced (number or null)
- time_taken_hours (number or null)

Also provide confidence scores between 0 and 1 for every extracted field based on how legible/clear the OCR text seems for that data point.
```

### Structuring Tradeoffs
* **JSON Mode**: Restricts the model to returning strictly formatted JSON, preventing formatting failures from crashing the Next.js runtime.
* **Typo Correction**: The LLM uses its contextual knowledge to correct handwritten character swaps (e.g., matching the pattern of a machine code `MC-XXX` and fixing `MC-73O` to `MC-730` or employee ID format `BTXXXX` to correct `BT471O` to `BT4710`).
* **Confidence Scoring**: The LLM assigns confidence scores ($0.0$ to $1.0$) for each field, representing how legible or clean that field's raw OCR characters appear in the prompt input.

---

## 4. Confidence Scoring UI

The UI displays the LLM's confidence scores visually on the Review Queue page (`/dashboard/review`):

* **Green Badges (90% - 100%)**: Indicates high legibility.
* **Yellow Badges (70% - 89%)**: Indicates moderate legibility. Border outlines on the form input highlight these fields for inspection.
* **Red Badges (Below 70%)**: Indicates low legibility. Inputs are highlighted with red borders to capture immediate human review.

---

## 5. Validation Engine (9 Business Rules)

Once structured JSON is obtained, it is evaluated by the validation service in `src/lib/validation.ts`.

1. **Mandatory Fields**: Confirms presence of Date, Shift, Employee Number, and Machine Number. (Errors)
2. **Shift Check**: Validates value is one of `I`, `II`, `III`. (Errors)
3. **Employee Format**: Validates format matches `^BT\d+$`. (Errors)
4. **Machine Format**: Validates format matches `^MC-\d{3}$`. (Errors)
5. **Operation Code**: Validates character string is numeric. (Errors)
6. **Quantity Range**: Validates value is $\ge 0$. Empty quantities trigger a `"Manual Review Required"` warning.
7. **Time Bounds**: Validates value satisfies $0 < \text{time} \le 12$ hours. (Errors)
8. **Duplicate Detection**: Queries the database to flag if the `workOrderNo` has already been logged. (Warnings)
9. **Outlier Check**: Computes production rate $\text{qty} / \text{hours}$. Flags rates $> 250$ parts/hour or $< 0.5$ parts/hour as anomalies. (Warnings)

---

## 6. Human Review & Auditing

Supervisors interact with the data in `/dashboard/review`.

* **Action Blockers**: If a record has **Validation Errors** (Rules 1-5, 7), the supervisor **cannot** approve it. The UI blocks promotion until errors are resolved.
* **Warnings Permitted**: Records with only **Warnings** (duplicate work orders, outlier rates, or missing quantities) can still be approved if the supervisor confirms the values are correct.
* **Audit Trail**: Every time a field is modified, the `PUT /api/records` route compares values and writes an entry to the `AuditLog` table. This provides a transparent logging history of edits made before database promotion.
