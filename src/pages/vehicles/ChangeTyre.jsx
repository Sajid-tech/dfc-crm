import React, { useState, useEffect,  useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import moment from "moment";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";

const ChangeTyre = () => {
  const navigate = useNavigate();
 

  // State Management
  const [tyre, setTyre] = useState({});
  const [tyrePosition, setTyrePosition] = useState("");
  const [loader, setLoader] = useState(true);
  const [tyres, setTyres] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const vechileId = localStorage.getItem("vechile_view");
  const [vehicles, setVehicles] = useState({
    tyre_assign_position: localStorage.getItem("tyre_position") || "",
    tyre_assign_no: "",
    tyre_assign_date: "",
    tyre_assign_km: "",
    tyre_assign_pre_km: "",
  });

  // Utility Functions
  const validateOnlyDigits = (input) => {
    const digitRegex = /^\d+$/;
    return digitRegex.test(input) || input.length === 0;
  };

  // Input Change Handler
  const onInputChange = useCallback((e) => {
    const { name, value } = e.target || e;

    if (name === "tyre_assign_no") {
      setVehicles((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name === "tyre_assign_km" || name === "tyre_assign_pre_km") {
      if (validateOnlyDigits(value)) {
        setVehicles((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setVehicles((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  // Fetch Tyre Details
  const fetchTyreDetails = useCallback(async () => {
    try {
      const tyre_sub_id = localStorage.getItem("tyre_sub_id");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-vehicles-tyre-sub-by-id/${tyre_sub_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTyre(response.data.vehiceltyresub);
      setTyrePosition(localStorage.getItem("tyre_position"));
      setLoader(false);
    } catch (error) {
      console.error("Error fetching tyre details", error);
      setLoader(false);
    }
  }, []);

  // Fetch Available Tyres
  const fetchTyres = useCallback(async () => {
    try {
      const vehicle_branch = localStorage.getItem("vehicle_branch");
      const response = await axios.get(
        `${BASE_URL}/api/web-fetch-tyre-by-branch/${vehicle_branch}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTyres(response.data.tyre);
    } catch (error) {
      console.error("Error fetching tyres", error);
    }
  }, []);

  // Authentication Check and Data Fetching
  useEffect(() => {
    fetchTyreDetails();
    fetchTyres();
  }, [fetchTyreDetails, fetchTyres, navigate]);

  // Update Tyre Details
  const onUpdate = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required");
      setIsButtonDisabled(false);

      return;
    }
    const data = {
      tyre_assign_position: localStorage.getItem("tyre_position"),
      tyre_assign_no: vehicles.tyre_assign_no,
      tyre_assign_date: vehicles.tyre_assign_date,
      tyre_assign_km: vehicles.tyre_assign_km,
      tyre_assign_pre_km: vehicles.tyre_assign_pre_km,
    };

    try {
      setIsButtonDisabled(true);
      const tyre_sub_id = localStorage.getItem("tyre_sub_id");

      const response = await axios.put(
        `${BASE_URL}/api/web-update-vehicle-tyre/${tyre_sub_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.code == "200") {
        toast.success("Tyre Updated Successfully");
        navigate(`/vechile-view/${vechileId}`);
      } else {
        toast.error("Duplicate Entry");
      }
    } catch (error) {
      console.error("Error updating tyre", error);
      toast.error("Error updating tyre");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  // Dynamic Tyre Position Rendering
  const renderTyrePositionDetails = () => {
    const positionMappings = {
      tyre_assign_1_front_left_no: {
        position: "1. Front Left",
        number: tyre.tyre_assign_1_front_left_no,
        date: tyre.tyre_assign_1_front_left_date,
        km: tyre.tyre_assign_1_front_left_km,
        preKm: tyre.tyre_assign_1_front_left_pre_km,
        status: tyre.tyre_assign_1_front_left_status,
      },
      tyre_assign_2_front_right_no: {
        position: "2. Front Right",
        number: tyre.tyre_assign_2_front_right_no,
        date: tyre.tyre_assign_2_front_right_date,
        km: tyre.tyre_assign_2_front_right_km,
        preKm: tyre.tyre_assign_2_front_right_pre_km,
        status: tyre.tyre_assign_2_front_right_status,
      },
      tyre_assign_3_back_left_no: {
        position: "3. Back Left",
        number: tyre.tyre_assign_3_back_left_no,
        date: tyre.tyre_assign_3_back_left_date,
        km: tyre.tyre_assign_3_back_left_km,
        preKm: tyre.tyre_assign_3_back_left_pre_km,
        status: tyre.tyre_assign_3_back_left_status,
      },
      tyre_assign_4_back_left_no: {
        position: "4. Back Left",
        number: tyre.tyre_assign_4_back_left_no,
        date: tyre.tyre_assign_4_back_left_date,
        km: tyre.tyre_assign_4_back_left_km,
        preKm: tyre.tyre_assign_4_back_left_pre_km,
        status: tyre.tyre_assign_4_back_left_status,
      },
      tyre_assign_5_back_right_no: {
        position: "5. Back Right",
        number: tyre.tyre_assign_5_back_right_no,
        date: tyre.tyre_assign_5_back_right_date,
        km: tyre.tyre_assign_5_back_right_km,
        preKm: tyre.tyre_assign_5_back_right_pre_km,
        status: tyre.tyre_assign_5_back_right_status,
      },
      tyre_assign_6_back_right_no: {
        position: "6. Back Right",
        number: tyre.tyre_assign_6_back_right_no,
        date: tyre.tyre_assign_6_back_right_date,
        km: tyre.tyre_assign_6_back_right_km,
        preKm: tyre.tyre_assign_6_back_right_pre_km,
        status: tyre.tyre_assign_6_back_right_status,
      },
      // 10W truck
      tyre_assign_3_back_housing_left_no: {
        position: "3. Back Housing Left",
        number: tyre.tyre_assign_3_back_housing_left_no,
        date: tyre.tyre_assign_3_back_housing_left_date,
        km: tyre.tyre_assign_3_back_housing_left_km,
        preKm: tyre.tyre_assign_3_back_housing_left_pre_km,
        status: tyre.tyre_assign_3_back_housing_left_status,
      },
      tyre_assign_4_back_housing_left_no: {
        position: "4. Back Housing Left",
        number: tyre.tyre_assign_4_back_housing_left_no,
        date: tyre.tyre_assign_4_back_housing_left_date,
        km: tyre.tyre_assign_4_back_housing_left_km,
        preKm: tyre.tyre_assign_4_back_housing_left_pre_km,
        status: tyre.tyre_assign_4_back_housing_left_status,
      },
      tyre_assign_5_back_dummy_left_no: {
        position: "5. Back Dummy Left",
        number: tyre.tyre_assign_5_back_dummy_left_no,
        date: tyre.tyre_assign_5_back_dummy_left_date,
        km: tyre.tyre_assign_5_back_dummy_left_km,
        preKm: tyre.tyre_assign_5_back_dummy_left_pre_km,
        status: tyre.tyre_assign_5_back_dummy_left_status,
      },
      tyre_assign_6_back_dummy_left_no: {
        position: "6. Back Dummy Left",
        number: tyre.tyre_assign_6_back_dummy_left_no,
        date: tyre.tyre_assign_6_back_dummy_left_date,
        km: tyre.tyre_assign_6_back_dummy_left_km,
        preKm: tyre.tyre_assign_6_back_dummy_left_pre_km,
        status: tyre.tyre_assign_6_back_dummy_left_status,
      },
      tyre_assign_7_back_housing_right_no: {
        position: "7. Back Housing Right",
        number: tyre.tyre_assign_7_back_housing_right_no,
        date: tyre.tyre_assign_7_back_housing_right_date,
        km: tyre.tyre_assign_7_back_housing_right_km,
        preKm: tyre.tyre_assign_7_back_housing_right_pre_km,
        status: tyre.tyre_assign_7_back_housing_right_status,
      },
      tyre_assign_8_back_housing_right_no: {
        position: "8. Back Housing Right",
        number: tyre.tyre_assign_8_back_housing_right_no,
        date: tyre.tyre_assign_8_back_housing_right_date,
        km: tyre.tyre_assign_8_back_housing_right_km,
        preKm: tyre.tyre_assign_8_back_housing_right_pre_km,
        status: tyre.tyre_assign_8_back_housing_right_status,
      },
      tyre_assign_9_back_dummy_right_no: {
        position: "9. Back Dummy Right",
        number: tyre.tyre_assign_9_back_dummy_right_no,
        date: tyre.tyre_assign_9_back_dummy_right_date,
        km: tyre.tyre_assign_9_back_dummy_right_km,
        preKm: tyre.tyre_assign_9_back_dummy_right_pre_km,
        status: tyre.tyre_assign_9_back_dummy_right_status,
      },
      tyre_assign_10_back_dummy_right_no: {
        position: "10. Back Dummy Right",
        number: tyre.tyre_assign_10_back_dummy_right_no,
        date: tyre.tyre_assign_10_back_dummy_right_date,
        km: tyre.tyre_assign_10_back_dummy_right_km,
        preKm: tyre.tyre_assign_10_back_dummy_right_pre_km,
        status: tyre.tyre_assign_10_back_dummy_right_status,
      },
    };

    const positionDetails = positionMappings[tyrePosition];

    return positionDetails ? (
      <tr className="bg-orange-300 ">
        <td className="border p-2 text-center">{positionDetails.position}</td>
        <td className="border p-2 text-center">{positionDetails.number}</td>
        <td className="border p-2 text-center">{moment(positionDetails.date).format("DD-MM-YYYY")}</td>
        <td className="border p-2 text-center">{positionDetails.km}</td>
        <td className="border p-2 text-center">{positionDetails.preKm}</td>
        <td className="border p-2 text-center">{positionDetails.status}</td>
      </tr>
    ) : null;
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: "34px",
      minHeight: "34px",
      fontSize: "0.75rem",
      borderRadius: "0.5rem",
      borderColor: "#2196F3",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "0.75rem",
    }),
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1 ">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500";
  // Loader Component
  const Loader = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-[#FFFFFF] p-2  rounded-lg ">
        {loader ? (
          <Loader />
        ) : (
          <div className="bg-[#FFFFFF] p-2  rounded-lg ">
            <div className="sticky top-0 p-2  mb-4 border-b-2 border-red-500 rounded-lg  bg-[#E1F5FA] ">
              <h2 className=" px-5 text-[black] text-lg   flex flex-row  justify-between items-center  rounded-xl p-2 ">
                <div className="flex  items-center gap-2">
                  <IconInfoCircle className="w-4 h-4" />
                  <span>
                    {" "}
                    Change Tyres - {localStorage.getItem("vehicle_no")}
                  </span>
                </div>
                <IconArrowBack
                  onClick={() => navigate(`/vechile-view/${vechileId}`)}
                  className="cursor-pointer hover:text-red-600"
                />
              </h2>
            </div>

            {/* Tyre Details Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Position</th>
                    <th className="border p-2">Tyre No</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">KM</th>
                    <th className="border p-2">Present KM</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>{renderTyrePositionDetails()}</tbody>
              </table>
            </div>

            {/* Update Form */}
            <form id="addIndiv" onSubmit={onUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tyre No Select */}
                <div>
                  <FormLabel required>Tyre No</FormLabel>
                  <Select
                    name="tyre_assign_no"
                    options={tyres.map((option) => ({
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: "tyre_assign_no",
                    }))}
                    placeholder="Select Tyre"
                    onChange={onInputChange}
                    value={
                      vehicles.tyre_assign_no
                        ? {
                            value: vehicles.tyre_assign_no,
                            label: vehicles.tyre_assign_no,
                          }
                        : null
                    }
                    styles={customStyles}
                    required
                  />
                </div>

                {/* Date Input */}
                <div>
                  <FormLabel required>Date</FormLabel>
                  <input
                    type="date"
                    name="tyre_assign_date"
                    value={vehicles.tyre_assign_date}
                    onChange={onInputChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* KM Input */}
                <div>
                  <FormLabel required>KM</FormLabel>
                  <input
                    type="text"
                    name="tyre_assign_km"
                    value={vehicles.tyre_assign_km}
                    onChange={onInputChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`
                    px-6 py-2 rounded-lg text-white transition-colors duration-300
                    ${
                      isButtonDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }
                  `}
                >
                  Update Tyre
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChangeTyre;
