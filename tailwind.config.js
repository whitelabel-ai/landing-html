/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./node_modules/white-library/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // layout & spacing
    "flex", "inline-flex", "grid", "h-full", "w-full", "flex-1", "min-h-0", "overflow-y-auto", "sticky", "bottom-0",
    "items-start", "items-center", "items-end",
    "justify-start", "justify-center", "justify-between",
    "gap-1", "gap-2", "gap-3", "gap-4", "gap-6", "space-y-3",
    "p-2", "p-3", "p-4", "px-2", "px-3", "px-4", "py-2", "py-3", "py-4",
    "px-4", "py-3", "h-14", "max-w-[85%]",
    "m-0", "mt-2", "mt-3", "mt-4", "mb-2", "mb-3", "mb-4",
    // borders & radius
    "border", "border-0", "border-2", "border-neutral-800", "border-neutral-700", "border-neutral-600",
    "border-neutral-300",
    "rounded", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl",
    // text & colors (neutrals comunes)
    "text-white", "text-neutral-100", "text-neutral-200", "text-neutral-300", "text-neutral-900", "text-black", "text-gray-900",
    "bg-white", "bg-neutral-100", "bg-neutral-900", "bg-neutral-800", "bg-neutral-700", "bg-yellow-500",
    "bg-gray-50", "bg-gray-100", "bg-gray-200", "bg-gray-800", "bg-gray-900",
    // shadows
    "shadow", "shadow-sm", "shadow-md",
    // form
    "outline-none", "focus:outline-none", "placeholder:text-neutral-300", "placeholder:text-white", "ring-1", "ring-neutral-600", "focus:ring-1",
    // buttons
    "bg-blue-600", "hover:bg-blue-500", "hover:bg-neutral-600",
    // arbitrary sizes for icons/text
    "text-[18px]", "whitespace-pre-wrap", "break-words",
    // alignment for bubbles
    "self-end", "self-start",
    // corner variants for bubbles
    "rounded-t-lg", "rounded-bl-lg", "rounded-br-lg",
  ],
  corePlugins: {
    preflight: false, // evitar reset global para no romper estilos del template
  },
  theme: {
    extend: {},
  },
  plugins: [],
};