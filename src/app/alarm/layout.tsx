export default function AlarmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col items-center justify-center h-svh animate-rainbow-bg">
      {children}
    </div>
  );
}
