import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class GermanB2bSuite implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'German B2B Suite',
		name: 'germanB2bSuite',
		icon: 'file:germanB2bSuite.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Access the 6 official German B2B & Compliance APIs (Handelsregister, KYB, Insolvenz, Impressum, ZUGFeRD, XRechnung, ZVG, Tenders, Leads)',
		defaults: {
			name: 'German B2B Suite',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'germanB2bApi',
				required: true,
			},
		],
		properties: [
			// ==========================================
			// RESOURCE SELECTOR (6 Tools)
			// ==========================================
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'B2B Directory Leads (11880 & Gelbe Seiten)',
						value: 'b2bLeads',
						description: 'Scrape verified German local businesses & crafts with phone, address & domain',
					},
					{
						name: 'Impressum & CEO Enricher (§ 5 DDG)',
						value: 'impressum',
						description: 'Enrich German corporate domains with legal entity, CEO, HRB number and VAT ID',
					},
					{
						name: 'Handelsregister & Insolvency KYB',
						value: 'kyb',
						description: 'Official German Commercial Register audit and federal insolvency court checks',
					},
					{
						name: 'Public Tenders (Bund.de)',
						value: 'tenders',
						description: 'Scrape German public procurement tenders and procurement contracts',
					},
					{
						name: 'Real Estate Foreclosures (ZVG-Portal)',
						value: 'zvg',
						description: 'Search official German judicial foreclosure auctions and appraisals',
					},
					{
						name: 'E-Invoice (ZUGFeRD & XRechnung)',
						value: 'zugferd',
						description: 'Generate, extract and validate EN 16931 & Factur-X electronic invoices',
					},
				],
				default: 'b2bLeads',
			},

			// ==========================================
			// OPERATIONS FOR EACH RESOURCE
			// ==========================================
			// Resource 1: B2B Leads
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['b2bLeads'],
					},
				},
				options: [
					{
						name: 'Search Directory Leads',
						value: 'searchLeads',
						description: 'Search German B2B directory leads by keyword & location',
						action: 'Search German directory leads',
					},
				],
				default: 'searchLeads',
			},

			// Resource 2: Impressum
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['impressum'],
					},
				},
				options: [
					{
						name: 'Enrich Domains',
						value: 'enrichDomains',
						description: 'Extract § 5 DDG legal notices, managing directors, and VAT IDs',
						action: 'Enrich domains via impressum',
					},
				],
				default: 'enrichDomains',
			},

			// Resource 3: KYB & Handelsregister
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['kyb'],
					},
				},
				options: [
					{
						name: 'Verify Company',
						value: 'verifyCompany',
						description: 'Check official Handelsregister & insolvency registry status',
						action: 'Verify company and check insolvency',
					},
				],
				default: 'verifyCompany',
			},

			// Resource 4: Tenders
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tenders'],
					},
				},
				options: [
					{
						name: 'Search Tenders',
						value: 'searchTenders',
						description: 'Search Bund.de public procurement tenders',
						action: 'Search public tenders',
					},
				],
				default: 'searchTenders',
			},

			// Resource 5: ZVG Foreclosures
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['zvg'],
					},
				},
				options: [
					{
						name: 'Search Foreclosures',
						value: 'searchForeclosures',
						description: 'Search official German court foreclosure auctions',
						action: 'Search real estate foreclosures',
					},
				],
				default: 'searchForeclosures',
			},

			// Resource 6: ZUGFeRD / XRechnung
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['zugferd'],
					},
				},
				options: [
					{
						name: 'Generate E-Invoice',
						value: 'generateInvoice',
						description: 'Create compliant PDF/A-3 and embedded Factur-X/ZUGFeRD CII XML',
						action: 'Generate e-invoice pdf and xml',
					},
					{
						name: 'Extract XML / Validate',
						value: 'extractXml',
						description: 'Extract embedded CII / UBL XML from electronic invoice PDF and validate',
						action: 'Extract xml from e-invoice pdf',
					},
				],
				default: 'generateInvoice',
			},

			// ==========================================
			// RESOURCE 1: B2B Leads Parameters
			// ==========================================
			{
				displayName: 'Search Query / Keyword',
				name: 'query',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['b2bLeads'],
						operation: ['searchLeads'],
					},
				},
				default: 'Dachdecker',
				description: 'Search keyword (e.g. Dachdecker, Steuerberater, Elektriker, IT)',
			},
			{
				displayName: 'Location / City',
				name: 'location',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['b2bLeads'],
						operation: ['searchLeads'],
					},
				},
				default: 'Berlin',
				description: 'City, postal code or German federal state (e.g. München, 10115, Bayern)',
			},
			{
				displayName: 'Max Items',
				name: 'maxItems',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['b2bLeads'],
						operation: ['searchLeads'],
					},
				},
				default: 20,
				description: 'Maximum number of company records to scrape',
			},
			{
				displayName: 'Require Website',
				name: 'requireWebsite',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['b2bLeads'],
						operation: ['searchLeads'],
					},
				},
				default: false,
				description: 'Whether to return only businesses with a valid website domain',
			},
			{
				displayName: 'Require Phone',
				name: 'requirePhone',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['b2bLeads'],
						operation: ['searchLeads'],
					},
				},
				default: false,
				description: 'Whether to return only businesses with a verified telephone number',
			},
			{
				displayName: 'Include Details',
				name: 'includeDetails',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['b2bLeads'],
						operation: ['searchLeads'],
					},
				},
				default: true,
				description: 'Whether to fetch full deep detail page information for each lead',
			},

			// ==========================================
			// RESOURCE 2: Impressum Parameters
			// ==========================================
			{
				displayName: 'Domains to Enrich',
				name: 'domains',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['impressum'],
						operation: ['enrichDomains'],
					},
				},
				default: 'personio.de, celonis.com',
				description: 'One or multiple German domains, separated by commas or newlines',
			},
			{
				displayName: 'Extract Contact Page',
				name: 'extractContactPage',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['impressum'],
						operation: ['enrichDomains'],
					},
				},
				default: true,
				description: 'Whether to scan the contact / about page if the Impressum is minimal',
			},
			{
				displayName: 'Max Concurrency',
				name: 'maxConcurrency',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['impressum'],
						operation: ['enrichDomains'],
					},
				},
				default: 5,
				description: 'Maximum parallel scraping workers',
			},

			// ==========================================
			// RESOURCE 3: KYB Parameters
			// ==========================================
			{
				displayName: 'Company Name',
				name: 'companyName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['kyb'],
						operation: ['verifyCompany'],
					},
				},
				default: 'BioNTech SE',
				description: 'German registered company name or search term',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['kyb'],
						operation: ['verifyCompany'],
					},
				},
				default: '',
				description: 'City of registration (optional, helps narrow down exact court)',
			},
			{
				displayName: 'Register Number',
				name: 'registerNumber',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['kyb'],
						operation: ['verifyCompany'],
					},
				},
				default: '',
				description: 'Commercial register number (e.g. HRB 48720)',
			},
			{
				displayName: 'Register Type',
				name: 'registerType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['kyb'],
						operation: ['verifyCompany'],
					},
				},
				options: [
					{ name: 'All Register Types', value: 'ALL' },
					{ name: 'HRB (Handelsregister B - GmbH, AG, SE)', value: 'HRB' },
					{ name: 'HRA (Handelsregister A - Einzelunternehmen, KG, OHG)', value: 'HRA' },
					{ name: 'GnR (Genossenschaftsregister)', value: 'GnR' },
					{ name: 'PR (Partnerschaftsregister)', value: 'PR' },
					{ name: 'VR (Vereinsregister)', value: 'VR' },
				],
				default: 'HRB',
				description: 'Type of German court register',
			},
			{
				displayName: 'Include Insolvency Check',
				name: 'includeInsolvencyCheck',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['kyb'],
						operation: ['verifyCompany'],
					},
				},
				default: true,
				description: 'Whether to perform a live check against the federal insolvency register (insolvenzbekanntmachungen.de)',
			},
			{
				displayName: 'Include Financial Details',
				name: 'includeFinancialDetails',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['kyb'],
						operation: ['verifyCompany'],
					},
				},
				default: true,
				description: 'Whether to extract registered share capital (Stammkapital) and corporate filings',
			},

			// ==========================================
			// RESOURCE 4: Tenders Parameters
			// ==========================================
			{
				displayName: 'Search Keywords',
				name: 'keywords',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenders'],
						operation: ['searchTenders'],
					},
				},
				default: 'IT-Dienstleistungen, Software',
				description: 'Search keywords for public procurement notices (comma-separated)',
			},
			{
				displayName: 'German States',
				name: 'states',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tenders'],
						operation: ['searchTenders'],
					},
				},
				default: 'Berlin',
				description: 'Filter by German states (e.g. Berlin, Bayern, NRW or ALL)',
			},
			{
				displayName: 'Service Type',
				name: 'serviceType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['tenders'],
						operation: ['searchTenders'],
					},
				},
				options: [
					{ name: 'All Service Types (Alle Leistungsarten)', value: 'ALL' },
					{ name: 'Dienstleistungen (Services)', value: 'Dienstleistungen' },
					{ name: 'Bauleistungen (Construction)', value: 'Bauleistungen' },
					{ name: 'Lieferleistungen (Supplies & Deliveries)', value: 'Lieferleistungen' },
					{ name: 'Informationstechnik (IT)', value: 'Informationstechnik' },
					{ name: 'Forschung und Entwicklung (R&D)', value: 'Forschung und Entwicklung' },
				],
				default: 'ALL',
				description: 'Procurement category filter',
			},
			{
				displayName: 'Max Items',
				name: 'maxTenderItems',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['tenders'],
						operation: ['searchTenders'],
					},
				},
				default: 25,
				description: 'Maximum number of tender notices to return',
			},

			// ==========================================
			// RESOURCE 5: ZVG Foreclosures Parameters
			// ==========================================
			{
				displayName: 'German State Code (ZVG)',
				name: 'zvgStates',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['zvg'],
						operation: ['searchForeclosures'],
					},
				},
				default: 'nw',
				description: 'State code (e.g. nw for NRW, by for Bayern, be for Berlin, sn for Sachsen)',
			},
			{
				displayName: 'City / Court',
				name: 'zvgCity',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['zvg'],
						operation: ['searchForeclosures'],
					},
				},
				default: '',
				description: 'City or Amtsgericht name (optional)',
			},
			{
				displayName: 'Property Type',
				name: 'propertyType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['zvg'],
						operation: ['searchForeclosures'],
					},
				},
				options: [
					{ name: 'All Property Types (Alle Objektarten)', value: 'ALL' },
					{ name: 'Eigentumswohnung (Condominium / Apartment)', value: 'Eigentumswohnung' },
					{ name: 'Einfamilienhaus (Single-Family House)', value: 'Einfamilienhaus' },
					{ name: 'Mehrfamilienhaus (Multi-Family House / Building)', value: 'Mehrfamilienhaus' },
					{ name: 'Doppelhaushälfte (Semi-Detached House)', value: 'Doppelhaushälfte' },
					{ name: 'Reihenhaus (Terraced House)', value: 'Reihenhaus' },
					{ name: 'Gewerbe (Commercial / Office)', value: 'Gewerbe' },
					{ name: 'Grundstück (Land / Plot)', value: 'Grundstück' },
					{ name: 'Garage / Stellplatz (Parking)', value: 'Garage' },
				],
				default: 'ALL',
				description: 'Type of auctioned property',
			},
			{
				displayName: 'Max Items',
				name: 'maxZvgItems',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['zvg'],
						operation: ['searchForeclosures'],
					},
				},
				default: 25,
				description: 'Maximum number of foreclosure auctions to return',
			},
			{
				displayName: 'Min Market Value (EUR)',
				name: 'minMarketValue',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['zvg'],
						operation: ['searchForeclosures'],
					},
				},
				default: 0,
				description: 'Minimum property appraisal value in EUR (0 = no limit)',
			},
			{
				displayName: 'Max Market Value (EUR)',
				name: 'maxMarketValue',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['zvg'],
						operation: ['searchForeclosures'],
					},
				},
				default: 0,
				description: 'Maximum property appraisal value in EUR (0 = no limit)',
			},

			// ==========================================
			// RESOURCE 6: ZUGFeRD / XRechnung Parameters
			// ==========================================
			{
				displayName: 'E-Invoice Profile',
				name: 'profile',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['zugferd'],
						operation: ['generateInvoice'],
					},
				},
				options: [
					{ name: 'EN16931 (Comfort / EU Standard)', value: 'EN16931' },
					{ name: 'XRECHNUNG_3_0 (German B2G & B2B Mandate 2025/2026)', value: 'XRECHNUNG_3_0' },
					{ name: 'EXTENDED (Full Business Details)', value: 'EXTENDED' },
					{ name: 'BASIC (Structured B2B Data)', value: 'BASIC' },
				],
				default: 'EN16931',
				description: 'Official ZUGFeRD 2.2 / Factur-X / XRechnung compliance profile',
			},
			{
				displayName: 'Invoice JSON Data',
				name: 'invoiceDataJson',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['zugferd'],
						operation: ['generateInvoice'],
					},
				},
				default: JSON.stringify(
					{
						invoice_number: 'INV-2026-001',
						issue_date: '2026-10-30',
						due_date: '2026-11-30',
						currency: 'EUR',
						seller: {
							name: 'Muster Consulting GmbH',
							street: 'Hauptstraße 42',
							postal_code: '10115',
							city: 'Berlin',
							country_code: 'DE',
							vat_id: 'DE123456789',
							iban: 'DE02120300000000202020',
							bic: 'BYLADEM1001',
							email: 'billing@muster-consulting.de',
						},
						buyer: {
							name: 'Kunde AG',
							street: 'Kundenweg 10',
							postal_code: '80331',
							city: 'München',
							country_code: 'DE',
							vat_id: 'DE987654321',
						},
						line_items: [
							{
								name: 'Cloud Architecture & API Integration',
								quantity: 10,
								unit_code: 'HUR',
								unit_price: 150.0,
								tax_rate: 19.0,
							},
						],
						payment_means: {
							code: '30',
							iban: 'DE02120300000000202020',
							bic: 'BYLADEM1001',
						},
					},
					null,
					2,
				),
				description: 'Structured JSON object containing seller, buyer, line items and payment details',
			},
			{
				displayName: 'File URL (PDF or XML)',
				name: 'fileUrl',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['zugferd'],
						operation: ['extractXml'],
					},
				},
				default: '',
				description: 'Public URL of the PDF or XML invoice to extract or validate',
			},
			{
				displayName: 'Raw XML or Base64 Payload',
				name: 'fileBase64OrXml',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['zugferd'],
						operation: ['extractXml'],
					},
				},
				default: '',
				description: 'Optional Base64-encoded PDF or raw CII / UBL XML content',
			},

			// ==========================================
			// ADVANCED: Custom JSON Override
			// ==========================================
			{
				displayName: 'Custom JSON Override',
				name: 'customJsonOverride',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['b2bLeads', 'impressum', 'kyb', 'tenders', 'zvg'],
					},
				},
				default: '',
				description: 'Optional raw JSON string to override or extend the Apify actor payload directly',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('germanB2bApi');

		if (!credentials?.apiToken) {
			throw new NodeOperationError(this.getNode(), 'No Apify API Token provided in credentials.');
		}

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let actorSlug = '';
				let payload: IDataObject = {};

				if (resource === 'b2bLeads') {
					actorSlug = 'AGrunert~german-b2b-leads-directory-scraper';
					const query = this.getNodeParameter('query', i) as string;
					const location = this.getNodeParameter('location', i) as string;
					const maxItems = this.getNodeParameter('maxItems', i, 20) as number;
					const requireWebsite = this.getNodeParameter('requireWebsite', i, false) as boolean;
					const requirePhone = this.getNodeParameter('requirePhone', i, false) as boolean;
					const includeDetails = this.getNodeParameter('includeDetails', i, true) as boolean;

					payload = {
						query,
						location,
						search_terms: [query],
						locations: [location],
						max_items: maxItems,
						require_website: requireWebsite,
						require_phone: requirePhone,
						include_details: includeDetails,
					};
				} else if (resource === 'impressum') {
					actorSlug = 'AGrunert~german-impressum-b2b-lead-enricher';
					const domainsStr = this.getNodeParameter('domains', i) as string;
					const extractContactPage = this.getNodeParameter('extractContactPage', i, true) as boolean;
					const maxConcurrency = this.getNodeParameter('maxConcurrency', i, 5) as number;

					const domainsList = domainsStr
						.split(/[\n,]/)
						.map((d) => d.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, ''))
						.filter(Boolean);

					payload = {
						domains: domainsList,
						extract_contact_page: extractContactPage,
						max_concurrency: maxConcurrency,
					};
				} else if (resource === 'kyb') {
					actorSlug = 'AGrunert~german-company-kyb-insolvency-scraper';
					const companyName = this.getNodeParameter('companyName', i) as string;
					const city = this.getNodeParameter('city', i, '') as string;
					const registerNumber = this.getNodeParameter('registerNumber', i, '') as string;
					const registerType = this.getNodeParameter('registerType', i, 'HRB') as string;
					const includeInsolvencyCheck = this.getNodeParameter('includeInsolvencyCheck', i, true) as boolean;
					const includeFinancialDetails = this.getNodeParameter('includeFinancialDetails', i, true) as boolean;

					payload = {
						company_name: companyName,
						companies: [companyName],
						city: city || undefined,
						register_number: registerNumber || undefined,
						register_type: registerType,
						include_insolvency_check: includeInsolvencyCheck,
						include_financial_details: includeFinancialDetails,
					};
				} else if (resource === 'tenders') {
					actorSlug = 'AGrunert~german-public-tenders-vergabe-scraper';
					const keywords = this.getNodeParameter('keywords', i) as string;
					const states = this.getNodeParameter('states', i, 'Berlin') as string;
					const serviceType = this.getNodeParameter('serviceType', i, 'ALL') as string;
					const maxItems = this.getNodeParameter('maxTenderItems', i, 25) as number;

					const keywordsList = keywords
						.split(/[\n,]/)
						.map((k) => k.trim())
						.filter(Boolean);

					const statesList = states
						.split(/[\n,]/)
						.map((s) => s.trim())
						.filter(Boolean);

					payload = {
						keywords: keywordsList.length > 0 ? keywordsList : ['Software'],
						states: statesList.length > 0 ? statesList : ['ALL'],
						service_type: serviceType,
						max_items: maxItems,
						include_details: true,
					};
				} else if (resource === 'zvg') {
					actorSlug = 'AGrunert~german-real-estate-foreclosure-zvg-scraper';
					const zvgStates = this.getNodeParameter('zvgStates', i, 'nw') as string;
					const zvgCity = this.getNodeParameter('zvgCity', i, '') as string;
					const propertyType = this.getNodeParameter('propertyType', i, 'ALL') as string;
					const maxItems = this.getNodeParameter('maxZvgItems', i, 25) as number;
					const minMarketValue = this.getNodeParameter('minMarketValue', i, 0) as number;
					const maxMarketValue = this.getNodeParameter('maxMarketValue', i, 0) as number;

					const statesList = zvgStates
						.split(/[\n,]/)
						.map((s) => s.trim().toLowerCase())
						.filter(Boolean);

					payload = {
						states: statesList.length > 0 ? statesList : ['nw'],
						city: zvgCity || undefined,
						property_type: propertyType,
						max_items: maxItems,
						min_market_value: minMarketValue > 0 ? minMarketValue : undefined,
						max_market_value: maxMarketValue > 0 ? maxMarketValue : undefined,
						include_details: true,
						include_cancelled: false,
					};
				} else if (resource === 'zugferd') {
					actorSlug = 'AGrunert~german-e-invoice-zugferd-xrechnung-suite';

					if (operation === 'generateInvoice') {
						const profile = this.getNodeParameter('profile', i, 'EN16931') as string;
						const invoiceDataRaw = this.getNodeParameter('invoiceDataJson', i) as string | IDataObject;
						let parsedInvoiceData: IDataObject;

						if (typeof invoiceDataRaw === 'string') {
							parsedInvoiceData = JSON.parse(invoiceDataRaw);
						} else {
							parsedInvoiceData = invoiceDataRaw;
						}

						payload = {
							operation: 'generate',
							profile,
							invoice_data: parsedInvoiceData,
						};
					} else if (operation === 'extractXml') {
						const fileUrl = this.getNodeParameter('fileUrl', i, '') as string;
						const fileBase64OrXml = this.getNodeParameter('fileBase64OrXml', i, '') as string;

						const isXml = fileBase64OrXml && fileBase64OrXml.trim().startsWith('<');

						payload = {
							operation: 'extract',
							file_url: fileUrl || undefined,
							file_base64: !isXml && fileBase64OrXml ? fileBase64OrXml : undefined,
							xml_base64: isXml ? Buffer.from(fileBase64OrXml).toString('base64') : undefined,
						};
					}
				}

				// Check custom JSON override
				try {
					const customOverride = this.getNodeParameter('customJsonOverride', i, '') as string | IDataObject;
					if (customOverride) {
						const parsedOverride = typeof customOverride === 'string' ? JSON.parse(customOverride) : customOverride;
						payload = { ...payload, ...parsedOverride };
					}
				} catch {
					// Ignore if parameter not present for resource
				}

				// Synchronous Apify Actor Execution
				const endpointUrl = `https://api.apify.com/v2/acts/${actorSlug}/run-sync-get-dataset-items`;

				const response = await this.helpers.httpRequest({
					method: 'POST',
					url: endpointUrl,
					headers: {
						Authorization: `Bearer ${credentials.apiToken}`,
						'Content-Type': 'application/json',
					},
					body: payload,
					json: true,
					timeout: 300000, // 5 min timeout for complex scraping runs
				});

				if (Array.isArray(response)) {
					for (const entry of response) {
						returnData.push({
							json: entry as IDataObject,
							pairedItem: { item: i },
						});
					}
				} else if (response && typeof response === 'object') {
					returnData.push({
						json: response as IDataObject,
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message || String(error),
						},
						pairedItem: { item: i },
					});
				} else {
					throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
				}
			}
		}

		return [returnData];
	}
}
