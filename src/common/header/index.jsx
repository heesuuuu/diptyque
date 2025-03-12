import { Link } from 'react-router-dom';
import DesktopMenu from './DesktopMenu';
import Nav from './nav';

const Header = () => {
  return (
    <>
      <div className="header bg-white relative">
        <h1 className="flex justify-center">
          <span className="sr-only">DIPTYQUE</span>
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/2mightyMt/diptyqueStatic1/9ab0719bafcda454bd1c18f5310108f3bcc2d6fa/images/common/logo.svg"
              alt="DIPTYQUE"
              className="w-[146px] py-5"
            />
          </Link>
        </h1>
        <Nav />
        <DesktopMenu />
      </div>
    </>
  );
};

export default Header;
