import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './common/Layout';
import CategoryList from './components/product/CategoryList';
import {
  Cart,
  Collection,
  GuestOrder,
  Maison,
  Mypage,
  Payment,
  ProductDetail,
  ProductList,
  Promotion,
  Register,
  SearchResult,
  Service,
  SignIn,
} from './pages';
import './styles/globals.scss';

const GOOGLE_CLIENT_ID = '938549800295-jauqqv8g7482gt4o5k7sm9l5kbbhbhid.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Maison />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/product" element={<ProductList />}>
              <Route path=":categoryName" element={<CategoryList />} />
            </Route>
            <Route path="/product/:categoryName/:productId" element={<ProductDetail />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/service" element={<Service />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/guestorder" element={<GuestOrder />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/searchresult" element={<SearchResult />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
