import { CardImage } from "@/components/Card"
import goalPic from "./assets/goal.png"
import monthPic from "./assets/month.png"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-10 flex items-center justify-between px-10 py-4 border-b border-border bg-background">
        <span className="font-mono text-sm font-medium tracking-tight flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
          dotcal
        </span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Wallpapers</span>
      </nav>

      <main className="flex flex-row gap-16 px-10 py-16 flex-wrap flex-1 items-center justify-center">
        <div className="flex flex-col gap-10 sticky top-20 w-96">
          <div>
            <p className="text-xs uppercase tracking-widest text-orange-500 font-mono mb-5">Your time, made visible</p>
            <h1 className="text-5xl font-bold tracking-tight leading-[1.1] mb-5">
              Your days counted<br />in <span className="text-orange-500">dots.</span>
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Each dot is a day. Watch them fill in. Set a goal, track a month — set it as your wallpaper.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Choose a wallpaper</p>
          <div className="flex flex-row gap-5 flex-wrap">
            <CardImage
              image={goalPic}
              cardTitle={"Goal"}
              cardDescription={"Count down to a date you set. One dot per day — filled as each passes, highlighted on today."}
              paneTitle={"Goal"}
              paneDescription={"One dot per day until your deadline. Watch it fill up."}
              isGoal={true}
            />
            <CardImage
              image={monthPic}
              cardTitle={"Month"}
              cardDescription={"The current month, week by week. See how far you are through it at a glance."}
              paneTitle={"Month"}
              paneDescription={"One dot per day for the current month."}
            />
          </div>
        </div>
      </main>

      <footer className="px-10 py-6 border-t border-border flex justify-between items-center">
        <span className="font-mono text-xs text-muted-foreground">dotcal — wallpapers</span>
      </footer>
    </div>
  )
}
