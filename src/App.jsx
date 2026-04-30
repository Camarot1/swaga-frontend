import React, { useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import MainContent from './pages/home/main';
import CatalogContent from './pages/catalog/catalog.jsx'
import CatalogSubContent from './pages/catalogSub/catalogSub.jsx'
import ItemContent from './pages/item/item.jsx'
import SubContent from './pages/sub/sub.jsx'
import DonateContent from './pages/donate/donate.jsx'
import ReviewsContent from './pages/rewiews/reviews.jsx'
import WarningContent from './pages/warning/warning.jsx'
import Login from './pages/login/login.jsx'
import Register from './pages/register/register.jsx'
import Profile from './pages/profile/profile.jsx'
import OrderPage from './pages/order/orderPage.jsx'
import NotFound from './pages/notFound/notFound.jsx'
import Cookie from './components/cookie.jsx';
import SearchPage from './pages/search/search.jsx'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import AdminPage from './pages/admin/admin.page.jsx'
import AdminSubs from './pages/admin/admin.subs.jsx'
import AdminUsers from './pages/admin/admin.users.jsx'
import AdminGames from './pages/admin/admin.games.jsx'
import AdminOrders from './pages/admin/admin.order.jsx'
function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/catalog" element={<CatalogContent />} />
            <Route path="/catalogSub" element={<CatalogSubContent />} />
            <Route path="/item/:id" element={<ItemContent />} />
            <Route path="/sub/:id" element={<SubContent />}></Route>
            <Route path="/donate" element={<DonateContent />}></Route>
            <Route path="/rewiews" element={<ReviewsContent />}></Route>
            <Route path="/warning" element={<WarningContent />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/orderPage" element={<OrderPage />}></Route>
            <Route path="/search" element={<SearchPage/>}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
            <Route path="/admin/subs" element={<AdminSubs />}></Route>
            <Route path="/admin/users" element={<AdminUsers />}></Route>
            <Route path="/admin/games" element={<AdminGames />}></Route>
            <Route path="/admin/order" element={<AdminOrders />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Cookie />
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;