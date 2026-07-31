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
import { colorCombos, modes, DOT_SIZE, goalQuerySchema } from "@goalcal/core"

export default function Page1() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [goal, setGoal] = useState<string>("")
  const [mode, setMode] = useState<string>("dark1")
  const [color, setColor] = useState<string>("rosewater")
  const [gridPosition, setGridPosition] = useState<string>("middle")
  const [dotSize, setDotSize] = useState<number>(18)
  const items = Object.keys(colorCombos)
  const lightnessModes = Object.keys(modes)
  const gridPositions = ["top", "middle", "bottom"]

  function handleInstall() {
    const candidate = {
      text: goal,
      dotColor: color,
      mode: mode,
      gridPosition: gridPosition,
      dotSize: dotSize,
      // startDate: `${sY}-${sM.padStart(2,"0")}-${sD.padStart(2,"0")}`,
      // endDate:   `${eY}-${eM.padStart(2,"0")}-${eD.padStart(2,"0")}`,
    }
    const result = goalQuerySchema.safeParse(candidate)
    if (!result.success) {
      const errs: Record<string,string> = {}
      for (const i of result.error.issues) errs[String(i.path[0])] = i.message
      setErrors(errs)
      return
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Goal"
        className="relative z-20 w-50 h-90 brightness-60 grayscale dark:brightness-40"
      />

      <Field className="max-w-sm" data-invalid={!!errors.text}>
        <FieldLabel htmlFor="goal-name">Goal</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="goal-name"
            placeholder="e.g. Japan Trip"
            value={goal}
            onChange={e => setGoal(e.target.value)}
          />
        </InputGroup>
        {errors.text && <FieldError>{errors.text}</FieldError>}
      </Field>

      <Field className="max-w-sm">
        <FieldLabel htmlFor="start-year">Start Date</FieldLabel>
        <div className="flex items-center gap-2">
          <InputGroup>
            <InputGroupInput id="start-year" placeholder="YYYY" />
          </InputGroup>
          -
          <InputGroup>
            <InputGroupInput id="start-month" placeholder="MM" />
          </InputGroup>
          -
          <InputGroup>
            <InputGroupInput id="start-day" placeholder="DD" />
          </InputGroup>
        </div>
      </Field>

      <Field className="max-w-sm">
        <FieldLabel htmlFor="end-year">End Date</FieldLabel>
        <div className="flex items-center gap-2">
          <InputGroup>
            <InputGroupInput id="end-year" placeholder="YYYY" />
          </InputGroup>
          -
          <InputGroup>
            <InputGroupInput id="end-month" placeholder="MM" />
          </InputGroup>
          -
          <InputGroup>
            <InputGroupInput id="end-day" placeholder="DD" />
          </InputGroup>
        </div>
      </Field>

      <Field className="max-w-sm" data-invalid={!!errors.mode}>
        <div className="flex flex-row justify-between">
          <FieldLabel htmlFor="mode">Mode</FieldLabel>
          <Select
            id="mode"
            items={lightnessModes}
            value={mode}
            onValueChange={(v) => setMode(v ?? "")}
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
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {errors.mode && <FieldError>{errors.mode}</FieldError>}
      </Field>

      <Field className="max-w-sm flex-row" data-invalid={!!errors.dotColor}>
        <FieldLabel htmlFor="color">Color</FieldLabel>
        <Select
          id="color"
          items={items}
          value={color}
          onValueChange={(v) => setColor(v ?? "")}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue className="capitalize" placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Color</SelectLabel>
              {items.map((item) => (
                <SelectItem key={item} value={item}>
                  <IconCheck />
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.dotColor && <FieldError>{errors.dotColor}</FieldError>}
      </Field>

      <Field className="max-w-sm flex-row" data-invalid={!!errors.gridPosition}>
        <FieldLabel htmlFor="grid-position">Grid Position</FieldLabel>
        <Select
          id="grid-position"
          items={gridPositions}
          value={gridPosition}
          onValueChange={(v) => setGridPosition(v ?? "")}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue className="capitalize" placeholder="Select position"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Grid Position</SelectLabel>
              {gridPositions.map((item) => (
                <SelectItem key={item} value={item}>
                  <IconCheck />
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.gridPosition && <FieldError>{errors.gridPosition}</FieldError>}
      </Field>

      <Field className="max-w-sm flex-row items-center justify-between" data-invalid={!!errors.dotSize}>
        <FieldLabel htmlFor="dot-size">Dot Size</FieldLabel>
        <div className="flex items-center gap-2 justify-end">
          <Button
            disabled={dotSize <= DOT_SIZE.min}
            variant="outline"
            size="icon" aria-label="Decrease"
            onClick={() => setDotSize(prev => prev - 1)}
          >
            <IconMinus />
          </Button>
          <span className="w-5 flex justify-center">
            {dotSize}
          </span>
          <Button
            disabled={dotSize >= DOT_SIZE.max}
            variant="outline"
            size="icon"
            aria-label="Increase"
            onClick={() => setDotSize(prev => prev + 1)}
          >
            <IconPlus />
          </Button>
        </div>
        {errors.dotSize && <FieldError>{errors.dotSize}</FieldError>}
      </Field>

      <Button className="px-7" onClick={handleInstall}>Install</Button>
    </div>
  )
}
