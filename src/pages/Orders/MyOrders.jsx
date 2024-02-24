import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`http://localhost:3000/api/myorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      });
      let res = await a.json();
      setOrders(res.orders);
    };
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-20 ">
        <table className="w-full text-sm text-left text-gray-800  ">
          <thead className="text-xs text-gray-700 uppercase bg-blue-200  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Oder's Id
              </th>
              <th scope="col" className="px-6 py-3">
                Vehicle's Name
              </th>
              <th scope="col" className="px-6 py-3">
                Type of Service
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={index} className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {item._id}
                </th>
                <td className="px-6 py-4">{item.orderVehicle.title}</td>
                <td className="px-6 py-4">{item.requirement}</td>
                <td className="px-6 py-4">{item.city}</td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/Orders/${orders[index]._id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
