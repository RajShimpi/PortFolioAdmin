import React from "react";

const Dashboard = () => {
  // Example data for the cards
  const cardData = [
    { title: "Total Users", value: 1200, icon: "fa-users" },
    { title: "Total Sales", value: 4500, icon: "fa-dollar-sign" },
    { title: "Total Orders", value: 310, icon: "fa-shopping-cart" },
    { title: "Total Revenue", value: 50000, icon: "fa-money-bill-wave" },
  ];

  return (
    <div style={{ marginTop: "50px", padding: "0 15px" }}>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        {cardData.map((card, index) => (
          <div
            key={index}
            style={{
              width: "23%",
              marginBottom: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <i
                className={`fas ${card.icon}`}
                style={{ fontSize: "30px", color: "#4e73df" }}
              ></i>
              <h5 style={{ fontWeight: "bold", color: "#333" }}>
                {card.title}
              </h5>
            </div>
            <h3
              style={{ marginTop: "20px", textAlign: "center", color: "#333" }}
            >
              {card.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
