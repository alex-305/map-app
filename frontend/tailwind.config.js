import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		keyframes: {
  			'move-up': {
  				'0%': {
  					transform: 'translateY(100%)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			'move-down': {
  				'0%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateY(100%)',
  					opacity: '0'
  				}
  			}
  		},
  		animation: {
  			'move-up': 'move-up var(--tw-animation-duration) ease-out forwards',
  			'move-down': 'move-down var(--tw-animation-duration) ease-out forwards'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

