import { Container, Section } from "@/components/layout/container"
import { H2, Text } from "@/components/ui/typography"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Cpu, HardDrive, Server } from "lucide-react"

export function Requirements() {
  return (
    <Section className="py-16">
      <Container className="max-w-4xl">
         <div className="mb-8 text-center">
            <H2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">System Requirements</H2>
            <Text className="text-base text-muted-foreground">
              Lenny is lightweight and can withstand high traffic on modest hardware.
            </Text>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-2xl border bg-card text-card-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
               <CardHeader className="text-center pb-2">
                 <Server className="h-8 w-8 mx-auto text-zinc-500 mb-4" />
                 <CardTitle className="text-lg">OS</CardTitle>
               </CardHeader>
               <CardContent className="text-center font-medium text-zinc-700 dark:text-zinc-300">
                 Ubuntu 22.04 LTS <br/> <span className="text-sm text-muted-foreground font-normal">(Recommended)</span>
               </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-card text-card-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
               <CardHeader className="text-center pb-2">
                 <Cpu className="h-8 w-8 mx-auto text-zinc-500 mb-4" />
                 <CardTitle className="text-lg">CPU</CardTitle>
               </CardHeader>
               <CardContent className="text-center font-medium text-zinc-700 dark:text-zinc-300">
                 2 Cores <br/> <span className="text-sm text-muted-foreground font-normal">(Minimum)</span>
               </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-card text-card-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
               <CardHeader className="text-center pb-2">
                 <HardDrive className="h-8 w-8 mx-auto text-zinc-500 mb-4" />
                 <CardTitle className="text-lg">Memory</CardTitle>
               </CardHeader>
               <CardContent className="text-center font-medium text-zinc-700 dark:text-zinc-300">
                 4GB RAM <br/> <span className="text-sm text-muted-foreground font-normal">(Minimum)</span>
               </CardContent>
            </Card>
         </div>
      </Container>
    </Section>
  )
}
