"use client";

import { RefObject, forwardRef, useId, useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";
import { twMerge } from "tailwind-merge";

interface IButtonProps extends AriaButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "filled" | "outline";
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const { buttonProps } = useButton(props, ref as RefObject<Element>);
  const { children, variant = "filled", className: classNameFromProps } = props;
  const id = useId();

  const className = twMerge(
    "border border-primary h-[45px] px-5",
    variant === "filled" && "bg-primary text-white",
    variant === "outline" &&
      "bg-transparent text-primary hover:bg-primary hover:text-white",
    props.isDisabled && "cursor-not-allowed",
    classNameFromProps,
  );

  return (
    <button {...buttonProps} key={id} className={className} ref={ref}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
