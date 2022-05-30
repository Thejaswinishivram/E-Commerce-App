import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import './DataCollectionStyles.css';
import uploadimg from '../assets/upload.png';
import { ref as storageref ,uploadBytes,getDownloadURL} from "firebase/storage";
import { firebasedatabase, firebaseStorage } from "../backend/firebaseHandler";
import { set,ref } from "firebase/database";
import { useNavigate } from "react-router-dom";

const DataCollectionPages=()=>{

    const [productInfo,setproductInfo]=useState({
        productImg:"",
        productName:"",
        productPrice:"",
        productMRP:""

    });

    const nav = useNavigate();

    useEffect(()=>{
        if(!productInfo.productPrice){   
            setproductInfo({
                ...productInfo,
                "productMRP":0
               
            })
        }else{
            const mrp=(parseFloat(productInfo.productPrice)*0.18)+parseFloat(productInfo.productPrice)
            setproductInfo({
                ...productInfo,
                "productMRP":mrp
               
            })
        }
   
    },[productInfo.productPrice]);

    const handleChange= event =>{
        const {name,value}=event.target;
        setproductInfo({
            ...productInfo,
            [name]:value
           
        })

    }

    const handleImage=()=>{
        const tempElement=document.createElement('input');
        tempElement.setAttribute('type',"file");
        tempElement.onchange=async (event)=>{
            const file=event.target.files[0];
            const fileRef=storageref(firebaseStorage,'TEMP-FOLDER/file');
            await uploadBytes(fileRef,file);
            const downloadurl=await getDownloadURL(fileRef);
            setproductInfo({
                ...productInfo,
                "productImg":downloadurl
               
            })
            alert("file uploaded");
        }
        tempElement.click();
    }

    const handleSign=async()=>{
        try{
            const recordRef=ref(firebasedatabase,`E-COMMERCE/${productInfo.productName}`);
            await set(recordRef,productInfo);           
            setproductInfo({
                productName:"",
                productPrice:"",
            productMRP:""
            
        })
        nav("/Record-list");         
        }
        catch(err){
            alert(err);
        }
    }

    return(
        <div className="data-collection-container">
            <div className="data-collection-content-box">
                <img  className="data-collection-product-image" onClick={handleImage} src= {productInfo.productImg?productInfo.productImg:uploadimg} alt='upload product '/>
                <TextField name={"productName"} value={productInfo.productName} onChange={handleChange} sx={{width:'600px',marginBottom:'15px'}} id="outlined-basic" label="Product Name" variant="outlined" />
                <TextField name={"productPrice"} type={"number"} value={productInfo.productPrice} onChange={handleChange} sx={{width:'600px',marginBottom:'15px'}} id="outlined-basic" label="Product Price" variant="outlined" />
                <TextField value={productInfo.productMRP} sx={{width:'600px',marginBottom:'15px'}} id="outlined-basic" label=" MRP" variant="outlined" />
                <Button variant="contained" onClick={handleSign}>Save Product</Button>
            </div>
          
        </div>
    )
}

export default DataCollectionPages;