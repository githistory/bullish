import { ApolloWrapper } from "./apollo-wrapper"
import "./globals.css"

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-row p-2">
          <h1 className="text-xl">Bullish</h1>
        </div>
        <hr />
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}