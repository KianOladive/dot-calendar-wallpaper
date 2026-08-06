import {useState} from "react"
import {
  IconCheck,
  IconCopy,
  IconX,
} from "@tabler/icons-react"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton
} from "@/components/ui/input-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Toggle } from "@/components/ui/toggle"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button"
import { colorCombos } from "@goalcal/core"

type Page2Props = {
  setter: (value: "page1" | "page2") => void
  link: string
}

export default function Page2({ setter, link }: Page2Props) {
  const {copied, copy } = useCopyToClipboard()
  return (
    <div className="flex flex-col justify-start gap-5">
      <InputGroup>
        <InputGroupInput value={link} readOnly className="overflow-x-auto whitespace-nowrap" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            onClick={() => {copy(link)}}
          >
            {copied ? <IconCheck /> : <IconCopy />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Separator />
      <div className="pl-6">
        <h1 className="text-xl font-bold mb-2">Add Shortcut</h1>
        <ol className="list-decimal list-inside space-y-1">
          <li>Open the Shortcuts app.</li>
          <li>Add a new shortcut</li>
          <li>Action: "Get Contents of URL"</li>
          <li>Paste the URL above</li>
          <li>Set Wallpaper Photo</li>
        </ol>
      </div>
      <Separator />
      <div className="pl-6">
        <h1 className="text-xl font-bold mb-2">Add Automation</h1>
        <ol className="list-decimal list-inside space-y-1">
          <li>In the Shortcuts app, switch to the Automation tab.</li>
          <li>Go to the Automation tab.</li>
          <li>New Automation</li>
          <li>Time of Day: 6:00 AM</li>
          <li>Repeat "Daily"</li>
          <li>Select "Run Immediately"</li>
          <li>Select newly created shortcut</li>
        </ol>
      </div>
      <Button onClick={() => setter("page1")}>
        <IconX />
      </Button>
    </div>
  )
}
