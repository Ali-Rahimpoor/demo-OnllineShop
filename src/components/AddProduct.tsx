import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from 'yup';
import { useGetFilterQuery } from "../features/apiSlice";
import type { IProductFormValues } from "../types/Types";

const AddProduct = ()=>{

   const validationSchema = Yup.object().shape({
      name: Yup.string().required('نام محصول را اضافه کنید'),
      description: Yup.string().required('توضیحات محصول را اضافه کنید'),
      price: Yup.number().required('قیمت را مشخص کنید'),
      filter: Yup.string().required('نوع محصول را مشخص کنید'),
      image:Yup.string().required('نام تصویر را وارد کنید')
   })
   const {data:FilterData=[]} = useGetFilterQuery();

   return(
      <>
      <section className="flex flex-col items-center justify-center mt-10">
       <h1>اضافه کردن محصول</h1>
      <Formik<IProductFormValues>
        initialValues={{
          name: "",
          description: "",
          price: 0,
          image: "",
          filter:"",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
         //  createContact(values);
        }}
      >
        {({ values }) => (
          <Form className="max-w-md mx-auto font-Dana">
            <div className="relative z-0 w-full mb-5 mt-20 group">
              <Field 
                type="text" 
                name="name" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-600 peer" 
                placeholder=" " 
                required 
              />
              <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
               نام محصول
              </label>
              <ErrorMessage name="name" render={msg =>
                <div className="text-red-500 text-xs">{msg}</div>
              }/>
            </div>  

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <Field 
                  type="text" 
                  name="price" 
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-600 peer" 
                  placeholder=" " 
                  required 
                />
                <label htmlFor="job" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-rose-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  قیمت
                </label>
                <ErrorMessage name="price" render={msg =>
                  <div className="text-red-500 text-xs">{msg}</div>
                }/>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="mobile" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-rose-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  نوع محصول
                </label>
              <Field
  name="filter"
  as="select"
  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-rose-600 peer"
>

                  <option value={''}>انتخاب کنید</option>
                  {
                    FilterData?.map((f,index)=>(
                      <option key={index} value={f.category}>
                        {f.category}
                      </option>
                    ))
                  }
                </Field>
                
                <ErrorMessage name="filter" render={msg =>
                  <div className="text-red-500 text-xs">{msg}</div>
                }/>
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <Field
  name="image"
  render={({ field, form }) => (
    <input
      type="file"
      accept="image/*"
      onChange={(event) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
          form.setFieldValue("image", file.name);
        }
      }}
      className="block w-full text-sm text-gray-900 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-700 transition"
/>
  )}
/>
            </div>

            {values.image && (
              <div className="mt-4">
                <img 
                  src={`../../server/images/${values.image}`} 
                  alt="Preview" 
                  className="max-w-xs max-h-40 my-2 rounded"
                  onError={(e) => {
                     const error = e.target as HTMLImageElement 
                    error.onerror = null; 
                    error.src = "../../public/noImageProduct.png"
                  }}
                />
              </div>
            )}

            <button 
              type="submit" 
              className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              تایید
            </button>
          </Form>
        )}
      </Formik>
      </section>
      </>
   )
}
export default AddProduct;