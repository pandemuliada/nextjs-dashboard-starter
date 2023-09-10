import { OverlayTriggerProps, useOverlayTriggerState } from "react-stately";

const useSheet = (props: OverlayTriggerProps = {}) => {
  const state = useOverlayTriggerState(props);

  return { state };
};

export default useSheet;
