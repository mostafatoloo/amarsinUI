import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
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
import ProductOffer from "./pages/businessAccounting/operations/ProductOffer";
import ProductPerm from "./pages/businessAccounting/operations/ProductPerm";
import ProductGrace from "./pages/businessAccounting/operations/ProductGrace";
import ProductPrice from "./pages/businessAccounting/operations/ProductPrice";
import PayRequestOperation from "./components/payRequestPaybox/PayRequestOperation";
import NotFound from "./pages/NotFound";
import ClearBook from "./pages/definitions/ClearBook";
import PurchaseRequestIndent from "./pages/treasure/operation/PurchaseRequestIndent";
import CupboardsReport from "./pages/warehouse/reports/CupboardsReport";

const queryClient = new QueryClient();


function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login isHomePage={true} />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/Admin/ProductOffer" element={<PrivateRoute><ProductOffer /></PrivateRoute>} />
        <Route path="/Admin/Indent" element={<PrivateRoute><PurchaseRequestIndent /></PrivateRoute>} />
        <Route path="/admin/ProductPerm" element={<PrivateRoute><ProductPerm /></PrivateRoute>} />
        <Route path="/admin/ProductGrace" element={<PrivateRoute><ProductGrace /></PrivateRoute>} />
        <Route path="/admin/ProductPrice" element={<PrivateRoute><ProductPrice /></PrivateRoute>} />
        <Route path="/admin/PayRequest" element={<PrivateRoute><PayRequestOperation /></PrivateRoute>} />
        <Route path="/admin/WFMS/index" element={<PrivateRoute><Workflow /></PrivateRoute>} />
        <Route path="/admin/user/index" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="/admin/RpProviders/Inventory" element={<PrivateRoute><InventoryGoodList /></PrivateRoute>} />
        <Route path="/admin/RpProviders" element={<PrivateRoute><ProviderList /></PrivateRoute>} />
        <Route path="/admin/RpProducers" element={<PrivateRoute><ProducerList /></PrivateRoute>} />
        <Route path="/Admin/ClearBook/index" element={<PrivateRoute><ClearBook /></PrivateRoute>} />
        <Route path="/Admin/CupboardsReport" element={<PrivateRoute><CupboardsReport /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/admin/WFMS/index" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
export default App;