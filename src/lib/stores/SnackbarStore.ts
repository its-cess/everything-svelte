import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const newSnackbar = () => {
  const { update, subscribe } = writable<Snackbar[]>([])

  function send(content: { message: string, type: NotificationType }) {
    //newContent will have a generated id, and then include the content that we pass into it to create a new object.
    const newContent = {id: uuidv4(), ...content}
    //we will then update our store with the previous store, adding the newContent object we just created.
    update(store => [...store, newContent])
  }

  function remove(id: string | null = null) {
    update(store => {
      //looks for the id and filters out the ones that do not match the id provided
      if (id) return store.filter(item => item.id !== id)
      //grabs our store. knocks off the 'first item' which is where the blank space is before the comma, and then returns the 'rest' of the store
      const [, ...rest] = store;
      //returns the rest of our store without the first item
      return [...rest];
    })
  }

  return { subscribe, send, remove };
}

export const snackbar = newSnackbar();