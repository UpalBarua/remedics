import { RouterProvider } from 'react-router-dom';
import router from '../../routes/routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../../contexts/AuthContext';
import { SpinnerProvider } from '../../contexts/SpinnerContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SpinnerProvider>
          <RouterProvider router={router} />
          <Toaster />
        </SpinnerProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
