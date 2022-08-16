import { Route, Routes } from "react-router-dom";
import AuthForm from "../pages/AuthForm";
import ContactLandLordPage from "../pages/ContactLandLordPage";
import CreateListingPage from "../pages/CreateListingPage";
import EditListingPage from "../pages/EditListingPage";
import ForgetPassword from "../pages/Forget-Password";
import HomePage from "../pages/HomePage";
import ListingDetailPage from "../pages/ListingDetailPage";
import OffersPage from "../pages/OffersPage";
import ProfilePage from "../pages/ProfilePage";
import RentPlaces from "../pages/RentPlaces";
import SalePlaces from "../pages/SalePlaces";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route path="/listing/:listingId" element={<ListingDetailPage />} />

      <Route
        path="/contact-landlord/:uid"
        element={
          <PrivateRoute>
            <ContactLandLordPage />
          </PrivateRoute>
        }
      />

      <Route path="/rent-places" element={<RentPlaces />} />
      <Route path="/sale-places" element={<SalePlaces />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route
        path="/create-listing"
        element={
          <PrivateRoute>
            <CreateListingPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-listing/:listingId"
        element={
          <PrivateRoute>
            <EditListingPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
