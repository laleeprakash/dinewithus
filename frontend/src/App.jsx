import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

// Pages & Components (as per your original)
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
import AdminPage from "./pages/Adminpage";
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

function App() {
  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_URL;

    axios.get(`${apiBaseUrl}/users`)
      .then(response => {
        console.log("Fetched users from backend:", response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage/:userid" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<Res />} />
        <Route path="/addrestaurant/:id" element={<Add_Resta />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/adminpage" element={<Adminpage />} />
        <Route path="/about" element={<About />} />
        <Route path="https://frontend-dinewithus.onrender.com/feedback/" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/Adminpage" element={<AdminPage />} />
        <Route path="/tableBooking" element={<TableBooking />} />
        <Route path="/resta" element={<Res />} />
        <Route path="/:userId/resta/:id" element={<Res />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/feedbacks" element={<Feedback />} />
        <Route path="/contact" element={<Contact_us />} />
        <Route path="/approvedrestaurant" element={<Approverestaurant />} />
        <Route path="/rejectedrestaurant" element={<Rejected />} />
        <Route path="/approve-reject/:id" element={<ApproveRejectPage />} />
        <Route path="/restaurantlogin" element={<Restaurantlogin />} />
        <Route path="/owner-signup" element={<Owner_signup />} />
        <Route path="/ownerpage/:id" element={<Ownerpage />} />
        <Route path="/:ownerid/adddining/:id" element={<Adddining />} />
        <Route path="/viewdining/:id" element={<Viewdining />} />
        <Route path="/:userId/:restaurantId/tablebooking" element={<TableBooking />} />
        <Route path="/:userId/:restaurantId/payment/:id" element={<Payment />} />
        <Route path="/:userId/bookedtable" element={<Bookedtable />} />
        <Route path="/:userId/:restaurantId/notify" element={<Notify_table />} />
        <Route path="/view_Booked_dining/:id" element={<View_Booked_dining />} />
      </Router>
    </BrowserRouter>
  );
}

export default App;
