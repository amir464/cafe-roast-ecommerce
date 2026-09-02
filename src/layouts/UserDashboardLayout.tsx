import { Heart, LayoutDashboard, MapPin, Package, UserRound } from 'lucide-react'
import { DashboardShell, type DashboardNavigationItem } from '../components/dashboard/shared/DashboardShell'

const userNavigation: DashboardNavigationItem[] = [
  { label: 'نمای کلی', path: '/user/dashboard', icon: LayoutDashboard },
  { label: 'سفارش‌های من', path: '/user/orders', icon: Package },
  { label: 'علاقه‌مندی‌ها', path: '/user/wishlist', icon: Heart },
  { label: 'آدرس‌ها', path: '/user/addresses', icon: MapPin },
  { label: 'ویرایش پروفایل', path: '/user/profile', icon: UserRound },
]

export function UserDashboardLayout() {
  return <DashboardShell navigation={userNavigation} contextLabel="حساب کاربری" heading="حساب کاربری من" />
}
