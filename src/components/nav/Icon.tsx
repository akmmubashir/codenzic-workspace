import React from 'react';
import * as Lucide from 'lucide-react';

export function Icon({ name, className, size = 18 }: { name: string; className?: string; size?: number }) {
  const C =
    (Lucide as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name] ||
    Lucide.Circle;
  return <C className={className} size={size} />;
}
