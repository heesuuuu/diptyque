import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Icon } from '../../ui';
import { useState } from 'react';
import { navActions } from '../../store/modules/navSlice';

const NavMobile = ({ isOpen, setIsOpen }) => {
  const { menuData, activeMenu } = useSelector((state) => state.nav);
  const dispatch = useDispatch();

  const depth1Style = 'text-heading1-m font-diptyque';
  return (
    <motion.div
      initial={{ x: '-100%', transformOrigin: 'left' }}
      animate={{ x: isOpen ? 0 : '-100%' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-0 z-20 px-6 py-[282px] bg-white"
    >
      <div onClick={() => setIsOpen(false)} className="cursor-pointer">
        <Icon name="close" className="absolute top-0 right-0 m-6 r" />
      </div>
      <nav className={``}>
        {/* 1뎁스 메뉴 */}
        <ul className="flex flex-col gap-6">
          {menuData.map((menu) => (
            <li key={menu.id} className={depth1Style}>
              <div
                className={`flex flex-row items-center gap-6 ${
                  activeMenu === menu.id ? 'border-b border-darkgrey-3' : ''
                }`}
              >
                <Link to={menu.url}>{menu.menuName}</Link>
                {/* twodepth가 있는 경우 아이콘 추가 */}
                {menu.twodepth && (
                  <div onClick={() => dispatch(navActions.setActiveMenu(menu.id))}>
                    <Icon name="keyboard_arrow_down" className="cursor-pointer" />
                  </div>
                )}
              </div>
              {/* activeMenu인 경우에만 twodepth 렌더링 */}
              {activeMenu === menu.id &&
                menu.twodepth?.map((depth) => (
                  <div key={depth.depthName}>
                    <h3 className="text-heading3 font-diptyque mb-[10px]">{depth.depthName}</h3>
                    <ul>
                      {depth.depthList?.map((item) => (
                        <li key={item.depthItem} className="mb-[10px] text-body3">
                          <Link to={`/product${item.url}`}>{item.depthItem}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default NavMobile;
