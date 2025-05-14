import * as React from "react";
import Link from "next/link";

const NavHeader: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-screen border-b border-gray-200 bg-blue-500">
      <div className="flex mx-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold text-white">Alan Resto</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavHeader;
