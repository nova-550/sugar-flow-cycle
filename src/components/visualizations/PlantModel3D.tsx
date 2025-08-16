import { Factory3D } from './Factory3D'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Factory } from "lucide-react"

export function PlantModel3D() {
  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Factory className="h-5 w-5" />
          3D Factory Model
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[500px] p-0">
        <Factory3D />
      </CardContent>
    </Card>
  )
}