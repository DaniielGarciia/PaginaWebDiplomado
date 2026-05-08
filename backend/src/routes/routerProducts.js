import{Router} from 'express';
import controllersProducts from '../controllers/controllersProducts.js';

const routerProducts = Router();

routerProducts.post('/', controllersProducts.createProduct);
routerProducts.get('/:id', controllersProducts.readProductById);
routerProducts.get('/', controllersProducts.readAllProducts);
routerProducts.put('/:id', controllersProducts.updateProduct);
routerProducts.delete('/:id', controllersProducts.deleteProduct);

export default routerProducts;