import { Icon, Tag, TagCloseButton, TagLabel, WrapItem } from "@chakra-ui/react"
import { MailIcon, UserIcon } from "@heroicons/react/solid"
import { ComboBoxTagsProps } from "../../../../types"

export const ComboBoxTags = ({ values, removeTag }: ComboBoxTagsProps) => {
  return (
    <>
      {values.map(val => (
        <WrapItem key={val.id}>
          <Tag bg="transparent" textColor={"brand.red"}>
            <Icon
              w="1rem"
              h="1rem"
              mr="0.5rem"
              as={val.isUser ? UserIcon : MailIcon}
            />
            <TagLabel>{val.label}</TagLabel>
            <TagCloseButton onClick={() => removeTag(val.id)} />
          </Tag>
        </WrapItem>
      ))}
    </>
  )
}
