import { lazy, useCallback, ComponentType } from "react";
import { useRecoilState } from "recoil";
import isEqual from "lodash.isequal";
import { v4 as uuidv4 } from "uuid";

import { modalsState, modals } from "./state";
import { ExtendModalProps, UnknownProps } from "./types";

type DynamicImport<P> = () => Promise<{ default: ComponentType<ExtendModalProps<P>> }>;

type OpenModalProps<T> = {
  __modalId: string;
  dynamicImport: DynamicImport<T>;
};

export const createModal = <P>(dynamicImport: DynamicImport<P>) => ({
  dynamicImport,
  __modalId: uuidv4(),
});

export const loadModal = <T>({ __modalId, dynamicImport }: OpenModalProps<T>, props?: T) => {
  modals.set(__modalId, lazy(dynamicImport));

  return { id: __modalId, props: props || {} };
};

export const useShowModal = () => {
  const [storedModals, setModals] = useRecoilState(modalsState);

  return useCallback(
    <T extends UnknownProps>({ id, props }: { id: string; props: T }) => {
      if (storedModals[id] && isEqual(storedModals[id], props)) {
        return;
      }

      setModals((prevModals) => ({
        ...prevModals,
        [id]: props,
      }));
    },
    [storedModals],
  );
};
