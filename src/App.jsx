import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import BlogPost from './pages/BlogPost';
import Changelog from './pages/Changelog';
import CookiePolicy from './pages/CookiePolicy';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardFounder from './pages/DashboardFounder';
import DashboardCustomer from './pages/DashboardCustomer';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import CreateProduct from './pages/CreateProduct';
import BoostProduct from './pages/BoostProduct';
import Wallet from './pages/Wallet';
import LoginOTP from './pages/LoginOTP';
import ChangePassword from './pages/ChangePassword';
import SearchResults from './pages/SearchResults';
import TagPage from './pages/TagPage';
import ProfileView from './pages/ProfileView';
import ProfileEdit from './pages/ProfileEdit';
import './index.css';

function App() {
    console.log('App component rendering...');
    return (
        <AuthProvider>
            <HelmetProvider>
                <Router>
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                        <Navbar />
                        <div className="container" style={{ flex: 1, paddingBottom: '60px' }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/pricing" element={<Pricing />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/blog/:slug" element={<BlogPost />} />
                                <Route path="/changelog" element={<Changelog />} />
                                <Route path="/cookies" element={<CookiePolicy />} />
                                <Route path="/privacy" element={<Privacy />} />
                                <Route path="/terms" element={<Terms />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />

                                {/* Protected Routes Handling inside components or wrappers usually, but simplifying here */}
                                <Route path="/dashboard/founder" element={<DashboardFounder />} />
                                <Route path="/dashboard/customer" element={<DashboardCustomer />} />
                                {/* Admin Route Removed */}
                                <Route path="/profile" element={<ProfileView />} />
                                <Route path="/profile/edit" element={<ProfileEdit />} />

                                <Route path="/category/:slug" element={<CategoryPage />} />
                                <Route path="/tag/:slug" element={<TagPage />} />
                                <Route path="/product/:id" element={<ProductDetails />} />
                                <Route path="/create-product" element={<CreateProduct />} />
                                <Route path="/boost/:productId" element={<BoostProduct />} />
                                <Route path="/wallet" element={<Wallet />} />
                                <Route path="/login-otp" element={<LoginOTP />} />
                                <Route path="/change-password" element={<ChangePassword />} />
                                <Route path="/search" element={<SearchResults />} />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </HelmetProvider>
        </AuthProvider>
    );
}

export default App;
