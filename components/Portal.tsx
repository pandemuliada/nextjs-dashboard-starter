"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  id: string;
}

const Portal: React.FC<PortalProps> = ({ children, id }) => {
  const [mounted, setMounted] = useState(false);
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    portalContainerRef.current = document.createElement("div");
    portalContainerRef.current.id = id;
    document.body.appendChild(portalContainerRef.current);
    setMounted(true);

    return () => {
      if (portalContainerRef.current) {
        document.body.removeChild(portalContainerRef.current);
      }
    };
  }, [id]);

  return mounted
    ? ReactDOM.createPortal(children, portalContainerRef.current!)
    : null;
};

export default Portal;
