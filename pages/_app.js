import '@/styles/globals.css'
import { ERC20Provider } from '../Contents/Skylink'
import Navbar from "../Components/navbar/navbar";
import Sale from '@/Components/Sale/sale';

const App = ({ Component, pageProps }) => 

  <ERC20Provider>
    <Navbar/>
    <Component {...pageProps} />
    
  </ERC20Provider>

  
export default App