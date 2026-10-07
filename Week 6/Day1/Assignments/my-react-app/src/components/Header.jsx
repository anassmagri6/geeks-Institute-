function Header (){
    return (
     <div>
     <header className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
     <h1 className="text-xl font-bold">My Landing Page</h1>

     <nav className="space-x-4">
     <a href="#home" className="hover:text-blue-400">Home</a>
     <a href="#features" className="hover:text-blue-400">Features</a>
     <a href="#contact" className="hover:text-blue-400">Contact</a>
     </nav>
    </header>
     </div>
     
    )
}
export default Header;