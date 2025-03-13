import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DesktopMenu from './DesktopMenu';
import Nav from './nav';

const Header = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDirection('down'); // 스크롤 내릴 때 숨김
      } else {
        setScrollDirection('up'); // 스크롤 올릴 때 나타남
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 w-full z-20 bg-white transition-transform duration-300 ${
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
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
    </div>
  );
};

export default Header;
