import React from "react";

const useUnmountRef = () => {
  const unmountRef = React.useRef(false);

  React.useEffect(() => {
    return () => {
      unmountRef.current = true;
    };
  }, []);

  return unmountRef;
};

export default useUnmountRef;
