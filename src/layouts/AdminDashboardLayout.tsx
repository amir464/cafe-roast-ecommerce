import { BarChart3, Boxes, LayoutDashboard, Settings, ShoppingCart, Users } from 'lucide-react'
import { DashboardShell, type DashboardNavigationItem } from '../components/dashboard/shared/DashboardShell'

const adminNavigation: DashboardNavigationItem[] = [
  { label: 'نمای کلی', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'مدیریت محصولات', path: '/admin/products', icon: Boxes },
  { label: 'مدیریت سفارش‌ها', path: '/admin/orders', icon: ShoppingCart },
  { label: 'مدیریت کاربران', path: '/admin/users', icon: Users },
  { label: 'گزارش‌ها', path: '/admin/reports', icon: BarChart3 },
  { label: 'تنظیمات', path: '/admin/settings', icon: Settings },
]

export function AdminDashboardLayout() {
  return <DashboardShell navigation={adminNavigation} contextLabel="مدیر فروشگاه" heading="مدیریت فروشگاه" />
}
