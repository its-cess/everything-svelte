import type {Action} from 'svelte/action'

export const clickOutside: Action<HTMLElement, () => void> = (node, runFunction) => {
  const handleClick = (event: MouseEvent) => {
    //if the container that we clicked on does NOT contain our node, then run the function that was passed to it
    if (!node.contains(event.target as HTMLElement)) {
      //checks to make sure a function was passed to it before running the function
      if(runFunction) runFunction();
    }
  }

  document.addEventListener("click", handleClick, true);

  return {
    //removes eventListener when the component is destroyed
    destroy() {
      document.removeEventListener("click", handleClick, true);
    }
  }
}