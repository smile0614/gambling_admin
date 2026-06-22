import SvgColor from "@/assets/svgs/SvgColor";
import { PATH_PAGE } from "@/config/path";
import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <nav className="p-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            href={PATH_PAGE.dashboard}
            className="inline-flex text-sm font-medium hover:text-primary dark:hover:text-white"
          >
            <SvgColor
              src="/assets/icons/home.svg"
              className="text-gray-400 dark:text-white"
              style={{ width: 16, height: 16, marginRight: 5 }}
            />
            <span className="flex flex-col justify-end text-[14px]">Home</span>
          </Link>
        </li>
        {pageName && (
          <li>
            <div className="flex items-center">
              <SvgColor
                src="/assets/icons/arrow-right.svg"
                style={{ width: 16, height: 16, marginRight: 5 }}
              />
              <a
                href="#"
                className="ms-1 text-sm font-medium hover:text-primary dark:hover:text-white md:ms-2"
              >
                {pageName}
              </a>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
