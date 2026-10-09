export interface ButtonToggle {
  label?: string;
  value: string;
  disabled?: boolean;
}

export type ButtonToggleChange = (_value: string) => void;

export interface ButtonsToggleProps {
  name: string;
  selected?: string;
  disabled?: boolean;
  list: ButtonToggle[];
  onchange?: ButtonToggleChange;
}

export const DEFAULT_BUTTON_TOGGLE_CHANGE = () => undefined;
