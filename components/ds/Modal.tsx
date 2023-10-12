import { ReactNode, cloneElement, useMemo, useRef, useState } from "react";
import {
  AriaDialogProps,
  Overlay,
  useDialog,
  useModalOverlay,
} from "react-aria";
import { OverlayTriggerState, useOverlayTriggerState } from "react-stately";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

type IModalProps = {
  children?: any;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  state: OverlayTriggerState;
  id?: string;
  [x: string]: any;
};

const Modal = ({
  state,
  children,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  id,
}: IModalProps) => {
  let ref = useRef<HTMLDivElement>(null);
  let containerRef = useRef<HTMLDivElement>(null);
  let { modalProps, underlayProps } = useModalOverlay(
    { isDismissable, isKeyboardDismissDisabled },
    state,
    ref,
  );

  return (
    <AnimatePresence>
      {state.isOpen && (
        <Overlay>
          <div
            className="fixed inset-0 z-[100]"
            {...underlayProps}
            ref={containerRef}
          >
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div {...modalProps} ref={ref}>
                {cloneElement(children, {
                  id,
                  isOpen: state.isOpen,
                  isKeyboardDismissDisabled,
                  isDismissable,
                  state,
                })}
              </div>
            </motion.div>
          </div>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

interface IModalContentProps extends AriaDialogProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  isOpen?: boolean;
  state?: OverlayTriggerState;
  centered?: boolean;
  noCloseButton?: boolean;
}

const Content = (props: IModalContentProps) => {
  const {
    className,
    title,
    children,
    state,
    centered = false,
    noCloseButton = false,
  } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  let { dialogProps, titleProps } = useDialog(props, contentRef);

  const formattedClassName = twMerge(
    "relative bg-white max-w-[350px] w-full",
    className,
  );

  const isScrollable = useMemo(() => {
    return (contentRef.current?.clientHeight || 0) > window.innerHeight;

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [contentRef.current?.clientHeight, window.innerHeight]);

  return (
    <div
      {...dialogProps}
      ref={contentRef}
      className={twMerge(
        "absolute w-max left-1/2 -translate-x-1/2 outline-none mt-16 pb-16",
        centered && !isScrollable && "top-1/2 -translate-y-1/2 mt-0 pb-0",
      )}
    >
      <motion.div
        className={formattedClassName}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "tween" }}
      >
        {title && (
          <>
            <h2 className="text-2xl font-medium" {...titleProps}>
              {title}
            </h2>
          </>
        )}

        {!noCloseButton && (
          <button
            className="absolute top-5 right-5 text-xl"
            onClick={() => state?.close()}
          >
            <IoClose />
          </button>
        )}

        {children}
      </motion.div>
    </div>
  );
};

export const useModal = (props: any = {}) => {
  const state = useOverlayTriggerState(props);
  const [payload, setPayload] = useState<any>(null);

  const open = (payload: any) => {
    if (payload) {
      setPayload(payload);
      state.open();
    } else {
      state.open();
    }
  };

  const close = () => {
    state.close();
    setPayload(null);
  };

  return { ...state, open, close, payload, setPayload };
};

Modal.Content = Content;

export default Modal;
