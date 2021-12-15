import { atom } from "recoil"
import { ComboBoxItem } from "../../types"

export const inviteTeammatesModalState = atom({
  key: "inviteTeammatesModalState",
  default: false,
})

export const inviteListState = atom<ComboBoxItem[]>({
  key: "inviteListState",
  default: [],
})
