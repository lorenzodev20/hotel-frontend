import { createContext, useMemo, useState, type ReactNode } from 'react';

type SidebarContextProps = {
    isOpen: boolean;
}

type SidebarProviderProps = {
    children: ReactNode
}
export const SidebarContext = createContext<SidebarContextProps>({} as SidebarContextProps);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [isOpen] = useState(true);

    // const toggleSidebar = () => {
    //     setIsOpen(prev => !prev);
    // };

    const obj = useMemo(() => ({ isOpen }), []);
    return (
        <SidebarContext.Provider value={obj}>
            {children}
        </SidebarContext.Provider>
    );
};