import React from "react";

import { Props } from "./types";

const Dialog = ({ children, onClose }) => <div onClick={onClose}>{children}</div>;

const DeleteModal = ({ onClose, ...ownProps }: Props) => (
  <Dialog onClose={onClose}>...someContent</Dialog>
);

export default DeleteModal;
