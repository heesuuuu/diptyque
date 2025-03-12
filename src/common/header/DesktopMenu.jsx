import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { navActions } from '../../store/modules/navSlice';
import { Icon } from '../../ui';

const DesktopMenu = () => {
  const { menuOpen } = useSelector((state) => state.nav);
  const dispatch = useDispatch();

  const menuStyle = 'flex justify-center items-center h-[44px] w-[44px] border border-darkgrey-3 cursor-pointer ';

  return (
    <div className="flex flex-col absolute top-[42px] right-10">
      <div className={menuStyle} onClick={() => dispatch(navActions.toggleMenu())}>
        <Icon name={menuOpen ? 'close' : 'menu'} />
      </div>
      {menuOpen && (
        <>
          <div className="">
            <div
              className={`nav-search hover:bg-darkgrey-3 ${menuStyle}`}
              onClick={() => dispatch(navActions.toggleMenu())}
            >
              <Icon name="search" />
            </div>
            <Link to="/mypage">
              <div
                className={`nav-search hover:bg-darkgrey-3 ${menuStyle}`}
                onClick={() => dispatch(navActions.toggleMenu())}
              >
                <Icon name="person" />
              </div>
            </Link>
            <Link to="/cart">
              <div
                className={`nav-search hover:bg-darkgrey-3 ${menuStyle}`}
                onClick={() => dispatch(navActions.toggleMenu())}
              >
                <Icon name="shopping_bag" />
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DesktopMenu;
