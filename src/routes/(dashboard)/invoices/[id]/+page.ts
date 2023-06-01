import { getInvoiceById } from '$lib/stores/InvoiceStore.js';

interface Props {
  params: {
    id: string
  }
}

export async function load( { params }: Props) {
  const id = params?.id;
  const invoice = await getInvoiceById(id);
  return { invoice };
}