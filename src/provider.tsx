import React, {
  memo,
  createElement,
  Fragment,
  Suspense,
  SuspenseProps,
  PropsWithChildren,
  ComponentType,
} from "react";
import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";

import { modalsState, modals } from "./state";

const defaultContainer = document.querySelector("body")!;

interface Props {
  fallback?: SuspenseProps["fallback"];
  container?: Element | DocumentFragment;
  Wrapper?: ComponentType<PropsWithChildren>;
}

const PureModalProvider = ({
  children,
  fallback = <></>,
  container = defaultContainer,
  Wrapper = Fragment,
}: PropsWithChildren<Props>) => {
  const [storedModals, setModals] = useRecoilState(modalsState);

  const _modals = Object.entries(storedModals).map(([id, props]) => {
    const Component = modals.get(id);

    if (Component) {
      return createElement(Component, {
        key: id,
        displayName: `Modal-${Component.displayName || "-"}${id}`,
        ...props,
        onClose: () =>
          setModals((modals) => {
            const { [id]: closedModal, ...restModals } = modals;

            return restModals;
          }),
      });
    }
  });

  return (
    <Wrapper>
      {children}
      {createPortal(<Suspense fallback={fallback}>{_modals}</Suspense>, container)}
    </Wrapper>
  );
};

export const ModalProvider = memo(PureModalProvider);
