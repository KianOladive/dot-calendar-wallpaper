import {useState, useEffect} from "react"
import {
  IconMinus,
  IconPlus,
} from "@tabler/icons-react"
import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Field,
  FieldLabel,
  FieldError,
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
import { Switch } from "@/components/ui/switch"
import { Button } from "./ui/button"
import type { GoalForm } from "./Pane"
import { colorCombos, modes, DOT_SIZE, goalQuerySchema, buildSvg, getDotCounts } from "@goalcal/core"

function ClockOverlay() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: false })
  const weekday = now.toLocaleDateString([], { weekday: "short" })
  const monthDay = now.toLocaleDateString([], { month: "short", day: "numeric" })
  const date = `${weekday} ${monthDay}`

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[9%] z-30 flex flex-col items-center leading-none text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
      <span className="text-xl font-semibold">{date}</span>
      <span className="text-8xl font-bold leading-[1.1]">{time}</span>
    </div>
  )
}

type Page1Props = {
  setter: (value: "page1" | "page2") => void
  goalForm: GoalForm,
  setGoalForm: React.Dispatch<React.SetStateAction<GoalForm>>
}

export default function Page1({ setter, goalForm, setGoalForm  }: Page1Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showClock, setShowClock] = useState(false)
  const {
    goal,
    mode,
    color,
    gridPosition,
    layout,
    dotSize,
    startYear,
    startMonth,
    startDay,
    endYear,
    endMonth,
    endDay,
  } = goalForm
  const items = Object.keys(colorCombos)
  const lightnessModes = Object.keys(modes)
  const gridPositions = ["top", "middle", "bottom"]
  const layoutOptions = [
    { value: "1", label: "Separate" },
    { value: "2", label: "Combined" },
  ]
  const hasStartDate = startYear && startMonth && startDay
  const hasEndDate = endYear && endMonth && endDay
  const startDate = hasStartDate ? `${startYear}-${startMonth.padStart(2,"0")}-${startDay.padStart(2,"0")}` : null
  const endDate = hasEndDate ? `${endYear}-${endMonth.padStart(2, "0")}-${endDay.padStart(2, "0")}` : null
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const { dotCount, highlightedDotCount } = getDotCounts(startDate, endDate, timezone)
  const svg = buildSvg({
    mode,
    dotColor: color,
    dotCount: dotCount ?? 80,
    highlighted: highlightedDotCount ?? 40,
    dotSize,
    text: goal || "Japan Trip",
    gridPosition,
    layout,
  })

  function handleInstall() {
    const candidate = {
      text: goal,
      dotColor: color,
      mode: mode,
      gridPosition: gridPosition,
      layout: layout,
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
      <div className="relative w-92 h-200">
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
          alt="Goal"
          className="relative z-20 w-full h-full"
        />
        {showClock && <ClockOverlay />}
      </div>

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

        <Field className="max-w-sm" data-invalid={!!errors.layout}>
          <div className="flex flex-row justify-between">
            <FieldLabel htmlFor="layout">Layout</FieldLabel>
            <Select
              id="layout"
              items={layoutOptions}
              value={String(layout)}
              onValueChange={(v) => setGoalForm(prev => ({...prev, layout: Number(v) as 1 | 2}))}
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select layout"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Layout</SelectLabel>
                  {layoutOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {errors.layout && <FieldError>{errors.layout}</FieldError>}
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

        <Field className="max-w-sm">
          <div className="flex flex-row justify-between items-center">
            <FieldLabel htmlFor="clock-overlay">Add clock overlay</FieldLabel>
            <Switch
              id="clock-overlay"
              checked={showClock}
              onCheckedChange={setShowClock}
              aria-label="Toggle clock overlay"
            />
          </div>
        </Field>

        <Button className="px-7" onClick={handleInstall}>Install</Button>
      </div>
    </div>
  )
}
