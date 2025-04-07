import type { Metadata } from "next";
import { UserProvider } from "../../contexts/userContext";
import "./globals.css";
import { DotGothic16 } from 'next/font/google'
import { PlayerProvider } from "../../contexts/playerContext";
import { TeamPokemonProvider } from "../../contexts/teamContext";
 
// If loading a variable font, you don't need to specify the font weight
const inter = DotGothic16({
  weight:'400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Poke-Clone",
  description: "This is a clone app of Pokemon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>  
          <UserProvider>
            <PlayerProvider>
              <TeamPokemonProvider>
                {children}
              </TeamPokemonProvider>
            </PlayerProvider>
          </UserProvider>
      </body>
    </html>
  );
}