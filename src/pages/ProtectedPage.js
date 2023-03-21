import React from "react";
import { useLocation } from "react-router-dom";
import { isProtected } from "../helpers/isProtected";
const ProtectedPage = () => {
  const user = location.state?.username;
  const { roomId } = React.useParams();
  const reactNavigator = React.useNavigate();
  const location = useLocation();
  const CheckRoom = async function () {
    const result = await isProtected(roomId);
    if (result.status == "false") {
      return;
    } else {
      // return <reactNavigator to="/editor/" state={(roomId, user)} />;
    }
  };
  CheckRoom();
  // setPasswordFieldOpen(true);
  // return toast.error(result.message);
  return <div></div>;
};

export default ProtectedPage;
