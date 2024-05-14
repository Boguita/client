import React, { useEffect, useState } from "react";
import TablaGrid from "./TablaGrid";
import { getList } from "./ServicesAfiliado";

const PageAfiliado = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [err, setErr] = useState(null);
  const handleAfiliados = async () => {
    // let mounted = true;
    try {
      const afiliados = await getList();
      if (afiliados) {
        setUsers(afiliados);
        setIsLoading(false);
      }

      setErr(null);
    } catch (error) {
      setUsers(null);
      console.log(error);
      setErr(error.message);
    }
    // return () => (mounted = false);
  };

  useEffect(() => {
    handleAfiliados();
  }, []);
  return (
    <div className="container mx-auto">
      <div className="md:ml-64 h-auto pt-20">
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
              Afiliados (
              {users && new Intl.NumberFormat().format(users?.length)})
            </h2>
          </div>
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <TablaGrid data={users} loading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAfiliado;
