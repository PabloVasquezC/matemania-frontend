// src/components/footer/Footer.js

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 ">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ScrabbLearn. Hecho con ❤️ por Pablo Vásquez.
        </p>
      </div>
    </footer>
  );
}

export default Footer;