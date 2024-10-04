import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";
import BrandList from "./pages/master/brand/BrandList";
import RatioList from "./pages/attribute/ratio/RatioList";
import StyleList from "./pages/master/style/StyleList";
import FactoryList from "./pages/master/factory/FactoryList";
import WidthList from "./pages/master/width/WidthList";
import HalfRatioList from "./pages/attribute/halfRatio/HalfRatioList";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/brand" element={<BrandList />} />
        <Route path="/style" element={<StyleList />} />
        <Route path="/factory" element={<FactoryList />} />
        <Route path="/factory" element={<FactoryList />} />
        <Route path="/width" element={<WidthList />} />
        <Route path="/ratio" element={<RatioList />} />
        <Route path="/half-ratio" element={<HalfRatioList />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute element={<ChangePassword />} />}
        />

        {/* <Route
          path="*"
          element={<ProtectedRoute element={<Navigate to="/" />} />}
        /> */}
      </Routes>
    </>
  );
};

export default App;
