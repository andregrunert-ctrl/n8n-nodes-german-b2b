# n8n-nodes-german-b2b 🇩🇪⚡📦

[![npm version](https://img.shields.io/npm/v/n8n-nodes-german-b2b.svg)](https://www.npmjs.com/package/n8n-nodes-german-b2b)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Official **n8n Community Node** for the German & DACH B2B Data & Compliance Suite. Direct, turnkey access to the 6 most essential German enterprise datasets and compliance tools via Apify:

1. 🏢 **B2B Directory Leads (11880 & Gelbe Seiten)** – Extract verified local businesses, crafts (Handwerker) with phone, address, and domain.
2. 🕵️ **Impressum & CEO Enricher (§ 5 DDG)** – Automated CEO discovery, corporate legal entity resolution, HRB number and VAT ID extraction.
3. 🏛️ **Handelsregister & Insolvency KYB** – Official German Commercial Register checks and federal insolvency court filings (insolvenzbekanntmachungen.de).
4. 📋 **Public Tenders (Bund.de)** – Monitor German government procurement, tenders, and contracts.
5. 🏠 **Real Estate Foreclosures (ZVG-Portal)** – Official judicial foreclosure auctions, appraisals, and property valuations.
6. 🧾 **E-Invoice (ZUGFeRD & XRechnung)** – Generate, extract, and validate EU standard EN 16931 & Factur-X compliant e-invoices in PDF/A-3 and CII XML.

---

## 🎥 48-Second Live Video Showcase (1080p HD)

[![Watch German B2B Data Suite Live Video Showcase](https://raw.githubusercontent.com/andregrunert-ctrl/german-b2b-data-suite/main/docs/b2b_showcase_banner.png)](https://youtu.be/ERydgz1hGk8)

*Automate German B2B lead generation, GDPR-compliant impressum enrichment (§ 5 DDG), real-time Handelsregister (XJustiz) & insolvency KYB audits, ZVG foreclosures, and public tenders via n8n workflows.*

> 💡 **Looking for E-Invoicing?** Watch our [45-second ZUGFeRD & XRechnung Live Demo](https://youtu.be/xkDNnPjQxRo) on YouTube.

---

## 🚀 Installation

### In your n8n Instance (Community Nodes UI)

1. Go to **Settings > Community Nodes** in your self-hosted or cloud n8n instance.
2. Select **Install a community node**.
3. Enter `n8n-nodes-german-b2b` and confirm.

### Via Docker / Manual Install

In your n8n root directory:
```bash
npm install n8n-nodes-german-b2b
```

---

## 🔑 Authentication & 13 Turnkey Public Tasks

All 6 Apify Cloud Actors are **live, KYC-verified, and immediately executable by external Apify accounts** (including Apify's free tier with **$5/month free Starter credits**):

1. Get your free personal token at [**Apify Console > Settings > Integrations**](https://console.apify.com/account/integrations).
2. In n8n, create a new credential of type **German B2B Apify API** and paste your **Apify API Token** (`apify_api_...`).
3. Browse & test all **6 Actors and 13 ready-to-run Public Tasks** at [**apify.com/agrunert**](https://apify.com/agrunert) (full task links in [`german-b2b-data-suite`](https://github.com/andregrunert-ctrl/german-b2b-data-suite#13-turnkey-public-tasks)).

---

## 💡 Available Resources & Operations

| Resource | Operation | Apify Actor Store Link |
| :--- | :--- | :--- |
| **B2B Directory Leads** | Search Directory Leads | [`AGrunert/german-b2b-leads-directory-scraper`](https://apify.com/AGrunert/german-b2b-leads-directory-scraper) |
| **Impressum & CEO Enricher** | Enrich Domains | [`AGrunert/german-impressum-b2b-lead-enricher`](https://apify.com/AGrunert/german-impressum-b2b-lead-enricher) |
| **Handelsregister & Insolvency KYB** | Verify Company | [`AGrunert/german-company-kyb-insolvency-scraper`](https://apify.com/AGrunert/german-company-kyb-insolvency-scraper) |
| **Public Tenders (Bund.de)** | Search Tenders | [`AGrunert/german-public-tenders-vergabe-scraper`](https://apify.com/AGrunert/german-public-tenders-vergabe-scraper) |
| **Real Estate Foreclosures (ZVG)** | Search Foreclosures | [`AGrunert/german-real-estate-foreclosure-zvg-scraper`](https://apify.com/AGrunert/german-real-estate-foreclosure-zvg-scraper) |
| **E-Invoice Suite** | Generate E-Invoice, Extract XML, Validate | [`AGrunert/german-e-invoice-zugferd-xrechnung-suite`](https://apify.com/AGrunert/german-e-invoice-zugferd-xrechnung-suite) |

> 🤖 **Using AI Agents (Claude Desktop / Cursor / Windsurf)?** Install our official Python MCP server directly from PyPI: `pip install german-b2b-mcp` or `uvx german-b2b-mcp` ([`german-b2b-data-suite`](https://github.com/andregrunert-ctrl/german-b2b-data-suite)).

---

## 🛠️ Typical Use Cases

* **DACH Lead Generation & Instant KYB**: Discover 50 roofers in Berlin, enrich them with their § 5 DDG CEO and phone, and verify that no active insolvency filings exist before feeding into HubSpot or Salesforce.
* **Tender Alerts**: Daily cron workflow querying Bund.de for "Cloud" and "KI" tenders, routing new bids to Slack with direct tender document links.
* **Foreclosure Deal Flow**: Alert real estate investors on high-yield multi-family houses (Mehrfamilienhäuser) with appraisal value > €500k.
* **Automated E-Invoicing**: Turn CRM deals into legally compliant ZUGFeRD 2.2 / XRechnung 3.0 PDF/A-3 invoices sent to clients automatically.

---

## 📄 License

MIT © [Andre Grunert](https://github.com/andregrunert-ctrl)
