import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

interface DropdownContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeMenu: () => void;
  closing: boolean;
}

const DropdownMenuContext = createContext<DropdownContextProps | null>(null);

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    if (!open) return;
    setClosing(true);
    setOpen(false);
    setTimeout(() => setClosing(false), 200);
  }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, closeMenu]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, closeMenu, closing }}>
      <div ref={menuRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className = "", ...props }, ref) => {
  const context = useContext(DropdownMenuContext);
  if (!context)
    throw new Error("DropdownMenu components must be used within DropdownMenu");
  const { open, setOpen, closeMenu } = context;
  const classes = `interactive-item rounded-lg flex items-center ${
    open ? "active" : ""
  } ${className}`;
  return (
    <button
      ref={ref}
      onClick={() => (open ? closeMenu() : setOpen(true))}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const context = useContext(DropdownMenuContext);
  if (!context)
    throw new Error("DropdownMenu components must be used within DropdownMenu");
  const { open, closing } = context;
  if (!open && !closing) return null;
  return (
    <div
      className={`absolute right-0 mt-2 min-w-[8rem] rounded-md bg-white shadow-lg z-10 ${
        open ? "dropdown-animation" : "dropdown-close-animation"
      } ${className || ""}`}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem: React.FC<{
  onSelect?: () => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onSelect, className, children }) => {
  const context = useContext(DropdownMenuContext);
  if (!context)
    throw new Error("DropdownMenu components must be used within DropdownMenu");
  const { closeMenu } = context;
  const handleSelect = () => {
    if (onSelect) {
      onSelect();
    }
    closeMenu();
  };
  return (
    <button
      onClick={handleSelect}
      className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
};
