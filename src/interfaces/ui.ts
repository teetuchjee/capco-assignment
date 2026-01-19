import { TOGGLE_VIEW_OPTION } from '@/constants/enum'

export type ToggleViewOption = (typeof TOGGLE_VIEW_OPTION)[keyof typeof TOGGLE_VIEW_OPTION]
export type ToggleOption = {
  value: ToggleViewOption
  icon: React.ElementType
  dataTestId: string
}
