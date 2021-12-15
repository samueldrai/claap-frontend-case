import {
  Box,
  Flex,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  Wrap,
} from "@chakra-ui/react"
import { KeyboardEvent, useEffect, useState } from "react"
import { ComboBoxProps } from "../../../types"
import { ComboBoxPopoverButton } from "./ComboBoxPopoverButton"
import { ComboBoxTags } from "./ComboBoxTags"
import { isEmptyArray } from "./logic"

export const ComboBox = ({
  values,
  setValues,
  searchCallback,
  allowDuplicates = false,
  onPopoverButtonClick = () => "",
  validateQueryCallback = () => true,
}: ComboBoxProps) => {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<any[] | null>(null)

  const onClick = (...args: any) => {
    onPopoverButtonClick(...args)
    setQuery("")
  }

  const removeTag = (id: string) => setValues(p => p.filter(t => t.id !== id))

  const handleInputEvents = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (query !== "" && validateQueryCallback(query)) {
          onClick(query)
        }
        return
      case "Backspace":
        if (!query && values.length > 0) setValues(p => p.slice(0, -1))
        return
      default:
        return
    }
  }

  useEffect(() => {
    const fetchResults = async () => {
      const r = await searchCallback(query)
      setResult(r)
    }
    fetchResults()
  }, [query])

  useEffect(() => {
    query === "" && setResult(null)
  }, [query])

  return (
    <Popover
      matchWidth
      closeOnBlur
      isOpen={!!query}
      autoFocus={false}
      placement="bottom-start"
      onClose={() => setQuery("")}
    >
      <PopoverTrigger>
        <Box p={4} bg="brand.darkGray" rounded="lg">
          <Wrap className="items-center">
            <ComboBoxTags values={values} removeTag={removeTag} />
            <Flex grow={1}>
              <Input
                autoFocus
                size="sm"
                value={query}
                variant="unstyled"
                onKeyDown={handleInputEvents}
                placeholder="Teammate email or name..."
                onChange={e => setQuery(e.target.value)}
              />
              <PopoverContent
                bg="brand.darkGray"
                border="transparent"
                textColor="brand.lightGray"
              >
                <PopoverBody>
                  {result === null && <Spinner />}
                  {isEmptyArray(result) && !validateQueryCallback(query) && (
                    <Text as="span" fontSize="sm">
                      Invalid email
                    </Text>
                  )}
                  {isEmptyArray(result) && validateQueryCallback(query) && (
                    <ComboBoxPopoverButton
                      key={query}
                      label={query}
                      onClick={() => onClick(query)}
                    />
                  )}
                  {result?.map(r => (
                    <ComboBoxPopoverButton
                      key={r?.id}
                      label={r?.email}
                      isDisabled={
                        !allowDuplicates && !!values.find(v => v?.id === r?.id)
                      }
                      onClick={() => onClick(r)}
                    />
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Flex>
          </Wrap>
        </Box>
      </PopoverTrigger>
    </Popover>
  )
}
