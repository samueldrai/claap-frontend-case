import { Button } from "@chakra-ui/react"
import { ComboBoxPopoverButtonProps } from "../../../../types"

export const ComboBoxPopoverButton = ({
  key,
  label,
  onClick,
  isDisabled,
}: ComboBoxPopoverButtonProps) => {
  return (
    <Button
      size="sm"
      key={key}
      isFullWidth
      onClick={onClick}
      bg="brand.darkGray"
      isDisabled={isDisabled}
      _hover={{ bg: "brand.darkBlue" }}
    >
      {label}
    </Button>
  )
}
