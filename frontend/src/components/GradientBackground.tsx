"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
// import { children } from 'react';

export function GridPatternLinearGradient() {
    return (
        <div className=" flex size-full items-center justify-center overflow-hidden   p-20">
            <GridPattern
                width={20}
                height={20}
                x={-1}
                y={-1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
                )}
            />
        </div>
    );
}
