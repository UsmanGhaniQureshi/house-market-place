import { ToastContainer } from "react-toastify";
import LayOut from "./components/LayOut.js";
import AppRoutes from "./routes/AppRoutes.js";
import { AuthContextProvider } from "./store/AuthContext.js";
import { ListingContextProvider } from "./store/ListingContext.js";

function App() {
  return (
    <ListingContextProvider>
      <AuthContextProvider>
        <LayOut>
          <AppRoutes />
          <ToastContainer />
        </LayOut>
      </AuthContextProvider>
    </ListingContextProvider>
  );
}

export default App;
