import { Typography } from "@material-tailwind/react";
 
export function Footer() {
  return (
    <div className="flex">
      <footer className="w-full bg-none mt-8 lg:mt-16 ml-4 lg:ml-12 flex justify-center">
        <div className="flex flex-row flex-wrap items-center justify-center font-light text-sm gap-y-6 gap-x-12 bg-none text-center md:justify-between">
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                About Us
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                License
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contribute
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contact Us
              </Typography>
            </li>
            <li>
              <Typography color="blue-gray" className="text-center font-normal">
                &copy; 2023 ShareScape
              </Typography>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
