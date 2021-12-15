import { Button, Center, Icon, Tag, Text, VStack } from "@chakra-ui/react"
import { MailIcon, UserIcon } from "@heroicons/react/solid"
import { useRecoilState, useSetRecoilState } from "recoil"
import { InviteTeammatesModal } from "./components"
import { inviteListState, inviteTeammatesModalState } from "./store"

export default function App() {
  const setModal = useSetRecoilState(inviteTeammatesModalState)
  const [inviteList, setInviteList] = useRecoilState(inviteListState)

  return (
    <>
      <Center py={32} bg="brand.darkBlue" minH="100vh">
        <VStack gap={4}>
          <Button
            size="lg"
            rounded="xl"
            bg="brand.blue"
            textColor="white"
            _hover={{ bg: "brand.blue" }}
            onClick={() => setModal(true)}
          >
            Invite teammates
          </Button>
          <VStack bg="brand.darkGray" py={4} px={2} rounded="lg">
            {inviteList.map(invitee => (
              <Tag
                size="lg"
                width="full"
                fontSize="sm"
                bg="transparent"
                textColor="brand.lightGray"
              >
                <Icon
                  w="1rem"
                  h="1rem"
                  mr="0.5rem"
                  as={invitee.isUser ? UserIcon : MailIcon}
                />
                {invitee.label}
              </Tag>
            ))}
            {!inviteList.length && (
              <VStack
                px={2}
                as="span"
                fontSize="sm"
                fontWeight="medium"
                textColor="brand.lightGray"
              >
                <Text as="span">No pending invitations.</Text>
                <Text as="span">Invite your teammates to Claap &#128521;</Text>
              </VStack>
            )}
          </VStack>
          <Button
            mt="32px"
            size="sm"
            rounded="lg"
            colorScheme="gray"
            variant="unstyled"
            textColor="brand.lightGray"
            hidden={!inviteList.length}
            onClick={() => setInviteList([])}
          >
            Clear invite list
          </Button>
        </VStack>
      </Center>
      <InviteTeammatesModal />
    </>
  )
}
