import { ReactNode, cloneElement, useRef } from "react";
import {
  AriaDialogProps,
  Overlay,
  useDialog,
  useModalOverlay,
} from "react-aria";
import { OverlayTriggerState } from "react-stately";
import { twMerge } from "tailwind-merge";

type ISheetProps = {
  children?: any;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  state: OverlayTriggerState;
  id?: string;
  [x: string]: any;
};

const Sheet = ({
  state,
  children,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  id,
}: ISheetProps) => {
  let ref = useRef<HTMLDivElement>(null);
  let { modalProps, underlayProps } = useModalOverlay(
    { isDismissable, isKeyboardDismissDisabled },
    state,
    ref,
  );

  console.log(isDismissable);

  if (!state.isOpen) {
    return null;
  }

  return (
    <Overlay>
      <div
        className="fixed inset-0 z-[100] bg-black bg-opacity-20 backdrop-blur-sm"
        {...underlayProps}
      >
        <div {...modalProps} ref={ref}>
          {cloneElement(children, { id })}
        </div>
      </div>
    </Overlay>
  );
};

interface ISheetPanelProps extends AriaDialogProps {
  children?: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  title?: string;
}

const Panel = (props: ISheetPanelProps) => {
  const { side = "right", className, title, children } = props;
  const panelRef = useRef<HTMLDivElement>(null);
  let { dialogProps, titleProps } = useDialog(props, panelRef);

  const formattedClassName = twMerge(
    "bg-white",
    side === "left" && "absolute left-0 bottom-0 top-0 w-[300px]",
    side === "right" && "absolute right-0 bottom-0 top-0 w-[300px]",
    side === "bottom" &&
      "absolute right-0 left-0 bottom-0 h-[300px] overflow-y-hidden",
    side === "top" &&
      "absolute right-0 left-0 top-0 h-[300px] overflow-y-hidden",
    className,
  );

  return (
    <div className={formattedClassName} {...dialogProps} ref={panelRef}>
      {title && (
        <h2 className="text-2xl font-medium" {...titleProps}>
          {title}
        </h2>
      )}

      {children}
    </div>
  );
};

Sheet.Panel = Panel;

export default Sheet;
