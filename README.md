# recoil-modals

An npm package that helps to dynamically manage modals using recoil and lazy loading.

### Setting up

First install by:

```sh
----------------------------
npm install -D recoil-modals
----------------------------
```

### Suggested modal structure:

#### index.tsx
The `createModal` function is imported from `recoil-modals` and is used to create a new modal.
It takes a generic `PureProps` type that defines the props that will be passed to the modal component.
The `createModal` function takes a callback function that dynamically imports the modal component.

```ts
import { createModal, loadModal } from "recoil-modals/dist/tools";
import { PureProps } from "./types";

const modal = createModal<PureProps>(
  () => import("./modal" /* webpackChunkName: "DeleteModal" */),
);

export const openDeleteModal = (props: PureProps) => loadModal(modal, props);
```

#### modals.tsx

The file should contain the code for your modal window, `props` will be those that you pass to the `loadModal` function,
also by default, props will contain a function for closing the modal window `onClose`

```ts
import React from "react";
import { Dialog } from "@mui/material";

import { Props } from "./types";

const DeleteModal = ({ onClose, ...ownProps }: Props) => (
  <Dialog onClose={onClose} {...otherProps}>
    ...someContent
  </Dialog>
);

export default DeleteModal;
```

#### types.ts

The file should contain the code for your modal window, `props` will be those that you pass to the `loadModal` function,
also by default, props will contain a function for closing the modal window `onClose`.

```ts
import { ExtendModalProps } from "recoil-modals/dist/types";

export type PureProps = {
  onDelete(): void;
  entity: string;
};

export type Props = ExtendModalProps<PureProps>;

// ^?

/* {
  onClose(): void;
  onDelete(): void;
  entity: string;
} */
```

### ModalProvider Usage:

In your main file needs to place `ModalProvider` beetween `RecoilRoot` and your `main` component

```ts
import { RecoilRoot } from "recoil";
import { ModalProvider } from "recoil-modals/dist/provider";

<RecoilRoot>
  <ModalProvider>
     <App />
  </ModalProvider>
</RecoilRoot>
```

`ModalProvider` props:

| Name         | Type                                 | Default value                             | Description                                                                                                                                                                                                                                                                                                                   |
|--------------|--------------------------------------|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fallback`   | `React.ReactNode`                    | `<></>`                                   | It needs for `Suspense` fallback.                                                                                                                                                                            |
| `container`  | `Element` or `DocumentFragment`      | `document.querySelector("body")`          | It needs for create a portal in that place.                                                                                                                                                                                                                                                                                |
| `Wrapper`    | `ComponentType<PropsWithChildren>`   | `React.Fragment`                          | It needs to wrap a `children`.                                                                                                                                                                                                                                                                                        |

### useShowModal Usage:

Use `useShowModal` that returns `showModal`. Needs to it call with `open` func - the modal created before and modal will be showed.

```ts
import { useShowModal } from "recoil-modals/dist/tools";
import { openDeleteModal } from "./modals/DeleteModal"; // import modal from `index.tsx` created above

const Component = () => {
  const showModal = useShowModal();

  const onDelete = useCallback(() => showModal(
    openDeleteModal({
      onDelete: () => {},
      entity: "user",
    }),
  ), []);
};
```

## License

[MIT](./LICENSE)
