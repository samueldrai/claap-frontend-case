import { Dispatch, SetStateAction } from "react"

export interface User {
  id: string
  email: string
  lastName: string
  firstName: string
}

export interface ComboBoxItem {
  id: string
  label: string
  [x: string]: any
}

export interface ComboBoxTagsProps {
  values: ComboBoxItem[]
  removeTag: (id: string) => void
}

export interface ComboBoxProps {
  values: ComboBoxItem[]
  allowDuplicates?: boolean
  setValues: Dispatch<SetStateAction<ComboBoxItem[]>>
  searchCallback: (...args: any) => Promise<any[]>
  validateQueryCallback?: (...args: any) => boolean
  onPopoverButtonClick?: (...args: any) => void
}

export interface ComboBoxPopoverButtonProps {
  key: string
  label: string
  onClick?: () => void
  isDisabled?: boolean
}
