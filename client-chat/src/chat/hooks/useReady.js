import React from "react";

function useReady() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
  }, []);

  return ready;
}

export default useReady;
