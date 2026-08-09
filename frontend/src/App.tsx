import { CardImage } from "@/components/Card"
import goalPic from "./assets/goal.png"

export default function App() {
  return (
    <div className="min-h-screen p-12">
      <CardImage
        image={goalPic}
        cardTitle={"Goal"}
        cardDescription={"Countdown to a goal you set."}
        paneTitle={"Goal"}
        paneDescription={"One dot per day until your deadline. Watch it fill up."}
      />
    </div>
  )
}
