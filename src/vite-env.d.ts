/// <reference types="vite/client" />

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.webp";
