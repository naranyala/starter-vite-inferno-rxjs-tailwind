
import { Component } from "inferno";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  isSameDay,
  isToday,
} from "date-fns";
import clsx from "clsx";

interface CalendarPickerProps {
  selectedDate?: Date;
  onSelect: (date: Date) => void;
}

interface CalendarPickerState {
  currentMonth: Date;
}

export class CalendarPicker extends Component<
  CalendarPickerProps,
  CalendarPickerState
> {
  constructor(props: CalendarPickerProps) {
    super(props);
    this.state = {
      currentMonth: props.selectedDate || new Date(),
    };
  }

  changeMonth = (months: number) => {
    this.setState({ currentMonth: addMonths(this.state.currentMonth, months) });
  };

  render() {
    const { onSelect, selectedDate } = this.props;
    const { currentMonth } = this.state;

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div class="p-4 max-w-xs border rounded-lg shadow-md bg-white">
        {/* Header */}
        <div class="flex justify-between items-center mb-3">
          <button
            class="p-2 rounded hover:bg-gray-100"
            onClick={() => this.changeMonth(-1)}
          >
            ←
          </button>
          <span class="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            class="p-2 rounded hover:bg-gray-100"
            onClick={() => this.changeMonth(1)}
          >
            →
          </button>
        </div>

        {/* Weekdays */}
        <div class="grid grid-cols-7 text-center text-gray-500 font-medium mb-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} class="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div class="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <button
              key={day.toISOString()}
              class={clsx(
                "p-2 rounded-md text-center text-sm transition",
                isSameDay(day, selectedDate) && "bg-blue-500 text-white",
                isToday(day) && "border border-gray-300",
                day.getMonth() !== currentMonth.getMonth() && "text-gray-400",
              )}
              onClick={() => onSelect(day)}
            >
              {format(day, "d")}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

interface AppState {
  selectedDate: Date;
}

class CalendarPickerDefault extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedDate: new Date() };
  }

  handleSelect = (date: Date) => {
    this.setState({ selectedDate: date });
  };

  render() {
    return (
      <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-xl font-bold mb-4">Inferno.js Calendar Picker</h1>
        <CalendarPicker
          selectedDate={this.state.selectedDate}
          onSelect={this.handleSelect}
        />
        <p class="mt-3">
          Selected Date: {this.state.selectedDate.toDateString()}
        </p>
      </div>
    );
  }
}

export default CalendarPickerDefault;
