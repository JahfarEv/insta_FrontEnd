import Dashbord from "./dashbord/(home)/page";
import Sidenav from "./dashbord/layout";
import { useUserContext } from "./providers/userContext";
const page = () => {
    
 
  return (
    <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
      <div className="w-20 flex-none lg:w-64 md:border-r">
        <Sidenav />
      </div>
      <div className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
        <Dashbord />
      </div>
    </div>
  );
};

export default page;
