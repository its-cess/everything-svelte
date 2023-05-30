declare namespace svelteHTML {
  //enhance attributes
  interface HTMLAttributes<HTMLDivElement> {
    //if you want to use on:beforeinstallprompt
    'on:outofview'?: (event) => void;
  }
}