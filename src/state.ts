import { ComponentType } from "react";
import { atom } from "recoil";

import { UnknownProps } from "./types";

export const modals = new Map<string, ComponentType<any>>();

export const modalsState = atom<Record<string, UnknownProps>>({
  key: "recoilModals",
  default: {},
});
