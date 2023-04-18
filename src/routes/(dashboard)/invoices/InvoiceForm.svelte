<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add an Invoice</h2>

<form class="grid grid-cols-6 gap-x-5">
	<!-- CLIENT INFO -->
	<div class="field col-span-2">
		<label for="client">Client</label>
		<select name="client" id="client">
			<option value="zeal">ZEAL</option>
		</select>
	</div>
	<div class="field col-span-2 gap-x-5 flex items-end">
		<div class="text-base font-bold text-monsoon leading-[3.5rem]">or</div>
		<Button label="+ Client" style="outline" isAnimated={false} onClick={() => {}} />
	</div>

	<!-- INVOICE ID -->
	<div class="field col-span-2">
		<label for="id">Invoice ID</label>
		<input type="number" name="id" />
	</div>

	<!-- DUE DATE -->
	<div class="field col-span-2">
		<label for="dueDate">Due Date</label>
		<input type="date" name="dueDate" />
	</div>

	<!-- ISSUE DATE -->
	<div class="field col-span-2 col-start-5">
		<label for="issueDate">Issue Date</label>
		<input type="date" name="issueDate" />
	</div>

	<!-- SUBJECT -->
	<div class="field col-span-6">
		<label for="subject">Subject</label>
		<input type="text" name="subject" />
	</div>

	<!-- LINE ITEMS -->
	<div class="field col-span-6">Line Items Go Here</div>

	<!-- NOTES -->
	<div class="field col-span-6">
		<label for="notes">Notes<span class="font-normal">(optional, displayed on invoice)</span></label
		>
		<textarea name="notes" id="notes" />
	</div>

	<!-- TERMS -->
	<div class="field col-span-6">
		<label for="terms"
			>Terms<span class="font-normal">(optional, enter your terms and conditions)</span></label
		>
		<textarea name="terms" id="terms" />
		<div class="text-xs text-gray-400">
			Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
		</div>
	</div>

	<!-- BUTTONS -->
	<div class="field col-span-2">
		<!-- only be visible if editing-->
		<Button
			label="Delete"
			style="textOnly"
			isAnimated={false}
			onClick={() => {}}
			iconLeft={Trash}
		/>
	</div>
	<div class="field col-span-4 flex justify-end gap-x-5">
		<Button label="Cancel" style="secondary" isAnimated={false} onClick={() => {}} />
		<Button label="Save" onClick={() => {}} />
	</div>
</form>
