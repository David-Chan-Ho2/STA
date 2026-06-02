import { useState } from "react";

const useRemember = () => {
  const [remember, setRemember] = useState(false);
  const onRemember = () => setRemember(!remember);

  return { remember, onRemember };
};

export default useRemember;
