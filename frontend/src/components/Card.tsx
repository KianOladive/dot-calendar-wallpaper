import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Pane from  "./Pane"

export function CardImage() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Goal"
        className="relative z-20 w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardTitle>Goal</CardTitle>
        <CardDescription>Countdown to a goal you set.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Pane
          title="Goal"
          description="One dot per day until your deadline. Watch it fill up."
        />
      </CardFooter>
    </Card>
  )
}
