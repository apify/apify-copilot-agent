/**
 * Mock Product Data
 * 
 * This file contains sample product data for demonstration purposes.
 * To remove mock data:
 * 1. Delete this file (data/products.ts)
 * 2. Remove the import statement from app/page.tsx
 * 3. Replace with your real data source (API, database, etc.)
 */

import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    url: "https://example.com/products/wireless-headphones",
    title: "Premium Wireless Headphones",
    image: "https://picsum.photos/seed/product1/400/400",
    description: "High-quality wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 249.99,
  },
  {
    url: "https://example.com/products/smart-watch",
    title: "Smart Fitness Watch",
    image: "https://picsum.photos/seed/product2/400/400",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and waterproof design.",
    price: 199.99,
  },
  {
    url: "https://example.com/products/laptop-stand",
    title: "Ergonomic Laptop Stand",
    image: "https://picsum.photos/seed/product3/400/400",
    description: "Aluminum laptop stand with adjustable height and angle. Improves posture and reduces neck strain during work.",
    price: 49.99,
  },
  {
    url: "https://example.com/products/mechanical-keyboard",
    title: "RGB Mechanical Keyboard",
    image: "https://picsum.photos/seed/product4/400/400",
    description: "Premium mechanical keyboard with customizable RGB lighting and tactile switches. Built for gamers and typists.",
    price: 129.99,
  },
  {
    url: "https://example.com/products/usb-c-hub",
    title: "USB-C Multiport Hub",
    image: "https://picsum.photos/seed/product5/400/400",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery. Essential for modern laptops.",
    price: 59.99,
  },
  {
    url: "https://example.com/products/wireless-mouse",
    title: "Wireless Ergonomic Mouse",
    image: "https://picsum.photos/seed/product6/400/400",
    description: "Comfortable wireless mouse with ergonomic design and precision tracking. Reduces wrist strain during long work sessions.",
    price: 39.99,
  },
  {
    url: "https://example.com/products/desk-lamp",
    title: "LED Desk Lamp with USB Port",
    image: "https://picsum.photos/seed/product7/400/400",
    description: "Modern LED desk lamp with adjustable brightness, color temperature control, and built-in USB charging port.",
    price: 45.99,
  },
  {
    url: "https://example.com/products/cable-organizer",
    title: "Cable Management System",
    image: "https://picsum.photos/seed/product8/400/400",
    description: "Complete cable management solution to keep your desk tidy. Includes cable clips, sleeves, and under-desk tray.",
    price: 24.99,
  },
  {
    url: "https://example.com/products/monitor-light-bar",
    title: "Monitor Light Bar",
    image: "https://picsum.photos/seed/product9/400/400",
    description: "Space-saving monitor-mounted light bar with auto-dimming and adjustable color temperature. No desk space required.",
    price: 89.99,
  },
  {
    url: "https://example.com/products/webcam-4k",
    title: "4K Ultra HD Webcam",
    image: "https://picsum.photos/seed/product10/400/400",
    description: "Professional 4K webcam with autofocus, noise-canceling microphone, and adjustable field of view. Perfect for streaming and video calls.",
    price: 149.99,
  },
];

