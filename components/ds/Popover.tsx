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
      shouldUpdatePosition: true,
      isKeyboardDismissDisabled,
    },
    state as OverlayTriggerState,
  );

  if (!state?.isOpen) return null;

  return (
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
        <Dialog
          {...overlayProps}
          className={twMerge("bg-white shadow-md", props.className)}
        >
          {props.children}
        </Dialog>
        <DismissButton onDismiss={state?.close} />
      </div>
    </Overlay>
  );
};

Popover.Trigger = Trigger;
Popover.Content = Content;

export default Popover;
