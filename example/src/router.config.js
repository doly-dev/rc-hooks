// pages
import HomePage from "~/pages/home";
import ExamplePage from "~/pages/example";

export default [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: "/example/:name",
    component: ExamplePage
  }
];
