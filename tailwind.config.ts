/// <reference types="node" />

import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Base colors
				border: '#e5e7eb',
				input: '#f3f4f6',
				ring: '#9ca3af',
				background: '#e6f7f2', // Light bluish-green background
				foreground: '#1f2937',
				
				// Primary - Soft green
				primary: {
					DEFAULT: '#10b981', // emerald-500
					foreground: '#ffffff',
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#10b981',
					600: '#059669',
					700: '#047857',
					800: '#065f46',
					900: '#064e3b',
				},

				// Secondary - Soft teal
				secondary: {
					DEFAULT: '#0d9488', // teal-600
					foreground: '#ffffff',
					50: '#f0fdfa',
					100: '#ccfbf1',
					200: '#99f6e4',
					300: '#5eead4',
					400: '#2dd4bf',
					500: '#14b8a6',
					600: '#0d9488',
					700: '#0f766e',
					800: '#115e59',
					900: '#134e4a',
				},

				// Accent - Soft sky blue
				accent: {
					DEFAULT: '#0ea5e9', // sky-500
					foreground: '#ffffff',
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
				},

				// Destructive - Soft red
				destructive: {
					DEFAULT: '#ef4444', // red-500
					foreground: '#ffffff',
				},

				// Muted - Cool gray
				muted: {
					DEFAULT: '#f9fafb',
					foreground: '#6b7280',
				},

				// Card/popover backgrounds
				card: {
					DEFAULT: '#ffffff',
					foreground: '#1f2937',
				},

				popover: {
					DEFAULT: '#ffffff',
					foreground: '#1f2937'
				},
				sidebar: {
					DEFAULT: '#f8fafc',
					foreground: '#1f2937',
					primary: '#10b981',
					'primary-foreground': '#ffffff',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Remove non-semantic colors - use semantic tokens instead
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-gentle': 'pulse-gentle 2s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
