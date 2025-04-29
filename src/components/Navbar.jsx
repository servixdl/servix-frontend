import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
      
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.41 10.3847..." fill="currentColor" />
              </svg>
            </a>
          </div>

        
          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li><a className="text-gray-500 hover:text-gray-500/75" href="#">About</a></li>
                <li><a className="text-gray-500 hover:text-gray-500/75" href="#">Careers</a></li>
                <li><a className="text-gray-500 hover:text-gray-500/75" href="#">History</a></li>
                <li><a className="text-gray-500 hover:text-gray-500/75" href="#">Services</a></li>
                <li><a className="text-gray-500 hover:text-gray-500/75" href="#">Projects</a></li>
                <li><a className="text-gray-500 hover:text-gray-500/75" href="#">Blog</a></li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link to="/login" className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm">
                  Login
                </Link>
                <div className="hidden sm:flex">
                  <Link to="/register" className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600">
                    Register
                  </Link>
                </div>
              </div>

              <div className="block md:hidden">
                <button className="rounded-sm bg-gray-100 p-2 text-gray-600 hover:text-gray-600/75">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
