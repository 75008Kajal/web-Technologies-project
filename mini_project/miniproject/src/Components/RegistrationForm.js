import { useState, useReducer, useEffect } from "react"


const init = {
    custId:"",
    cname:"",
    mobileNo:0,
    emailId: "",
    paymentMode:"",
    Password:""
}

const reducer = (state,action) => {
    switch(action.type)
    {
        case 'update':
            //partial updation
            //get the current state and modify only the mentioned field
            return {...state,[action.fld]:action.val}
        case 'reset':
            return init;
    }
}


    const validateData = (key,val) => {
        let valid = true;
        let error = ""
        switch(key)
        {
            case 'mobileNo':
               var pattern = /^[0-9]{10}$/ 
               if(!pattern.test(val))
               {
                  valid = false;
                  error = "mobileNo should be 10 digits only"
               }
            }
        }
export default function RegistrationForm() {
 
    const[cust, dispatch] = useReducer(reducer,init);
    const[msg,setMsg] = useState("xx")
    const[insertMsg, setInsertMsg] = useState("")

    useEffect(()=>{
        setMsg(localStorage.getItem("msg"))
    },[]);

    const submitData = (e) => {
        //default behavior submit - cancelling
        e.preventDefault();
        console.log(JSON.stringify(cust));
        const reqOptions = {
            method:"POST",
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                custId:cust.custId,
                cname: cust.cname,
                mobileNo: cust.mobileNo,
                email_Id: cust.email_Id,
                paymentMode: cust.paymentMode,
                Password:cust.Password
            })
        }
        fetch("http://localhost:9000/insertcust", reqOptions)
        .then(resp => resp.text())
        .then(data => setInsertMsg(data) )
    }

    return (
        <div class="container">
            <div class="row">
            
            <h1> {msg} </h1>
            <h1> Registration Form </h1>
            <form>
            <div class="mt-3 mb-3">
                <label for="custId" class="form-label"> custId</label>
                <input type="text" name="custId" class="form-control"
                value={cust.custId}
                onChange={(e)=>{dispatch({type:'update',fld:"custId",val:e.target.value})}} />
                </div>
                
                <div class="mt-3 mb-3">
                <label for="cname" class="form-label"> cname</label>
                <input type="text" name="cname" class="form-control"
                value={cust.cname}
                onChange={(e)=>{dispatch({type:'update',fld:"cname",val:e.target.value})}} />
                </div>

                <div class="mt-3 mb-3">
                <label for="mobileNo" class="form-label"> mobileNo</label>
                <input type="text" name="mobileNo" class="form-control"
                value={cust.mobileNo}
                onChange={(e)=>{dispatch({type:'update',fld:"mobileNo",val:e.target.value})}} />
                </div>
                <div class="mt-3 mb-3">
                <label for="Email_Id" class="form-label"> EmailId</label>
                <input type="text" id="email_Id" class="form-control"
                value={cust.email_Id}
                onChange={(e)=>{dispatch({type:'update',fld:"email_Id",val:e.target.value})}} />
                </div>

                <div class="mt-3 mb-3">
                <label for="paymentMode" class="form-label"> paymentMode</label>

             <input type="text" name="paymentMode" class="form-control"
                value={cust.paymentMode}
                onChange={(e)=>{dispatch({type:'update',fld:"paymentMode",val:e.target.value})}} />
                </div>

                <div class="mt-3 mb-3">
                <label for="Password" class="form-label"> Password</label>
                <input type="password" name="Password" class="form-control"
                value={cust.Password}
                onChange={(e)=>{dispatch({type:'update',fld:"Password",val:e.target.value})}} />
                </div>
                <button type="submit" className="btn btn-primary mt-3 me-3"
                onClick={(e)=>{submitData(e)}}>Insert</button>
                <button type="reset" className="btn btn-danger mt-3 me-3"
                onClick={()=>{dispatch({type:"reset"})}}>Clear</button>
            </form>
            </div>
            
        </div>
    )
}