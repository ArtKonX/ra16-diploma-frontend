import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import MainPage from './pages/MainPage/MainPage'
import CatalogPage from './pages/CatalogPage/CatalogPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import CatalogItemPage from './pages/CatalogItemPage/CatalogItemPage';
import BasketPage from './pages/BasketPage/BasketPage';
import NotFound from './pages/NotFound/NotFound';
import Layout from './components/Layout/Layout';

function App() {

  return (
    <>
      <BrowserRouter basename='/ra16-diploma-frontend'>
        <Routes>
          <Route path="/" element={
            <Layout classNamePage='main-page'>
              <MainPage />
            </Layout>
          } />
          <Route path="/catalog" element={
            <Layout classNamePage='catalog-page'>
              <CatalogPage />
            </Layout>
          } />
          <Route path="/catalog/:id" element={
            <Layout classNamePage='catalog-page'>
              <CatalogItemPage />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout classNamePage='catalog-page'>
              <AboutPage />
            </Layout>
          } />
          <Route path="/contacts" element={
            <Layout classNamePage='catalog-page'>
              <ContactsPage />
            </Layout>
          } />
          <Route path="/cart" element={
            <Layout classNamePage='catalog-page'>
              <BasketPage />
            </Layout>
          } />
          <Route path="*" element={
            <Layout classNamePage='not-found-page'>
              <NotFound />
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
