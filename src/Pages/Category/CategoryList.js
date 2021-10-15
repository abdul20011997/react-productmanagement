import React,{useEffect,useState}  from 'react';
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



export default function CategoryList() {
  const[category,setCategory]=useState([]);
  const [error,setError]=useState('');
  const history=useHistory();
  useEffect(() => {
   fetch('http://localhost:8000/api/categorylist').then(res=>{
     if(res.status===200){
     return res.json();
     }
     throw new Error('Something went wrong')
   }).then(data=>{
    setError(null)
    setCategory(data.data)
      console.log(data)
   }).catch(err=>{
     console.log(err)
     setError(err.message)
   })
  }, [])

  const editcategory=(id)=>{
    console.log(id)
    history.push('/editcategory/'+id);
  }
  const deletecategory=(id)=>{
    console.log(id)
        let formData = new FormData();
        fetch("http://localhost:8000/api/deletecategory/"+id,{
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
                const data=category.filter((cat)=>{
                  return cat.id!==id
                })
                setCategory(data)
                history.push('/category')
            }
           

        }).catch(err=>{
            setError(err.message)
        })


  }

  const addcategory=()=>{
    history.push('/createcategory')
  }
  return (
    
    <div style={{marginTop:'60px',marginLeft:'25px',padding:'50px'}}>
    <Typography variant="h4"  component="div" style={{display:'inline-block'}}>Category List</Typography>
    <Button variant="contained" color="secondary" style={{marginRight:'10px'}} onClick={addcategory} style={{float:'right'}}>Add Category</Button>
    { error ? <Validator severity="error" error={error}/> : null}
    <TableContainer component={Paper} style={{marginTop:'10px'}}>
      <Table stickyHeader  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: 10,fontSize:'18px',fontWeight:'bold' }}>Sno</TableCell>
            <TableCell align="center" style={{ width: 10,fontSize:'18px',fontWeight:'bold'}}>Title</TableCell>
            <TableCell align="center" style={{ width: 10,fontSize:'18px',fontWeight:'bold' }}>Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
            {
              category.length > 0 ? category.map((cat,i)=>{
                  return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={cat.id}>
                      <TableCell component="th" align="center" style={{ fontSize:'16px' }}>{i+1}</TableCell>
                      <TableCell align="center" style={{ fontSize:'16px' }}>{cat.title}</TableCell>
                      <TableCell align="center" style={{ fontSize:'16px' }}><Button variant="contained" style={{marginRight:'10px'}} onClick={()=>{editcategory(cat.id)}}>Edit</Button><Button variant="contained" color="error" onClick={()=>{deletecategory(cat.id)}}>Delete</Button></TableCell>
                      </TableRow>
                  )
              }) : null
            }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}