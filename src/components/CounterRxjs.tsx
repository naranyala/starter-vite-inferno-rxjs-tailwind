import { Inferno, InfernoComponent } from 'inferno';
import { Observable } from 'rxjs';

// Create a counter observable
const counter$ = new Observable(subscriber => {
  let count = 0;
  setInterval(() => {
    subscriber.next(count++);
  }, 1000);
});

// Counter component
class CounterRxjs extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.subscription = counter$.subscribe(count => {
      this.setState({ count });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <div>
        <h1>Counter: {this.state.count}</h1>
      </div>
    );
  }
}

export default CounterRxjs;
