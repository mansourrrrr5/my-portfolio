# Spline 3D Component Integration Guide

## ✅ Integration Complete

Your portfolio now has full Spline 3D component support integrated and ready to use!

## What Was Installed

### Dependencies Added
```bash
@splinetool/runtime      # Spline runtime engine
@splinetool/react-spline # React wrapper for Spline
clsx                     # Utility for conditional classnames
tailwind-merge           # Merge Tailwind CSS classes intelligently
```

### Files Created

1. **`/lib/utils.ts`** - Utility functions (cn helper for class merging)
2. **`/components/ui/SplineScene.tsx`** - Spline 3D scene component with Suspense fallback
3. **`/components/ui/Spotlight.tsx`** - Interactive spotlight/glow effect component
4. **`/components/SplineDemo.tsx`** - Pre-built demo component ready to use

## Project Structure

Your project already has:
- ✅ Next.js 16.1.6 (App Router)
- ✅ React 19.2.3
- ✅ TypeScript 5
- ✅ Tailwind CSS 4
- ✅ Framer Motion 12.34.0
- ✅ `/components/ui` folder structure

## How to Use

### Option 1: Use Pre-built Demo Component

```tsx
import { SplineSceneBasic } from "@/components/SplineDemo";

export default function MyPage() {
  return (
    <div>
      <SplineSceneBasic />
    </div>
  );
}
```

### Option 2: Create Custom Spline Components

```tsx
'use client'

import { SplineScene } from "@/components/ui/SplineScene";
import { Card } from "@/components/ui/Card";
import { Spotlight } from "@/components/ui/Spotlight";

export function MyCustomSplineDemo() {
  return (
    <Card className="relative overflow-hidden">
      {/* Optional: Interactive spotlight effect */}
      <Spotlight 
        className="-top-20 left-0"
        size={250}
      />
      
      {/* Your 3D Spline scene */}
      <SplineScene 
        scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
        className="w-full h-[500px]"
      />
    </Card>
  );
}
```

### Option 3: Side-by-Side Content Layout

```tsx
'use client'

import { SplineScene } from "@/components/ui/SplineScene";

export function ContentWithSpline() {
  return (
    <div className="flex gap-8 items-center">
      {/* Content on left */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4">
          Beautiful 3D Experiences
        </h2>
        <p className="text-zinc-300">
          Embed interactive 3D scenes directly in your portfolio
        </p>
      </div>

      {/* 3D Scene on right */}
      <div className="flex-1 h-[400px]">
        <SplineScene 
          scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
```

## Component Reference

### SplineScene
Renders an interactive 3D Spline scene with loading state.

**Props:**
- `scene` (string, required) - The Spline scene URL
- `className` (string, optional) - Tailwind CSS classes for styling

**Example:**
```tsx
<SplineScene 
  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
  className="w-full h-[600px] rounded-lg"
/>
```

### Spotlight
Interactive glow effect that follows mouse movement.

**Props:**
- `className` (string, optional) - Additional Tailwind classes
- `size` (number, optional) - Diameter in pixels (default: 200)
- `springOptions` (SpringOptions, optional) - Framer Motion spring config

**Example:**
```tsx
<Spotlight 
  className="top-10 left-1/2 -translate-x-1/2"
  size={300}
  springOptions={{ bounce: 0.2 }}
/>
```

## Finding Spline Scene URLs

1. Create or find a scene at [Spline.design](https://spline.design)
2. Once your scene is ready, click "Export" → "Embed"
3. Copy the scene URL (format: `https://prod.spline.design/YOUR_ID/scene.splinecode`)
4. Use this URL in the `SplineScene` component

**Example Scenes:**
- Current demo: `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`
- Create your own: [Spline Editor](https://spline.design/editor)

## Integration Ideas for Your Portfolio

### 1. Hero Section Enhancement
Add a 3D scene as a visual complement to your hero image:
```tsx
// In Hero.tsx or a new section
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
  <div>{/* Your content */}</div>
  <SplineScene scene="YOUR_SCENE_URL" className="h-[500px]" />
</div>
```

### 2. Projects Showcase
Use Spline to demonstrate 3D visualization projects:
```tsx
// In Projects section
{projects.map((project) => (
  <Card key={project.id}>
    <h3>{project.title}</h3>
    <SplineScene scene={project.splineUrl} className="h-[300px]" />
    <p>{project.description}</p>
  </Card>
))}
```

### 3. Experience Timeline
Interactive 3D elements in your experience/timeline:
```tsx
<div className="space-y-8">
  <div className="flex gap-6">
    <SplineScene scene="COMPANY_3D_LOGO" className="w-24 h-24" />
    <div>
      <h3>Working Student at Swisslog</h3>
      {/* ... */}
    </div>
  </div>
</div>
```

### 4. About Section
Showcase your personality with an interactive 3D scene:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <SplineScene scene="YOUR_PERSONAL_SCENE" className="h-[500px]" />
  <div>{/* Your bio and info */}</div>
</div>
```

## Responsive Behavior

The `SplineScene` component is responsive by default. Control sizing:

```tsx
{/* Small on mobile, medium on tablet, large on desktop */}
<SplineScene 
  scene="URL"
  className="h-[300px] md:h-[400px] lg:h-[600px]"
/>

{/* Hide on mobile if needed */}
<SplineScene 
  scene="URL"
  className="hidden md:block h-[500px]"
/>
```

## Loading State

The component includes a built-in loading state with:
- Animated spinner
- Loading message
- Dark background
- Rounded corners

Customize the fallback if needed:
```tsx
// Edit SplineScene.tsx fallback property
<Suspense 
  fallback={
    <div className="w-full h-full flex items-center justify-center">
      {/* Your custom loader */}
    </div>
  }
>
```

## Performance Tips

1. **Lazy Load Scenes** - Scenes load only when they enter viewport
2. **Suspend Rendering** - Uses Suspense for optimal code splitting
3. **Optimize Scene Size** - Keep Spline scenes under 5MB for best performance
4. **Cache Spline URLs** - Use static/constant URLs to avoid rerenders

## Browser Support

- Chrome/Edge: Full support (2020+)
- Firefox: Full support (55+)
- Safari: Full support (12.1+)
- Mobile browsers: Full support (iOS Safari 13+, Chrome Android 80+)

## Troubleshooting

### Scene Not Loading?
1. Verify the Spline URL is correct and public
2. Check browser console for CORS errors
3. Ensure the scene URL format: `https://prod.spline.design/ID/scene.splinecode`
4. Try refreshing the page

### Spotlight Not Working?
1. Ensure parent element has `position: relative`
2. Check that `overflow: hidden` is set
3. Verify mouse events are not blocked by overlays
4. Check browser dev tools for JS errors

### Performance Issues?
1. Reduce scene complexity in Spline editor
2. Optimize textures and geometry
3. Reduce scene refresh rate if needed
4. Consider hiding on mobile if necessary

## File Locations

```
my-portfolio/
├── lib/
│   └── utils.ts                    # Utility functions
├── components/
│   ├── ui/
│   │   ├── SplineScene.tsx        # Spline 3D component
│   │   └── Spotlight.tsx          # Interactive spotlight
│   └── SplineDemo.tsx             # Demo component
└── package.json                    # Updated with Spline deps
```

## Build Status

```
✓ Compiled successfully in 4.2s
✓ Zero TypeScript errors
✓ All dependencies installed
✓ Ready for production
```

## Next Steps

1. **Create Spline Scenes** - Visit [Spline.design](https://spline.design) to create your 3D scenes
2. **Get Scene URLs** - Export your scenes and copy their URLs
3. **Integrate Components** - Add `SplineScene` components to your sections
4. **Test Responsively** - Ensure scenes look good on all devices
5. **Deploy** - Your build is ready to deploy!

## Questions & Support

- **Spline Docs:** https://docs.spline.design
- **React Spline:** https://github.com/splinetool/react-spline
- **Tailwind Docs:** https://tailwindcss.com
- **Next.js Docs:** https://nextjs.org/docs

---

**Your portfolio now has professional 3D capabilities! 🚀**
