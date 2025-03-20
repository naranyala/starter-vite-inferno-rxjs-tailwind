import { Component } from "inferno";
import { Link } from "inferno-router";

class MainLayout extends Component {
  constructor() {
    super();
    this.state = {
      menu: [
        { label: "Home", link: "/" },
        { label: "Apps", link: "/apps" },
        { label: "Components", link: "/components" },
        { label: "Templates", link: "/templates" },
      ],
    };
  }
  render() {
    return (
      <div class="m-4 p-4 rounded-xl border-2">
        <header>
          <nav className="flex gap-4">
            {this.state.menu.map((item) => (
              <Link to={item.link}>{item.label}</Link>
            ))}
          </nav>
        </header>
        <main>{this.props.children || <p>No content available</p>}</main>
        <footer>Footer</footer>
      </div>
    );
  }
}

export default MainLayout;
