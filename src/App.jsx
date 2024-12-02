import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




// Lazy-loaded components
const Profile = lazy(() => import("./pages/profile/Profile"));
const ChangePassword = lazy(() => import("./pages/profile/ChangePassword"));
const BrandList = lazy(() => import("./pages/master/brand/BrandList"));
const RatioList = lazy(() => import("./pages/attribute/ratio/RatioList"));
const StyleList = lazy(() => import("./pages/master/style/StyleList"));
const FactoryList = lazy(() => import("./pages/master/factory/FactoryList"));
const WidthList = lazy(() => import("./pages/master/width/WidthList"));
const HalfRatioList = lazy(() => import("./pages/attribute/halfRatio/HalfRatioList"));
const AddStyle = lazy(() => import("./pages/master/style/AddStyle"));
const AddFactory = lazy(() => import("./pages/master/factory/AddFactory"));
const AddWidth = lazy(() => import("./pages/master/width/AddWidth"));
const AddHalfRatio = lazy(() => import("./pages/attribute/halfRatio/AddHalfRatio"));
const EditBrand = lazy(() => import("./pages/master/brand/EditBrand"));
const EditStyle = lazy(() => import("./pages/master/style/EditStyle"));
const EditFactory = lazy(() => import("./pages/master/factory/EditFactory"));
const EditWidth = lazy(() => import("./pages/master/width/EditWidth"));
const EditHalfRatio = lazy(() => import("./pages/attribute/halfRatio/EditHalfRatio"));
const WorkOrderList = lazy(() => import("./pages/workorder/WorkOrderList"));
const AddWorkOrderList = lazy(() => import("./pages/workorder/AddWorkOrderList"));
const WorkOrderView = lazy(() => import("./pages/workorder/WorkOrderView"));
const WorkOrder = lazy(() => import("./pages/workorder/WorkOrder"));
const EditWorkOrder = lazy(() => import("./pages/workorder/EditWorkOrder"));
const AddRatioList = lazy(() => import("./pages/attribute/ratio/AddRatioList"));
const ViewRatioList = lazy(() => import("./pages/attribute/ratio/ViewRatioList"));







import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Loader from "./components/Loader";
import WorkOrderReceive from "./pages/workOrderReceive/orderReceive/WorkOrderReceive";
import AddOrderReceived from "./pages/workOrderReceive/orderReceive/AddOrderReceived";
import WorkOrderSalesList from "./pages/workOrderReceive/orderSales/WorkOrderSalesList";
import WorkOrderFinalStockList from "./pages/workOrderReceive/orderFinalStock/WorkOrderFinalStockList";
import AddWorkOrderSales from "./pages/workOrderReceive/orderSales/AddWorkOrderSales";
import EditOrderReceived from "./pages/workOrderReceive/orderReceive/EditOrderReceived";
import EditOrderSales from "./pages/workOrderReceive/orderSales/EditOrderSales";
import ViewOrderReceive from "./pages/workOrderReceive/orderReceive/ViewOrderReceive";
import ViewOrderSales from "./pages/workOrderReceive/orderSales/ViewOrderSales";
import RetailerList from "./pages/master/retailer/RetailerList";
import AddRetailer from "./pages/master/retailer/AddRetailer";
import EditRetailer from "./pages/master/retailer/EditRetailer";
import WorkOrderStock from "./pages/workorder/workOrderStock/WorkOrderStock";
import RetailerReport from "./pages/reports/retailer/RetailerReport";
import DcReceiptReceived from "./pages/workOrderReceive/orderReceive/DcReceiptReceived";
import WorkOrderReport from "./pages/reports/workOrderReport/WorkOrderReport";
import ReceivedReport from "./pages/reports/receivedReport/ReceivedReport";
import SalesReport from "./pages/reports/sales/SalesReport";
import ViewWorkOrderReport from "./pages/reports/workOrderReport/ViewWorkOrderReport";
import ViewReceivedReport from "./pages/reports/receivedReport/ViewReceivedReport";
import ViewSalesReport from "./pages/reports/sales/ViewSalesReport";
// import Profile from "./pages/profile/Profile";
// import ChangePassword from "./pages/profile/ChangePassword";
// import BrandList from "./pages/master/brand/BrandList";
// import RatioList from "./pages/attribute/ratio/RatioList";
// import StyleList from "./pages/master/style/StyleList";
// import FactoryList from "./pages/master/factory/FactoryList";
// import WidthList from "./pages/master/width/WidthList";
// import HalfRatioList from "./pages/attribute/halfRatio/HalfRatioList";
// import AddBrand from "./pages/master/brand/AddBrand";

// import AddStyle from "./pages/master/style/AddStyle";
// import AddFactory from "./pages/master/factory/AddFactory";
// import AddWidth from "./pages/master/width/AddWidth";
// import AddHalfRatio from "./pages/attribute/halfRatio/AddHalfRatio";
// import EditBrand from "./pages/master/brand/EditBrand";
// import EditStyle from "./pages/master/style/EditStyle";
// import EditFactory from "./pages/master/factory/EditFactory";
// import EditWidth from "./pages/master/width/EditWidth";
// import EditHalfRatio from "./pages/attribute/halfRatio/EditHalfRatio";
// import WorkOrderList from "./pages/workorder/WorkOrderList";
// import AddWorkOrderList from "./pages/workorder/AddWorkOrderList";
// import WorkOrderView from "./pages/workorder/WorkOrderView";
// import WorkOrder from "./pages/workorder/WorkOrder";
// import EditWorkOrder from "./pages/workorder/EditWorkOrder";
// import AddRatioList from "./pages/attribute/ratio/AddRatioList";
// import ViewRatioList from "./pages/attribute/ratio/ViewRatioList";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/brand" element={<BrandList />} />
        <Route path="/branch-edit/:id" element={<EditBrand />} />
        <Route path="/style" element={<StyleList />} />
        <Route path="/add-style" element={<AddStyle />} />
        <Route path="/style-edit/:id" element={<EditStyle />} />
        <Route path="/factory" element={<FactoryList />} />
        <Route path="/add-factory" element={<AddFactory />} />
        <Route path="/factory-edit/:id" element={<EditFactory />} />
        <Route path="/width" element={<WidthList />} />
        <Route path="/add-width" element={<AddWidth />} />
        <Route path="/width-edit/:id" element={<EditWidth />} />
        {/* retailer  */}
        <Route path="/retailer" element={<RetailerList />} />
        <Route path="/add-retailer" element={<AddRetailer />} />
        <Route path="/retailer-edit/:id" element={<EditRetailer />} />
        <Route path="/ratio" element={<RatioList />} />
        <Route path="/half-ratio" element={<HalfRatioList />} />
        <Route path="/add-halfratio" element={<AddHalfRatio />} />
        <Route path="/halfRatio-edit/:id" element={<EditHalfRatio />} />
        <Route path="/work-order" element={<WorkOrderList />} />
        <Route path="/add-work-order" element={<AddWorkOrderList />} />
        <Route path="/work-order-view/:id" element={<WorkOrderView />} />
        <Route path="/work-view/:id" element={<WorkOrder />} />
        <Route path="/work-order-edit/:id" element={<EditWorkOrder />} />
        <Route path="/add-ratio" element={<AddRatioList />} />
        <Route path="/view-ratio-list/:id" element={<ViewRatioList />} />
        {/* work order receive  */}
        <Route path="/work-order-receive" element={<WorkOrderReceive />} />
        <Route path="/add-order-received" element={<AddOrderReceived />} />
        <Route path="/edit-order-received/:id" element={<EditOrderReceived />} />
        <Route path="/view-order-received/:id" element={<ViewOrderReceive />} />
        <Route path="/work-order-sales" element={<WorkOrderSalesList />} />
        <Route path="/add-order-sales" element={<AddWorkOrderSales />} />
        <Route path="/edit-order-sales/:id" element={<EditOrderSales />} />
        <Route path="/view-order-sales/:id" element={<ViewOrderSales />} />
        <Route path="/work-order-final-stock" element={<WorkOrderFinalStockList />} />
        <Route path="/work-order-stock" element={<WorkOrderStock />} />
        {/* reports */}
        <Route path="/retailer-report" element={<RetailerReport />} />
        <Route path="/dc-receipt/:id" element={<DcReceiptReceived />} />
        <Route path="/work-order-report" element={<WorkOrderReport />} />
        <Route path="/view-work-order-report" element={<ViewWorkOrderReport />} />
        <Route path="/received-report" element={<ReceivedReport />} />
        <Route path="/view-received-report" element={<ViewReceivedReport />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/view-sales-report" element={<ViewSalesReport />} />



        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        {/* <Route
          path="*"
          element={<ProtectedRoute element={<Navigate to="/" />} />}
        /> */}
      </Routes>
      </Suspense>
    </>
  );
};

export default App;
