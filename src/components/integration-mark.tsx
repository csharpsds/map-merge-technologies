"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Braces,
  Cloud,
  Contact,
  Database,
  FolderSync,
  Inbox,
  Landmark,
  LayoutGrid,
  Server,
  ShoppingCart,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { IntegrationAsset, IntegrationIconName } from "@/content/integration-assets";
import { cn } from "@/lib/utils";

const icons: Record<IntegrationIconName, LucideIcon> = {
  database: Database,
  modules: LayoutGrid,
  contact: Contact,
  cart: ShoppingCart,
  cloud: Cloud,
  server: Server,
  api: Braces,
  files: FolderSync,
  queue: Inbox,
  stream: Workflow,
  people: Users,
  finance: Landmark,
};

export function IntegrationMark({
  asset,
  selected = false,
}: {
  asset: IntegrationAsset;
  selected?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const Icon = icons[asset.icon];
  const showLogo = Boolean(asset.assetPath) && !failed;

  return (
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md",
        selected ? "bg-white" : "bg-canvas",
      )}
    >
      {showLogo && asset.assetPath ? (
        <Image
          src={asset.assetPath}
          alt=""
          width={20}
          height={20}
          className="max-h-5 max-w-5 object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <Icon className="size-4 text-electric" aria-hidden="true" />
      )}
    </span>
  );
}
