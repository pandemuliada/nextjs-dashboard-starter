import { useOverlayTrigger } from "react-aria";
import { OverlayTriggerProps, useOverlayTriggerState } from "react-stately";

const useSheet = (props: OverlayTriggerProps = {}) => {
  const state = useOverlayTriggerState(props);
  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
  );

  return { state, id: overlayProps.id, triggerProps };
};

export default useSheet;
