export default function Footer() {
  return (
    <footer className="py-8 mt-8 bg-[#2c2928] text-[#f5ede2]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <a 
            href="https://wijzijnspark.nl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img 
              src="https://i.imgur.com/w8WmjDf.png" 
              alt="Spark Logo" 
              className="h-12 w-auto"
            />
          </a>
        </div>
        <div className="text-center underline md:text-right space-x-4">
          <a 
            href="mailto:info@wijzijnspark.nl" 
            target="_blank"
            className="text-[#FE6C3B] hover:text-[#e55c2f]"
          >
            info@wijzijnspark.nl
          </a>
          <span className="text-[#f5ede2]">|</span>
          <a 
            href="/privacy-beleid" 
            
            rel="noopener noreferrer"
            className="text-[#FE6C3B] hover:text-[#e55c2f]"
          >
            Privacy beleid
          </a>
        </div>
      </div>
    </footer>
  );
} 