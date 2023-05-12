import { getInvoiceById } from '$lib/stores/InvoiceStore.js';

interface Props {
  params: {
    id: string
  }
}

export function load( { params }: Props) {
  const id = params?.id;
  const invoice = getInvoiceById(id);
  return { invoice };
}