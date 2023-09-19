import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SideBar() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Functions</CardTitle>
        <CardDescription>AI assistance you can seek for</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default SideBar;
