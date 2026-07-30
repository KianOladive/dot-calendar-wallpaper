import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Page1 from "./Page1"
import Page2 from "./Page2"

type PaneProps = {
  title: string,
  description: string,
}

export default function Pane({title, description} : PaneProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button className="w-full">Use</Button>} />
      <DialogContent className="sm:max-w-4xl h-256 flex flex-col gap-10">
        <DialogHeader className="">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <Page1 />
      </DialogContent>
    </Dialog>
  )
}
