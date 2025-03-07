import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './common/Layout';
import './styles/globals.scss';
import { Cart, Collection, GuestOrder, Maison, Member, Mypage, Payment, Product, Promotion, SearchResult, Service } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Maison />} />
          <Route path='/promotion' element={<Promotion />} />
          <Route path='/product' element={<Product />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/service' element={<Service />} />
          <Route path='/member' element={<Member />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/guestorder' element={<GuestOrder />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/searchresult' element={<SearchResult />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
