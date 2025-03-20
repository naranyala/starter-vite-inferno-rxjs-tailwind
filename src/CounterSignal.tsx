/** @jsx createElement */
import { createElement } from "inferno-create-element";
import { render } from "inferno";
import { signal, computed, effect } from "@preact/signals";

const CounterSignal = () => {
  const count = signal(0);
  const doubleCount = computed(() => count.value * 2);

  // Side-effect: Log changes
  effect(() => {
    console.log(`Count: ${count.value}, Double: ${doubleCount.value}`);
  });

  return (
    <div class="flex flex-col items-center gap-4 p-4 border rounded">
      <p>Count: {count.value}</p>
      <p>Double: {doubleCount.value}</p>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => count.value++}
      >
        Increment
      </button>
    </div>
  );
};

export default CounterSignal;
