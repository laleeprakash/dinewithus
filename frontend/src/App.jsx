import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

// Pages & Components
import Homepage from "./pages/Homepage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Add_Resta from "./pages/Add_Resta";
import Restaurants from "./components/Restaurant";
import Res from "./pages/Res";
import Adminlogin from "./pages/Adminlogin";
import Adminpage from "./pages/Adminpage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/PrivacyPolicy";
import TableBooking from "./pages/TableBooking";
import Notify from "./pages/Notify";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import Contact_us from "./pages/Contact_us";
import Approverestaurant from "./pages/Approverestaurant";
import Rejected from "./pages/Rejected";
import ApproveRejectPage from "./pages/ApproveRejectPage";
import Restaurantlogin from "./pages/Restaurantlogin";
import Owner_signup from "./pages/Owner_signup";
import Ownerpage from "./pages/Ownerpage";
import Adddining from "./pages/Adddining";
import Viewdining from "./pages/Viewdining";
import Payment from "./pages/Payment";
import Bookedtable from "./pages/BookedTable";
import Notify_table from "./pages/Notify_table";
import View_Booked_dining from "./pages/View_Booked_dining";

// Authentication wrapper
import ProtectedRoute from "./pages/ProtectedRoute";
import Userdetails from "./pages/Userdetails";

// Case-insensitive redirect
function CaseRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lowercasePath = location.pathname.toLowerCase();
    if (location.pathname !== lowercasePath) {
      navigate(lowercasePath, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <CaseRedirect />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/homepage/:userid"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<Res />} />
        <Route
          path="/addrestaurant/:id"
          element={<ProtectedRoute><Add_Resta /></ProtectedRoute>}
        />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route
          path="/adminpage"
          element={<Adminpage />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route
          path="/tablebooking"
          element={<ProtectedRoute><TableBooking /></ProtectedRoute>}
        />
        <Route path="/resta" element={<Res />} />
        <Route path="/:userId/resta/:id" element={<Res />} />
        <Route
          path="/notify"
          element={<ProtectedRoute><Notify /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />
        <Route
          path="/profile/:id"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />
        <Route path="/feedbacks" element={<Feedback />} />
        <Route path="/contact" element={<Contact_us />} />
        <Route
          path="/approvedrestaurant"
          element={<Approverestaurant />}
        />
        <Route
        path="/userdetails"
        element={<Userdetails/>}
        />
        <Route
          path="/rejectedrestaurant"
          element={<Rejected />}
        />
        <Route
          path="/approve-reject/:id"
          element={<ApproveRejectPage/>}
        />
        <Route path="/restaurantlogin" element={<Restaurantlogin />} />
        <Route path="/owner-signup" element={<Owner_signup />} />
        <Route
          path="/ownerpage/:id"
          element={<ProtectedRoute><Ownerpage /></ProtectedRoute>}
        />
        <Route
          path="/:ownerid/adddining/:id"
          element={<ProtectedRoute><Adddining /></ProtectedRoute>}
        />
        <Route
          path="/viewdining/:id"
          element={<ProtectedRoute><Viewdining /></ProtectedRoute>}
        />
        <Route
          path="/:userId/:restaurantId/tablebooking"
          element={<ProtectedRoute><TableBooking /></ProtectedRoute>}
        />
        <Route
          path="/:userId/:restaurantId/payment/:id"
          element={<ProtectedRoute><Payment /></ProtectedRoute>}
        />
        <Route
          path="/:userId/bookedtable"
          element={<ProtectedRoute><Bookedtable /></ProtectedRoute>}
        />
        <Route
          path="/:userId/:restaurantId/notify"
          element={<ProtectedRoute><Notify_table /></ProtectedRoute>}
        />
        <Route
          path="/view_booked_dining/:id"
          element={<ProtectedRoute><View_Booked_dining /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
