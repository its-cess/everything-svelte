interface Invoice {
	invoiceStatus: InvoiceStatus;
	issueDate: string;
	invoiceNumber: string;
	id: string;
	client: Client;
	dueDate: string;
	subject?: string;
	lineItems?: LineItem[];
	notes?: string;
	terms?: string;
	createdAt: string;
	discount?: number;
}

interface Client {
	clientStatus?: ClientStatus;
	id: string;
	name: string;
	email: string;
	street?: string;
	city?: string;
	state?: string;
	zip?: string;
	invoices?: Invoice[]
}

interface LineItem {
	id: string;
	description: string;
	quantity: number;
	amount: amount;
}

interface Settings {
	myName: string
	email: string
	street: string
	city: string
	state: string
	zip: string
}

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Snackbar {
	id: string;
	message: string;
	type: NotificationType;
}