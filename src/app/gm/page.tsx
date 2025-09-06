import Image from "next/legacy/image";

export const dynamic = "force-dynamic";

export default function GoodMorning() {
  const time = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    weekday: "short",
    timeZone: "Asia/Tokyo",
  };
  const formattedDate = time.toLocaleDateString("ja-JP", dateOptions);

  return (
    <div className="relative flex flex-col items-center justify-center h-svh text-white gap-2">
      <div className="flex flex-col items-center gap-2">
        <h1 className="sm:text-7xl text-4xl font-bold ">Good Morning!</h1>
        <p className="text-lg">{formattedDate}</p>
      </div>

      <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
        <Image
          src="/morning.jpg"
          alt="すがすがしい朝の写真"
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
    </div>
  );
}
