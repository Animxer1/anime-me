import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Layout = () => {
  return (
    <div className={inter.className}>
      <h1 className="text-xl md:text-3xl text-center pt-6 pb-1 font-bold select-none">
        <Link href="/">アニメツ</Link>
      </h1>
      <p className="text-sm xs:text-base sm:text-lg md:text-xl text-center pb-6 text-gray-400">
        All your favourites are here...
      </p>
    </div>
  );
};

export default Layout;
