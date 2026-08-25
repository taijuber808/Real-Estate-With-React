import "./App.css";
import Navbar from "./Component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PropertyDetails from "./Pages/Propertydetails";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Footer from "./Component/Footer";
import Wishlist from "./Pages/Wishlist";
import PropertyListing from "./Pages/PropertyListing";
import AdminDashboard from "./Pages/Admin";
import PropertyEdit from "./Pages/ProperyEdit";
import CreateProperty from "./Pages/CreateProperty";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/properties" element={<PropertyListing />} />
        <Route path="/property-edit/:id" element={<PropertyEdit />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/property-details/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/create-property" element={<CreateProperty />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
