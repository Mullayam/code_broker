import React, { useState } from "react";
export function DialogActions() {
  const [newFileModal, setNewFileModal] = useState(false);
  const DialogContext = React.createContext({
    FILE: {
      newFileModal,
      setNewFileModal,
    },
  });
}
