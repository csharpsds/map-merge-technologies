"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { expertiseGroups } from "@/content/expertise";

export function ExpertiseTabs() {
  return (
    <Tabs defaultValue={expertiseGroups[0].id} className="gap-6">
      <TabsList
        variant="line"
        className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0"
      >
        {expertiseGroups.map((group) => (
          <TabsTrigger
            key={group.id}
            value={group.id}
            className="h-11 min-h-11 px-3 data-active:text-navy"
          >
            {group.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {expertiseGroups.map((group) => (
        <TabsContent key={group.id} value={group.id}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
}
