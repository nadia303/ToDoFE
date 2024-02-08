import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BoardsListPage } from "./pages/BoardsListPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BoardsListPage />
    </QueryClientProvider>
  );
}

export default App;
