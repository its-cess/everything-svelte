import { writable } from 'svelte/store';
import { snackbar } from './SnackbarStore';
import { displayErrorMessage } from '$lib/utils/handleError';
import supabase from '$lib/utils/supabase';

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = async () => {
	const { data, error } = await supabase
		//selecting from the 'invoice' table
		.from('invoice')
		//specifically selecting everything, including the client id and name, and all the lineItems
		.select('*, client(id, name), lineItems(*)')

	if (error) {
		console.error(error);
		return
	}

	invoices.set(data as Invoice[]);
};

export const addInvoice = async (invoiceToAdd: Invoice) => {
	const { lineItems, client, ...newInvoice} = invoiceToAdd;

	//add in the invoice to supabase

const invoiceResults = await supabase
.from('invoice')
.insert([
	{...newInvoice, clientId: client.id }
])
.select()

if (invoiceResults.error) {
	displayErrorMessage(invoiceResults.error as Error)
	return;
}
	//get the invoice id
	const invoiceId = invoiceResults.data[0].id;

	//loop over all line items and add the invoice id
	if (lineItems && lineItems.length > 0) {
		const newLineItems = lineItems.map((lineItem: LineItem) => ({ ...lineItem, invoiceId }) )

		//add line items to supabase
		const lineItemsResults = await supabase
		.from('lineItems')
		.insert(newLineItems)

		if (lineItemsResults.error) {
			displayErrorMessage(lineItemsResults.error as Error)
			return;
		}
	}

	//update the store
	invoices.update((prev: Invoice[]) => [...prev, {...invoiceToAdd, id: invoiceId}]);
	snackbar.send({
		message: 'Your invoice was successfully created.',
		type: 'success'
	});
	return invoiceToAdd;
}

export const updateInvoice = (invoiceToUpdate: Invoice) => {
	invoices.update((prev: Invoice[]) => prev.map((cur: Invoice) => cur.id === invoiceToUpdate.id ? invoiceToUpdate : cur))
	return invoiceToUpdate;
}

export const deleteInvoice = (invoiceToDelete: Invoice) => {
	// filter only returns items that are true
	invoices.update((prev: Invoice[]) =>
		prev.filter((cur: Invoice) => cur.id !== invoiceToDelete.id)
	);
	return invoiceToDelete;
};

export const getInvoiceById = async (id: string) => {
	const { data, error } = await supabase
		.from('invoice')
		.select('*, client(id, name), lineItems(*)')
		//equals('column we are looking for', the value we are looking for)
		.eq('id', id)
		if (error) {
			console.error(error);
		}

		if (data && data[0]) {
			return data[0] as Invoice;
		}
		console.warn('cannot find invoice with id: ' + id);
}
