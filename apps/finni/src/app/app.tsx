import { Route, Routes, Link } from 'react-router-dom';
import {
  QueryClient, QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div className="bg-green-500">
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
