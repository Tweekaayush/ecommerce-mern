import React from "react";
import {
  LuShoppingCart,
  LuUserRound,
  LuDollarSign,
  LuPackageOpen,
} from "react-icons/lu";
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <section id="dashboard">
      <div className="container">
        <h1 className="heading-3">Dashboard</h1>
        <div className="dashboard-content">
          <div className="dashboard-card">
            <div className="dashboard-card-head">
              <h1 className="heading-4">Total Revenue</h1>
              <p>$1000000</p>
            </div>
            <div>
              <span>
                <LuDollarSign />
              </span>
            </div>
          </div>
          <div className="dashboard-card" onClick={()=>navigate('/orders/list')}>
            <div className="dashboard-card-head">
              <h1 className="heading-4">Orders</h1>
              <p>30</p>
            </div>
            <div>
              <span>
                <LuShoppingCart />
              </span>
            </div>
          </div>
          <div className="dashboard-card" onClick={()=>navigate('/users/list')}>
            <div className="dashboard-card-head">
              <h1 className="heading-4">Users</h1>
              <p>2</p>
            </div>
            <div>
              <span>
                <LuUserRound />
              </span>
            </div>
          </div>
          <div className="dashboard-card" onClick={()=>navigate('/products/list')}>
            <div className="dashboard-card-head">
              <h1 className="heading-4">Products</h1>
              <p>2</p>
            </div>
            <div>
              <span>
                <LuPackageOpen />
              </span>
            </div>
          </div>
          <div className="revenue-chart">

          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
