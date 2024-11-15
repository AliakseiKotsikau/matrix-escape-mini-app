'use client'

import { TabType } from '@/types/TabType'
import { createContext, useContext, useState } from 'react'

type TabContextType = {
    activeTab: TabType
    setActiveTab: (tab: TabType) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export function TabProvider({ children }: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState<TabType>(TabType.Home)

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    )
}

export function useTab() {
    const context = useContext(TabContext)
    if (context === undefined) {
        throw new Error('useTab must be used within a TabProvider')
    }
    return context
}