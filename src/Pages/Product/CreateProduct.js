import React,{useState,useEffect} from 'react'
import {  TextField,Button,Input,Typography,Box,CircularProgress,FormHelperText} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { green } from '@mui/material/colors';
import Validator from "../../Components/Error/Error";
import { useHistory} from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CreateProduct() {
    const [title,setTitle]=useState('');
    const [titleerr,setTitleerr]=useState(false);
    const [description,setDescription]=useState('');
    const [descriptionerr,setDescriptionerr]=useState(false);
    const [category,setCategory]=useState('');
    const [categorylist,setCategoryList]=useState([]);
    const [categoryerr,setCategoryerr]=useState(false);
    const [file,setFile]=useState('');
    const [fileerr,setFileerr]=useState('');
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');
    const [loadingFetch,setLoadingFetch]=useState(false);
    const history=useHistory();
    useEffect(() => {
        fetch('http://localhost:8000/api/categorylist').then(res=>{
          if(res.status===200){
          return res.json();
          }
          throw new Error('Something went wrong')
        }).then(data=>{
         setError(null)
         setCategoryList(data.data)
           console.log(data)
        }).catch(err=>{
          console.log(err)
          setError(err.message)
        })
       }, [])

    const getTitle=(e)=>{
        if(e.target.value===''){
            setTitleerr(true)
            setLoading(true)
        }
        else{
            setTitle(e.target.value)
            if(title!=='' && category!=='' && file!=='' && description!==''){
            setLoading(false)
            }
            setTitleerr(false)
        }
    }

    const getDescription=(e)=>{
        if(e.target.value===''){
            setDescriptionerr(true)
            setLoading(true)
        }
        else{
            setDescription(e.target.value)
            setDescriptionerr(false)
            if(title!=='' && category!=='' && file!=='' && description!==''){
                setLoading(false)
                }
        }
    }
    const handleCategory=(e)=>{
        if(e.target.value===''){
            setCategoryerr(true)
            setLoading(true)
        }
        else{
            setCategory(e.target.value)
            setCategoryerr(false)
            if(title!=='' && e.target.value!=='' && file!=='' && description!==''){
                setLoading(false)
                }
        }
    }

    const getFile=(e)=>{
        console.log(e.target.files.length)
        if(e.target.files.length <=0){
            setFileerr(true)
            setLoading(true)
        }
        else{
        setFile(e.target.files[0])
        if(title!=='' && category!=='' && e.target.files.length > 0 && description!==''){
            setLoading(false)
            }
            setFileerr(false)

        }
    }
    const addProduct=()=>{
        setLoading(true)
        setLoadingFetch(true);
        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', file);
        formData.append('category', category);
        fetch("http://localhost:8000/api/addproduct",{
        body: formData,
        method: "post"
        }).then(res=>{
            setLoading(false);
            if(res.status===500){
                throw new Error('Something went wrong')
            }
            return res.json();
        }).then(data=>{
            console.log(data)
            setLoading(false);
            setLoadingFetch(false);
            if(data.message==='success'){
                history.push('/')
            }
            else{
                
                if(data.message.title){
                setError(data.message.title[0]);
                }
                if(data.message.description){
                    setError(data.message.description[0]);
                }
                if(data.message.category){
                        setError(data.message.category[0]);
                }
                if(data.message.image){
                    setError(data.message.image[0]);
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
            { error ? <Validator severity="error" error={error}/> : null}  
            <Typography variant="h4" component="div" color="secondary">Create Product</Typography>
            <TextField required id="outlined-required" color="secondary" label="Title" style={{marginTop:'20px',marginBottom:'20px',display:'block'}} fullWidth onChange={getTitle} error={titleerr} helperText={titleerr ? 'Kindly enter title' :''}/>
            <TextField required id="outlined-required" color="secondary" label="Description" multiline fullWidth rows={4} style={{marginTop:'20px',marginBottom:'20px',display:'block'}} onChange={getDescription} error={descriptionerr} helperText={descriptionerr ? 'Kindly enter description' :''}/>
            <FormControl fullWidth>
            <InputLabel required id="test-select-label">Select Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={handleCategory}
                    labelId="test-select-label"
                    label="Select Category"
                >
                   
                    {
                        categorylist.length > 0 ? categorylist.map((cat)=>{
                            return (
                                 <MenuItem value={cat.id} key={cat.id}>{cat.title}</MenuItem>
                            )
                        })  : ''
                    }
                 
                </Select>
                {categoryerr ? <FormHelperText className="password">kindly select category</FormHelperText> : null }
            </FormControl>
            <label htmlFor="contained-button-file" style={{marginTop:'20px',marginBottom:'20px',display:'block'}}>
            <Input accept="image/*" id="contained-button-file" multiple type="file" style={{display:'none'}} onChange={getFile}/>
            <Button variant="text" color="success" component="span" startIcon={<FileUploadIcon />} size="small" style={{textTransform:'capitalize'}}>
                Upload Files
            </Button>
            </label>
            {file ? <img src={URL.createObjectURL(file)} alt="pic" style={{height: '500px',borderRadius: '20px',display: 'block'}}/> : null}
            {/* <Button variant="contained" color="success" style={{marginTop:'20px',marginBottom:'20px'}} endIcon={<ArrowForwardIosIcon/>} onClick={addPost}>
                Send
            </Button> */}
            <Box sx={{ m: 1, position: 'relative' }}>
            <Button  color="success" variant="contained" disabled={loading} onClick={addProduct} style={{marginTop:'20px',marginBottom:'20px'}} endIcon={<ArrowForwardIosIcon/>}>Add Product</Button>
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
