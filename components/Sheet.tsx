import { ReactNode, cloneElement, useRef } from "react";
import {
  AriaDialogProps,
  Overlay,
  useDialog,
  useModalOverlay,
} from "react-aria";
import { OverlayTriggerState } from "react-stately";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      {state.isOpen && (
        <Overlay>
          <div className="fixed inset-0 z-[100]" {...underlayProps}>
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <div {...modalProps} ref={ref}>
              {cloneElement(children, { id, isOpen: state.isOpen })}
            </div>
          </div>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

interface ISheetPanelProps extends AriaDialogProps {
  children?: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  title?: string;
  isOpen?: boolean;
}

const panelAnimation = (side: string = "right") => {
  if (side === "right") {
    return {
      initial: { opacity: 0, x: "100%" },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: "100%" },
    };
  }

  if (side === "left") {
    return {
      initial: { opacity: 0, x: "-100%" },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: "-100%" },
    };
  }

  if (side === "bottom") {
    return {
      initial: { opacity: 0, y: "100%" },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: "100%" },
    };
  }

  if (side === "top") {
    return {
      initial: { opacity: 0, y: "-100%" },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: "-100%" },
    };
  }
};

const Panel = (props: ISheetPanelProps) => {
  const { side = "right", className, title, children, isOpen } = props;
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
    <div {...dialogProps} ref={panelRef}>
      <motion.div
        className={formattedClassName}
        {...panelAnimation(side)}
        transition={{ type: "tween" }}
      >
        {title && (
          <h2 className="text-2xl font-medium" {...titleProps}>
            {title}
          </h2>
        )}

        {children}
      </motion.div>
    </div>
  );
};

Sheet.Panel = Panel;

export default Sheet;
