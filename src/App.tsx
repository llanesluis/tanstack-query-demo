import { Route } from "wouter";
import Container from "./components/container";
import GlobalFetchingIndicator from "./components/global-fetching-indicator";
import GlobalMutatingIndicator from "./components/global-mutating-indicator";
import Navbar from "./components/navbar";
import FilterProvider from "./hooks/context/filter-provider";
import Footer from "./components/footer";
import SimpleQueryLS from "./pages/simple-query";
import SimpleMutationLS from "./pages/simple-mutation";
import OptimisticMutationLS from "./pages/optimistic-mutation";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Container>
        <Router />
        <GlobalFetchingIndicator />
        <GlobalMutatingIndicator />
      </Container>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <>
      <Route path="/">
        <h1>Tanstack Query v5 demo</h1>
      </Route>
      <Route path={"/query"} component={SimpleQueryLS} />
      <Route path={"/mutation"} component={SimpleMutationLS} />
      <Route path={"/optimistic-mutation"}>
        <FilterProvider>
          <OptimisticMutationLS />
        </FilterProvider>
      </Route>
    </>
  );
}
