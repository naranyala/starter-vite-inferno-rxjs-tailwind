// src/App.tsx
import { Component } from "inferno";
import { BrowserRouter, Route, Switch } from "inferno-router";
import MainLayout from "./layouts/MainLayout";

const routeModules = import.meta.glob("./pages/**/index.tsx", { eager: true });
const catchAllModule = import.meta.glob("./pages/[...path].tsx", {
  eager: true,
});

console.log("App: ", routeModules);

export const routes = Object.entries(routeModules).map(([filePath, module]) => {
  const path =
    filePath
      .replace("./pages", "")
      .replace("/index.tsx", "")
      .replace(/^\//, "") || "/";

  console.log(
    `Registering route: ${path}, Component: ${(module as any).default?.name}`,
  );
  return {
    path: path === "" ? "/" : `/${path}`,
    component: (module as any).default,
    exact: path === "",
  };
});

if (Object.keys(catchAllModule).length > 0) {
  const catchAllComponent = (catchAllModule["./pages/[...path].tsx"] as any)
    .default;
  console.log(
    `Registering catch-all: *, Component: ${catchAllComponent?.name}`,
  );
  routes.push({
    path: "*",
    component: catchAllComponent,
    exact: false,
  });
}

class App extends Component {
  render() {
    console.log("App rendering, routes:", routes.length);
    return (
      <BrowserRouter>
        <MainLayout>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  const Component = route.component;
                  console.log(`Rendering route: ${route.path}`);
                  return <Component {...props} />;
                }}
              />
            ))}
          </Switch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

export default App;
