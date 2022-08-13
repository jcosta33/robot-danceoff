export type Resolve<T> = (resolve: T) => void;

export interface IParams {
  id?: number;
  page?: number;
  page_size?: number;
}

export interface Popup {
  id?: string;
  type: "warning" | "danger" | "info" | "success" | "primary";
  message: string;
  autohide: boolean;
  onClose?: any;
}
