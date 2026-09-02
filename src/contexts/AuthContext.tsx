/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { validateLogin } from '../services/authService'
import type { User } from '../types'
import {
  readStorage,
  writeStorage,
} from '../utils/storage'

type AuthValue = {
  user: User | null

  login: (
    identity: string,
    password: string,
  ) => User

  register: (
    user: Omit<
      User,
      | 'id'
      | 'role'
      | 'status'
      | 'registeredAt'
      | 'orderCount'
    >,
    password: string,
  ) => void

  updateProfile: (
    changes: Pick<
      User,
      'firstName' | 'lastName' | 'phone' | 'email'
    >,
  ) => void

  logout: () => void
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(() =>
    readStorage<User | null>(
      'caferoast_auth',
      null,
    ),
  )

  useEffect(() => {
    writeStorage('caferoast_auth', user)
  }, [user])

  const value = useMemo<AuthValue>(
    () => ({
      user,

      login: (identity, password) => {
        const base = validateLogin(
          identity,
          password,
        )

        if (!base) {
          throw new Error(
            'ایمیل یا رمز عبور صحیح نیست.',
          )
        }

        const next = {
          ...base,
          ...readStorage(
            `caferoast_profile_${base.id}`,
            {},
          ),
        }

        setUser(next)

        return next
      },

      register: (data, password) => {
        void password

        writeStorage(
          'caferoast_registered',
          data,
        )
      },

      updateProfile: (changes) => {
        setUser((current) => {
          if (!current) {
            return current
          }

          const next = {
            ...current,
            ...changes,
          }

          writeStorage(
            `caferoast_profile_${current.id}`,
            changes,
          )

          return next
        })
      },

      logout: () => {
        setUser(null)
      },
    }),
    [user],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Auth context missing')
  }

  return context
}