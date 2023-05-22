import { getClientById } from '$lib/stores/ClientStore.js';

export function load({params}) {
  const id = params?.id;
  const client = getClientById(id);
  return { client };
}