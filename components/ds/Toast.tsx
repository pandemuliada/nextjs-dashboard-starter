"use client";

import Portal from "@/components/Portal";
import { ReactNode, createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IToastProps {
  id?: any;
  message: string;
  variant?: any;
  duration?: number;
  createdAt?: Date;
}

type IToastFunction = Pick<IToastProps, "message" | "variant" | "duration">;

type IToastPosition = "top right" | "bottom right" | "top left" | "bottom left";

interface IToastContextProps {
  toast: (props: IToastFunction) => void;
  remove: (id: any) => void;
  toasts: IToastProps[];
  limit: number;
  position?: IToastPosition;
}

const ToastContext = createContext<IToastContextProps>({
  toast: () => {},
  remove: () => {},
  toasts: [],
  limit: 5,
  position: "top right",
});

export const useToast = () => {
  const { toast, remove, toasts, position, limit } = useContext(ToastContext);
  return { toast, toasts, position, limit, remove };
};

export const ToastProvider = ({
  children,
  limit = 5,
  position,
}: {
  children: ReactNode;
  limit?: number;
  position?: IToastPosition;
}) => {
  const [toasts, setToasts] = useState<IToastProps[]>([]);

  const toast = ({ message, variant, duration = 500 }: IToastFunction) => {
    setToasts((prevToasts) => {
      const newTost = {
        message,
        variant,
        duration,
        createdAt: new Date(),
        id: Date.now(),
      };

      if (prevToasts.length === limit) {
        const updatedToasts = [newTost, ...prevToasts.slice(0, -1)];
        return updatedToasts;
      }

      return [newTost, ...prevToasts];
    });
  };

  const remove = (id: any) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <Portal id="toast">
      <ToastContext.Provider
        value={{ toast, toasts, remove, limit: limit as number, position }}
      >
        <ToastContainer>{children}</ToastContainer>
      </ToastContext.Provider>
    </Portal>
  );
};

const ToastContainer = ({ children }: { children: ReactNode }) => {
  const { toasts, limit } = useToast();

  return (
    <>
      <div className="fixed z-[9999] top-0 right-0 flex flex-col items-end p-5">
        {toasts.map((toast, index) => (
          <ToastItem key={`toast_${index}`} toast={toast} />
        ))}
      </div>

      {children}
    </>
  );
};

const ToastItem = ({ toast }: { toast: IToastProps }) => {
  const { remove } = useToast();
  const className = twMerge(
    "shadow border border-primary w-fit px-4 py-2 mb-3 last:mb-0 text-white bg-gray-800 rounded-md",
  );

  return (
    <div className={className} onClick={() => remove(toast.id)}>
      <p>{toast.message}</p>
    </div>
  );
};
