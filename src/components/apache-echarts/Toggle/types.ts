export const ToggleLayout = {
  DEFAULT: 'default',
  LABELS: 'labels'
} as const satisfies Record<string, string>;

export type ToggleLayoutKeys = keyof typeof ToggleLayout;
export type ToggleLayouts = (typeof ToggleLayout)[ToggleLayoutKeys];

export interface ToggleProps {
  id?: string;
  layout?: ToggleLayouts;
  checked: boolean;
  label?: string | string[];
}
