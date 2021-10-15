import React,{useContext,useEffect,useState} from 'react'
import { AppBar,  Box,Avatar,  Toolbar, Typography ,Button} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { deepOrange } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContextProvider';

const useStyle=makeStyles({
    mainlist:{
        display:'flex',
        padding:0,
        flexDirection:'row',
        flexGrow:1,
        alignItems:'center',
        justifyContent:'Center'
    },
    marginlist:{
        marginLeft:10,
        marginRight:10
    },
    headers:{
        marginLeft:40,
        padding:10,
        '&:hover':{
            color:'#ffffff',
            backgroundColor: 'rgba(156, 39, 176, 0.04)',
        }
    }

})
export default function Topbar() {
    const authContext=useContext(AuthContext);
    const user=authContext.isauth;
    const islogout=authContext.islogout
    const [userdetail,setUserdetail]=useState('');
    useEffect(()=>{
        setTimeout(()=>{
       setUserdetail(JSON.parse(localStorage.getItem('userdetails')))
        },1000)
},[user])
    const classes=useStyle();
    const logout=()=>{
        window.localStorage.removeItem('isauth');
        window.localStorage.removeItem('userdetails');


        islogout();
    }
    return (
        <>
        <AppBar color="inherit" elevation={1} position="fixed">
          <Toolbar>
          <Link to="/" style={{textDecoration:'none'}}><Typography  variant="subheader" className={classes.headers} noWrap component="div" style={{margin:'0px 10px',cursor:'pointer',fontWeight:'bold',color:'#444'}}>PRODUCT MANAGEMENT</Typography></Link>
                 <Box className={classes.mainlist}>                
                      <Link to="/" style={{textDecoration:'none'}}><Typography  variant="subheader" className={classes.headers} noWrap component="div" style={{margin:'0px 10px',cursor:'pointer',fontWeight:'bold',color:'#444'}}>PRODUCT</Typography></Link>
                      <Link to="/category" style={{textDecoration:'none'}}><Typography  variant="subheader" className={classes.headers} noWrap component="div" style={{margin:'0px 10px',cursor:'pointer',fontWeight:'bold',color:'#444'}}>CATEGORY</Typography></Link>
                      {user ? <><Typography  variant="subheader" className={classes.headers} noWrap component="div" style={{margin:'0px 10px',cursor:'pointer',fontWeight:'bold',color:'#444'}} onClick={logout}>LOGOUT</Typography></>:<><Link to="/register" style={{textDecoration:'none'}}><Typography  variant="subheader" className={classes.headers} noWrap component="div" style={{margin:'0px 10px',cursor:'pointer',fontWeight:'bold',color:'#444'}}>REGISTER</Typography></Link><Link style={{textDecoration:'none'}} to="/login"><Typography  variant="subheader" className={classes.headers} noWrap component="div" style={{margin:'0px 10px',cursor:'pointer',fontWeight:'bold',color:'#444'}}>LOGIN</Typography></Link></>          
                      }
                </Box>
                {user ?
                  <>
                  <Button style={{marginLeft:'10px',fontWeight:'bold'}} color="secondary" size="large">{userdetail ? userdetail.name : ''}</Button>
                  <Avatar style={{background:deepOrange[500]}}>{userdetail ? userdetail.name.charAt(0).toUpperCase() : ''}</Avatar>
                  </>
                  : ''
                }
          </Toolbar>
        </AppBar><div>
            Top Bars
        </div>
        </>
    )
}
