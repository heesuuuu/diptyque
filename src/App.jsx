import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './common/Layout';
import {
  Cart,
  Collection,
  GuestOrder,
  Maison,
  Member,
  Mypage,
  Payment,
  ProductLayout,
  Promotion,
  SearchResult,
  Service,
} from './pages';

import BodyCareList from './components/product/body/bodyCareList';
import CandleDiffuserList from './components/product/candleDiffuser/CandleDiffuserList';
import PerfumeList from './components/product/perfume/PerfumeList';
import './styles/globals.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Maison />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/product" element={<ProductLayout />}>
            <Route index element={<PerfumeList />} />
            <Route path="perfume" element={<PerfumeList />} />
            <Route path="candlediffuser" element={<CandleDiffuserList />} />
            <Route path="body" element={<BodyCareList />} />
          </Route>
          <Route path="/collection" element={<Collection />} />
          <Route path="/service" element={<Service />} />
          <Route path="/member" element={<Member />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/guestorder" element={<GuestOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/searchresult" element={<SearchResult />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
