import React, { createContext, useState } from 'react'
import { ExtendedPurchaseType } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchaseType[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchaseType[]>>
  reset: () => void
}

const initialAppContext: AppContextType = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
}

export const AppContext = createContext<AppContextType>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchaseType[]>(
    initialAppContext.extendedPurchases
  )

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    setExtendedPurchases([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
