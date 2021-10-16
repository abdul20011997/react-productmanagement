import React,{useState,useEffect} from 'react'
import {  TextField,Button,Typography,Box,CircularProgress} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { green } from '@mui/material/colors';
import Validator from "../../Components/Error/Error";

import { useHistory,useParams } from 'react-router-dom';

export default function EditCategory() {
    const [title,setTitle]=useState('');
    const [titleerr,setTitleerr]=useState(false);
    
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const [loadingFetch,setLoadingFetch]=useState(false);
    const history=useHistory();
    const { id } = useParams() 
    const getTitle=(e)=>{
        console.log(e.target.value)
        if(e.target.value===''){
            setTitleerr(true)
            setLoading(true)
            setTitle(e.target.value)
        }
        else{
            setTitle(e.target.value)
            setTitleerr(false)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch('http://localhost:8000/api/editcategory/'+id).then(res=>{
          if(res.status===200){
          return res.json();
          }
          throw new Error('Something went wrong')
        }).then(data=>{
         setError(null)
         setTitle(data.data.title)
         setError(null)
           console.log(data)
        }).catch(err=>{
          console.log(err)
          setError(err.message)
        })
       }, [id])

    const editCategory=()=>{
        setLoading(true)
        setLoadingFetch(true);
        let formData = new FormData();
        formData.append('title', title);
        formData.append('id', id);
        fetch("http://localhost:8000/api/updatecategory",{
        body: formData,
        method: "post"
        }).then(res=>{
            setLoading(false);
            if(res.status===500){
                throw new Error('Something went wrong')
            }
            return res.json();
        }).then(data=>{
            setLoading(false);
            setLoadingFetch(false);
            if(data.message==='success'){
                setError(null)
                history.push('/category')
            }
            else{
                if(data.message.title){
                setError(data.message.title[0]);
                }
            }

        }).catch(err=>{
            setLoading(false)
            setLoadingFetch(false);
            setError(err.message)
        })


    }

    return (
        <div style={{marginTop:'60px',marginLeft:'25px',padding:'10px'}}>
            <Typography variant="h4" component="div" color="secondary">Create Category</Typography>
            { error ? <Validator severity="error" error={error}/> : null}  
            <TextField value={title} required id="outlined-required" color="secondary" label="Title" style={{marginTop:'20px',marginBottom:'20px',display:'block'}} fullWidth onChange={getTitle} error={titleerr} helperText={titleerr ? 'Kindly enter title' :''}/>
            <Box sx={{ m: 1, position: 'relative' }}>
            <Button  color="success" variant="contained" disabled={loading} onClick={editCategory} style={{marginTop:'20px',marginBottom:'20px'}} endIcon={<ArrowForwardIosIcon/>}>Update Category</Button>
                {loadingFetch && (
                <CircularProgress
                    size={24}
                    sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '41%',
                    left:'6%',
                    marginTop: '-6px',
                    marginLeft: '-12px',
                    }}
                />
                )}
            </Box>

        </div>
    )
}
