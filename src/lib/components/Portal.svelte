<script lang="ts">
	// portal creates a node that will be an HTML element
	// portal needs to functions update & destroy, and must return both
	function portal(node: HTMLElement) {
		let target: HTMLBodyElement | null;

		// update function to add the portal node
		function update() {
			// grabbing the body of the document
			target = document.querySelector('body');
			// if the target exists, append the portal node we just created to the end of the body
			target?.appendChild(node);
			// have to set hidden to false, so that we can actually see the node we appended since it is hidden by default
			node.hidden = false;
		}

		// destroy function to remove the portal node
		function destroy() {
			// grab the parent element (node is the slot, parent node is the div)
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}

		update();

		return { update, destroy };
	}
</script>

<!-- creates a custom directive that creates a portal and is hidden by default -->
<div hidden use:portal>
	<slot />
</div>
