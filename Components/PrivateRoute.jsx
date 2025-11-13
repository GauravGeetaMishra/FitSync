import { Navigate, Outlet } from "react-router-dom"
import { getToken } from "../Services/TokenService"
import {getRole} from "../Services/RoleService"
import {AccessDenied} from "./AccessDenied"

export function PrivateRoute(props) {
    const token = getToken();
    const {allowedRoles} = props;
    const role = getRole();
  if(token){
    if(allowedRoles.includes(role)){
            return <Outlet/>
        }else{
            return <AccessDenied/>
        }
    }
    else{
        return <Navigate to={"/"} />
}
} 
