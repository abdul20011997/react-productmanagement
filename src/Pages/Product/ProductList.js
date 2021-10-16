import React,{useState,useEffect}  from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory} from 'react-router-dom';

import Validator from "../../Components/Error/Error";




export default function ProductList() {
  const[product,setProduct]=useState([]);
  const[category,setCategory]=useState([]);
  const [error,setError]=useState('');
  const history=useHistory();
  useEffect(() => {
    fetch('http://localhost:8000/api/productlist').then(res=>{
      if(res.status===200){
      return res.json();
      }
      throw new Error('Something went wrong')
    }).then(data=>{
     setError(null)
     setProduct(data.data)
     setCategory(data.category)
       console.log(data)
    }).catch(err=>{
      console.log(err)
      setError(err.message)
    })
   }, [])

   const addproduct=()=>{
    history.push('/createproduct')
  }
  const editproduct=(id)=>{
    console.log(id)
    history.push('/editproduct/'+id)

  }
  const deleteproduct=(id)=>{
    console.log(id)
    let formData = new FormData();
        fetch("http://localhost:8000/api/deleteproduct/"+id,{
        body: formData,
        method: "delete"
        }).then(res=>{
            if(res.status===500){
                throw new Error('Something went wrong')
            }
            return res.json();
        }).then(data=>{
            if(data.message==='success'){
                setError(null)
                const data=product.filter((product)=>{
                  return product.id!==id
                })
                setProduct(data)
            }
           

        }).catch(err=>{
            setError(err.message)
        })
  }

  return (
    <div style={{marginTop:'60px',marginLeft:'25px',padding:'50px'}}>
<Typography variant="h4"  component="div" style={{display:'inline-block'}}>Product List</Typography>
    <Button variant="contained" color="secondary" style={{marginRight:'10px'}} onClick={addproduct} style={{float:'right'}}>Add Product</Button>
    { error ? <Validator severity="error" error={error}/> : null}
    <TableContainer component={Paper} style={{marginTop:'10px'}}>
      <Table stickyHeader  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: 10,fontSize:'18px',fontWeight:'bold' }}>Sno</TableCell>
            <TableCell align="center" style={{ width: 10,fontSize:'18px',fontWeight:'bold'}}>Title</TableCell>
            <TableCell align="center" style={{ width: 10,fontSize:'18px',fontWeight:'bold'}}>description</TableCell>
            <TableCell align="center" style={{ width: 10,fontSize:'18px',fontWeight:'bold'}}>Image</TableCell>
            <TableCell align="center" style={{ width: 10,fontSize:'18px',fontWeight:'bold'}}>Category</TableCell>
            <TableCell align="center" style={{ width: 10,fontSize:'18px',fontWeight:'bold' }}>Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>

            {
              product.length > 0 ? product.map((product,i)=>{
                  return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={product.id}>
                      <TableCell component="th" align="center" style={{ fontSize:'16px' }}>{i+1}</TableCell>
                      <TableCell align="center" style={{ fontSize:'16px' }}>{product.title}</TableCell>
                      <TableCell align="center" style={{ fontSize:'16px' }}>{product.description}</TableCell>
                      <TableCell align="center" style={{ fontSize:'16px' }}><img src={product.image ? 'http://localhost:8000/storage/images/'+product.image :"https://cdn.pixabay.com/photo/2020/08/09/11/31/business-5475283__340.jpg"} style={{height:'100px',width:'100px'}} alt={product.title}/></TableCell>
                      {category.length > 0 ? category.map(cat => cat.id == product.category_id  ? <TableCell align="center" style={{ fontSize:'16px' }}>{cat.title}</TableCell> :'') : <TableCell align="center" style={{ fontSize:'16px' }}></TableCell>}
                      <TableCell align="center" style={{ fontSize:'16px' }}><Button variant="contained" style={{marginRight:'10px'}} onClick={()=>{editproduct(product.id)}}>Edit</Button><Button variant="contained" color="error" onClick={()=>{deleteproduct(product.id)}}>Delete</Button></TableCell>
                      </TableRow>
                  )
              }) :  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} ><TableCell component="th" align="center" style={{ fontSize:'16px' }}>No Product Available</TableCell></TableRow>
            }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}