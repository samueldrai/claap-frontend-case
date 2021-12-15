import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { ComboBoxItem } from "../../../types"
import { ComboBox } from "../../components"
import { inviteListState, inviteTeammatesModalState } from "../../store"
import { generateNewComboBoxItem, searchUser, validateEmail } from "../../utils"

export const InviteTeammatesModal = () => {
  const [invitees, setInvitees] = useState<ComboBoxItem[]>([])
  const [isOpen, setOpen] = useRecoilState(inviteTeammatesModalState)
  const setInviteList = useSetRecoilState(inviteListState)

  const closeModal = () => {
    setOpen(false)
    setInvitees([])
  }

  const handleSubmit = () => {
    setInviteList(invitees)
    closeModal()
  }

  const onClick = (data: any) => {
    const isUser = data?.firstName
    if (isUser) {
      const newItem = { id: data.id, label: data.firstName, isUser: true }
      setInvitees(p => [...p, newItem])
      return
    }
    setInvitees(p => [...p, generateNewComboBoxItem(data)])
  }

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent backgroundColor="brand.darkBlue" textColor="white" p="64px">
        <ModalHeader
          fontSize="24px"
          mt={-8}
          textAlign="center"
          textColor="brand.lightGray"
        >
          Invite members
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text as="h3" fontSize="15px" mb="8px" textColor="brand.lightGray">
            Email invite
          </Text>
          <Text as="p" fontSize="15px" mb="24px" textColor="brand.mediumGray">
            Send members an email invitation to join this workspace
          </Text>
          <HStack mt={8} gap="16px">
            <Box w="90%">
              <ComboBox
                values={invitees}
                setValues={setInvitees}
                searchCallback={searchUser}
                onPopoverButtonClick={onClick}
                validateQueryCallback={validateEmail}
              />
            </Box>
            <Button
              size="lg"
              rounded="xl"
              bg="brand.blue"
              onClick={handleSubmit}
              isDisabled={!invitees.length}
              _hover={{ bg: "brand.blue" }}
            >
              Invite
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
