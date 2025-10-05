import { createContext, useContext, useState, ReactNode } from "react";
import { Recipe } from "@/type/recipe";

// สร้าง Context สำหรับเมนูที่ผู้ใช้เพิ่มเอง
interface MenuContextType {
  customMenus: Recipe[];
  addCustomMenu: (menu: Recipe) => void;
  RemoveCustomMenu: (idMeal: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [customMenus, setCustomMenus] = useState<Recipe[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("customMenus");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const RemoveCustomMenu = (idMeal: string) => {
    setCustomMenus((prev) => {
      const newMenus = prev.filter((menu) => menu.idMeal !== idMeal);
      if (typeof window !== "undefined") {
        localStorage.setItem("customMenus", JSON.stringify(newMenus));
      }
      return newMenus;
    });
  };

  const addCustomMenu = (menu: Recipe) => {
    setCustomMenus((prev) => {
      const newMenus = [...prev, menu];
      if (typeof window !== "undefined") {
        localStorage.setItem("customMenus", JSON.stringify(newMenus));
      }
      return newMenus;
    });
  };

  return (
    <MenuContext.Provider value={{ customMenus, addCustomMenu, RemoveCustomMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};