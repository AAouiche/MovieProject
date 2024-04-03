

interface NavBarProps {
    children: React.ReactNode;
  }
  export default function CustomBox({ children }: NavBarProps) {
    
  
    return (
      <div className="box">
        {/* <button className="btn-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "–" : "+"}
        </button> */}
  
        
          <div className="box-content">
            {children}
          </div>
      
      </div>
    );
  }

