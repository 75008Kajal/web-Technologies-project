import React from "react";
//import { useDispatch, useSelector } from "react-redux";
import {Link, Navigate, useNavigate } from "react-router-dom"
import { useReducer,useState } from "react";
//import { login } from "../loggedSlice";

export default function LoginComp() {
   
    let navigate = useNavigate();
    const init={
        email_Id:"",
        Password:""
    }
    const reducer = (state,action) => {
        switch(action.type)
        {
            case 'update':
                //partial updation
                //get the current state and modify only the mentioned field
                return {...state,[action.fld]:action.val}
        }
    }
    const[cust, dispatch] = useReducer(reducer,init);
    const[respo,saveRes] = useState("");
    const submitData = (e) => {
        //default behavior submit - cancelling
        e.preventDefault();
        console.log(JSON.stringify(cust));
        const reqOptions = {
            method:"POST",
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                userid:cust.email_Id,
                Password:cust.Password
            })
        }

        fetch("http://localhost:9000/login", reqOptions)
        .then(resp => resp.text())
        .then(data => saveRes(data) )
        console.log("respo="+respo)
        if(respo=="success"){
            
            Navigate('/home')
            console.log("True")
        }
    }
   

    return (
        <div className="Auth-form-container">

            <form className="Auth-form">
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Login</h3>
                <div className="form-group mt-3"></div>
               <label> Enter uid :</label>
                <input type="email" className="form-control mt-1" placeholder="Enter Email" value={cust.email_Id}
                onChange={(e)=>{
                    dispatch({type:'update',fld:'email_Id',val:e.target.value})
                }} />
                </div>

                <div className="form-group mt-3">
               <label> Enter Password :</label>
                <input type="password" className="form-control mt-1" placeholder="Enter Password" value={cust.Password}
                onChange={(e)=>{
                    dispatch({type:'update',fld:'Password',val:e.target.value})
                }} />
                </div>
                <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary"
                onClick={(e)=>{submitData(e)}}>submit</button>
                
                </div>
                <div className="signup">
                    <span className="signup">Don't have an Account?
                    <Link to='/RegistrationForm'>signup</Link>
                    </span>
                </div>
            </form>
           <br /><br />
           <div><p>{respo}</p></div>
        </div>
    )
}
