export default function AboutLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="m-5">{children}</div>;
}
