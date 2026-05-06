"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SocialSidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-300 ${
        open ? "w-16" : "w-8"
      }`}
    >
      {/* 三角折叠按钮 */}
      <Button
        variant="ghost"
        size="icon"
        className="rotate-0 transition-transform duration-300"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`block w-3 h-3 border-t-2 border-r-2 border-gray-600 transform transition-transform duration-300 ${
            open ? "rotate-45" : "-rotate-135"
          }`}
        ></span>
      </Button>

      {/* 社交图标 */}
      {open && (
        <>
          <a
            href="https://discord.gg/k8EKXdHr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded hover:bg-white transition"
          >
            <img src="/img/discord.png" className="w-8 h-8" />
          </a>

          <a
            href="https://t.me/+Qkp_um-l2FExNmY1"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded hover:bg-white transition"
          >
            <img src="/img/telegram.png" className="w-8 h-8" />
          </a>
        </>
      )}
    </div>
  );
}
