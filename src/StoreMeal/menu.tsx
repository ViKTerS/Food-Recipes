"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Recipe } from "../type/recipe";

type MenuContextType = {
  customMenus: Recipe[];
  addCustomMenu: (menu: Recipe) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [customMenus, setCustomMenus] = useState<Recipe[]>([]);

  // โหลดจาก localStorage ตอนเริ่ม
  useEffect(() => {
    const stored = localStorage.getItem("customMenus");
    if (stored) {
      setCustomMenus(JSON.parse(stored));
    }
  }, []);

  const addCustomMenu = (menu: Recipe) => {
    setCustomMenus(prev => {
      const updated = [...prev, menu];
      localStorage.setItem("customMenus", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <MenuContext.Provider value={{ customMenus, addCustomMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};
