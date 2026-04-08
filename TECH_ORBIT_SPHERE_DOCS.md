# TechOrbitSphere Component Documentation

## Overview
A premium, reusable 3D Tech Orbit Sphere component that displays technology stack items in an elegant, rotating orbit formation. Built with CSS 3D transforms and Framer Motion for smooth, performant animations.

## Features
✅ **3D CSS Transforms** - No Three.js dependency, uses native CSS `preserve-3d`  
✅ **Mouse-Interactive Parallax** - Subtle rotation follows cursor  
✅ **Continuous Animation** - Smooth infinite orbit rotation  
✅ **Camera-Facing Labels** - Labels remain readable via counter-rotation  
✅ **Responsive Sizing** - Three built-in sizes (sm, md, lg)  
✅ **Reduced Motion Support** - Respects `prefers-reduced-motion`  
✅ **Smooth Entrance** - Staggered item animation on load  
✅ **Premium Styling** - Gradient glows, soft shadows, elegant color palette  
✅ **TypeScript** - Fully typed with proper interfaces  
✅ **SSR Safe** - No hydration issues, client-component ready  

## Component Props

```typescript
interface TechOrbitSphereProps {
  orbitItems?: TechOrbit[];        // Array of tech items to display
  size?: "sm" | "md" | "lg";       // Component size preset
  interactive?: boolean;            // Enable mouse tracking (default: true)
  reducedMotion?: boolean;          // Disable animations (default: false)
}

interface TechOrbit {
  label: string;                   // Tech name ("Python", "React", etc.)
  icon: string;                    // Emoji or short text symbol
  color: string;                   // Tailwind color class (e.g., "text-blue-400")
}
```

## Default Tech Stack
Includes 8 technologies by default:
- Python (🐍 blue-400)
- FastAPI (⚡ red-400)
- React (⚛️ cyan-400)
- Next.js (▲ white)
- TypeScript (TS blue-300)
- Docker (🐳 blue-500)
- OpenCV (📷 orange-400)
- AI/ML (🧠 purple-400)

## Usage Examples

### Basic Usage (Default Stack)
```tsx
import TechOrbitSphere from "@/components/TechOrbitSphere";

export default function Hero() {
  return (
    <div className="flex justify-center">
      <TechOrbitSphere />
    </div>
  );
}
```

### Custom Tech Stack
```tsx
const myTechs = [
  { label: "Vue", icon: "🟢", color: "text-green-400" },
  { label: "PostgreSQL", icon: "🐘", color: "text-blue-400" },
  { label: "GraphQL", icon: "⚙️", color: "text-pink-400" },
];

export default function Portfolio() {
  return (
    <TechOrbitSphere 
      orbitItems={myTechs}
      size="md"
      interactive={true}
    />
  );
}
```

### With Reduced Motion
```tsx
<TechOrbitSphere
  size="lg"
  interactive={false}
  reducedMotion={true}
/>
```

## Size Presets

| Size | Sphere | Orbit | Icon Size | Label Size |
|------|--------|-------|-----------|------------|
| `sm` | 120px  | 180px | text-lg   | text-xs    |
| `md` | 160px  | 240px | text-2xl  | text-sm    |
| `lg` | 200px  | 300px | text-3xl  | text-base  |

## Responsive Sizing

The component automatically scales within its container. Set a fixed height on the container for predictable sizing:

```tsx
<div className="h-[500px] md:h-[600px]">
  <TechOrbitSphere size="lg" />
</div>
```

## Integration in Hero Section

The TechOrbitSphere is already integrated in `Hero.tsx` on the right side:

```tsx
import TechOrbitSphere from "@/components/TechOrbitSphere";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* LEFT: Text content */}
        <motion.div className="space-y-8">
          {/* Your hero text, buttons, etc. */}
        </motion.div>

        {/* RIGHT: TechOrbitSphere */}
        <motion.div className="relative flex justify-center items-center h-[500px] md:h-[600px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-600/10 via-blue-600/5 to-transparent blur-3xl" />
          <div className="relative z-10">
            <TechOrbitSphere size="lg" interactive={true} reducedMotion={reducedMotion} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

## Animation Details

### Continuous Rotation
- Main orbit rotates on all 3 axes simultaneously
- Duration: 20 seconds for smooth continuous motion
- Orbit items counter-rotate to keep labels readable
- Center core pulses with 2.5-3 second rhythm

### Mouse Interaction
- Cursor movement creates subtle parallax rotation
- Spring physics (stiffness: 50, damping: 30) for smooth feel
- Effect is reversed on orbit items to maintain camera-facing orientation
- Smooth return to center on mouse leave

### Entrance Animation
- Items fade in and scale from 0 with staggered delay (50ms between each)
- Center core appears instantly
- Labels fade in after items (200ms delay)

### Reduced Motion
- All animations pause/disable
- Component still visible and functional
- Labels remain readable
- Core color remains static

## Performance Considerations

✅ **CSS 3D** - Uses GPU acceleration via `transform: preserve-3d`  
✅ **Transform-only animations** - No layout recalculations  
✅ **Hardware acceleration** - `will-change` avoided to prevent memory issues  
✅ **Efficient re-renders** - Motion values isolated to prevent cascade updates  
✅ **No external 3D libraries** - Zero Three.js overhead  

### Mobile Optimization
- Component fits within viewport on mobile
- Interactive parallax disabled on touch devices (optional)
- Reduced particle density elsewhere on page
- Smooth 60fps performance on modern devices

## Styling & Colors

**Core Sphere:**
- Gradient: purple-600 → blue-600 → purple-700
- Glow: purple-500/50 (pulsing)
- Outer ring: purple-500/40 (subtle)

**Orbit Items:**
- Background: zinc-900/60 semi-transparent
- Border: zinc-700/50 subtle outline
- Backdrop blur: sm (4px)
- Individual color per tech item

**Container:**
- Dark theme compatible
- Transparent background (layer into page)
- Blends with hero background gradient

## Customization Examples

### Change Default Stack
Edit `TechOrbitSphere.tsx` line ~15-24:

```tsx
const defaultTechs: TechOrbit[] = [
  { label: "Rust", icon: "🦀", color: "text-orange-400" },
  { label: "Kubernetes", icon: "⚓", color: "text-blue-400" },
  // ... more items
];
```

### Add Animation Variants
To customize animation speeds, edit transitions in the `motion.div` (around line 128):

```tsx
transition={{
  rotateZ: {
    duration: 30,  // Slower rotation
    repeat: Infinity,
    ease: "linear",
  },
}}
```

### Modify Glow Colors
Edit the center core sphere section (around line 177):

```tsx
animate={{
  borderColor: [
    "rgba(168, 85, 247, 0.4)",  // purple
    "rgba(34, 197, 94, 0.6)",   // green (custom)
    "rgba(168, 85, 247, 0.4)",
  ],
}}
```

## Browser Support
- Chrome/Edge: Full support (2020+)
- Firefox: Full support (55+)
- Safari: Full support (12.1+)
- Mobile: iOS Safari 13+, Chrome Android 80+

## Dependencies
**Already included in project:**
- `framer-motion` ✅
- `react` 18+ ✅
- `next` 16+ ✅
- Tailwind CSS ✅

**No additional npm packages needed!**

## Troubleshooting

### Component not rotating
- Check `reducedMotion` prop is `false`
- Verify browser supports CSS 3D transforms
- Check browser console for JavaScript errors

### Labels unreadable
- Increase `size` prop to give more room
- Customize `orbitItems` with longer/shorter labels
- Enable `reducedMotion` for static view

### Performance issues
- Reduce `orbitItems.length` to fewer tech items
- Disable `interactive={true}` on mobile
- Check for other heavy animations on page

### SSR hydration errors
- Component uses `useClient` ✅
- No data fetching in component ✅
- Deterministic rendering ✅

## Files Modified
1. ✅ `components/TechOrbitSphere.tsx` (NEW) - Main component
2. ✅ `components/Hero.tsx` (MODIFIED) - Integration + removed unused `avatarScale`

## Example Output
```
Hero Section Layout:
┌─────────────────────────────────────┬──────────────────────────┐
│                                     │                          │
│  Welcome to my portfolio            │                          │
│  I'm Aziz...                        │     [ORBIT SPHERE]       │
│  Computer Vision • AI • Full-Stack  │   🌟 Rotating tech       │
│                                     │     nodes orbiting       │
│  View my work | Let's connect       │     central core         │
│                                     │                          │
└─────────────────────────────────────┴──────────────────────────┘
```

## Next Steps
1. ✅ Component created and integrated
2. ✅ Hero section updated with TechOrbitSphere
3. ✅ Build succeeds with no errors
4. 🔄 Test on mobile/tablet for responsive behavior
5. 🔄 A/B test with recruiters for UX feedback
6. 🔄 Optional: Add click-to-expand tech details on orbit items

## License
Part of personal portfolio project. Built with ❤️ using React + Framer Motion.
