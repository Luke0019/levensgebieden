export default function Footer() {
  return (
    <footer className=" py-8 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <img 
            src="https://i.imgur.com/0O1KsDA.png" 
            alt="Spark Logo" 
            className="h-12 w-auto"
          />
        </div>
        <div className="text-center md:text-right">
          <a 
            href="mailto:info@wijzijnspark.nl" 
            className="text-[#FE6C3B] hover:text-[#e55c2f]"
          >
            info@wijzijnspark.nl
          </a>
        </div>
      </div>
    </footer>
  );
} 