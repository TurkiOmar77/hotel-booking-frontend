const Footer = () => {
    return (
      <footer id="footer" className="bg-zinc-800 text-gray-300 py-8 text-center">
        <div className="container  mx-auto px-6">
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-gray-400 duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 duration-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 duration-300">Back To Home</a>
          </div>
          <p className="text-lg font-semibold mt-6">&copy; {new Date().getFullYear()} Turki Al-Saar And Ali Ba Sunboul. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;