import { useState } from 'react'
import { Search } from 'lucide-react'
import usersData from '../../data/users.json'
import type { User } from '../../types'
import { formatNumber } from '../../utils/format'

export function AdminUsers() {
  const [users, setUsers] = useState(usersData as User[])
  const [search, setSearch] = useState('')

  const filteredUsers = users.filter((user) =>
    (user.firstName + user.lastName + user.email).includes(search),
  )

  const toggleUserStatus = (userId: User['id']) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'active' ? 'inactive' : 'active',
            }
          : user,
      ),
    )
  }

  return (
    <>
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="m-0 text-[clamp(21px,5vw,26px)]">مشتریان</h1>
          <p className="my-1 text-[13px] text-[var(--text-muted)]">مدیریت حساب‌ها و مشاهده فعالیت مشتریان</p>
        </div>
      </div>

      <div className="mb-[15px] flex flex-wrap gap-2.5">
        <div className="flex w-full items-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-2.5 sm:w-[330px]">
          <Search className="w-[17px] text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="جست‌وجوی نام یا ایمیل..."
            className="w-full border-0 bg-transparent p-2.5 outline-0"
          />
        </div>
      </div>

      <section className="w-full min-w-0 overflow-hidden rounded-[15px] border border-[var(--border-subtle)] bg-[var(--card)]">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse whitespace-nowrap text-right [&_td]:border-b [&_td]:border-[var(--border-subtle)] [&_td]:px-[17px] [&_td]:py-[13px] [&_td]:text-[13px] [&_th]:border-b [&_th]:border-[var(--border-subtle)] [&_th]:bg-[var(--surface)] [&_th]:px-[17px] [&_th]:py-[13px] [&_th]:text-[13px] [&_th]:text-[var(--text-muted)]">
            <thead>
              <tr>
                <th>کاربر</th>
                <th>نقش</th>
                <th>تاریخ عضویت</th>
                <th>سفارش‌ها</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <b>
                      {user.firstName} {user.lastName}
                    </b>
                    <small className="block text-[var(--text-muted)]">{user.email}</small>
                  </td>
                  <td>{user.role === 'admin' ? 'مدیر' : 'مشتری'}</td>
                  <td>{user.registeredAt}</td>
                  <td>{formatNumber(user.orderCount)}</td>
                  <td>
                    <span
                      className={`inline-block rounded-full px-[9px] py-[5px] text-xs ${user.status === 'inactive' ? 'bg-[color-mix(in_srgb,var(--danger)_13%,var(--surface))] text-[var(--danger)]' : 'bg-[color-mix(in_srgb,var(--success)_13%,var(--surface))] text-[var(--success)]'}`}
                    >
                      {user.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="min-h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--text-primary)]"
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === 'active' ? 'غیرفعال کردن' : 'فعال کردن'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
