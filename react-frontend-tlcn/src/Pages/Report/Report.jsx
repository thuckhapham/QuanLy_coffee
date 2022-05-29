import axios from "axios";
import "./report.css";
import { useEffect, useState } from "react";
import Header2 from "../../Components/Header2/Header";

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
import html2canvas from "html2canvas";

import checkPermesion from "./../../Components/checkPermession";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

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
  const [data, setData] = useState({
    report: null,
    hoursOrder: null,
    banchay: null,
    doanhthu: null,
    report2: null,
    hoursOrder2: null,
    banchay2: null,
    doanhthu2: null,
  });
  const [date1, setDate1] = useState({
    from: "2022-04-02",
    to: new Date().toISOString().split("T")[0],
  });
  const [date2, setDate2] = useState({
    from: "2022-04-02",
    to: new Date().toISOString().split("T")[0],
  });
  const [sosanh, setSoSanh] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [numberDay, setNumberDay] = useState({ day1: "30", day2: "30" });
  const [checkBox, setCheckBox] = useState({
    doanhthu: false,
    banchay: false,
    theogio: false,
    report: false,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkPermesion(["ADMIN"]);
    if (check === null) navigate("/login");
    else if (!check) navigate("/404");
    setLoading(false);
  }, []);

  useEffect(() => {
    setNumberDay((prev) => ({
      ...prev,
      day1: days_between(new Date(date1.from), new Date(date1.to)),
    }));
  }, [date1]);

  useEffect(() => {
    setNumberDay((prev) => ({
      ...prev,
      day2: days_between(new Date(date2.from), new Date(date2.to)),
    }));
  }, [date2]);

  function days_between(date1, date2) {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date1 - date2);
    return Math.round(differenceMs / ONE_DAY);
  }

  function formattedDate(date) {
    var dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    return newdate;
  }

  const thongKe = () => {
    if (
      !checkBox.doanhthu &&
      !checkBox.banchay &&
      !checkBox.theogio &&
      !checkBox.report
    )
      alert("Vui lòng chọn dữ liệu thống kê");
    else {
      setLable({
        doanhthu: [],
        banchay: [],
        theogio: [],
      });
      axios({
        method: "get",
        url: "http://localhost:5000/api/report/dates/",
        params: {
          dateFrom: date1.from,
          dateTo: date1.to,
        },
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          let res = response.data;
          //sort by day
          res.result.sort(function (a, b) {
            return new Date(b.created) - new Date(a.created);
          });
          if (checkBox.doanhthu) tinhDoanhThu(res.result, setData, setLable);
          if (checkBox.banchay) tinhBanChay(res.result, false);
          if (checkBox.report) tinhReport(res.result, false);
          if (checkBox.theogio) tinhTheoGio(res.result, false);
          if (sosanh) {
            axios({
              method: "get",
              url: "http://localhost:5000/api/report/dates/",
              params: {
                dateFrom: date2.from,
                dateTo: date2.to,
              },
              headers: {
                Authorization: `bearer ${tokenBearer}`,
                "Content-Type": "application/json",
              },
            })
              .then((response2) => {
                let res2 = response2.data;
                //sort by day
                res2.result.sort(function (a, b) {
                  return new Date(b.created) - new Date(a.created);
                });
                if (checkBox.banchay) tinhBanChay(res2.result, true);
                if (checkBox.report) tinhReport(res2.result, true);
                if (checkBox.theogio) tinhTheoGio(res2.result, true);
              })
              .catch((e) => {
                if (e.response !== undefined)
                  alert("So sánh thống kê: " + JSON.stringify(e.response.data));
                else console.log(e);
              });
          }
          setIsFetch(true);
        })
        .catch((e) => {
          if (e.response !== undefined)
            alert("Chọn ngày thống kê: " + JSON.stringify(e.response.data));
          else console.log(e);
        });
    }
  };

  const tinhReport = (res, isSoSanh) => {
    let report = { total: res.length };
    let sumMoney = 0;
    let sumPayment = 0;
    let sumStatus = 0;
    let sumItem = 0;

    res.map((e) => {
      sumMoney = sumMoney + parseInt(e.total);
      if (e.payment.status) sumPayment++;
      if (e.payment.status) sumStatus++;
      sumItem = sumItem + e.orderItem.length;
    });
    report.sumMoney = sumMoney;
    report.sumPayment = sumPayment;
    report.sumStatus = sumStatus;
    report.sumItem = sumItem;
    console.log(report);
    if (isSoSanh) setData((prev) => ({ ...prev, report2: report }));
    else setData((prev) => ({ ...prev, report: report }));
  };

  const tinhDoanhThu = (res) => {
    // doanhthu
    let holdLabel = [];
    let day, check;

    let from = new Date(date1.from);
    let to = new Date(date1.to);

    while (to > from) {
      holdLabel.push(from.toISOString().split("T")[0]);
      from.setDate(from.getDate() + 1); // increment date by 1
    }

    holdLabel.reverse();
    console.log(holdLabel);
    let doanhthu = Array(holdLabel.length).fill(0);

    res.map((e) => {
      // day = formattedDate(e.created);
      check = holdLabel.indexOf(e.created.split("T")[0]);
      console.log(e.created.split("T")[0]);
      console.log(check);

      if (check !== -1) {
        //   // holdLabel.push(day);
        //   doanhthu.push(parseInt(e.total));
        // } else {
        doanhthu[check] = doanhthu[check] + parseInt(e.total);
      }
    });

    doanhthu = doanhthu.reverse();
    holdLabel = holdLabel.reverse();
    setData((prev) => ({ ...prev, doanhthu: doanhthu }));
    setLable((prev) => ({ ...prev, doanhthu: holdLabel }));
  };

  const tinhBanChay = (res, isSoSanh) => {
    // doanhthu
    let banchay = [];
    let holdLabel = [];
    let day, check;

    res.map((e) => {
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
    console.log(isSoSanh);
    console.log(banchay);
    // console.log(banchay);

    if (isSoSanh)
      setLable((lable) => {
        let copylable = JSON.parse(JSON.stringify(lable));
        let newlable = lable.banchay;
        setData((prev) => {
          // moi: holdLabel , banchay
          // cu: lable , prev
          let pos;
          holdLabel.map((e, i) => {
            pos = lable.banchay.indexOf(e);
            if (pos == -1) {
              newlable.push(e);
            }
          });
          console.log(newlable);
          let newdata = Array(newlable.length);
          let oldata = Array(newlable.length);
          let oldPos;
          newlable.map((e, i) => {
            pos = holdLabel.indexOf(e);
            oldPos = copylable.banchay.indexOf(e);
            if (pos == -1) newdata[i] = 0;
            else newdata[i] = banchay[pos];

            console.log(oldPos);
            if (oldPos == -1) oldata[i] = 0;
            else oldata[i] = prev.banchay[oldPos];
          });

          return { ...prev, banchay: oldata, banchay2: newdata };
        });
        return { ...lable, banchay: newlable };
      });
    else {
      setData((prev) => ({ ...prev, banchay: banchay }));
      setLable((prev) => ({ ...prev, banchay: holdLabel }));
    }
  };

  const tinhTheoGio = (res, isSoSanh) => {
    // doanhthu
    let hoursOrder = Array(19).fill(0);
    let holdLabel = [
      "5:00",
      "6:00",
      "7:00",
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];
    let hours;
    res.map((e) => {
      hours = new Date(e.created).getHours();
      hoursOrder[hours - 5]++;
    });
    // banchay = banchay.reverse();
    // holdLabel = holdLabel.reverse();
    if (isSoSanh) setData((prev) => ({ ...prev, hoursOrder2: hoursOrder }));
    else setData((prev) => ({ ...prev, hoursOrder: hoursOrder }));
    setLable((prev) => ({ ...prev, theogio: holdLabel }));
  };

  function convertToImage() {
    html2canvas(document.getElementById("export")).then(function (canvas) {
      saveAs(
        canvas.toDataURL(),
        "Thong_ke_(" + date1.from + ")_(" + date1.to + ").png"
      );
    });
  }

  function saveAs(uri, filename) {
    var link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  return (
    <div>
      <Header2 />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className="container p-3">
            <h1 className="text-center">Report</h1>
            <div className="border border-4 ">
              <div className="row">
                <div className="col-6 col-md-4">
                  <h6>Chọn ngày thống kê:</h6>
                  <tr>
                    <td>From: </td>
                    <td>
                      <input
                        type="date"
                        value={date1.from}
                        onChange={(e) =>
                          setDate1((prev) => ({
                            ...prev,
                            from: e.target.value,
                          }))
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>To: </td>
                    <td>
                      <input
                        type="date"
                        value={date1.to}
                        onChange={(e) =>
                          setDate1((prev) => ({ ...prev, to: e.target.value }))
                        }
                      />
                    </td>
                  </tr>
                </div>
                <div className="col-6 col-md-4">
                  <h6>
                    <input
                      type="checkbox"
                      value={sosanh}
                      id="sosanh"
                      onChange={(e) => setSoSanh(e.target.checked)}
                    />{" "}
                    <label htmlFor="sosanh">So sánh (tùy chọn):</label>
                  </h6>
                  {sosanh && (
                    <>
                      <tr>
                        <td>From: </td>
                        <td>
                          <input
                            type="date"
                            value={date2.from}
                            onChange={(e) =>
                              setDate2((prev) => ({
                                ...prev,
                                from: e.target.value,
                              }))
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>To: </td>
                        <td>
                          <input
                            type="date"
                            value={date2.to}
                            onChange={(e) =>
                              setDate2((prev) => ({
                                ...prev,
                                to: e.target.value,
                              }))
                            }
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </div>
                <div className="col-12 col-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="report"
                      onChange={(e) =>
                        setCheckBox((prev) => ({
                          ...prev,
                          report: e.target.checked,
                        }))
                      }
                    />
                    <label class="form-check-label" for="report">
                      Report
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="doanhthu"
                      onChange={(e) =>
                        setCheckBox((prev) => ({
                          ...prev,
                          doanhthu: e.target.checked,
                        }))
                      }
                    />
                    <label class="form-check-label" for="doanhthu">
                      Doanh thu từng ngày
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="banchay"
                      onChange={(e) =>
                        setCheckBox((prev) => ({
                          ...prev,
                          banchay: e.target.checked,
                        }))
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
                        setCheckBox((prev) => ({
                          ...prev,
                          theogio: e.target.checked,
                        }))
                      }
                    />
                    <label class="form-check-label" for="theogio">
                      Order theo thời gian trong ngày
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="btn btn-primary " onClick={thongKe}>
                  Xem
                </div>

                <button
                  className={
                    "ms-1 " +
                    (isFetch ? "btn btn-primary" : "btn btn-secondary")
                  }
                  onClick={convertToImage}
                  disabled={!isFetch}
                >
                  Tải về
                </button>
              </div>
              <hr />
              <div id="export">
                <h6 className="text-center">
                  Thống kê từ ngày {date1.from} đến {date1.to} ({numberDay.day1}{" "}
                  ngày)
                  {sosanh && (
                    <>
                      {" "}
                      <br />
                      So sánh với ngày {date2.from} đến {date2.to} (
                      {numberDay.day2} ngày)
                    </>
                  )}
                </h6>
                <div className="row">
                  {checkBox.report !== false && data.report !== null && (
                    <div className="col-12 d-flex justify-content-center  ">
                      <div className="bg-faded m-2">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Danh mục</th>
                              <th scope="col">Đơn vị</th>
                              <th scope="col">Số lượng</th>
                              {sosanh && data.report2 && (
                                <th scope="col">So sánh</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Tổng số order</td>
                              <td>order</td>
                              <td>{data.report.total}</td>
                              {sosanh &&
                                data.report2 &&
                                (data.report.total - data.report2.total > 0 ? (
                                  <td className="text-success">
                                    {" "}
                                    + {data.report.total - data.report2.total}
                                  </td>
                                ) : (
                                  <td className="text-danger">
                                    {" "}
                                    {data.report.total - data.report2.total}
                                  </td>
                                ))}
                            </tr>
                            <tr>
                              <td>Order đã thanh toán</td>
                              <td>order</td>
                              <td>{data.report.sumPayment}</td>
                              {sosanh &&
                                data.report2 &&
                                (data.report.sumPayment -
                                  data.report2.sumPayment >
                                0 ? (
                                  <td className="text-success">
                                    {" "}
                                    +{" "}
                                    {data.report.sumPayment -
                                      data.report2.sumPayment}
                                  </td>
                                ) : (
                                  <td className="text-danger">
                                    {" "}
                                    {data.report.sumPayment -
                                      data.report2.sumPayment}
                                  </td>
                                ))}
                            </tr>
                            <tr>
                              <td>Order đã hoàn thành</td>
                              <td>order</td>
                              <td>{data.report.sumStatus}</td>
                              {sosanh &&
                                data.report2 &&
                                (data.report.sumStatus -
                                  data.report2.sumStatus >
                                0 ? (
                                  <td className="text-success">
                                    {" "}
                                    +{" "}
                                    {data.report.sumStatus -
                                      data.report2.sumStatus}
                                  </td>
                                ) : (
                                  <td className="text-danger">
                                    {" "}
                                    {data.report.sumStatus -
                                      data.report2.sumStatus}
                                  </td>
                                ))}
                            </tr>
                            <tr>
                              <td>Tổng tiền thu vào</td>
                              <td>VNĐ</td>
                              <td>{data.report.sumMoney}</td>

                              {sosanh &&
                                data.report2 &&
                                (data.report.sumMoney - data.report2.sumMoney >
                                0 ? (
                                  <td className="text-success">
                                    {" "}
                                    +{" "}
                                    {data.report.sumMoney -
                                      data.report2.sumMoney}
                                  </td>
                                ) : (
                                  <td className="text-danger">
                                    {" "}
                                    {data.report.sumMoney -
                                      data.report2.sumMoney}
                                  </td>
                                ))}
                            </tr>
                            <tr>
                              <td>Số lượng sản phẩm đã bán</td>
                              <td>item</td>
                              <td>{data.report.sumItem}</td>
                              {sosanh &&
                                data.report2 &&
                                (data.report.sumItem - data.report2.sumItem >
                                0 ? (
                                  <td className="text-success">
                                    {" "}
                                    +{" "}
                                    {data.report.sumItem - data.report2.sumItem}
                                  </td>
                                ) : (
                                  <td className="text-danger">
                                    {" "}
                                    {data.report.sumItem - data.report2.sumItem}
                                  </td>
                                ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {lable.doanhthu.length !== 0 && data.doanhthu !== null && (
                    <div className="col-12">
                      <Line
                        className="bg-faded m-2"
                        options={{
                          responsive: true,
                          plugins: {
                            title: {
                              display: true,
                              text: "Doanh thu từng ngày",
                            },
                          },
                        }}
                        data={{
                          labels: lable.doanhthu,
                          datasets: [
                            {
                              label:
                                "Doanh thu (" +
                                date1.from +
                                ") - (" +
                                date1.to +
                                ")",
                              borderColor: "rgb(255, 0, 0)",
                              data: data.doanhthu,
                              backgroundColor: "rgba(0,0,0)",
                            },
                          ],
                        }}
                      />
                    </div>
                  )}

                  {lable.banchay.length !== 0 && data.banchay !== null && (
                    <div className="col-12">
                      <Bar
                        className="bg-faded m-2"
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
                              label:
                                "Sản phẩm đã bán (" +
                                date1.from +
                                ") - (" +
                                date1.to +
                                ")",
                              backgroundColor: "rgb(255, 0, 0)",
                              data: data.banchay,
                            },
                            sosanh && {
                              label:
                                "Sản phẩm đã bán (" +
                                date2.from +
                                ") - (" +
                                date2.to +
                                ")",
                              backgroundColor: "rgba(0,0,255)",
                              data: data.banchay2,
                            },
                          ],
                        }}
                      />
                    </div>
                  )}

                  {lable.theogio.length !== 0 && data.hoursOrder !== null && (
                    <div className="col-12">
                      <Bar
                        className="bg-faded m-2"
                        options={{
                          responsive: true,
                          plugins: {
                            title: {
                              display: true,
                              text: "Order trung bình theo giờ",
                            },
                          },
                        }}
                        data={{
                          labels: lable.theogio,
                          datasets: [
                            {
                              label:
                                "Số lần order " +
                                date1.from +
                                ") - (" +
                                date1.to +
                                ")",
                              backgroundColor: "rgb(255, 0, 0)",
                              data: data.hoursOrder,
                            },
                            sosanh && {
                              label:
                                "Số lần order " +
                                date1.from +
                                ") - (" +
                                date1.to +
                                ")",
                              backgroundColor: "rgba(0,0,255)",
                              data: data.hoursOrder2,
                            },
                          ],
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
