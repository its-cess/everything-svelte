import type { Action } from "svelte/action";
//physics based animation library from svelte:
import { spring } from "svelte/motion";

interface SwipeProps {
  triggerReset?: boolean
}


export const swipe: Action<HTMLElement, SwipeProps> = (node, params) => {
  let x: number;
  let startingX: number;
  //finds the width of whatever the node is:
  let elementWidth = node.clientWidth;
  let triggerReset = params?.triggerReset || false;

  //spring is a svelte function that allows us to work with our coordinates from a store
  const coordinates = spring(
    { x:0, y:0 },
    //stiffness and damping are adjustable depending on how you want the animation to move
    {
      stiffness: 0.2,
      damping: 0.4
    }
  );

  //subscribing to our spring coordinates store, updating whenever the x coords change
  coordinates.subscribe(($coords) => {
    node.style.transform = `translate3d(${$coords.x}px, 0, 0)`
  })

  function setupEventListeners() {
    if (isMobileBreakpoint()) {
      node.addEventListener('mousedown', handleMouseDown);
      node.addEventListener('touchstart', handleTouchStart);
    } else {
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('touchstart', handleTouchStart);
    }

    //update the card width
    elementWidth = node.clientWidth;
  }

  setupEventListeners();

  //need to add a resize event so that it will always check the screens size before starting the mouse down events
  window.addEventListener("resize", () => {
    setupEventListeners
  })

  function isMobileBreakpoint() {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    if (mediaQuery.matches) {
      return true;
    }
  }

  function resetCard() {
    coordinates.update(() => {
      return { x:0, y:0 }
    })
    triggerReset = false;
  }

  function outOfView() {
    node.dispatchEvent(
      new CustomEvent('outOfView')
    )
  }

  function handleMouseDown(event: MouseEvent) {
    x = event.clientX;
    startingX = event.clientX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  function handleTouchStart(event: TouchEvent) {
    x = event.touches[0].clientX;
    startingX = event.touches[0].clientX;
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  function handleTouchMove(event: TouchEvent) {
    const dx = event.touches[0].clientX - x;
    x = event.touches[0].clientX;
    updateCoordinates(dx);
  }

  function handleMouseMove(event: MouseEvent) {
    //delta x = difference from where we clicked vs. where we are currently.
    const dx = event.clientX - x;
    //reset x to the current location:
    x = event.clientX;
    updateCoordinates(dx);
  }

  function updateCoordinates(dx: number) {
    //update our store with the new coordinates
    coordinates.update(($coords) => {
      return {
        //previous value of x + the dx(new value of x)
        x: $coords.x + dx,
        //since we are swiping horizontally, y is always 0
        y:0
      }
    })
  }

  function setXCoordinates(x: number) {
    coordinates.update(() => {
      return { x, y: 0 }
    })
  }

  function moveCardOver(endingX: number) {
    //uses elementWidth to move the element over 95% of the screen size
    const leftSnapX = elementWidth * -.95;

    //rightSnap is zero because that is our original starting position
    const rightSnapX = 0;

    const movement = startingX - endingX;

    //swiped left
    //movement is positive because they are swiping left, 20 because that is far enough that they probably meant to swipe that way
    if (movement > 20) {
      x = leftSnapX;
      outOfView();
    }

    //swiped right
    else {
      x = rightSnapX
    }   
    setXCoordinates(x);
  }

  function handleTouchEnd(event: TouchEvent) {
    const endingX = event.changedTouches[0].clientX;
    moveCardOver(endingX);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  }

  function handleMouseUp(event: MouseEvent) {
    const endingX = event.clientX;
    moveCardOver(endingX);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  return {
    update(newParams: SwipeProps) {
      if(newParams.triggerReset) 
      resetCard();
    },
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('touchstart', handleTouchStart);
    }
  }
}