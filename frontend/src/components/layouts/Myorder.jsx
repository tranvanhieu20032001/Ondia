import React from 'react';

function Myorder() {
  const orders = [
    {
      orderId: '#12345',
      date: '2024-10-09',
      shipTo: 'Tổ 16 thôn 6 Tú Phương, Bình Tú, Thăng Bình, Quảng Nam',
      orderTotal: '$100',
      orderStatus: 'Processing',
      actions: 'View',
    },
    {
      orderId: '#12346',
      date: '2024-10-08',
      shipTo: 'Jane Smith',
      orderTotal: '$200.000.000',
      orderStatus: 'Completed',
      actions: 'View',
    },
    {
      orderId: '#12347',
      date: '2024-10-08',
      shipTo: 'Trần Văn Hiếu',
      orderTotal: '$200',
      orderStatus: 'Completed',
      actions: 'View',
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-3 text-left text-sm font-medium text-gray-500 ">Order ID</th>
              <th className="px-2 py-3 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-2 py-3 text-left text-sm font-medium text-gray-500">Ship To</th>
              <th className="px-2 py-3 text-left text-sm font-medium text-gray-500">Order Total</th>
              <th className="px-2 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap">Order Status</th>
              <th className="px-2 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="px-2 py-3 text-sm text-gray-700">{order.orderId}</td>
                <td className="px-2 py-3 text-sm text-gray-700 whitespace-nowrap">{order.date}</td>
                <td className="px-2 py-3 text-sm text-gray-700 whitespace-nowrap">{order.shipTo}</td>
                <td className="px-2 py-3 text-sm text-gray-700">{order.orderTotal}</td>
                <td className="px-2 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.orderStatus === 'Completed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-2 py-3 text-sm">
                  <button className="text-primary hover:underline">{order.actions}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Myorder;
