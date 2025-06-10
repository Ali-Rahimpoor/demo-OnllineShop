import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from 'yup';
import { useGetFilterQuery, useGetProductQuery, useUpdateProductMutation } from "../features/apiSlice";
import type { IProductFormValues } from "../types/Types";
import { toast } from "react-toastify";
import { useParams } from "react-router";
const EditProduct = ()=>{
   const {productId:id} = useParams<{productId:string}>();
   
   const validationSchema = Yup.object().shape({
      name: Yup.string().required('نام محصول را اضافه کنید'),
      description: Yup.string().required('توضیحات محصول را اضافه کنید'),
      price: Yup.number().required('قیمت را مشخص کنید').positive('قیمت باید مثبت باشد'),
      filter: Yup.string().required('نوع محصول را مشخص کنید'),
      image: Yup.mixed()
  .required('عکس را انتخاب کنید')
  .test(
    'fileFormat',
    'فرمت عکس نامعتبر است (jpg, jpeg, png, webp)',
    (value) => Boolean(value && typeof value === 'string' && value.match(/\.(jpg|jpeg|png|webp)$/i))
  )
   })
   const {data:FilterData=[]} = useGetFilterQuery();
  
   const {data:product,isLoading} = useGetProductQuery(id!);

   const [updateProduct] = useUpdateProductMutation();
   if (isLoading || !product) {
  return <p>در حال بارگذاری اطلاعات محصول...</p>;
}
   return(
      <>
      <section className="flex flex-col items-center justify-center mt-10">
       <h1>تغییر محصول</h1>
      <Formik<IProductFormValues>
        enableReinitialize
        initialValues={{
          name: product.name,
          description:product.description,
          price: product.price,
          image: product.image,
          filter:product.filter,
        }}
        validationSchema={validationSchema}
        onSubmit={async(values,{resetForm}) => {
          try{
            toast.success('محصول تغییر کرد');
            resetForm();
            await updateProduct({...values,id}).unwrap();
          }catch(err){
            console.error(err)
            toast.error('محصول اضافه نشد!')
          }
        }}
      >
        {({ values , setFieldValue}) => (
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
  <div className="relative z-0 w-full mb-5 group">
              <Field
                as="textarea"
                name="description"
                rows={3}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="description"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-rose-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                توضیحات محصول
              </label>
              <ErrorMessage
                name="description"
                render={(msg) => <div className="text-red-500 text-xs mt-1">{msg}</div>}
              />
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
                      <option key={index} value={f.id}>
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
             <input
  name="image"
  type="file"
  accept="image/*"
  onChange={(event) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue("image", file.name);
    }
  }}
  className="block w-full text-sm text-gray-900 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-700 transition"
/>
<ErrorMessage name="image" render={msg =>
  <div className="text-red-500 text-xs">{msg}</div>
}/>
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
export default EditProduct;