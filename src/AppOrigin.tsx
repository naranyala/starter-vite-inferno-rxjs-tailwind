import { Component } from "inferno";
import { BrowserRouter, Link, Route, Switch } from "inferno-router";
import { Link } from "inferno-router";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

class MainLayout extends Component {
  constructor() {
    super();
    this.state = {
      menu: [
        { label: "Home", link: "/" },
        { label: "About", link: "/about" },
        { label: "Sample", link: "/sample" },
      ],
    };
  }
  render() {
    return (
      <div class="m-4 p-4 rounded-xl border-2">
        <nav className="flex gap-4">
          {this.state.menu.map((item) => (
            <Link to={item.link}>{item.label}</Link>
          ))}
        </nav>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route component={NotFound} /> {/* 404 catch-all */}
          </Switch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

export default App;
