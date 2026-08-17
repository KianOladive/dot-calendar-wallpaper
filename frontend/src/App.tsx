import { CardImage } from "@/components/Card"
import goalPic from "./assets/goal.png"
import monthPic from "./assets/month.png"

export default function App() {
  return (
    <div className="flex flex-row gap-6 p-12">
      <CardImage
        image={goalPic}
        cardTitle={"Goal"}
        cardDescription={"Countdown to a goal you set."}
        paneTitle={"Goal"}
        paneDescription={"One dot per day until your deadline. Watch it fill up."}
        isGoal={true}
      />
      <CardImage
        image={monthPic}
        cardTitle={"Month"}
        cardDescription={"The current month as a grid of dots."}
        paneTitle={"Month"}
        paneDescription={"One dot per day for the current month."}
      />
    </div>
  )
}
