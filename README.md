# KALACHAKRA — Play the Past. Build the Future.

KALACHAKRA is an interactive civilization and heritage learning game featuring 14 historical eras and **KALA** (Knowledge & AI Learning Assistant), an intelligent, context-aware AI game companion powered by the Google Gemini API.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure the Gemini API Key (`GEMINI_API_KEY`)

KALA uses a server-side endpoint (`/api/kala`) to communicate with Google's Gemini API so your API key is never exposed in browser code, network requests, or static bundles.

#### Local Development Setup

1. Copy `.env.example` to `.env` in the project root:
   ```bash
   cp .env.example .env
   ```
2. Set your Google Gemini API key inside `.env` using the variable name `GEMINI_API_KEY`:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key"
   ```
   > **Security Note:** Never prefix `GEMINI_API_KEY` with `VITE_`. `.env` is ignored by Git (`.gitignore`) and must never be committed.

3. Start the local development server:
   ```bash
   npm run dev
   ```
   The Vite server automatically mounts the server-side `/api/kala` endpoint and reads `GEMINI_API_KEY` in the Node process.

#### Production Configuration

- **Vercel / Serverless Deployment:**
  1. Open your project dashboard in Vercel (or your serverless Node hosting platform).
  2. Navigate to **Settings → Environment Variables**.
  3. Add a variable named `GEMINI_API_KEY` with your Gemini API key for the **Production** (and **Preview**) environment.
  4. Redeploy the project. Requests to `/api/kala` are handled by `api/kala.js` on the server side.

### 3. Build for Production

```bash
npm run build
npm run preview
```
