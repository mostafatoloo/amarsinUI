import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import { useAuthStore } from "./store/authStore";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/layout/Layout";
import User from "./pages/User";
import InventoryGoodList from "./pages/reports/InventoryGoodList";
import ProviderList from "./pages/reports/ProviderList";
import ProducerList from "./pages/reports/ProducerList";
import Workflow from "./pages/Workflow";
import Dashboard from "./pages/Dashboard";
import ProductOffer from "./components/productOffer/ProductOffer";
import ProductPerm from "./components/productPerm/ProductPerm";
import ProductGrace from "./components/productGrace/ProductGrace";
import ProductPrice from "./components/productPrice/ProductPrice";
import PayRequestOperation from "./components/payRequestPaybox/PayRequestOperation";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function AppContent() {
  const location = useLocation(); // Now this is inside <Router>
  return (
    <Layout key={location.pathname}>
      <Routes>
      <Route path="/login" element={<Login isHomePage={true} />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/WFMS/index" element={<PrivateRoute><Workflow /></PrivateRoute>} />
        <Route path="/admin/user/index" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="/admin/RpProviders/Inventory" element={<PrivateRoute><InventoryGoodList /></PrivateRoute>} />
        <Route path="/admin/RpProviders" element={<PrivateRoute><ProviderList /></PrivateRoute>} />
        <Route path="/admin/RpProducers" element={<PrivateRoute><ProducerList /></PrivateRoute>} />
        <Route path="/admin/ProductOffer" element={<PrivateRoute><ProductOffer /></PrivateRoute>} />
        <Route path="/admin/ProductPerm" element={<PrivateRoute><ProductPerm /></PrivateRoute>} />
        <Route path="/admin/ProductGrace" element={<PrivateRoute><ProductGrace /></PrivateRoute>} />
        <Route path="/admin/ProductPrice" element={<PrivateRoute><ProductPrice /></PrivateRoute>} />
        <Route path="/admin/PayRequest" element={<PrivateRoute><PayRequestOperation /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/admin/WFMS/index" />} />
      </Routes>
    </Layout>
  );
}
export default App;