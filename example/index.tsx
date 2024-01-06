import { createModal, loadModal } from "../src/tools";
import { PureProps } from "./types";

const modal = createModal<PureProps>(
  () => import("./modal" /* webpackChunkName: "DeleteModal" */),
);

export const openDeleteModal = (props: PureProps) => loadModal(modal, props);