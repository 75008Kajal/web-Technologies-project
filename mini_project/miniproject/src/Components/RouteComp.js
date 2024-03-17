import { useNavigate } from "react-router-dom"

export default function RouteComp()
{
    let navigate=useNavigate();
    return(
        <div>
            
            <button onClick={()=>{navigate('/RegistrationForm')}}></button>
            
        </div>
    )
}