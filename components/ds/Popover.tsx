import { AnimatePresence, motion } from "framer-motion";
import React, {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useRef,
} from "react";
import {
  AriaButtonProps,
  AriaDialogProps,
  DismissButton,
  Overlay,
  Placement,
  useDialog,
  useOverlayTrigger,
  usePopover,
} from "react-aria";
import { OverlayTriggerState, useOverlayTriggerState } from "react-stately";
import { twMerge } from "tailwind-merge";

type IPopoverProps = {
  children?: any;
  isKeyboardDismissDisabled?: boolean;
  id?: string;
  placement?: Placement;
  [x: string]: any;
};

interface PopoverContextType extends IPopoverProps {
  triggerRef: any;
  popoverRef: any;
  state?: OverlayTriggerState | null;
  triggerProps?: AriaButtonProps | null;
  overlayProps?: any;
}

const PopoverContext = createContext<PopoverContextType>({
  triggerRef: null,
  popoverRef: null,
  state: null,
  triggerProps: null,
});

const getContentAnimation = (placement: Placement) => {
  const placements = placement.split(" ");
  const isBottom = placements.includes("bottom");
  const isTop = placements.includes("top");
  const isLeft = placements.includes("left") || placements.includes("start");
  const isRight = placements.includes("right") || placements.includes("end");

  if (isBottom) {
    return {
      initial: { opacity: 0, y: -2 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -2 },
    };
  }

  if (isTop) {
    return {
      initial: { opacity: 0, y: 2 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 2 },
    };
  }

  if (isLeft) {
    return {
      initial: { opacity: 0, x: 2 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 2 },
    };
  }

  if (isRight) {
    return {
      initial: { opacity: 0, x: -2 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -2 },
    };
  }
};

const usePopoverContext = () => {
  return useContext(PopoverContext);
};

const Popover = ({
  children,
  isKeyboardDismissDisabled = false,
  placement = "bottom start",
}: IPopoverProps) => {
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  const popoverState = useOverlayTriggerState({});
  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    popoverState,
    triggerRef,
  );

  return (
    <PopoverContext.Provider
      value={{
        popoverRef,
        triggerRef,
        isKeyboardDismissDisabled,
        state: popoverState,
        triggerProps,
        overlayProps,
        placement,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

type IPopoverTriggerProps = {
  children: ReactElement;
};

const Trigger = ({ children }: IPopoverTriggerProps) => {
  const { triggerRef, triggerProps } = usePopoverContext();

  return (
    <div className="w-fit">
      {cloneElement(children, {
        ref: triggerRef,
        ...triggerProps,
      })}
    </div>
  );
};

type IPopoverContentProps = {
  children?: ReactNode;
  className?: string;
};

const Dialog = (props: { children: ReactNode; className?: string }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  let { dialogProps, titleProps } = useDialog(
    props as AriaDialogProps,
    dialogRef,
  );

  return (
    <div {...dialogProps} ref={dialogRef} className={twMerge(props.className)}>
      {props.children}
    </div>
  );
};

const Content = (props: IPopoverContentProps) => {
  const {
    state,
    popoverRef,
    triggerRef,
    isKeyboardDismissDisabled,
    overlayProps,
    placement: placementFromProps,
  } = usePopoverContext();

  let { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset: 10,
      popoverRef,
      triggerRef,
      placement: placementFromProps,
      // shouldUpdatePosition: true,
      isKeyboardDismissDisabled,
    },
    state as OverlayTriggerState,
  );

  return (
    <AnimatePresence>
      {state?.isOpen && (
        <Overlay>
          <div {...underlayProps} className="fixed inset-0 bg-transparent" />

          <div {...popoverProps} ref={popoverRef}>
            {/* <svg
          {...arrowProps}
          className="arrow"
          data-placement={placement}
          viewBox="0 0 12 12"
        >
          <path d="M0 0 L6 6 L12 0" />
        </svg> */}
            <DismissButton onDismiss={state?.close} />
            <motion.div
              {...getContentAnimation(placementFromProps as Placement)}
              transition={{ type: "tween" }}
            >
              <Dialog
                {...overlayProps}
                className={twMerge("bg-white shadow-md", props.className)}
              >
                {props.children}
              </Dialog>
            </motion.div>
            <DismissButton onDismiss={state?.close} />
          </div>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

Popover.Trigger = Trigger;
Popover.Content = Content;

export default Popover;
