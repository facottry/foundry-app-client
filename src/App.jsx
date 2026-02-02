import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from './context/ConfigContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import About from './pages/About';
import WhyUs from './pages/WhyUs';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import BlogPost from './pages/BlogPost';
import AuthorBlog from './pages/AuthorBlog';
import AuthorsList from './pages/AuthorsList';
import Changelog from './pages/Changelog';
import CookiePolicy from './pages/CookiePolicy';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardFounder from './pages/DashboardFounder';
import FounderProductsPage from './pages/FounderProductsPage';
import ProductAnalyticsPage from './pages/ProductAnalyticsPage';
import DashboardCustomer from './pages/DashboardCustomer';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import ProductReviewsPage from './pages/ProductReviewsPage';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import BoostProduct from './pages/BoostProduct';
import Wallet from './pages/Wallet';
import LoginOTP from './pages/LoginOTP';
import ChangePassword from './pages/ChangePassword';
import SearchResults from './pages/SearchResults';
import TagPage from './pages/TagPage';
import ProfileView from './pages/ProfileView';
import SavedProductsPage from './pages/SavedProductsPage';
import ProfileEdit from './pages/ProfileEdit';
import ProtectedRoute from './components/ProtectedRoute';
import VisitRedirect from './pages/VisitRedirect';
import FounderProfile from './pages/FounderProfile';
import HowItWorks from './pages/HowItWorks';
import Mission from './pages/Mission';
import NotFound from './pages/NotFound';
import NewsletterConfirm from './pages/NewsletterConfirm';
import NewsletterPage from './pages/NewsletterPage';
import NewsletterRead from './pages/NewsletterRead';
import Unsubscribe from './pages/Unsubscribe';
import AIAssistants from './pages/AIAssistants';
import RexPage from './pages/RexPage';
import { BotProvider } from './context/BotContext';

import './index.css';

function App() {
    console.log('App component rendering...');
    return (
        <AuthProvider>
            <ConfigProvider>
                <BotProvider>
                    <HelmetProvider>
                        <Router>
                            <ScrollToTop />
                            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                                <Navbar />
                                <div className="container" style={{ flex: 1, paddingBottom: '60px' }}>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        {/* ... truncated unchanged routes ... */}
                                        <Route path="/pricing" element={<Pricing />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/mission" element={<Mission />} />
                                        <Route path="/how-it-works" element={<HowItWorks />} />
                                        <Route path="/why-us" element={<WhyUs />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/blog" element={<Blog />} />
                                        <Route path="/blog/:slug" element={<BlogPost />} />
                                        <Route path="/blog/author" element={<AuthorsList />} />
                                        <Route path="/blog/author/:authorId" element={<AuthorBlog />} />
                                        <Route path="/changelog" element={<Changelog />} />
                                        <Route path="/cookies" element={<CookiePolicy />} />
                                        <Route path="/privacy" element={<Privacy />} />
                                        <Route path="/terms" element={<Terms />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/signup" element={<Signup />} />
                                        <Route path="/founder/:founderId" element={<FounderProfile />} />

                                        {/* Protected Routes */}
                                        <Route path="/founder/dashboard" element={
                                            <ProtectedRoute allowedRoles={['FOUNDER']}>
                                                <DashboardFounder />
                                            </ProtectedRoute>
                                        } />

                                        <Route path="/dashboard/customer" element={
                                            <ProtectedRoute>
                                                <DashboardCustomer />
                                            </ProtectedRoute>
                                        } />

                                        <Route path="/profile" element={
                                            <ProtectedRoute>
                                                <ProfileView />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/saved" element={
                                            <ProtectedRoute>
                                                <SavedProductsPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/profile/edit" element={
                                            <ProtectedRoute>
                                                <ProfileEdit />
                                            </ProtectedRoute>
                                        } />


                                        <Route path="/category/:slug" element={<CategoryPage />} />
                                        <Route path="/tag/:slug" element={<TagPage />} />
                                        <Route path="/product/:slug" element={<ProductDetails />} />
                                        <Route path="/product/:slug/reviews" element={<ProductReviewsPage />} />
                                        <Route path="/create-product" element={
                                            <ProtectedRoute allowedRoles={['FOUNDER']}>
                                                <CreateProduct />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/founder/products/:id/edit" element={
                                            <ProtectedRoute allowedRoles={['FOUNDER']}>
                                                <EditProduct />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/founder/products" element={
                                            <ProtectedRoute allowedRoles={['FOUNDER']}>
                                                <FounderProductsPage />
                                            </ProtectedRoute>
                                        } />

                                        {/* Redirect legacy AI Assistants route to Profile Settings */}
                                        <Route path="/founder/ai-assistants" element={
                                            <Navigate to="/profile#ai-assistants" replace />
                                        } />

                                        <Route path="/analytics/product/:id" element={
                                            <ProtectedRoute allowedRoles={['FOUNDER']}>
                                                <ProductAnalyticsPage />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/boost/:productId" element={
                                            <ProtectedRoute allowedRoles={['FOUNDER']}>
                                                <BoostProduct />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/wallet" element={
                                            <ProtectedRoute allowedRoles={['FOUNDER']}>
                                                <Wallet />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/login-otp" element={<LoginOTP />} />
                                        <Route path="/change-password" element={
                                            <ProtectedRoute>
                                                <ChangePassword />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/search" element={<SearchResults />} />
                                        <Route path="/newsletter" element={<NewsletterPage />} />
                                        <Route path="/newsletter/:slug" element={<NewsletterPage />} />
                                        <Route path="/newsletter/confirm" element={<NewsletterConfirm />} />
                                        <Route path="/newsletter/unsubscribe" element={<Unsubscribe />} />

                                        <Route path="/visit/:id" element={<VisitRedirect />} />

                                        {/* Catch-all 404 */}
                                        <Route path="*" element={<NotFound />} />
                                        <Route path="/founder/rex" element={
                                            <ProtectedRoute allowedRoles={['FOUNDER']}>
                                                <RexPage />
                                            </ProtectedRoute>
                                        } />
                                    </Routes>
                                </div>
                                <Footer />
                            </div>
                        </Router>
                    </HelmetProvider>
                </BotProvider>
            </ConfigProvider>
        </AuthProvider>
    );
}

export default App;
