import { useState } from "react";

interface NavBarProps {
    children: React.ReactNode;
  }
  export default function Box({ children }: NavBarProps) {
    const [isOpen, setIsOpen] = useState(true);
  
    return (
      <div className="box">
        <button className="btn-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "–" : "+"}
        </button>
  
        {isOpen && (
          <div className="box-content">
            {children}
          </div>
        )}
      </div>
    );
  }

