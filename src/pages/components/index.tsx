import { Component } from "inferno";
import { Link } from "inferno-router";

import { routes } from "../../App";

class About extends Component {
  render() {
    // const { match, location, history } = this.props;

    const filteredRoutes = routes
      .filter((item) => {
        return item.path.includes("/components/");
      })
      .map((item) => {
        return {
          link: item.path,
          label: item.path.replace("/components/", ""),
        };
      });

    return (
      <div>
        <h1>Component Page</h1>

        <ul className="my-12">
          {filteredRoutes.map((item) => (
            <Link to={item.link} className="m-4 p-4 rounded-xl border-2">
              {item.label}
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default About;
