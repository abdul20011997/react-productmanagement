
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Topbar from "./Components/Topbar/Topbar";
import CreateProduct from "./Pages/Product/CreateProduct";
import CreateCategory from "./Pages/Category/CreateCategory";
import CategoryList from "./Pages/Category/CategoryList";
import ProductList from "./Pages/Product/ProductList";
import EditCategory from "./Pages/Category/EditCategory";
import EditProduct from "./Pages/Product/EditProduct";
import {AuthContext} from "./context/AuthContextProvider";
import {useContext} from "react";






import { BrowserRouter,Route } from "react-router-dom";
function App() {
  const authContext=useContext(AuthContext)
  const user=authContext.isauth;
  
  return (
    <div className="App">
      <BrowserRouter>
      <Topbar/>
      <Route path='/login'>{!user ?<Login/> : <ProductList/>}</Route>
      <Route path='/register'>{!user ?<Register/> : <ProductList/>}</Route>
      <Route path='/createproduct'>{user ?<CreateProduct/> : <Login/>}</Route>
      <Route path='/createcategory'>{user ?<CreateCategory/> : <Login/>}</Route>
      <Route path='/category'>{user ?<CategoryList/> : <Login/>}</Route>
      <Route path='/editcategory/:id'>{user ?<EditCategory/> : <Login/>}</Route>
      <Route path='/editproduct/:id'>{user ?<EditProduct/> : <Login/>}</Route>
      <Route path='/' exact>{user ?<ProductList/> : <Login/>}</Route>



      <Route></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
