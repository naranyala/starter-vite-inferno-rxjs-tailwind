/** @jsx createElement */
import { createElement } from "inferno-create-element";
import { render } from "inferno";
import { createMachine, assign } from "xstate";
import { createStore } from "@xstate/store";

// Define state machine
const counterMachine = createMachine({
  id: "counter",
  context: { count: 0 },
  on: {
    INCREMENT: {
      actions: assign({ count: ({ context }) => context.count + 1 }),
    },
  },
});

// Create XState store
const store = createStore(counterMachine);

// Computed value: Double the count
const getDoubleCount = () => store.state.context.count * 2;

// Side-effect: Log changes
store.subscribe((state) => {
  console.log(`Count: ${state.context.count}, Double: ${getDoubleCount()}`);
});

const CounterXstate = () => {
  const state = store.useSelector((s) => s.context.count);
  const doubleCount = getDoubleCount();

  return (
    <div class="flex flex-col items-center gap-4 p-4 border rounded">
      <p>Count: {state}</p>
      <p>Double: {doubleCount}</p>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => store.send("INCREMENT")}
      >
        Increment
      </button>
    </div>
  );
};

export default CounterXstate;
