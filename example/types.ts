import { ExtendModalProps } from "../dist/types";

export type PureProps = {
  onDelete(): void;
  entity: string;
};

export type Props = ExtendModalProps<PureProps>;
