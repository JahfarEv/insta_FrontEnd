import Dashbord from "./dashbord/(home)/page";
import Sidenav from "./dashbord/layout";
import { useUserContext } from "./providers/userContext";
import Signin from "./login/page";
const page = () => {
    
 
  return (
   
   <div className="flex items-center justify-center h-screen">
  <Signin />
</div>

    
  );
};

export default page;
