import { Route, Routes } from 'react-router-dom';
import {
  QueryClient, QueryClientProvider,
} from '@tanstack/react-query'
import {Dashboard} from "../scenes/Dashboard/Dashboard";
import {HeroUIProvider} from "@heroui/react";
import { Login } from '../scenes/Login/Login';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

export function App() {
  return (
    <HeroUIProvider>
      <Toaster/>
    <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route
            path="/dashboard"
            element={
              <Dashboard/>
            }
          />
        </Routes>
    </QueryClientProvider>
    </HeroUIProvider>
  );
}

export default App;
