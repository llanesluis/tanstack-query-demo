import Container from "./components/container";
import DemoReactQueryMutationLS from "./components/demo-users-query-mutation-LS/demo-react-query-mutation-LS";
import GlobalFetchingIndicator from "./components/global-fetching-indicator";
import GlobalMutatingIndicator from "./components/global-mutating-indicator";

function App() {
  return (
    <Container>
      <h1 className="mb-12 text-4xl font-bold">React Query v5</h1>

      <GlobalFetchingIndicator />
      <GlobalMutatingIndicator />

      {/* <DemoReactQuery /> */}
      <DemoReactQueryMutationLS />
    </Container>
  );
}

export default App;
