import { useState } from "react"
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

export type GoalForm = {
  goal: string,
  mode: string,
  color: string,
  gridPosition: "top" | "middle" | "bottom",
  layout: 1 | 2,
  dotSize: number,
  startYear: string,
  startMonth: string,
  startDay: string,
  endYear: string,
  endMonth: string,
  endDay: string,
}

export default function Pane({title, description} : PaneProps) {
  const [page, setPage] = useState<"page1" | "page2">("page1")
  const [goalForm, setGoalForm] = useState<GoalForm>({
    goal: "",
    mode: "dark1",
    color: "rosewater",
    gridPosition: "middle",
    layout: 1,
    dotSize: 18,
    startYear: "",
    startMonth: "",
    startDay: "",
    endYear: "",
    endMonth: "",
    endDay: "",
  })

  return (
    <Dialog onOpenChangeComplete={() => setPage("page1")}>
      <DialogTrigger render={<Button className="w-full">Use</Button>} />
      <DialogContent className="sm:max-w-4xl flex flex-col gap-10">
        <DialogHeader className="">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {page == "page1" ? <Page1 setter={setPage} goalForm={goalForm} setGoalForm={setGoalForm} /> : <Page2 link={linkMaker(goalForm)} setter={setPage} />}
      </DialogContent>
    </Dialog>
  )
}

function linkMaker(goalForm: GoalForm) {
  const startDate = `${goalForm.startYear}-${goalForm.startMonth.padStart(2,"0")}-${goalForm.startDay.padStart(2,"0")}`
  const endDate = `${goalForm.endYear}-${goalForm.endMonth.padStart(2,"0")}-${goalForm.endDay.padStart(2,"0")}`
  const timezone = encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone)
  return `https://dot-calendar-wallpaper.onrender.com/goal?mode=${goalForm.mode}&dotColor=${goalForm.color}&dotSize=${goalForm.dotSize}&endDate=${endDate}&startDate=${startDate}&layout=${goalForm.layout}&text=${goalForm.goal}&gridPosition=${goalForm.gridPosition}&timezone=${timezone}`
}
