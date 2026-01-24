import { Provider } from 'react-redux';
import { store } from './store/store';
import { BarcodeValidationPage } from './pages/BarcodeValidationPage';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <BarcodeValidationPage />
    </Provider>
  );
}

export default App;
