import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { AcademyProvider } from './context/AcademyContext.tsx';
import { AdminAuthProvider } from './context/AdminAuthContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AcademyProvider>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </AcademyProvider>
  </StrictMode>,
);

