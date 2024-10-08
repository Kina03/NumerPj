import { menuItems } from "../menuItems";
import { Home } from "../Home";
import MenuItems from "./MenuItems";
const Navbar = () => {
  return (
    <nav>
      
      <ul className="menus">
      
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
          
        })}
        
      </ul>
    </nav>
  );
};

export default Navbar;