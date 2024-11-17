import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/hooks/useAuth";
import AppRoutes from "./components/routes/AppRoutes"


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
