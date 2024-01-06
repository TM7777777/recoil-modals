import { ExtendModalProps } from "../src/types";

export type PureProps = {
  onDelete(): void;
  entity: string;
};

export type Props = ExtendModalProps<PureProps>;
