import React,{useState,useEffect} from 'react'
import {  TextField,Button,Input,Typography,Box,CircularProgress,FormHelperText} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { green } from '@mui/material/colors';
// import Validator from "../Error/Error";
import { useHistory ,useParams} from 'react-router-dom';
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
    const [filedata,setFiledata]=useState('');
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const [loadingFetch,setLoadingFetch]=useState(false);
    const history=useHistory();
    const { id } = useParams() 

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


       useEffect(() => {
        fetch('http://localhost:8000/api/editproduct/'+id).then(res=>{
          if(res.status===200){
          return res.json();
          }
          throw new Error('Something went wrong')
        }).then(data=>{
         setError(null)
         setTitle(data.data.title)
         setDescription(data.data.description)
         setCategory(data.data.category_id)
         setFiledata(data.data.image)

           console.log(data)
        }).catch(err=>{
          console.log(err)
          setError(err.message)
        })
       }, [id])

    const getTitle=(e)=>{
        if(e.target.value==''){
            setTitleerr(true)
            setLoading(true)
        }
        else{
            setTitle(e.target.value)
            setTitleerr(false)
            setLoading(false)
        }
    }

    const getDescription=(e)=>{
        if(e.target.value==''){
            setDescriptionerr(true)
            setLoading(true)
        }
        else{
            setDescription(e.target.value)
            setDescriptionerr(false)
            setLoading(false)
        }
    }
    const handleCategory=(e)=>{
        if(e.target.value==''){
            setCategoryerr(true)
            setLoading(true)
        }
        else{
            setCategory(e.target.value)
            setCategoryerr(false)
            setLoading(false)
        }
    }

    const getFile=(e)=>{
        setFile(e.target.files[0])
    }
    const updateProduct=()=>{
        setLoading(true)
        setLoadingFetch(true);
        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('id', id);
        if(file!=''){
        formData.append('image', file);
        }
        formData.append('category', category);
        fetch("http://localhost:8000/api/updateproduct",{
        body: formData,
        method: "post"
        }).then(res=>{
            setLoading(false);
            if(res.status==500){
                throw new Error('Something went wrong')
            }
            return res.json();
        }).then(data=>{
            console.log(data)
            setLoading(false);
            setLoadingFetch(false);
            if(data.message=='success'){
                history.push('/')
            }

        }).catch(err=>{
            setLoading(false)
            setLoadingFetch(false);
            setError(err.message)
        })


    }

    return (
        <div style={{marginTop:'60px',marginLeft:'25px',padding:'10px'}}>
            {/* { error ? <Validator severity="error" error={error}/> : null}   */}
            <Typography variant="h4" component="div" color="secondary">Edit Product</Typography>
            <TextField required id="outlined-required" color="secondary" label="Title" style={{marginTop:'20px',marginBottom:'20px',display:'block'}} fullWidth onChange={getTitle} error={titleerr} helperText={titleerr ? 'Kindly enter title' :''} value={title}/>
            <TextField required id="outlined-required" color="secondary" label="Description" multiline fullWidth rows={4} style={{marginTop:'20px',marginBottom:'20px',display:'block'}} onChange={getDescription} error={descriptionerr} helperText={descriptionerr ? 'Kindly enter description' :''} value={description}/>
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={handleCategory}
                >
                    <MenuItem value="">
                        <em>Select Category</em>
                    </MenuItem>
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
            {file ? <img src={URL.createObjectURL(file)} alt="pic" style={{height: '500px',borderRadius: '20px',display: 'block'}}/> : <img src={'http://localhost:8000/storage/images/'+filedata} alt="pic" style={{height: '500px',borderRadius: '20px',display: 'block'}}/>}
            {/* <Button variant="contained" color="success" style={{marginTop:'20px',marginBottom:'20px'}} endIcon={<ArrowForwardIosIcon/>} onClick={addPost}>
                Send
            </Button> */}
            <Box sx={{ m: 1, position: 'relative' }}>
            <Button  color="success" variant="contained" disabled={loading} onClick={updateProduct} style={{marginTop:'20px',marginBottom:'20px'}} endIcon={<ArrowForwardIosIcon/>}>Update Product</Button>
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
