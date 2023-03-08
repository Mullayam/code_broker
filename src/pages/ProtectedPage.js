import React from "react";
import { useLocation } from "react-router-dom";
import { EnterPassword } from "../dialogs";

const ProtectedPage = () => {
  const [passwordFieldOpen, setPasswordFieldOpen] = React.useState(true);
  const location = useLocation();
  const roomId = location.state.roomId;
  // setPasswordFieldOpen(true);
  // return toast.error(result.message);
  return (
    <div>
      ProtectedPage
      <EnterPassword
        open={passwordFieldOpen}
        setOpen={setPasswordFieldOpen}
        clientRoomId={roomId}
      />
    </div>
  );
};

export default ProtectedPage;
