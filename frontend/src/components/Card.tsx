import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Pane from "./Pane"

type CardImageProps = {
  image: string,
  cardTitle: string,
  cardDescription: string,
  paneTitle: string,
  paneDescription: string,
  isGoal?: boolean,
}

export function CardImage({image, cardTitle, cardDescription, paneTitle, paneDescription, isGoal}: CardImageProps) {
  return (
    <Card className="relative max-w-sm pt-0 flex flex-col">
      <img
        src={image}
        className="relative z-20 w-full object-cover h-72"
      />
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Pane
          title={paneTitle}
          description={paneDescription}
          isGoal={isGoal}
        />
      </CardFooter>
    </Card>
  )
}
