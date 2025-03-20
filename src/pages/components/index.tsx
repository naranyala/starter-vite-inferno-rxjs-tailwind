import { Component } from "inferno";
import { Link } from "inferno-router";

import { routes } from "../../App";

class About extends Component {
  render() {
    // const { match, location, history } = this.props;

    return (
      <div>
        <h1>Component Page</h1>

        <pre>{JSON.stringify(routes, null, 2)}</pre>
      </div>
    );
  }
}

export default About;
