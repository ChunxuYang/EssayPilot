import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function SideBar() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Functions</CardTitle>
        <CardDescription>AI assistance you can seek for</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Block Detection</AccordionTrigger>
            <AccordionContent>
              Detects blocks by 5 seconds of idle time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <p className="text-gray-500 text-sm">More is coming up...</p>
      </CardFooter>
    </Card>
  );
}

export default SideBar;
