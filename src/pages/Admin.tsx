import { Link, Outlet } from "react-router";

const Admin = () => {
  return (
    <>
      <section className="font-Dana p-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-yellow-500">صفحه ادمین</h1>

        <ul className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <li>
            <Link to={'/admin/addProduct'}>
              <button className="bg-rose-600 relative font-Morabba flex items-center justify-center text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition">
                اضافه کردن محصول
              </button>
            </Link>
          </li>

          <li>
            <button className="bg-rose-600 relative font-Morabba flex items-center justify-center text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">
              تغییر اطلاعات محصول
            </button>
          </li>

          <li>
            <button className="bg-rose-600 relative font-Morabba flex items-center justify-center text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
              حذف کردن محصول
            </button>
          </li>
        </ul>
        <Link to={'/'} className="flex items-center justify-center mt-10 text-red-400">برگشت</Link>
      </section>

      <Outlet />
    </>
  );
};

export default Admin;
