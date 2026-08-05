import {useState} from "react"
import {
  IconCheck,
  IconMinus,
  IconPlus,
  IconSun,
  IconMoon
} from "@tabler/icons-react"
import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field"
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
import type { GoalForm } from "./Pane"
import { colorCombos, modes, DOT_SIZE, goalQuerySchema, buildSvg, getDotCounts } from "@goalcal/core"

type Page1Props = {
  setter: (value: "page1" | "page2") => void
  goalForm: GoalForm,
  setGoalForm: React.Dispatch<React.SetStateAction<GoalForm>>
}

export default function Page1({ setter, goalForm, setGoalForm  }: Page1Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const {
    goal,
    mode,
    color,
    gridPosition,
    dotSize,
    startYear,
    startMonth,
    startDay,
    endYear,
    endMonth,
    endDay,
  } = goalForm
  // const [goal, setGoal] = useState<string>("")
  // const [mode, setMode] = useState<string>("dark1")
  // const [color, setColor] = useState<string>("rosewater")
  // const [gridPosition, setGridPosition] = useState<"top" | "middle" | "bottom">("middle")
  // const [dotSize, setDotSize] = useState<number>(18)
  // const [startYear, setStartYear] = useState<string>("")
  // const [startMonth, setStartMonth] = useState<string>("")
  // const [startDay, setStartDay] = useState<string>("")
  // const [endYear, setEndYear] = useState<string>("")
  // const [endMonth, setEndMonth] = useState<string>("")
  // const [endDay, setEndDay] = useState<string>("")
  const items = Object.keys(colorCombos)
  const lightnessModes = Object.keys(modes)
  const gridPositions = ["top", "middle", "bottom"]
  const hasStartDate = startYear && startMonth && startDay
  const hasEndDate = endYear && endMonth && endDay
  const startDate = hasStartDate ? `${startYear}-${startMonth.padStart(2,"0")}-${startDay.padStart(2,"0")}` : null
  const endDate = hasEndDate ? `${endYear}-${endMonth.padStart(2, "0")}-${endDay.padStart(2, "0")}` : null
  const { dotCount, highlightedDotCount } = getDotCounts(startDate, endDate)
  const svg = buildSvg({
    mode,
    dotColor: color,
    dotCount: dotCount ?? 80,
    highlighted: highlightedDotCount ?? 40,
    dotSize,
    text: goal || "Japan Trip",
    position: "top",
    gridPosition,
  })

  function handleInstall() {
    const candidate = {
      text: goal,
      dotColor: color,
      mode: mode,
      gridPosition: gridPosition,
      dotSize: dotSize,
      startDate: startDate,
      endDate: endDate,
    }
    const result = goalQuerySchema.safeParse(candidate)
    if (!result.success) {
      const errs: Record<string,string> = {}
      for (const i of result.error.issues) errs[String(i.path[0])] = i.message
      setErrors(errs)
      return
    }
    setErrors({})
    setter("page2")
  }

  return (
    <div className="flex flex-row justify-center items-center gap-10">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
        alt="Goal"
        className="relative z-20 w-92 h-200"
      />

      <div className="flex flex-col gap-4 items-center">
        <Field className="max-w-sm" data-invalid={!!errors.text}>
          <FieldLabel htmlFor="goal-name">Goal</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="goal-name"
              placeholder="e.g. Japan Trip"
              value={goal}
              onChange={e => setGoalForm(prev => ({...prev, goal: e.target.value}))}
            />
          </InputGroup>
          {errors.text && <FieldError>{errors.text}</FieldError>}
        </Field>

        <Field className="max-w-sm" data-invalid={!!errors.startDate}>
          <FieldLabel htmlFor="start-year">Start Date</FieldLabel>
          <div className="flex items-center gap-2">
            <InputGroup>
              <InputGroupInput
                id="start-year"
                placeholder="YYYY"
                maxLength={4}
                value={startYear}
                onChange={e => setGoalForm(prev => ({...prev, startYear: e.target.value}))}
              />
            </InputGroup>
            -
            <InputGroup>
              <InputGroupInput
                id="start-month"
                placeholder="MM"
                maxLength={2}
                value={startMonth}
                onChange={e => setGoalForm(prev => ({...prev, startMonth: e.target.value}))}
              />
            </InputGroup>
            -
            <InputGroup>
              <InputGroupInput
                id="start-day"
                placeholder="DD"
                maxLength={2}
                value={startDay}
                onChange={e => setGoalForm(prev => ({...prev, startDay: e.target.value}))}
              />
            </InputGroup>
          </div>
          {errors.startDate && <FieldError>{errors.startDate}</FieldError>}
        </Field>

        <Field className="max-w-sm" data-invalid={!!errors.endDate}>
          <FieldLabel htmlFor="end-year">End Date</FieldLabel>
          <div className="flex items-center gap-2">
            <InputGroup>
              <InputGroupInput
                id="end-year"
                placeholder="YYYY"
                maxLength={4}
                value={endYear}
                onChange={e => setGoalForm(prev => ({...prev, endYear: e.target.value}))}
              />
            </InputGroup>
            -
            <InputGroup>
              <InputGroupInput
                id="end-month"
                placeholder="MM"
                maxLength={2}
                value={endMonth}
                onChange={e => setGoalForm(prev => ({...prev, endMonth: e.target.value}))}
              />
            </InputGroup>
            -
            <InputGroup>
              <InputGroupInput
                id="end-day"
                placeholder="DD"
                maxLength={2}
                value={endDay}
                onChange={e => setGoalForm(prev => ({...prev, endDay: e.target.value}))}
              />
            </InputGroup>
          </div>
          {errors.endDate && <FieldError>{errors.endDate}</FieldError>}
        </Field>

        <Field className="max-w-sm" data-invalid={!!errors.mode}>
          <div className="flex flex-row justify-between">
            <FieldLabel htmlFor="mode">Mode</FieldLabel>
            <Select
              id="mode"
              items={lightnessModes}
              value={mode}
              onValueChange={(v) => setGoalForm(prev => ({...prev, mode: v ?? ""}))}
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue className="capitalize" placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mode</SelectLabel>
                  {lightnessModes.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <span
                          className="inline-block size-3 rounded-full"
                          style={{ backgroundColor: modes[item].bg}}
                        />
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {errors.mode && <FieldError>{errors.mode}</FieldError>}
        </Field>

        <Field className="max-w-sm" data-invalid={!!errors.dotColor}>
          <div className="flex flex-row justify-between">
            <FieldLabel htmlFor="color">Color</FieldLabel>
            <Select
              id="color"
              items={items}
              value={color}
              onValueChange={(v) => setGoalForm(prev => ({...prev, color: v ?? ""}))}
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue className="capitalize" placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Color</SelectLabel>
                  {items.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <span
                          className="inline-block size-3 rounded-full"
                          style={{ backgroundColor: mode.startsWith("dark") ? colorCombos[item].light : colorCombos[item].dark}}
                        />
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {errors.dotColor && <FieldError>{errors.dotColor}</FieldError>}
        </Field>

        <Field className="max-w-sm" data-invalid={!!errors.gridPosition}>
          <div className="flex flex-row justify-between">
            <FieldLabel htmlFor="grid-position">Grid Position</FieldLabel>
            <Select
              id="grid-position"
              items={gridPositions}
              value={gridPosition}
              onValueChange={(v) => setGoalForm(prev => ({...prev, gridPosition: v ?? "middle"}))}
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue className="capitalize" placeholder="Select position"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Grid Position</SelectLabel>
                  {gridPositions.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {errors.gridPosition && <FieldError>{errors.gridPosition}</FieldError>}
        </Field>

        <Field className="max-w-sm flex-row items-center justify-between" data-invalid={!!errors.dotSize}>
          <FieldLabel htmlFor="dot-size">Dot Size</FieldLabel>
          <div className="flex items-center gap-2 justify-end">
            <Button
              disabled={dotSize <= DOT_SIZE.min}
              variant="outline"
              size="icon" aria-label="Decrease"
              onClick={() => setGoalForm(prev => ({...prev, dotSize: prev.dotSize - 1}))}
            >
              <IconMinus />
            </Button>
            <span className="w-5 flex justify-center select-none">
              {dotSize}
            </span>
            <Button
              disabled={dotSize >= DOT_SIZE.max}
              variant="outline"
              size="icon"
              aria-label="Increase"
              onClick={() => setGoalForm(prev => ({...prev, dotSize: prev.dotSize + 1}))}
            >
              <IconPlus />
            </Button>
          </div>
          {errors.dotSize && <FieldError>{errors.dotSize}</FieldError>}
        </Field>

        <Button className="px-7" onClick={handleInstall}>Install</Button>
      </div>
    </div>
  )
}
