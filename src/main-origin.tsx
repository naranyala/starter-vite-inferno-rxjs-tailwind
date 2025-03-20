import "./style.css";

import { createElement } from "inferno-create-element";

import { render } from "inferno";
import { Accordion } from "./Accordion";

import CounterSignal from "./CounterSignal";
import CounterXstate from "./CounterXstate";
import Calculator from "./Calculator";
import CalculatorSignal from "./CalculatorSignal";
import CalculatorXstate from "./CalculatorXstate";
import SimpleModal from "./SimpleModal";
import SlidingUpDrawer from "./components/SlidingUpDrawer";

import CounterDefault from "./components/CounterDefault";
import TreeView from "./components/Treeview";
import CalendarPickerDefault from "./components/CalendarPickerDefault";

import Stepper from "./components/Stepper";

import SnakeGame from "./components/games/SnakeGame";

const Sample = () => {
  return (
    <div>
      <div className="text-4xl font-bold">another component</div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Hello Inferno + Vite!</h1>

      <SimpleModal />
      <SlidingUpDrawer />
      <Calculator />
      {/*       <CalculatorXstate /> */}

      <hr />
      <Accordion />

      <CounterDefault />

      <TreeView />

      <div class="mb-24">
        <CalendarPickerDefault />

        <Stepper />

        <SnakeGame />
      </div>

      {/* 
      <CounterSignal />
      <CounterXstate />
        */}
    </div>
  );
};

render(<App />, document.getElementById("app"));
