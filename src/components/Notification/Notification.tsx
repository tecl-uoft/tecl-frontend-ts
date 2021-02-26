import React from "react";
import { Toaster, toast } from "react-hot-toast";

function Notification() {
  return <Toaster />;
}
export const notify = toast;

export default Notification;
