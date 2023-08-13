"use client";

import { RefObject, forwardRef, useId, useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import { twMerge } from "tailwind-merge";

interface IButtonProps extends AriaButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const { buttonProps } = useButton(props, ref as RefObject<Element>);
  const { children } = props;
  const id = useId();

  const className = twMerge(
    "border border-red-500 hover:bg-red-500 active:bg-blue-700",
    props.className,
  );

  return (
    <button {...buttonProps} key={id} className={className} ref={ref}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
