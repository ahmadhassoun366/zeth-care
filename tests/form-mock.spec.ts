import { test, chromium, BrowserContext } from '@playwright/test';

let persistentContext: BrowserContext;

test.beforeAll(async () => {
	// Crea un contexto persistente especificando un directorio para almacenar el estado.
	persistentContext = await chromium.launchPersistentContext('', { headless: false });
	const page = await persistentContext.newPage();

	// Realiza el login
	await page.goto('/');
	await page.click('button[data-testid="login-btn"]');
	await page.click('button[data-testid="google-login"]');
	await page.waitForTimeout(2000);
	await page.close();
});

const network = {
	name: 'Ethereum+',
	currency: 'ETHP',
	symbol: 'ETH+',
	chain_id: '1',
	image: 'tests/fixtures/image.png',

	gas_price: '10',

	foundation_address: '0x0000000000000000000000000000000000000000',
	gas_price_manager_address: '0x0000000000000000000000000000000000000000',
	automation_revenue_address: '0x0000000000000000000000000000000000000000',

	initial_supply: [
		{
			address: '0x0000000000000000000000000000000000000000',
			amount: '1000',
		},
	],
};

test('create network', async () => {
	// Navigate to the Create Network page.

	const page = await persistentContext.newPage();

	await page.goto('/launch');

	// Fill the basic info fields.
	await page.fill('input[name="network_name"]', network.name);
	await page.fill('input[name="currency_name"]', network.currency);
	await page.fill('input[name="currency_symbol"]', network.symbol);
	await page.fill('input[name="chain_id"]', network.chain_id);

	// Optionally upload a file for project cover.
	// This assumes your ProjectCover component renders an input[type=file]
	await page.setInputFiles('input[name="network_image"]', network.image);

	// Select the VM type radio (adjust the value if necessary).
	await page.check('input[name="vm_type"][value="ETHEREUM"]');

	// Fill the gas price field.
	await page.fill('input[name="gas_price"]', network.gas_price);

	// Fill the essential addresses.
	await page.fill('input[name="foundation_address"]', network.foundation_address);
	await page.fill('input[name="gas_price_manager_address"]', network.gas_price_manager_address);
	await page.fill('input[name="automation_revenue_address"]', network.automation_revenue_address);

	// For the bridges dropdown, click the dropdown then select an option.
	// (Assuming the dropdown renders a clickable element with text "NFTs")
	await page.fill('input[name="initial_supply.0.address"]', network.initial_supply[0].address);
	await page.fill('input[name="initial_supply.0.amount"]', network.initial_supply[0].amount);

	// Accept the Terms of Use.
	await page.check('input[name="accept_terms"]');

	await page.click('button[type="submit"]');

	await page.waitForTimeout(10 * 1000);

	// check if data=launch-success is present
	const success = await page.isVisible('[data-testid="launch-success"]');

	test.expect(success).toBeTruthy();
});
