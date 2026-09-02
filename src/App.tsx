import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import { AdminDashboardLayout } from './layouts/AdminDashboardLayout'
import { StoreLayout } from './layouts/StoreLayout'
import { UserDashboardLayout } from './layouts/UserDashboardLayout'
import { NotFound } from './pages/NotFound'
import { AdminOrders } from './pages/admin/AdminOrders'
import { AdminOverview } from './pages/admin/AdminOverview'
import { AdminProducts } from './pages/admin/AdminProducts'
import { AdminUsers } from './pages/admin/AdminUsers'
import { Reports } from './pages/admin/Reports'
import { Settings } from './pages/admin/Settings'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { CartPage } from './pages/store/CartPage'
import { HomePage } from './pages/store/HomePage'
import { InfoPage } from './pages/store/InfoPage'
import { ProductPage } from './pages/store/ProductPage'
import { ShopPage } from './pages/store/ShopPage'
import { Addresses } from './pages/user/Addresses'
import { Profile } from './pages/user/Profile'
import { UserOrders } from './pages/user/UserOrders'
import { UserOverview } from './pages/user/UserOverview'
import { WishlistPage } from './pages/user/WishlistPage'
import { RoleRoute } from './routes/RoleRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route
            path="/products/:slug"
            element={<ProductPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<InfoPage />} />
          <Route
            path="/contact"
            element={<InfoPage contact />}
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<RoleRoute allowedRole="admin" />}>
          <Route
            path="/admin"
            element={<AdminDashboardLayout />}
          >
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRole="user" />}>
          <Route
            path="/user"
            element={<UserDashboardLayout />}
          >
            <Route path="dashboard" element={<UserOverview />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
