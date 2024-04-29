import '../Styles.css/Footer.css';
import { useFilters } from '../hooks/useFilters.jsx';
import { useCart } from '../hooks/useCart';


export function Footer(){
    const {filters} = useFilters();
    const {cart} = useCart();


    return(
        <footer className='footer'>
             <h4> <span> Franklin Diaz</span></h4>
            <h5> © TechHut Online Store</h5> 
        </footer>
    )
}