import { writable } from "svelte/store";
import supabase from "$lib/utils/supabase";
import { displayErrorMessage } from "$lib/utils/handleError";
import { snackbar } from "./SnackbarStore";

export const clients = writable<Client[]>([])

export const loadClients = async () => {
const { data, error } = await supabase
  .from('client')
  .select('*, invoice(id, invoiceStatus, lineItems(*))')

  if (error) {
    console.error(error);
    return;
  }

  clients.set(data as Client[]);
} 

export const addClient = async (clientToAdd: Client) => {
const { data, error } = await supabase
.from('client')
//ONCE AUTH IS SETUP, REMOVE THE userId: ' '
// userId: '4262d557-fd5f-4bdf-a293-2ed74bc06500'
.insert([
  { ...clientToAdd, clientStatus: "active" }
])
.select();

if (error) {
  displayErrorMessage(error as Error);
  return;
}

  const id = data[0].id;

  snackbar.send({
    message: 'Your client was successfully created.',
    type: 'success'
  });

  clients.update((prev: Client[]) => [...prev, { ...clientToAdd, clientStatus: "active", id }]);
  return clientToAdd;
}

export const updateClient = async (clientToUpdate: Client) => {
  console.log('update');
  //clientToUpdate has invoice information on it, so we need to destructure it and only send supabase the client information
  const { invoice, ...newClient } = clientToUpdate;

  const { data, error } = await supabase
    .from('client')
    .update(newClient)
    .eq('id', newClient.id)

    if (error) {
      displayErrorMessage(error as Error)
      console.log(newClient);
      return;
    }

  clients.update((prev: Client[]) => prev.map((cur: Client) => cur.id === clientToUpdate.id ? clientToUpdate : cur));
  return clientToUpdate;
};

export const getClientById = async (id: string) => {
  const { data, error } = await supabase
  .from('client')
  .select('*, invoice(id, invoiceStatus, invoiceNumber, dueDate, client(id, name), lineItems(*))')
  .eq('id', id)

  if (error) {
    console.error(error);
    return;
  }

  if (data && data[0]) return data[0] as Client;

  console.warn('Cannot find a client.')
}