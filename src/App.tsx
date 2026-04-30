import { Component } from 'react';
import { MainPage } from './pages/MainPage/MainPage';
import { Layout } from './components/Layout/Layout';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <MainPage />
      </Layout>
    );
  }
}
