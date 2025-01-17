import React, { useState } from "react";

const menuData = [
    {
      id: 1,
      title: "Menu 1",
      subMenu: ["Submenu 1-1", "Submenu 1-2", "Submenu 1-3"],
    },
    {
      id: 2,
      title: "Menu 2",
      subMenu: ["Submenu 2-1", "Submenu 2-2"],
    },
    {
      id: 3,
      title: "Menu 3",
      subMenu: ["Submenu 3-1", "Submenu 3-2", "Submenu 3-3", "Submenu 3-4"],
    },
  ];

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState(null); // 현재 열려 있는 상위 메뉴 ID

  // 상위 메뉴 클릭 시 동작
  const handleMenuClick = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id)); // 같은 메뉴를 클릭하면 닫힘, 아니면 열림
  };

  return (
    <div style={styles.menuContainer}>
      {menuData.map((menu) => (
        <div key={menu.id} style={styles.menuItem}>
          {/* 상위 메뉴 */}
          <div
            onClick={() => handleMenuClick(menu.id)}
            style={{
              ...styles.menuTitle,
              backgroundColor: activeMenu === menu.id ? "#f0f0f0" : "#fff",
            }}
          >
            {menu.title}
          </div>

          {/* 하위 메뉴 (드롭다운) */}
          {activeMenu === menu.id && (
            <div style={styles.subMenuContainer}>
              {menu.subMenu.map((subItem, index) => (
                <div key={index} style={styles.subMenuItem}>
                  {subItem}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// 간단한 스타일 객체
const styles = {
  menuContainer: {
    width: "200px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    overflow: "hidden",
  },
  menuItem: {
    borderBottom: "1px solid #ddd",
  },
  menuTitle: {
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "16px",
  },
  subMenuContainer: {
    backgroundColor: "#f9f9f9",
    padding: "10px 15px",
  },
  subMenuItem: {
    padding: "5px 0",
    fontSize: "14px",
  },
};

export default Menu;