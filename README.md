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

## 🔑 Authentication

1. In n8n, create a new credential of type **German B2B Apify API**.
2. Enter your **Apify API Token** (found at [Apify Console > Settings > Integrations](https://console.apify.com/account/integrations)).
3. Save the credential.

---

## 💡 Available Resources & Operations

| Resource | Operation | Apify Actor Backing |
| :--- | :--- | :--- |
| **B2B Directory Leads** | Search Directory Leads | `german-b2b-leads-directory-scraper` |
| **Impressum & CEO Enricher** | Enrich Domains | `german-impressum-b2b-lead-enricher` |
| **Handelsregister & Insolvency KYB** | Verify Company | `german-company-kyb-insolvency-scraper` |
| **Public Tenders (Bund.de)** | Search Tenders | `german-public-tenders-vergabe-scraper` |
| **Real Estate Foreclosures (ZVG)** | Search Foreclosures | `german-real-estate-foreclosure-zvg-scraper` |
| **E-Invoice Suite** | Generate E-Invoice, Extract XML, Validate | `german-e-invoice-zugferd-xrechnung-suite` |

---

## 🛠️ Typical Use Cases

* **DACH Lead Generation & Instant KYB**: Discover 50 roofers in Berlin, enrich them with their § 5 DDG CEO and phone, and verify that no active insolvency filings exist before feeding into HubSpot or Salesforce.
* **Tender Alerts**: Daily cron workflow querying Bund.de for "Cloud" and "KI" tenders, routing new bids to Slack with direct tender document links.
* **Foreclosure Deal Flow**: Alert real estate investors on high-yield multi-family houses (Mehrfamilienhäuser) with appraisal value > €500k.
* **Automated E-Invoicing**: Turn CRM deals into legally compliant ZUGFeRD 2.2 / XRechnung 3.0 PDF/A-3 invoices sent to clients automatically.

---

## 📄 License

MIT © [Andre Grunert](https://github.com/andregrunert-ctrl)
