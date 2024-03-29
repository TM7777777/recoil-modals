import { createModal, loadModal } from "../dist/tools";
import { PureProps } from "./types";

const modal = createModal<PureProps>(
  () => import("./modal" /* webpackChunkName: "DeleteModal" */),
);

export const openDeleteModal = (props: PureProps) => loadModal(modal, props);