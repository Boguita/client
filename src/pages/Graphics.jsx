import { LineChart, Bar, Legend, BarChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import api  from '../common/Axiosconfig';
import { AuthContext } from "../context/authContext";

const Graphics = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;


  const monthlyData = [
    { month: '1', 'LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0 },
    { month: '2','LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0  },
    { month: '3', 'LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0 },
    { month: '4','LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0  },
    { month: '5', 'LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0 },
    { month: '6', 'LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0 },
    { month: '7', 'LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0 },
    { month: '8','LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0  },
    { month: '9', 'LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0 },
    { month: '10','LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0  },
    { month: '11','LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0  },
    { month: '12','LUNA DE MIEL': 0, 'KIT ESCOLAR': 0, 'KIT MATERNAL': 0  },
  ].slice(0, currentMonth); // Filtra hasta el mes actual


  
   useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`users/beneficios-otorgados/${currentUser?.username}`);
        const apiData = res.data;

        // Convert API data to match the structure of monthlyData
        Object.entries(apiData).forEach(([tipo, valores]) => {
          for (const [mes, cantidad] of Object.entries(valores)) {
            monthlyData[parseInt(mes) - 1][tipo] = cantidad;
          }
        });

        setData(monthlyData);
        setErr(null);
        console.log(data)
      } catch (error) {
        console.log(error.response.data.message);
        setErr(error.response.data.message);
      }
    }

    fetchData();
  }, []);

  return (
     <div className="bg-white w-[61%] aspect-auto rounded-lg p-4">
    <ResponsiveContainer aspect={2}>
      <BarChart
        data={data}
        width={600}
        height={400}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="LUNA DE MIEL" fill="#0E6F4B" />
        <Bar dataKey="KIT ESCOLAR" fill="#23A1D8" />
        <Bar dataKey="KIT MATERNAL" fill="#006084" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default Graphics;


  