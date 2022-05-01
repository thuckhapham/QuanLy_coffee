import axios from "axios";
import { useEffect, useState } from "react";
import Header2 from "../../NewComponents/Header2/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Report = () => {
  const tokenBearer = localStorage.getItem("tokenBearer");

  const [order, setOrder] = useState({
    doanhthu: [],
    banchay: [],
    theogio: [],
  });
  const [lable, setLable] = useState({
    doanhthu: [],
    banchay: [],
    theogio: [],
  });
  const [data, setData] = useState();
  const [orderCount, setOrderCount] = useState({});
  const [checkBox, setCheckBox] = useState({
    doanhthu: false,
    banchay: false,
    theogio: false,
  });
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/report/order`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setOrderCount(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  function formattedDate(date) {
    var dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    return newdate;
  }

  const thongKe = () => {
    if (!checkBox.doanhthu && !checkBox.banchay && !checkBox.theogio)
      alert("Vui lòng chọn dữ liệu thống kê");
    else {
      setLable({
        doanhthu: [],
        banchay: [],
        theogio: [],
      });
      axios({
        method: "get",
        url: `http://localhost:5000/api/order/?pagesize=100`,
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        let res = response.data;
        //sort by day
        res.orders.sort(function (a, b) {
          return new Date(b.created) - new Date(a.created);
        });
        if (checkBox.doanhthu) tinhDoanhThu(res);
        if (checkBox.banchay) tinhBanChay(res);
      });
    }
  };

  const tinhDoanhThu = (res) => {
    // doanhthu
    let doanhthu = [];
    let holdLabel = [];
    let day, check;

    res.orders.map((e) => {
      day = formattedDate(e.created);
      check = holdLabel.indexOf(day);
      if (check == -1) {
        holdLabel.push(day);
        doanhthu.push(parseInt(e.total));
      } else {
        doanhthu[check] = doanhthu[check] + parseInt(e.total);
      }
    });

    doanhthu = doanhthu.reverse();
    holdLabel = holdLabel.reverse();
    setData((prev) => ({ ...prev, doanhthu: doanhthu }));
    setLable((prev) => ({ ...prev, doanhthu: holdLabel }));
  };

  const tinhBanChay = (res) => {
    // doanhthu
    let banchay = [];
    let holdLabel = [];
    let day, check;

    res.orders.map((e) => {
      if (e.orderItem.length !== 0) {
        e.orderItem.map((item) => {
          check = holdLabel.indexOf(item.name);
          if (check == -1) {
            holdLabel.push(item.name);
            banchay.push(parseInt(item.quantity));
          } else {
            banchay[check] = banchay[check] + parseInt(item.quantity);
          }
        });
      }
    });
    // banchay = banchay.reverse();
    // holdLabel = holdLabel.reverse();
    setData((prev) => ({ ...prev, banchay: banchay }));
    setLable((prev) => ({ ...prev, banchay: holdLabel }));
  };
  return (
    <div>
      <Header2 />
      <h1 className="text-center"> REPORT</h1>
      <h6 className="text-center">Tổng số order: {orderCount.number}</h6>
      <div className="border border-4 container">
        <div className="row">
          <div className="col-6">
            <h6>Chọn ngày thống kê:</h6>
            <tr>
              <td>From: </td>
              <td>
                <input type="date" />
              </td>
            </tr>
            <tr>
              <td>To: </td>
              <td>
                <input type="date" />
              </td>
            </tr>
          </div>
          <div className="col-6">
            <h6>So sánh thống kê (tùy chọn):</h6>
            <tr>
              <td>From: </td>
              <td>
                <input type="date" />
              </td>
            </tr>
            <tr>
              <td>To: </td>
              <td>
                <input type="date" />
              </td>
            </tr>
          </div>
        </div>
        <hr />
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="doanhthu"
            onChange={(e) =>
              setCheckBox((prev) => ({ ...prev, doanhthu: e.target.checked }))
            }
          />
          <label class="form-check-label" for="doanhthu">
            Thống kê doanh thu
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="banchay"
            onChange={(e) =>
              setCheckBox((prev) => ({ ...prev, banchay: e.target.checked }))
            }
          />
          <label class="form-check-label" for="banchay">
            Thống kê sản phẩm
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="theogio"
            onChange={(e) =>
              setCheckBox((prev) => ({ ...prev, theogio: e.target.checked }))
            }
          />
          <label class="form-check-label" for="theogio">
            Order theo thời gian trong ngày
          </label>
        </div>
        <div className="text-center">
          <div className="btn btn-primary " onClick={thongKe}>
            Xem
          </div>
        </div>
        <hr />

        <div className="row">
          {lable.doanhthu.length !== 0 && data.doanhthu.length !== 0 && (
            <div className="col-12 col-sm-6">
              <Line
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Thống kê doanh thu",
                    },
                  },
                }}
                data={{
                  labels: lable.doanhthu,
                  datasets: [
                    {
                      label: "Doanh thu hiện tại",
                      borderColor: "rgb(255, 0, 0)",
                      data: data.doanhthu,
                      backgroundColor: "rgba(0,0,0)",
                    },
                  ],
                }}
              />
            </div>
          )}

          {lable.banchay.length !== 0 && data.banchay.length !== 0 && (
            <div className="col-12 col-sm-6">
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Thống kê sản phẩm",
                    },
                  },
                }}
                data={{
                  labels: lable.banchay,
                  datasets: [
                    {
                      label: "Số lần order",
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(0,0,0)",
                      data: data.banchay,
                    },
                  ],
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
