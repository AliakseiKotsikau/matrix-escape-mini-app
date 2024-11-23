'use client'

import { useTab } from '@/contexts/TabContext'
import HomeTab from './HomeTab'
import GameTab from './GameTab'
import { TabType } from '@/types/TabType'

const TabContainer = () => {
    const { activeTab } = useTab()

    return (
        <div className="flex-1 overflow-hidden max-w-md mx-auto pt-[44px] pb-[72px] min-h-full">
            <div className={`${activeTab === TabType.Home ? 'is-show' : 'is-hide'}`}>
                <HomeTab />
            </div>
            <div className={`${activeTab === TabType.Game ? 'is-show' : 'is-hide'}`}>
                <GameTab />
            </div>
        </div>
    )
}

export default TabContainer