import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ExampleCardProps {
  title: string;
  content: string;
  createdAt: string;
}

export function ExampleCard({ title, content, createdAt }: ExampleCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Created on {new Date(createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{content}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  );
}
