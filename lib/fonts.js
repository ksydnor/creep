import { Archivo } from "next/font/google";

// One variable family for everything: the width axis gives the condensed
// display cut, so no second font is loaded.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap"
});
