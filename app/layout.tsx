export const metadata = {
  title: "Blog Interview Portal | Jagged Edge Marketing",
  description: "Answer blog interview questions for Beyond Stem Cells.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
