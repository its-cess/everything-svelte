import { writable } from "svelte/store";
import supabase from "$lib/utils/supabase";
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
.insert([
  { ...clientToAdd, clientStatus: "active", userId: '4262d557-fd5f-4bdf-a293-2ed74bc06500' },
])
.select();

if (error) {
  console.error(error);
  snackbar.send({
    message: error.message,
    type: "error"
  })
  return;
}

  const id = data[0].id;

  clients.update((prev: Client[]) => [...prev, { ...clientToAdd, clientStatus: "active", id }]);
  return clientToAdd;
}

export const updateClient = (clientToUpdate: Client) => {
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