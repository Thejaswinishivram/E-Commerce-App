import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { firebasedatabase } from "../backend/firebaseHandler";
import './prodStyles.css';

const ProdRecordList=()=>{

    const [proList, setproList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const productRef = ref(firebasedatabase, 'E-COMMERCE');
            onValue(productRef, (dataSnapshot) => {
                if (dataSnapshot.exists()) {
                    const temp = [];
                    for (const productName in dataSnapshot.val()) {
                        const produc = dataSnapshot.child(productName).val();
                        temp.push(produc);
                    }
                    setproList(temp);
                }

                else {
                    alert("no records found")
                }

            })
        }
        fetchData();
    }, []);

    return(
        <div className="list-containr">
        <h1>List Of Products</h1>
        <div className="grid-list">
        {
            proList.map((item)=>{
                return(
                    <div className="grid-content"> 
                        <h3> Product Name:{item.productName}</h3>
                        <h3> Product Price:{item.productPrice}</h3>
                        <h3> MRP:{item.productMRP}</h3>

                    </div>

                )

            })
        }
        </div>
        
    </div>
    )
}

export default ProdRecordList;