import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import Chart.js

const ReadData = () => {
  // Chart Data for trends
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Blood Pressure",
        data: [120, 130, 135, 125, 140],
        borderColor: "rgba(75,192,192,1)",
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4, // Adds a smooth curve to the line
      },
      {
        label: "Serum Creatinine",
        data: [1, 1.1, 1.2, 1.3, 1.5],
        borderColor: "rgba(255,99,132,1)",
        fill: true,
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: "bold",

          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Value",
          font: {
            size: 16,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Days",
          font: {
            size: 16,
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutBounce",

    },
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f7fa",
      }}
    >
      {/* Title Section */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#333",
          fontSize: "36px",
        }}
      >
        Patient Clinical Data Overview
      </h1>

      {/* Section 1: Clinical Data with Descriptions and Images */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginBottom: "50px",
        }}
      >
        <div
          style={{
            margin: "20px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            maxWidth: "300px",
          }}
        >
          {/* <img src="/path-to-heart-icon.png" alt="Heart Disease" width="60" /> */}
          <p style={{ fontSize: "18px", margin: "10px 0" }}>
            <strong>Diagnosis of Heart Disease:</strong>{" "}
          </p>
          <p style={{ color: "#666" }}>
          A range of conditions affecting the heart, like coronary artery disease or arrhythmias. Diagnosed through tests like ECGs, blood tests, and stress tests. Common risk factors include high blood pressure and cholesterol.
          </p>
        </div>
        <div
          style={{
            margin: "20px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            maxWidth: "300px",
          }}
        >
          {/* <img src="/path-to-anemia-icon.png" alt="Anemia" width="60" /> */}
          <p style={{ fontSize: "18px", margin: "10px 0" }}>
            <strong>Presence of Anemia:</strong>{" "}
          </p>
          <p style={{ color: "#666" }}>
          A condition with low red blood cells or hemoglobin, leading to reduced oxygen delivery in the body. Diagnosed through blood tests, it causes fatigue and weakness. Common causes include iron deficiency and chronic disease.
          </p>
        </div>
        <div
          style={{
            margin: "20px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            maxWidth: "300px",
          }}
        >
          {/* <img src="/path-to-diabetes-icon.png" alt="Diabetes" width="60" /> */}
          <p style={{ fontSize: "18px", margin: "10px 0" }}>
            <strong>Diabetes:</strong>{" "}
          </p>
          <p style={{ color: "#666" }}>
          A condition with high blood sugar levels, mainly Type 1 (insufficient insulin) or Type 2 (insulin resistance). Diagnosed through blood tests like HbA1c. Symptoms include thirst, frequent urination, and weight loss.
          </p>
        </div>
      </div>

      {/* Section 2: Table with Critical Ranges */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333",
          fontSize: "28px",
        }}
      >
        Clinical Marker Ranges
      </h2>
      <table
        border="1"
        style={{
          width: "100%",
          marginBottom: "40px",
          textAlign: "center",
          borderCollapse: "collapse",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <thead style={{ backgroundColor: "#e8f0fe" }}>
          <tr>
            <th style={{ padding: "12px", fontSize: "18px" }}>
              Clinical Marker
            </th>
            <th style={{ padding: "12px", fontSize: "18px" }}>Normal Range</th>
            <th style={{ padding: "12px", fontSize: "18px" }}>
              Elevated Range
            </th>
            <th style={{ padding: "12px", fontSize: "18px" }}>
              Critical Range
            </th>
            <th style={{ padding: "12px", fontSize: "18px" }}>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={{
              backgroundColor: "#fff",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            <td style={{ padding: "12px" }}>Blood Pressure</td>
            <td style={{ padding: "12px" }}>90-120 mmHg</td>
            <td style={{ padding: "12px" }}>121-139 mmHg</td>
            <td style={{ padding: "12px" }}>&gt; 140 mmHg</td>
            <td style={{ padding: "12px" }}>
              High BP can increase heart disease risks.
            </td>
          </tr>
          <tr
            style={{
              backgroundColor: "#f9f9f9",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            <td style={{ padding: "12px" }}>Serum Creatinine (mg/dL)</td>
            <td style={{ padding: "12px" }}>0.6-1.2 mg/dL</td>
            <td style={{ padding: "12px" }}>1.3-1.5 mg/dL</td>
            <td style={{ padding: "12px" }}>&gt; 1.5 mg/dL</td>
            <td style={{ padding: "12px" }}>
              Elevated levels indicate possible kidney issues.
            </td>
          </tr>
          <tr
            style={{
              backgroundColor: "#fff",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            <td style={{ padding: "12px" }}>Platelets</td>
            <td style={{ padding: "12px" }}>150,000-450,000 cells/mcL</td>
            <td style={{ padding: "12px" }}>450,000-500,000 cells/mcL</td>
            <td style={{ padding: "12px" }}>&gt; 500,000 cells/mcL</td>
            <td style={{ padding: "12px" }}>
              High levels can lead to clotting issues.
            </td>
          </tr>
        </tbody>
      </table>

      {/* Section 3: Graph showing Trends */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333",
          fontSize: "28px",
        }}
      >
        Clinical Data Trends
      </h2>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Line data={data} options={options} />
      </div>
      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "16px",
          color: "#666",
        }}
      >
        The graph above shows the trends for Blood Pressure and Serum Creatinine
        levels over for 5 days, helping to monitor the patient’s health
        progression.
      </p>
    </div>
  );
};

export default ReadData;
